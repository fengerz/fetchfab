<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\User\UpdateUserAction;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * Auth.
     */
    public function check() {
        $user = Auth::user();

        return $user ? new UserResource($user) : abort(403);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user->loadCount(['products', 'likes']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user, UpdateUserAction $action, UpdateUserPassword $password_action)
    {
        if (! Gate::allows('update-user')) {
            abort(403, 'Доступ к профилю ограничен');
        }

        //Валидация
        $validated = $request->validated();

        return $action->update($request, $user, $password_action);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (! Gate::allows('update-user')) {
            abort(403, 'Доступ к профилю ограничен');
        }

        //
    }
}
