<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_paypal_order_can_be_created()
    {
        // Primero, crea un plan de prueba en tu base de datos
        $plan = \App\Models\Plan::factory()->create([
            'price' => 500,
        ]);

        // Simula una petición POST a tu endpoint de creación de orden
        $response = $this->postJson('/api/payments/create', [
            'plan_id' => $plan->id,
        ]);

        // Verifica que la respuesta fue exitosa y contiene un ID de orden
        $response->assertStatus(200)
                 ->assertJsonStructure(['id']);
    }
}
