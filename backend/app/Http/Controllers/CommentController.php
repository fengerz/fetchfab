<?php

namespace App\Http\Controllers;

use App\Actions\Comment\DestroyCommentAction;
use App\Actions\Comment\StoreCommentAction;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Product $product)
    {
        return CommentResource::collection($product->comments->sortByDesc('created_at'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Product $product, StoreCommentRequest $request, StoreCommentAction $action)
    {
        //Валидация
        $validated = $request->validated();

        return $action->store($product, $request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, Comment $comment, DestroyCommentAction $action)
    {
        if (! Gate::allows('update-comment', $comment)) {
            abort(403);
        }

        return $action->destroy($comment);
    }
}
