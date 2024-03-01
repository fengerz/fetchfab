<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Public Routes

// User
Route::prefix('/user')->group(function () {
    Route::get('/', [App\Http\Controllers\UserController::class, 'check']);
    Route::get('/{user:name}', [App\Http\Controllers\UserController::class, 'show']);
});

// Like, Collection, Product
Route::prefix('/user/{user:name}')->group(function () {
    Route::get('/likes', [App\Http\Controllers\ProductController::class, 'likes']);
    Route::get('/models', [App\Http\Controllers\ProductController::class, 'userModels']);
    Route::get('/collections/{collection:slug}/models',
        [App\Http\Controllers\ProductController::class, 'collectionModels']
    );
});

// Collection
Route::prefix('/user/{user:name}/collection')->group(function () {
    Route::get('/', [App\Http\Controllers\CollectionController::class, 'index']);
    Route::get('/{collection:slug}', [App\Http\Controllers\CollectionController::class, 'show']);
});

// Category
Route::prefix('/category')->group(function() {
    Route::get('/', [App\Http\Controllers\CategoryController::class, 'index']);
    // Route::get('/{category:slug}', [App\Http\Controllers\CategoryController::class, 'show']);
});

// Product
Route::prefix('product')->group(function () {
    Route::get('/', [App\Http\Controllers\ProductController::class, 'index']);
    Route::get('/top', [App\Http\Controllers\ProductController::class, 'top']);
    Route::get('/{product}/download', [App\Http\Controllers\ProductController::class, 'download']);
    Route::get('/{product:slug}', [App\Http\Controllers\ProductController::class, 'show']);
    Route::get('/{product:slug}/suggests', [App\Http\Controllers\ProductController::class, 'suggests']);
    Route::get('/{product:slug}/collections', [App\Http\Controllers\ProductController::class, 'collections']);
});

// Comment
Route::prefix('product/{product:slug}/comment')->group(function () {
    Route::get('/', [App\Http\Controllers\CommentController::class, 'index']);
});


// Auth Routes
Route::middleware('auth:sanctum')->group(function () {
    // User
    Route::prefix('/user')->group(function () {
        Route::post('/{user}', [App\Http\Controllers\UserController::class, 'update']);
        // Route::delete('/{user:name}', [App\Http\Controllers\UserController::class, 'destroy']);
    });

    // Collection
    Route::prefix('/user/{user:name}/collection')->group(function () {
        Route::post('/', [App\Http\Controllers\CollectionController::class, 'store']);
        Route::post('/{collection}', [App\Http\Controllers\CollectionController::class, 'update']);
        Route::delete('/{collection}', [App\Http\Controllers\CollectionController::class, 'destroy']);
    });

    // Product
    Route::prefix('product')->group(function () {
        Route::post('/', [App\Http\Controllers\ProductController::class, 'store']);
        Route::post('/{product}', [App\Http\Controllers\ProductController::class, 'update']);
        Route::post('/{product}/like', [App\Http\Controllers\ProductController::class, 'like']);
        Route::post('/{product}/collection/{collection}',
            [App\Http\Controllers\ProductController::class, 'collect']);
        Route::delete('/{product}', [App\Http\Controllers\ProductController::class, 'destroy']);
    });

    // Comment
    Route::prefix('product/{product}/comment')->group(function () {
        Route::post('/', [App\Http\Controllers\CommentController::class, 'store']);
        Route::delete('/{comment}', [App\Http\Controllers\CommentController::class, 'destroy']);
    });
});
