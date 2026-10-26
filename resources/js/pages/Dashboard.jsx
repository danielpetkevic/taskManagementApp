import TasksTable from "@/Components/TasksTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({
  user,
  tasks,
  myPendingTasksCount,
  myInProgressTasksCount,
  myCompletedTasksCount,
  queryParams = null,
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          {user.name}'s Tasks Overview
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-lg font-semibold text-amber-500">
                Pending Tasks
              </h3>
              <p className="text-2xl">{myPendingTasksCount}</p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-lg font-semibold text-blue-500">
                In Progress Tasks
              </h3>
              <p className="text-2xl">{myInProgressTasksCount}</p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-lg font-semibold text-green-500">
                Completed Tasks
              </h3>
              <p className="text-2xl">{myCompletedTasksCount}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
            <TasksTable 
                tasks={tasks}
                queryParams={queryParams}
                visibleProjectColumn={false}
                visibleCreatedByColumn={false}
                visibleCreateDateColumn={false}
                appearenceContext="dashboard"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
