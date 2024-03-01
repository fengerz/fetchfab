<?php

namespace App\Actions\Product;

use App\Models\Collection;
use App\Models\Product;

class CollectProductAction
{
    public function toggleCollection(Product $product, Collection $collection) {
        $has_product = $collection->has_product($product->id);

        if ($has_product) {
            $this->removeFromCollection($product, $collection);
        } else {
            $this->addToCollection($product, $collection);
        }
    }

    private function addToCollection(Product $product, Collection $collection) {
        try {
            $collection->products()->attach($product);

            return response()->json([
                'success' => true,
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при добавлении модели в коллекцию',
            ], 500);
        }
    }

    private function removeFromCollection(Product $product, Collection $collection) {
        try {
            $collection->products()->detach($product);

            return response()->json([
                'success' => true,
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при удалении модели из коллекции',
            ], 500);
        }
    }
}
