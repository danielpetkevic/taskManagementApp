import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TaskShow({ auth, task, success }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="gap-4 flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {`Task: ${task.name}`}
                    </h2>
                    <Link
                        href={route('task.edit', task)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={`Task: ${task.name}`} />

            <div className="py-12">
                <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
                    {success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                            {success}
                        </div>
                    )}
                    <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                        <div className="p-6 text-gray-900">
                            <img
                                src={task.image_path}
                                alt={task.name}
                                className="h-64 w-full object-cover"
                            />
                            <div className="gap-4 mt-4 grid grid-cols-2">
                                <div className="gap-2 flex flex-col">
                                    <label className="font-bold">Task ID</label>
                                    <p>{task.id}</p>
                                    <label className="font-bold">
                                        Task Name
                                    </label>
                                    <p>{task.name}</p>
                                    <label className="font-bold">
                                        Task Status
                                    </label>
                                    <p>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${TASK_STATUS_CLASS_MAP[task.status]}`}
                                        >
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                    </p>
                                    <label className="font-bold">
                                        Task Priority
                                    </label>
                                    <p>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${TASK_PRIORITY_CLASS_MAP[task.priority]}`}
                                        >
                                            {
                                                TASK_PRIORITY_TEXT_MAP[
                                                    task.priority
                                                ]
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div className="gap-2 flex flex-col">
                                    <label className="font-bold">
                                        Task Created At
                                    </label>
                                    <p>{task.created_at}</p>
                                    <label className="font-bold">
                                        Due Date
                                    </label>
                                    <p>{task.due_date}</p>
                                    <label className="font-bold">
                                        Task Updated By
                                    </label>
                                    <p>{task.updated_by.name}</p>
                                    <label className="font-bold">
                                        Created By
                                    </label>
                                    <p>{task.created_by.name}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold">
                                    Task Description
                                </label>
                                <p>{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
