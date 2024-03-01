<?php

namespace App\Models;

use App\Models\User;
use App\Models\Product;
use App\Http\Traits\Hashidable;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Collection extends Model
{
    use HasFactory, Hashidable, Sluggable;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'slug'
    ];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function products() {
        return $this->belongsToMany(Product::class, 'collection_product');
    }

    public function has_product($id) {
        return $this->products()->firstWhere('id', $id)
            ? true
            : false;
    }
}
