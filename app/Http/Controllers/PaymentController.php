<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Plan;

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
}