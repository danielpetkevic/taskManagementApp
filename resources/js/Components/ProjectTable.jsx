import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";

export default function ProjectTable({
  projects,
  queryParams,
}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams, {
      preserveScroll: true,
    });
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") {
      return;
    } else {
      searchFieldChanged(name, e.target.value);
    }
  };

  const sortChanged = (name) => {
    if (queryParams.sort_field === name) {
      queryParams.sort_direction =
        queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("project.index"), queryParams, {
      preserveScroll: true,
    });
  };

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <TableHeading
              name="id"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              ID
            </TableHeading>
            <TableHeading
              name="image_path"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
              isSortable={false}
            >
              Image
            </TableHeading>
            <TableHeading
              name="name"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Project
            </TableHeading>
            <TableHeading
              name="status"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Status
            </TableHeading>
            <TableHeading
              name="created_at"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Create Date
            </TableHeading>
            <TableHeading
              name="due_date"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Due Date
            </TableHeading>
            <TableHeading
              name="created_by"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
              isSortable={false}
            >
              Created By
            </TableHeading>
            <TableHeading
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
              isSortable={false}
            >
              Actions
            </TableHeading>
          </tr>
        </thead>
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">
              <TextInput
                className="w-full"
                placeholder="Search by name..."
                onBlur={(e) => searchFieldChanged("name", e.target.value)}
                onKeyPress={(e) => onKeyPress("name", e)}
                defaultValue={queryParams.name}
              />
            </th>
            <th className="px-4 py-2">
              <SelectInput
                className="w-full"
                onChange={(e) => searchFieldChanged("status", e.target.value)}
                defaultValue={queryParams.status}
              >
                <option value="">All</option>
                <option value="in_progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </SelectInput>
            </th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {projects.data.map((project) => (
            <tr key={project.id}>
              <td className="border px-4 py-2">{project.id}</td>
              <td className="border px-4 py-2">
                {project.image_path ? (
                  <img
                    src={project.image_path}
                    alt={project.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="border px-4 py-2">
                <Link
                  href={route("project.show", project.id)}
                  className="cursor:pointer font-bold"
                >
                  {project.name}
                </Link>
              </td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${PROJECT_STATUS_CLASS_MAP[project.status]}`}
                >
                  {PROJECT_STATUS_TEXT_MAP[project.status]}
                </span>
              </td>
              <td className="border px-4 py-2">{project.created_at}</td>
              <td className="border px-4 py-2">{project.due_date}</td>
              <td className="border px-4 py-2">{project.created_by.name}</td>
              <td className="border px-4 py-2 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <Link
                    href={route("project.edit", project.id)}
                    as="button"
                    className="text-green-500 hover:text-green-700"
                  >
                    Edit
                  </Link>
                  <Link
                    href={route("project.destroy", project.id)}
                    method="delete"
                    as="button"
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination links={projects.meta.links} />
    </>
  );
}
