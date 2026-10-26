import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, errors, post, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('user.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create User
                </h2>
            }
        >
            <Head title="Create User" />

            <div className="py-12">
                <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
                    <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={onSubmit} className="p-4 sm:p-8">
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_name"
                                        value="User Name"
                                    />
                                    <TextInput
                                        id="user_name"
                                        name="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_email"
                                        value="User Email"
                                    />
                                    <TextInput
                                        id="user_email"
                                        name="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_password"
                                        value="User Password"
                                    />
                                    <TextInput
                                        id="user_password"
                                        name="password"
                                        type="password"
                                        className="mt-1 block w-full"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_password_confirmation"
                                        value="User Password Confirmation"
                                    />
                                    <TextInput
                                        id="user_password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        className="mt-1 block w-full"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4 gap-4 flex items-center justify-end">
                                    <Link
                                        href={route('user.index')}
                                        className="px-4 py-2 bg-gray-200 rounded-md font-semibold text-xs text-gray-700 tracking-widest hover:bg-gray-300 focus:border-gray-700 focus:ring-gray-200 active:bg-gray-200 inline-flex items-center border border-transparent uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="px-4 py-2 bg-blue-600 rounded-md font-semibold text-xs text-white tracking-widest hover:bg-blue-500 focus:border-blue-700 focus:ring-blue-200 active:bg-blue-600 inline-flex items-center border border-transparent uppercase transition focus:ring focus:outline-none disabled:opacity-25">
                                        Create User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
