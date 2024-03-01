<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Collection;
use App\Models\Like;
use App\Http\Traits\Hashidable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Cviebrock\EloquentSluggable\Sluggable;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, Hashidable, Sluggable;

    protected $fillable = [
        'title',
        'tags',
        'slug',
        'description',
        'category_id',
        'user_id',
        'downloads_count',
        'views_count'
    ];

    // Указывает в какой папке хранятся файлы данной модели
    public const MEDIA_PATH = 'Product';

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

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    public function collections() {
        return $this->belongsToMany(Collection::class, 'collection_product');
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('glb')
            ->acceptsMimeTypes([
                'application/octet-stream',
                'model/gltf-binary'
            ]);

        $this
            ->addMediaCollection('poster')
            // ->useFallbackUrl(asset('storage/Product/default/poster.webp'))
            ->acceptsMimeTypes(['image/webp']);
    }
}
