<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\backendController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\NewsletterController;

Route::post('newsletter/subscribe', [NewsletterController::class, 'store'])->name('api.newsletter.subscribe');

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/payments/create', [PaymentController::class, 'createOrder'])
        ->name('api.payments.create');

    Route::post('/payments/complete', [PaymentController::class, 'completeOrder'])
        ->name('api.payments.complete');

    // Comments routes
    Route::get('videos/{video}/comments', [CommentController::class, 'index'])->name('api.videos.comments.index');
    Route::post('videos/{video}/comments', [CommentController::class, 'store'])->name('api.videos.comments.store');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::get("/test", function(){
    return "El backend funciona correctamente";
});

Route::get("/backend/", [ backendController::class, "getAll" ]);
Route::get("/backend/{id?}", [ backendController::class, "get" ]);

