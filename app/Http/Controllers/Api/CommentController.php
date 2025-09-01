<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CourseVideo;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(CourseVideo $video)
    {
        // Eager load the user relationship to get the user's name
        $comments = $video->comments()->with('user:id,name')->latest()->get();

        return response()->json($comments);
    }

    public function store(Request $request, CourseVideo $video)
    {
        $request->validate([
            'body' => 'required|string|max:2500',
        ]);

        $comment = $video->comments()->create([
            'body' => $request->body,
            'user_id' => $request->user()->id,
        ]);

        // Load the user relationship for the new comment
        $comment->load('user:id,name');

        return response()->json($comment, 201);
    }
}