<?php

namespace App\Http\Controllers;

use App\Models\DiscountCode;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    private string $paypalBaseUrl;
    private string $clientId;
    private string $clientSecret;

    public function __construct()
    {
        $this->clientId = config('services.paypal.client_id');
        $this->clientSecret = config('services.paypal.client_secret');

        $this->paypalBaseUrl = config('services.paypal.mode') === 'live'
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';
    }

    public function showPaymentPage()
    {
        $plans = Plan::all();

        return Inertia::render('PaymentPage', [
            'plans' => $plans,
            'paypalClientId' => config('services.paypal.client_id'),
        ]);
    }

    public function createOrder(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'discount_code' => 'nullable|string',
        ]);

        $plan = Plan::findOrFail($request->plan_id);
        $amount = $plan->price;

        if ($request->discount_code) {
            $discountCode = DiscountCode::where('code', $request->discount_code)->first();
            if ($discountCode && $discountCode->isValid()) {
                if ($discountCode->type === 'percentage') {
                    $amount = $amount * (1 - $discountCode->discount_percentage / 100);
                } elseif ($discountCode->type === 'fixed') {
                    $amount = $amount - $discountCode->discount_amount;
                }
                $amount = max(0, $amount);
            }
        }

        try {
            $accessToken = $this->getAccessToken();
            $response = Http::withToken($accessToken)
                ->post("{$this->paypalBaseUrl}/v2/checkout/orders", [
                    'intent' => 'CAPTURE',
                    'purchase_units' => [
                        [
                            'amount' => [
                                'currency_code' => 'MXN',
                                'value' => number_format($amount, 2, '.', ''),
                            ],
                            'custom_id' => $plan->id,
                        ],
                    ],
                ]);

            if ($response->successful()) {
                return response()->json(['id' => $response->json('id')]);
            }

            Log::error('PayPal API Error (Create Order):', ['response' => $response->json()]);
            return response()->json([
                'error' => $response->json('message') ?? 'Error de PayPal al crear la orden.',
                'details' => $response->json()
            ], $response->status());

        } catch (\Exception $e) {
            Log::error('Error al crear orden de PayPal: ' . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor.', 'message' => $e->getMessage()], 500);
        }
    }

    public function completeOrder(Request $request)
    {
        $request->validate(['orderID' => 'required|string']);

        try {
            $accessToken = $this->getAccessToken();

            Log::info('Attempting to capture PayPal order', [
                'orderID' => $request->orderID,
                'url' => "{$this->paypalBaseUrl}/v2/checkout/orders/{$request->orderID}/capture"
            ]);

            $response = Http::withToken($accessToken)
                ->withHeaders([
                    'Content-Type' => 'application/json'
                ])
                ->post("{$this->paypalBaseUrl}/v2/checkout/orders/{$request->orderID}/capture", (object)[]);

            if ($response->successful() && $response->json('status') === 'COMPLETED') {
                $transactionId = $response->json('purchase_units.0.payments.captures.0.id');
                $amount = $response->json('purchase_units.0.payments.captures.0.amount.value');
                $planId = $response->json('purchase_units.0.custom_id');

                $this->createSubscription($request->user(), $planId);
                $this->createPayment($request->user(), $planId, $amount, $transactionId);

                return response()->json(['status' => 'success', 'message' => 'Pago exitoso.']);
            }

            Log::error('PayPal API Error (Capture Order):', ['response' => $response->json()]);
            return response()->json([
                'error' => $response->json('message') ?? 'No se pudo completar el pago.',
                'details' => $response->json()
            ], $response->status());

        } catch (\Exception $e) {
            Log::error('Error al completar orden de PayPal: ' . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor.', 'message' => $e->getMessage()], 500);
        }
    }

    private function getAccessToken(): string
    {
        $response = Http::asForm()
            ->withBasicAuth($this->clientId, $this->clientSecret)
            ->post("{$this->paypalBaseUrl}/v1/oauth2/token", [
                'grant_type' => 'client_credentials',
            ]);
        $response->throw();
        return $response->json('access_token');
    }

    private function createSubscription($user, $planId)
    {
        Subscription::updateOrCreate(
            ['user_id' => $user->id],
            [
                'plan_id' => $planId,
                'started_at' => now(),
                'expires_at' => now()->addMonth(),
            ]
        );
    }

    private function createPayment($user, $planId, $amount, $transactionId)
    {
        Payment::create([
            'user_id' => $user->id,
            'plan_id' => $planId,
            'amount' => $amount,
            'payment_method' => 'paypal',
            'transaction_id' => $transactionId,
            'successful' => true,
            'paid_at' => now(),
        ]);
    }
}