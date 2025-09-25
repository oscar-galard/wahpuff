<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Course;
use App\Models\CourseVideo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    public function test_an_authenticated_user_can_post_a_comment(): void
    {
        $this->withoutMiddleware();

        $user = User::factory()->create();
        $course = Course::factory()->create();
        $video = CourseVideo::factory()->create(['course_id' => $course->id]);

        $response = $this->actingAs($user)->post(route('videos.comments.store', $video), [
            'body' => 'This is a test comment.',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('comments', [
            'body' => 'This is a test comment.',
            'user_id' => $user->id,
            'course_video_id' => $video->id,
        ]);
    }
}
