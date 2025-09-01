import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

export default function CourseContent({ auth, contents }) {
    // Set the first video from the contents array as the active video
    const [activeVideo, setActiveVideo] = useState(contents.length > 0 ? contents[0].url : '');

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white-800 leading-tight">Contenido del Curso</h2>}
        >
            <Head title="Contenido del curso" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="container mx-auto">
                            <div className="video-player mb-8">
                                {/* Check if there's an active video URL before rendering ReactPlayer */}
                                {activeVideo && (
                                    <ReactPlayer
                                        url={activeVideo}
					controls
					width="100%" 
					height="300px" 
					className="sm:h-[250px] md:h-[350px] lg:h-[450px] w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
                                    />
                                )}
                            </div>
                            <div className="video-list">
                                <h2 className="text-2xl font-bold text-center mb-4">Videos del curso</h2>
                                <ul className="space-y-2">
                                    {contents.map((content, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => setActiveVideo(content.url)}
                                                className="w-full px-4 py-2 text-lg font-medium text-gray-700 bg-gray-100 hover:bg-custom-orange hover:text-white transition-colors duration-300 ease-in-out rounded-lg shadow-md text-center"
                                            >
                                                {content.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
