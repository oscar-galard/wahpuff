<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseVideo extends Model
{
    protected $fillable = ['course_id', 'title', 'url'];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
