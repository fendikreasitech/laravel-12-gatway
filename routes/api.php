<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::any('/{any}', function (Request $request, $any) {
    // Base URL Lumen (ganti sesuai IP lokal Lumen kamu)
    $lumenBaseUrl = env('LUMEN_API');

    // Bangun URL target ke Lumen
    $url = rtrim($lumenBaseUrl, '/') . '/' . $any;
    // return response()->json(['message' => $url]);

    // Kirim request ke Lumen pakai Laravel HTTP Client
    $response = Http::withHeaders([
        'Authorization' => $request->header('Authorization'), // forward token jika ada
    ])->send(
        $request->method(),
        $url,
        [
            'query' => $request->query(),   // forward query params
            'json'  => $request->all(),     // forward body request
        ]
    );

    return response($response->body(), $response->status())
        ->withHeaders($response->headers());
})->where('any', '.*'); // <- catch all
