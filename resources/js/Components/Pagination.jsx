import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {links.map((link) => (
                <Link 
                preserveScroll
                href={link.url || ''}
                key={link.label}
                className={"inline-block py-2 px-3 rounded-lg text-black-200 text-xs" +
                (link.active ? "bg-gray-800" : "bg-gray-600 hover:bg-gray-700") + 
                (link.url ? " cursor-pointer" : " cursor-not-allowed")}
                dangerouslySetInnerHTML={{ __html: link.label}}></Link>
            ))}
        </nav>
    )
}