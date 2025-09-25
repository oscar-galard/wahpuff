<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseVideo>
 */
class CourseVideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'course_id' => \App\Models\Course::factory(),
        ];
    }
}
