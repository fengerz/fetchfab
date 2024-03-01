<?php

namespace App\Actions\Comment;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Product;

class StoreCommentAction
{
    public function store(Product $product, StoreCommentRequest $request) {
        try {
            $comment = Comment::create([
                'text' => $request->text,
                'product_id' => $product->id,
                'user_id' => $request->user()->id,
            ]);

            return response()->json([
                'success' => true,
                'data' => $comment
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при создании комментария',
            ], 500);
        }
    }
}
