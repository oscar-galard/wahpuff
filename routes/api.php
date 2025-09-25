<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\backendController;
use App\Http\Controllers\Api\AuthController;

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

