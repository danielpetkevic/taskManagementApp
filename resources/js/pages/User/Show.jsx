import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function UserShow({
  auth,
  user,
  queryParams = null,
  success,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {`${user.name}`}
        </h2>
      }
    >
      <Head title={`${user.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              {success}
            </div>
          )}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="w-32 h-32 m-8 overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="font-bold">User ID</label>
                  <p>{user.id}</p>
                  <label className="font-bold">User Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold">User Email</label>
                  <p>{user.email}</p>
                  <label className="font-bold">User Created At</label>
                  <p>{user.created_at}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
