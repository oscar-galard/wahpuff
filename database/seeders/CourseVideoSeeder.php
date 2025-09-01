<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CourseVideo;

class CourseVideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        CourseVideo::insert([
            [
                'course_id' => 1,
                'title' => 'Introducción al curso wahpuff',
                'url' => 'https://www.youtube.com/watch?v=Z3j57V_r4kI',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 1,
                'title' => 'La ritmica en la guitarra',
                'url' => 'https://www.youtube.com/watch?v=ZtivXsqiX7s',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 1,
                'title' => 'Leer y escribir acordes de guitarra',
                'url' => 'https://www.youtube.com/watch?v=v-LjkAaHNFQ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
