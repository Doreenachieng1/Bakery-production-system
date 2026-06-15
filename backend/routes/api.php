

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ---------------------------------------------------------------
// API endpoints for products
// ---------------------------------------------------------------

// This single line registers:
// GET    /api/products        → ProductController@index
// GET    /api/products/{id}   → ProductController@show
// POST   /api/products        → ProductController@store
// PUT    /api/products/{id}   → ProductController@update
// DELETE /api/products/{id}   → ProductController@destroy
Route::apiResource('products', ProductController::class);

// ---------------------------------------------------------------
// Simple health check endpoint
// ---------------------------------------------------------------
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'Bakery API is running',
        'timestamp' => now()->toISOString(),
    ]);
});