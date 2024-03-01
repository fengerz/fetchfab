<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use App\Actions\Product\CollectProductAction;
use App\Actions\Product\DestroyProductAction;
use App\Actions\Product\FilterProductAction;
use App\Actions\Product\LikeProductAction;
use App\Actions\Product\StoreProductAction;
use App\Actions\Product\UpdateProductAction;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CollectionResource;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, FilterProductAction $action)
    {
        $products = $action->filter($request);

        return ProductResource::collection($products->paginate(12));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request, StoreProductAction $action)
    {
        //Валидация
        $validated = $request->validated();

        return $action->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Product $product)
    {
        //Увеличиваем счётчик просмотров
        RateLimiter::attempt(
            'increment_views_count:' . $request->ip() . $product->id,
            $perMinute = 1,
            function () use ($product) {
                $product->increment('views_count');
            }
        );

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product, UpdateProductAction $action)
    {
        if (! Gate::allows('update-product', $product)) {
            abort(403, 'Доступ к модели ограничен');
        }

        //Валидация
        $validated = $request->validated();

        return $action->update($request, $product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, DestroyProductAction $action)
    {
        if (! Gate::allows('update-product', $product)) {
            abort(403, 'Доступ к модели ограничен');
        }

        return $action->destroy($product);
    }

    public function like(Product $product, LikeProductAction $action)
    {
        return $action->toggleLike($product);
    }

    public function likes(User $user) {
        $products = $user->likes->map(function($like) {
            return Product::find($like->product_id);
        });

        return ProductResource::collection($products->paginate(12));
    }

    public function userModels(User $user) {
        $products = $user->products();

        return ProductResource::collection($products->paginate(12));
    }

    public function collectionModels(User $user, Collection $collection) {
        $products = $collection->products();

        return ProductResource::collection($products->paginate(12));
    }

    public function suggests(Product $product) {
        $category = $product->category;

        $products = $category->products->except([
            $product->id
        ]);

        $count = $products->count() < 10
            ? $products->count()
            : 10;

        return ProductResource::collection($products->random($count)->paginate(5));
    }

    public function collections(Product $product) {
        $collections = $product->collections;

        $count = $collections->count() < 3
            ? $collections->count()
            : 3;

        return CollectionResource::collection($collections->random($count));
    }

    public function top() {
        $categories = Category::all();
        $products = collect([]);

        foreach ($categories as $category) {
            $top_product = $category
                ->products
                ->loadCount('likes')
                ->sortByDesc('likes_count')
                ->first();

            $products->push($top_product);
        }

        return ProductResource::collection($products);
    }

    public function collect(Product $product, Collection $collection, CollectProductAction $action)
    {
        return $action->toggleCollection($product, $collection);
    }

    public function download(Request $request, Product $product)
    {
        //Увеличиваем счётчик скачиваний
        RateLimiter::attempt(
            'increment_downloads_count:' . $request->ip() . $product->id,
            $perMinute = 1,
            function () use ($product) {
                $product->increment('downloads_count');
            }
        );

        $media = $product->getFirstMedia('glb');

        return response()
            ->download($media->getPath(), $media->file_name);
    }
}
