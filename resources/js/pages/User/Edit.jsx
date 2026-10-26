import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, user }) {
  const { data, setData, errors, post, reset } = useForm({
    name: user.name || "",
    email: user.email || "",
    _method: "PUT",
    password: "",
    password_confirmation: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.update", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Edit User: {user.name}
        </h2>
      }
    >
      <Head title={`Edit User: ${user.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form
                onSubmit={onSubmit}
                className="p-4 sm:p-8"
              >
                <div className="w-32 h-32 m-8 overflow-hidden rounded-full">
                  <img
                    src="/placeholder.svg"
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="user_name" value="User Name" />
                  <TextInput
                    id="user_name"
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
                  <InputLabel htmlFor="user_email" value="User Email" />
                  <TextInput
                    id="user_email"
                    name="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="user_password" value="User Password" />
                  <TextInput
                    id="user_password"
                    name="password"
                    type="password"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("password", e.target.value)}
                  />
                  <InputError message={errors.password} className="mt-2" />
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
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                  />
                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                </div>
                <div className="flex items-center justify-end mt-4 gap-4">
                  <Link
                    href={route("user.index")}
                    className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200 active:bg-gray-200 disabled:opacity-25 transition"
                  >
                    Cancel
                  </Link>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition">
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
