<?php

namespace App\Actions\Product;

use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;

class UpdateProductAction
{
    public function update(UpdateProductRequest $request, Product $product) {
        try {
            $product->update([
                'title' => $request->title,
                'tags' => $request->tags,
                'description' => $request->description,
                'category_id' => (int) $request->category,
            ]);

            if ($request->uploaded_file) {
                $file_name = $product->id . '.' .
                    $request
                        ->file('uploaded_file')
                        ->getClientOriginalExtension();

                //Удаляем старые файлы
                $product->clearMediaCollection('poster');
                $product->clearMediaCollection('glb');

                $product
                    ->addMediaFromRequest('uploaded_file')
                    ->usingFileName($file_name)
                    ->toMediaCollection('glb');
            }

            if ($request->poster) {
                $poster_name = $product->id . '.' .
                    $request
                    ->file('poster')
                    ->getClientOriginalExtension();

                $product
                    ->addMediaFromRequest('poster')
                    ->usingFileName($poster_name)
                    ->toMediaCollection('poster');
            }

            return response()->json([
                'success' => true,
                'data' => $product
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при обновлении модели',
            ], 500);
        }
    }
}
