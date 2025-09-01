<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;

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

        return response()->json(['message' => 'Successfully subscribed to the newsletter!'], 201);
    }
}
