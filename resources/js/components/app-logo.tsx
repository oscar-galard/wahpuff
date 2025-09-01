import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href="/" className="flex items-center">
            <img src="/images/wahpuff-logox170.png" alt="Wahpuff Logo" className="h-10 w-auto" />
            <span className="ml-2 text-lg font-semibold group-data-[collapsed=true]:hidden">Wahpuff</span>
        </Link>
    );
}