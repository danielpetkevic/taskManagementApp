import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, projects, users }) {
    const { data, setData, errors, post, reset } = useForm({
        image: '',
        name: '',
        project_id: '',
        status: '',
        priority: '',
        assigned_user_id: '',
        description: '',
        due_date: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('task.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Task
                </h2>
            }
        >
            <Head title="Create Task" />

            <div className="py-12">
                <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
                    <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={onSubmit} className="p-4 sm:p-8">
                                <div>
                                    <InputLabel
                                        htmlFor="task_image_path"
                                        value="Task Image"
                                    />
                                    <TextInput
                                        name="image"
                                        id="task_image_path"
                                        type="file"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('image', e.target.files[0])
                                        }
                                    />
                                    <InputError
                                        message={errors.image}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_name"
                                        value="Task Name"
                                    />
                                    <TextInput
                                        id="task_name"
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
                                        htmlFor="project_id"
                                        value="Assigned Project"
                                    />
                                    <SelectInput
                                        name="project_id"
                                        id="project_id"
                                        className="mt-1 block w-full"
                                        value={data.project_id}
                                        onChange={(e) =>
                                            setData(
                                                'project_id',
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">Select Project</option>
                                        {projects &&
                                            projects.data.map((project) => (
                                                <option
                                                    key={project.id}
                                                    value={project.id}
                                                >
                                                    {project.name}
                                                </option>
                                            ))}
                                    </SelectInput>
                                    <InputError
                                        message={errors.project_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_description"
                                        value="Task Description"
                                    />
                                    <TextAreaInput
                                        name="description"
                                        id="task_description"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_due_date"
                                        value="Task Due Date"
                                    />
                                    <TextInput
                                        name="due_date"
                                        id="task_due_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.due_date}
                                        onChange={(e) =>
                                            setData('due_date', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.due_date}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_status"
                                        value="Task Status"
                                    />
                                    <SelectInput
                                        name="status"
                                        id="task_status"
                                        className="mt-1 block w-full"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData('status', e.target.value)
                                        }
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </SelectInput>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_priority"
                                        value="Task Priority"
                                    />
                                    <SelectInput
                                        name="priority"
                                        id="task_priority"
                                        className="mt-1 block w-full"
                                        value={data.priority}
                                        onChange={(e) =>
                                            setData('priority', e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select Priority
                                        </option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError
                                        message={errors.priority}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="assigned_user_id"
                                        value="Assigned User"
                                    />
                                    <SelectInput
                                        name="assigned_user_id"
                                        id="assigned_user_id"
                                        className="mt-1 block w-full"
                                        value={data.assigned_user_id}
                                        onChange={(e) =>
                                            setData(
                                                'assigned_user_id',
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select Assigned User
                                        </option>
                                        {users &&
                                            users.data.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name}
                                                </option>
                                            ))}
                                    </SelectInput>
                                    <InputError
                                        message={errors.assigned_user_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4 gap-4 flex items-center justify-end">
                                    <Link
                                        href={route('task.index')}
                                        className="px-4 py-2 bg-gray-200 rounded-md font-semibold text-xs text-gray-700 tracking-widest hover:bg-gray-300 focus:border-gray-700 focus:ring-gray-200 active:bg-gray-200 inline-flex items-center border border-transparent uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="px-4 py-2 bg-blue-600 rounded-md font-semibold text-xs text-white tracking-widest hover:bg-blue-500 focus:border-blue-700 focus:ring-blue-200 active:bg-blue-600 inline-flex items-center border border-transparent uppercase transition focus:ring focus:outline-none disabled:opacity-25">
                                        Create Task
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
