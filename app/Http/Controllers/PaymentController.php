<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Plan;
use App\Models\Payment;
use App\Models\Subscription;
use Carbon\Carbon;

class PaymentController extends Controller
{
    public function showPaymentPage()
    {
        $plans = Plan::all();
        
        return Inertia::render('PaymentPage', [
            'plans' => $plans,
            'paypalClientId' => config('services.paypal.client_id'),
        ]);
    }

    public function handleSuccessfulPayment(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'amount' => 'required|numeric',
            'transaction_id' => 'nullable|string',
        ]);

        // Get the authenticated user
        $user = $request->user();

        // Get the plan to determine subscription duration
        $plan = Plan::findOrFail($validated['plan_id']);

        // Create subscription record (30 days duration for all plans)
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'started_at' => now(),
            'expires_at' => Carbon::now()->addDays(30),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Subscription created successfully',
            'subscription_id' => $subscription->id,
        ]);
    }
}