<?php

namespace App\Actions\Product;

use App\Models\Product;

class DestroyProductAction
{
    public function destroy(Product $product) {
        try {
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Модель успешно удалена'
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при удалении модели',
            ], 500);
        }
    }
}
