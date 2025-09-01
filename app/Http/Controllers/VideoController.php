<?php

namespace App\Http\Controllers;
use App\Models\CourseVideo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function videoList($course)
    {
    $videos = CourseVideo::where('course_id', $course)
        ->orderBy('id')
        ->get();

    return Inertia::render('VideoContent', [
        'contents' => $videos,
    ]);
    }
}

