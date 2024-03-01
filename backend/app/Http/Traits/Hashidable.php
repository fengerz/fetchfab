<?php

namespace App\Http\Traits;

use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Support\Str;


trait Hashidable
{
    public function getRouteKey()
    {
        return Hashids::connection(get_called_class())->encode($this->getKey());
    }
}
