import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import UserTable from '@/Components/UserTable';

export default function Index({ auth, users, queryParams = null, success }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="gap-4 flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route('user.create')}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600 inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Create User
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            {success && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                    {success}
                </div>
            )}
            <div className="py-12">
                <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
                    <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                        <div className="p-6 text-gray-900">
                            <UserTable
                                users={users}
                                queryParams={queryParams}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
