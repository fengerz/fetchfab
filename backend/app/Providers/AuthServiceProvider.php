<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Product;
use App\Models\Collection;
use App\Models\Comment;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // Product
        Gate::define('update-product', function (User $user, Product $product) {
            return $user->id === $product->user_id;
        });

        // Collection
        Gate::define('update-collection', function (User $user, Collection $collection) {
            return $user->id === $collection->user_id;
        });

        // Comment
        Gate::define('update-comment', function (User $user, Comment $comment) {
            return $user->id === $comment->user_id;
        });

        // User
        Gate::define('update-user', function (User $user) {
            return $user->id === Auth::id();
        });

        // User
        // Gate::define('update-user', function (User $auth_user, User $user) {
        //     return $auth_user->id === $user->id;
        // });
    }
}
