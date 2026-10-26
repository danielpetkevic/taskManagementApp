import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <nav className="mt-4 text-center">
            {links.map((link) => (
                <Link
                    preserveScroll
                    href={link.url || ''}
                    key={link.label}
                    className={
                        'py-2 px-3 rounded-lg text-black-200 text-xs inline-block' +
                        (link.active
                            ? 'bg-gray-800'
                            : 'bg-gray-600 hover:bg-gray-700') +
                        (link.url ? ' cursor-pointer' : ' cursor-not-allowed')
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
}
