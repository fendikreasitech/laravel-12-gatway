<?php

use Illuminate\Support\Facades\Route;

// ===== Tambahkan fallback untuk Vue Router =====
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
