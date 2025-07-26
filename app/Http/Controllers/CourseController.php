<?php

namespace App\Http\Controllers;
use App\Models\Course;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function courseList()
    {
        $courses = Course::orderBy('id')->get();

        return Inertia::render('dashboard', [
            'courses' => $courses,
        ]);
    }
}
