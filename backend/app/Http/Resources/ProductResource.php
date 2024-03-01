<?php

namespace App\Http\Resources;

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $is_liked = Auth::user()?->likes()->firstWhere('product_id', $this->id)
            ? true
            : false;

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'tags' => $this->tags,
            'slug' => $this->slug,
            'downloads_count' => $this->downloads_count,
            'views_count' => $this->views_count,
            'likes_count' => $this->likes()->count(),
            'comments_count' => $this->comments()->count(),
            'is_liked' => $is_liked,
            'category' => new CategoryResource(Category::findOrFail($this->category_id)),
            'user' => new UserResource(User::findOrFail($this->user_id)),
            'poster' => $this->getFirstMediaUrl("poster"),
            '3d_model' => $this->getFirstMediaUrl("glb"),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
