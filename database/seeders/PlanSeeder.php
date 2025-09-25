<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('plans')->insert([
            [
                'name' => 'Descubre',
                'price' => 699.00,
                'monthly_lessons' => 4,
                'monthly_sessions' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'impulsa',
                'price' => 699.00,
                'monthly_lessons' => 4,
                'monthly_sessions' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'domina',
                'price' => 999.00,
                'monthly_lessons' => 4,
                'monthly_sessions' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
