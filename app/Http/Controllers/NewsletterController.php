<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscription;
use App\Notifications\NewsletterSubscriptionNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:newsletter_subscriptions,email',
            'phone' => 'nullable|string|max:20',
        ]);

        $subscription = NewsletterSubscription::create($request->all());

        // Send confirmation email
        $subscription->notify(new NewsletterSubscriptionNotification($subscription));

        return back()->with('success', 'Successfully subscribed to the newsletter!');
    }
}
