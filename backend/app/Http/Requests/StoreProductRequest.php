<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                'filled',
                'min:3',
                'max:64'
            ],
            'tags' => [
                'nullable',
                'string',
                'max:128'
            ],
            'description' => [
                'nullable',
                'string',
                'max:255'
            ],
            'category' => [
                'required',
                'integer',
                'exists:App\Models\Category,id'
            ],
            'uploaded_file' => [
                'required',
                'file',
                'max:30000',
                'mimetypes:model/gltf-binary,application/octet-stream'
            ],
            'poster' => [
                'required',
                'image',
                'mimes:webp',
                'max:2000',
            ],
        ];
    }
}
