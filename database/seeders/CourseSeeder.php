<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
       public function run()
       {
           DB::table('courses')->insert([
               [
                   'title' => 'Guitarra en 7 dias',
                   'description' => 'Unete al reto de 7 dias para aprender a tocar guitarra, y aprende los secretos para avanzar en tiempo record.',
                   'image_url' => '/images/curso-basico.png',
                   'is_premium' => false,
                   'created_at' => now(),
                   'updated_at' => now(),
               ],
               [
                   'title' => 'Más Allá de los Acordes Bootcamp',
                   'description' => 'Aprende mas sobre acordes, escalas y entiende la escencia de la guitarra electrica y acustica.',
                   'image_url' => '/images/oferta.png',
                   'is_premium' => true,
                   'created_at' => now(),
                   'updated_at' => now(),
               ],
               [
                   'title' => 'El lado oscuro: Desbloquea tu shred',
                   'description' => 'Lleva tu tecnica y concocimiento al siguiente nivel, tecnicas avanzadas, y composicion nivel pro.',
                   'image_url' => '/images/shred-side.png',
                   'is_premium' => true,
                   'created_at' => now(),
                   'updated_at' => now(),
               ],
           ]);
    }
}
