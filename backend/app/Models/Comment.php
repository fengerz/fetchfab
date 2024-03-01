<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'user_id', 'product_id'];

    public function user() {
        return $this->hasOne(User::class);
    }

    public function product() {
        return $this->hasOne(Product::class);
    }  
}
