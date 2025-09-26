import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useState, FormEventHandler } from 'react';
import React from 'react';
import ReactPlayer from 'react-player';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Video Content',
        href: '/video-content',
    },
];

interface Comment {
    id: number;
    body: string;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Video {
    id: number;
    title: string;
    url: string;
    comments: Comment[];
}

export default function VideoContent() {
    const { contents } = usePage().props as { contents: Video[] };
    const [activeVideo, setActiveVideo] = useState<Video | null>(contents.length > 0 ? contents[0] : null);
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, processing, errors, reset } = useForm({
        body: '',
    });

    const handleCommentSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!activeVideo) return;

        // Use fetch to make the API call instead of inertia post
        fetch(route('videos.comments.store', { video: activeVideo.id }), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                body: data.body,
            }),
        })
        .then(response => response.json())
        .then(result => {
            if (result.comment) {
                // Update the active video's comments with the new comment
                const updatedActiveVideo = {
                    ...activeVideo,
                    comments: [result.comment, ...activeVideo.comments]
                };
                
                setActiveVideo(updatedActiveVideo);
                
                reset();
                setShowSuccess(true);
                // Hide the success message after 3 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Error posting comment:', error);
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contenido del curso" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="container mx-auto">
                                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 mb-8">
                                    <div className="lg:col-span-2 mb-8 lg:mb-0">
                                        <div className="video-player">
                                            {activeVideo && (
                                                <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-lg">
                                                    <ReactPlayer
                                                        src={activeVideo.url}
                                                        controls
                                                        width="100%"
                                                        height="100%"
                                                        className="absolute top-0 left-0"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="lg:col-span-1">
                                        <div className="video-list">
                                            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Videos del curso</h2>
                                            <ul className="space-y-3">
                                                {contents.map((content) => (
                                                    <li key={content.id}>
                                                        <button
                                                            onClick={() => setActiveVideo(content)}
                                                            className={`w-full px-4 py-3 text-lg font-medium text-gray-700 transition-colors duration-300 ease-in-out rounded-lg shadow-md text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
                                                                activeVideo?.id === content.id ? 'bg-orange-400 text-white' : 'bg-gray-100 hover:bg-orange-300 hover:text-white'
                                                            }`}
                                                        >
                                                            {content.title}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="comments-section mt-8">
                                    <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Comentarios</h2>
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <form onSubmit={handleCommentSubmit} className="mb-6">
                                            <textarea
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                                                rows={3}
                                                value={data.body}
                                                onChange={(e) => setData('body', e.target.value)}
                                                placeholder="Escribe tu comentario..."
                                            ></textarea>
                                            {errors.body && <div className='text-red-500 text-xs mt-1'>{errors.body}</div>}
                                            {showSuccess && (
                                                <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md">
                                                    ¡Comentario publicado exitosamente!
                                                </div>
                                            )}
                                            <button type="submit" className="mt-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" disabled={processing}>
                                                Publicar Comentario
                                            </button>
                                        </form>
                                        <div className="space-y-4">
                                            {activeVideo?.comments.map(comment => (
                                                <div key={comment.id} className="flex items-start space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                                            {comment.user.name.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900">{comment.user.name}</p>
                                                        <p className="text-gray-700">{comment.body}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{new Date(comment.created_at).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {activeVideo?.comments.length === 0 && (
                                                <p className="text-center text-gray-500">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}