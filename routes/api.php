<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Api\AuthController;

Route::get("/test", function(){
    return "El backend funciona correctamente";
});

