<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CourseVideo extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'title', 'url'];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
