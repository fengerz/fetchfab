<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'email' => [
            //     'required',
            //     'email',
            //     'string',
            //     'filled',
            //     'max:64'
            // ],

            'name' => [
                'required',
                'string',
                'filled',
                'min:2',
                'max:32'
            ],

            'image' => [
                'nullable',
                'image',
                'max:5000'
            ],

            'current_password' => [
                'nullable',
                'max:50'
            ],

            'password' => [
                'nullable',
                'max:50'
            ],

            'password_confirmation' => [
                'nullable',
                'max:50'
            ],
        ];
    }
}
