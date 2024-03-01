<?php

namespace App\Actions\Comment;

use App\Models\Comment;

class DestroyCommentAction
{
    public function destroy(Comment $comment) {
        try {
            $comment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Комментарий успешно удален'
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при удалении комментария',
            ], 500);
        }
    }
}
