<?php

namespace App\Actions\Product;

use App\Models\Category;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FilterProductAction
{
    public function filter(Request $request) {
        $products = Product::all();

        if ($request->has('category')) {
            $category = Category::firstWhere('slug', $request->get('category'));

            if ($category) {
                $products = $products->where('category_id', $category->id);
            }
        }

        if ($request->has('period')) {
            $period = intval($request->get('period'));

            if ($period > 0) {
                $start = Carbon::today();
                $end = $start->subDays($period);

                $products = $products->where('created_at', '>', $end);
            }
        }

        if ($request->has('sort')) {
            switch ($request->get('sort')) {
                case 'likeCount':
                    $products = $products
                        ->loadCount('likes')
                        ->sortByDesc('likes_count');
                    break;

                case 'commentCount':
                    $products = $products
                        ->loadCount('comments')
                        ->sortByDesc('comments_count');
                    break;

                case 'viewCount':
                    $products = $products
                        ->sortByDesc('views_count');
                    break;
            }
        }

        if ($request->has('tag')) {
            $tag = mb_strtolower($request->get('tag'));

            $products = $products->filter(function ($product) use ($tag) {
                return str_contains(mb_strtolower($product->tags), $tag);
            });
        }

        if ($request->has('query')) {
            $text = mb_strtolower($request->get('query'));

            $products = $products->filter(function ($product) use ($text) {
                return str_contains(mb_strtolower($product->title), $text);
            });
        }

        return $products;
    }
}
