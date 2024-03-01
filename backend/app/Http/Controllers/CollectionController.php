<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Collection;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\CollectionResource;
use App\Http\Requests\StoreCollectionRequest;
use App\Http\Requests\UpdateCollectionRequest;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        $user_collections = $user
            ->collections()
            ->paginate(12);

        return CollectionResource::collection($user_collections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCollectionRequest $request)
    {
        //Валидация
        $validated = $request->validated();

        try {
            $collection = Collection::create([
                'title' => $request->title,
                'description' => $request->description,
                'user_id' => $request->user()->id,
            ]);

            return response()->json([
                'success' => true,
                'data' => $collection
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при создании коллекции',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user, Collection $collection)
    {
        return new CollectionResource($collection);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, Collection $collection, UpdateCollectionRequest $request)
    {
        if (! Gate::allows('update-collection', $collection)) {
            abort(403, 'Доступ к коллекции ограничен');
        }

        //Валидация
        $validated = $request->validated();

        try {
            $collection->update([
                'title' => $request->title,
                'description' => $request->description,
            ]);

            return response()->json([
                'success' => true,
                'data' => $collection
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при обновлении коллекции',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, Collection $collection)
    {
        if (! Gate::allows('update-collection', $collection)) {
            abort(403, 'Доступ к коллекции ограничен');
        }

        $collection->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
