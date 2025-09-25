<?php

namespace App\Http\Controllers;

use App\Models\CourseVideo;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function store(Request $request, CourseVideo $video)
    {

        \Illuminate\Support\Facades\Log::info('User ID: ', ['user_id' => optional($request->user())->id]);

        $request->validate([
            'body' => 'required|string|max:2500',
        ]);

        $video->comments()->create([
            'body' => $request->body,
            'user_id' => $request->user()->id,
        ]);

        return back();
    }

    public function destroy(Request $request, Comment $comment)
    {
        // Check if the comment belongs to the authenticated user
        if ($comment->user_id !== $request->user()->id) {
            abort(403);
        }
        
        $comment->delete();
        
        return back();
    }
}