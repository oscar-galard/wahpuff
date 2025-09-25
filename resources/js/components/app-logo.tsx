import { Link } from '@inertiajs/react';

export default function AppLogo() {
	return (
		<Link href="/" className="flex items-center">
			<img src="/images/wahpuff-logox170.png" alt="Wahpuff Logo" className="h-10 w-auto" />
		</Link>
	);
}
