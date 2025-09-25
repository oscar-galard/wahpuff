<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;
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

        NewsletterSubscription::create($request->all());

        return back()->with('success', 'Successfully subscribed to the newsletter!');
    }
}
