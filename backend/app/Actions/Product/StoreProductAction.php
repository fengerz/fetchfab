<?php

namespace App\Actions\Product;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;

class StoreProductAction
{
    public function store(StoreProductRequest $request) {
        try {
            $product = Product::create([
                'title' => $request->title,
                'tags' => $request->tags,
                'description' => $request->description,
                'category_id' => (int) $request->category,
                'user_id' => $request->user()->id,
                'downloads_count' => 0,
                'views_count' => 0,
            ]);

            $file_name = $product->id . '.' .
                $request
                    ->file('uploaded_file')
                    ->getClientOriginalExtension();

            $product
                ->addMediaFromRequest('uploaded_file')
                ->usingFileName($file_name)
                ->toMediaCollection('glb');

            $poster_name = $product->id . '.' .
                $request
                    ->file('poster')
                    ->getClientOriginalExtension();

            $product
                ->addMediaFromRequest('poster')
                ->usingFileName($poster_name)
                ->toMediaCollection('poster');

            return response()->json([
                'success' => true,
                'data' => $product
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при создании модели',
            ], 500);
        }
    }
}
