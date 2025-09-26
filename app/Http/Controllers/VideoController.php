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
            ->with(['comments' => function ($query) {
                $query->latest()->with('user:id,name');
            }])
            ->orderBy('id')
            ->get();

        // Check if the course has any videos
        if ($videos->isEmpty()) {
            // Render a page with a message indicating no content is available yet
            return Inertia::render('VideoContent', [
                'contents' => $videos,
                'noContentMessage' => 'Por ahora no hay contenido en esta pagina, seguimos trabajando para completar este curso',
            ]);
        }

        return Inertia::render('VideoContent', [
            'contents' => $videos,
        ]);
    }
}

