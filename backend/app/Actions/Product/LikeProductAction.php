<?php

namespace App\Actions\Product;

use App\Models\Like;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class LikeProductAction
{
    public function toggleLike(Product $product) {
        $like = Auth::user()
            ->likes()
            ->firstWhere('product_id', $product->id);

        if ($like) {
            $this->dislike($like);
        } else {
            $this->like($product);
        }
    }

    private function like(Product $product) {
        try {
            $like = Like::create([
                'product_id' => $product->id,
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'success' => true,
                'data' => $like
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при создании лайка',
            ], 500);
        }
    }

    private function dislike(Like $like) {
        try {
            $like->delete();

            return response()->json([
                'success' => true
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при удалении лайка',
            ], 500);
        }
    }
}
