<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Collection;
use App\Models\Comment;
use App\Models\Like;
use App\Models\User;
use App\Models\Product;

class FactorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory(10)
            ->has(Product::factory()->count(10))
            ->has(Comment::factory()->count(10))
            ->has(Collection::factory()->count(2))
            ->create();

        foreach ($users as $user) {
            // Выборка случайных моделей без дубликатов
            $products = Product::all()->random(10)->unique();

            // Присвоение лайков моделям
            foreach ($products as $product) {
                Like::factory()->create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                ]);
            }

            // Привязка случайных моделей к коллекциям
            $collection_count = $user->collections()->count();

            $limit = intval($products->count() / $collection_count);

            for ($i = 0; $i < $collection_count; $i++) {
                $iteration = $i + 1;

                $offset = $iteration * $limit - $limit;

                $sliced = $products->slice($offset, $limit)
                    ->map(fn ($product) => $product->id)
                    ->all();

                $user->collections[$i]->products()->attach($sliced);
            }
        }
    }
}
