import TasksTable from "@/Components/TasksTable";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function ProjectShow({
  auth,
  project,
  queryParams = null,
  tasks,
  success,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {`Project: ${project.name}`}
          </h2>
          <Link href={route("project.edit", project)} className="text-blue-500 hover:text-blue-700">
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Project: ${project.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              {success}
            </div>
          )}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <img
                src={project.image_path}
                alt={project.name}
                className="w-full h-64 object-cover"
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="font-bold">Project ID</label>
                  <p>{project.id}</p>
                  <label className="font-bold">Project Name</label>
                  <p>{project.name}</p>
                  <label className="font-bold">Project Status</label>
                  <p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${PROJECT_STATUS_CLASS_MAP[project.status]}`}
                    >
                      {PROJECT_STATUS_TEXT_MAP[project.status]}
                    </span>
                  </p>
                  <label className="font-bold">Created By</label>
                  <p>{project.created_by.name}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold">Project Created At</label>
                  <p>{project.created_at}</p>
                  <label className="font-bold">Due Date</label>
                  <p>{project.due_date}</p>
                  <label className="font-bold">Project Updated By</label>
                  <p>{project.updated_by.name}</p>
                  <label className="font-bold">Project Description</label>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
            <div className="p-6 text-gray-900">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                visibleProjectColumn={false}
                project={project}
                appearenceContext="project"
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
