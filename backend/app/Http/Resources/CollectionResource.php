<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CollectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'slug' => $this->slug,
            'products_count' => $this->products()->count(),
            'poster_products' =>
                $this->products()->latest()->take(4)->get()->map(function($product) {
                    return $product->getFirstMediaUrl('poster');
                }),
            'has_product' => $this->when($request->has('product_id'),
                $this->has_product($request->get('product_id'))
            ),
            'user' => new UserResource(User::findOrFail($this->user_id)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
