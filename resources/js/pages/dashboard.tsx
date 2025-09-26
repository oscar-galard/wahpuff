import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AnimatedDashboardPlaceholder from '@/components/AnimatedDashboardPlaceholder';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: '/dashboard',
	},
];

interface Course {
    id: number;
    title: string;
    description: string;
    image_url: string;
}

export default function Dashboard() {
	const { courses } = usePage().props as { courses: Course[] };
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Dashboard" />
			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				{courses?.map((course, idx) => (
					<Link
						key={idx}
						href={route('courses.content.show', course.id)}
						className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border group"
					>
						<img
							src={course.image_url}
							alt={course.title}
							className="absolute inset-0 size-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
						/>

						<div className="absolute inset-0 p-4 flex flex-col justify-end text-white bg-gradient-to-t from-black/80 to-transparent">
							{/* Title styling */}
							<h2 className="text-xl font-bold line-clamp-1">
								{course.title}
							</h2>
							{/* Description styling */}
							<p className="text-sm mt-1 line-clamp-2">
								{course.description}
							</p>
						</div>
					</Link>
				))}
			</div>
			<AnimatedDashboardPlaceholder />
			</div>
		</AppLayout>
	);
}
