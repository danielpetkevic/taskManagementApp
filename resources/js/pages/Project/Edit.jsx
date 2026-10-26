import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, project }) {
  const { data, setData, errors, post, reset } = useForm({
    image:  "",
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("project.update", project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Edit Project: {project.name}
        </h2>
      }
    >
      <Head title={`Edit Project: ${project.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form
                onSubmit={onSubmit}
                className="p-4 sm:p-8"
              >
                {project.image_path && (
                  <div className="mb-4">
                    <img
                      src={project.image_path}
                      alt={project.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
                <div>
                  <InputLabel
                    htmlFor="project_image_path"
                    value="Project Image"
                  />
                  <TextInput
                    name="image"
                    id="project_image_path"
                    type="file"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="project_name" value="Project Name" />
                  <TextInput
                    id="project_name"
                    name="name"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.name}
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="project_description"
                    value="Project Description"
                  />
                  <TextAreaInput
                    name="description"
                    id="project_description"
                    className="mt-1 block w-full"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="project_due_date"
                    value="Project Due Date"
                  />
                  <TextInput
                    name="due_date"
                    id="project_due_date"
                    type="date"
                    className="mt-1 block w-full"
                    value={data.due_date}
                    onChange={(e) => setData("due_date", e.target.value)}
                  />
                  <InputError message={errors.due_date} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="project_status" value="Project Status" />
                  <SelectInput
                    name="status"
                    id="project_status"
                    className="mt-1 block w-full"
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>
                  <InputError message={errors.status} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4 gap-4">
                  <Link
                    href={route("project.index")}
                    className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200 active:bg-gray-200 disabled:opacity-25 transition"
                  >
                    Cancel
                  </Link>
                  <button
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
                  >
                    Submit changes
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
