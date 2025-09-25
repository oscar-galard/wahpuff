<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsletterSubscriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_subscribe_to_the_newsletter(): void
    {
        $this->withoutMiddleware();

        $response = $this->post(route('newsletter.subscribe'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '1234567890',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('newsletter_subscriptions', [
            'email' => 'test@example.com',
        ]);
    }
}
