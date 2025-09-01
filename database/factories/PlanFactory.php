<?php

namespace Database\Factories;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Plan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
public function definition()
{
    return [
        'name' => $this->faker->word,
        'price' => $this->faker->randomFloat(2, 10, 1000),
        // Elimina la línea 'duration_months' o cualquier otra columna que no exista
    ];
}
}
