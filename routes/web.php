<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\PaymentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/pago', [PaymentController::class, 'showPaymentPage'])->name('payment.page');
    Route::get('dashboard', [CourseController::class, 'courseList'])->name('dashboard');
    Route::get('courses/{course}/content', [VideoController::class, 'videoList'])->name('courses.content.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
