<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Vinkla\Hashids\Facades\Hashids;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            //Hashid
            Route::bind('producthash', function ($value, $route) {
                return $this->getModel(\App\Models\Product::class, $value);
            });

            Route::bind('collectionhash', function ($value, $route) {
                return $this->getModel(\App\Models\Collection::class, $value);
            });
        });
    }

    //Hashid
    private function getModel($model, $routeKey)
    {
        $id = Hashids::connection($model)->decode($routeKey)[0] ?? null;
        $modelInstance = resolve($model);
        return  $modelInstance->findOrFail($id);
    }
}
