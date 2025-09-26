<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\NewUserRegistrationNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // Send notification to admin about new registration
        try {
            \Illuminate\Support\Facades\Mail::send('emails.new-user-notification', ['user' => $user], function ($message) {
                $message->to('o4allgax@gmail.com')
                        ->subject('🎉 Nuevo Estudiante Registrado - Wahpuff');
            });
        } catch (\Exception $e) {
            // Log the error but don't fail the registration
            \Log::error('Failed to send admin notification for new user registration: ' . $e->getMessage());
        }

        // Check if user must verify email before logging in
        if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail()) {
            // Send email verification notification
            $user->sendEmailVerificationNotification();
            
            // Log user in so they can access verification prompt
            Auth::login($user);
            
            return redirect()->route('verification.notice');
        } else {
            Auth::login($user);
            return redirect()->intended(route('dashboard', absolute: false));
        }
    }
}
