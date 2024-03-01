<?php

namespace App\Actions\User;

use App\Actions\Fortify\UpdateUserPassword;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;

class UpdateUserAction
{
    public function update(UpdateUserRequest $request, User $user, UpdateUserPassword $password_action) {
        try {
            //Смена аватара
            if ($request->has('image')) {
                $file = $request->file('image');

                //Удаляем старые файлы
                $user->clearMediaCollection('avatar');

                $user
                    ->addMediaFromRequest('image')
                    ->usingFileName($user->id . '.' . $file->getClientOriginalExtension())
                    ->toMediaCollection('avatar');
            }

            //Смена логина
            if ($request->has('name') && ($request->get('name') !== $user->name)) {
                $user->forceFill([
                    'name' => $request->get('name'),
                ])->save();
            }

            //Смена пароля
            if ($request->get('current_password') && $request->get('password')) {

                $password_input = [
                    'current_password' => $request->get('current_password'),
                    'password' => $request->get('password'),
                    'password_confirmation' => $request->get('password_confirmation'),
                ];

                $password_action->update($user, $password_input);
            }

            return response()->json([
                'success' => true,
                'data' => $user
            ]);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => 'Ошибка при обновлении профиля',
            ], 500);
        }
    }
}
