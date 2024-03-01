<?php

namespace App\Services\MediaLibrary;

use \Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator as BasePathGenerator;

class CustomPathGenerator implements BasePathGenerator
{
    /**
     * Get the path for the given media, relative to the root storage path.
     *
     * @param \Spatie\MediaLibrary\MediaCollections\Models\Media $media
     *
     * @return string
     */
    public function getPath(Media $media): string
    {
        $model = new $media->model_type;
        $instance = $model::find($media->model_id);

        return $model::MEDIA_PATH . '/' .
            date_format($instance->created_at, 'Y') . '/' .
            date_format($instance->created_at, 'm') . '/' .
            $media->model_id . '/' .
            $media->collection_name . '/';
    }

    /**
     * Get the path for conversions of the given media, relative to the root storage path.
     *
     * @param \Spatie\MediaLibrary\MediaCollections\Models\Media $media
     *
     * @return string
     */
    public function getPathForConversions(Media $media): string
    {
        $model = new $media->model_type;
        $instance = $model::find($media->model_id);

        return $model::MEDIA_PATH . '/' .
            date_format($instance->created_at, 'Y') . '/' .
            date_format($instance->created_at, 'm') . '/' .
            $media->model_id . '/' .
            $media->collection_name . '/conversions/';
    }

    /**
     * Get the path for responsive images of the given media, relative to the root storage path.
     *
     * @param \Spatie\MediaLibrary\MediaCollections\Models\Media $media
     *
     * @return string
     */
    public function getPathForResponsiveImages(Media $media): string
    {
        $model = new $media->model_type;
        $instance = $model::find($media->model_id);

        return $model::MEDIA_PATH . '/' .
            date_format($instance->created_at, 'Y') . '/' .
            date_format($instance->created_at, 'm') . '/' .
            $media->model_id . '/' .
            $media->collection_name . '/responsive-images/';
    }
}
