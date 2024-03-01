<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'tags' => implode(",", fake()->words(10)),
            'description' => fake()->paragraphs(3, true),
            'views_count' => fake()->randomNumber(5),
            'downloads_count' => fake()->randomNumber(3),
            'user_id' => User::factory(),
            'category_id' => Category::all()->random()->id,
        ];
    }
}
