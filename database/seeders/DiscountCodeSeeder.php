<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiscountCode;

class DiscountCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DiscountCode::create([
            'code' => 'WELCOME25',
            'type' => 'percentage',
            'value' => 25.00,
            'is_used' => false,
        ]);
    }
}
