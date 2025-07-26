<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CourseController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [CourseController::class, 'courseList'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
