<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DiscountCodeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/politicas', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::post('newsletter/subscribe', [NewsletterController::class, 'store'])->name('newsletter.subscribe');
Route::post('discount-code/validate', [DiscountCodeController::class, 'validateDiscountCode'])->name('discount-code.validate');
Route::post('discount-code/use', [DiscountCodeController::class, 'markAsUsed'])->name('discount-code.use');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/pago', [PaymentController::class, 'showPaymentPage'])->name('payment.page');
    Route::post('/payment/success', [PaymentController::class, 'handleSuccessfulPayment'])->name('payment.success');
    Route::get('dashboard', [CourseController::class, 'courseList'])->name('dashboard');
    Route::get('courses/{course}/content', [VideoController::class, 'videoList'])->name('courses.content.show');
    Route::post('videos/{video}/comments', [CommentController::class, 'store'])->name('videos.comments.store');
    Route::delete('videos/comments/{comment}', [CommentController::class, 'destroy'])->name('videos.comments.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
