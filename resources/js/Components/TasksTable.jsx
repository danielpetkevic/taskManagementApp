import Pagination from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";


export default function TasksTable({
  tasks,
  queryParams,
  visibleProjectColumn = true,
  project = null,
  visibleCreatedByColumn = true,
  visibleCreateDateColumn = true,
  appearenceContext = "dashboard",
}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    const targetUrl = appearenceContext === "dashboard"
      ? route("dashboard")
      : appearenceContext === "project"
      ? route("project.show", project)
      : route("task.index");

    router.get(targetUrl, queryParams, {
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

    const targetUrl = appearenceContext === "dashboard"
      ? route("dashboard")
      : appearenceContext === "project"
      ? route("project.show", project)
      : route("task.index");

    router.get(targetUrl, queryParams, {
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
            {visibleProjectColumn && (
              <TableHeading
                name="project"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
              Project
            </TableHeading>)}
            <TableHeading
              name="name"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Task
            </TableHeading>
            <TableHeading
              name="status"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Status
            </TableHeading>
            {visibleCreateDateColumn && (
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
              Create Date
            </TableHeading>)}
            <TableHeading
              name="due_date"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Due Date
            </TableHeading>
            {visibleCreatedByColumn && (
              <TableHeading
                name="created_by"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
                isSortable={false}
            >
              Created By
            </TableHeading>)}
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
            {visibleProjectColumn && <th className="px-4 py-2"></th>}
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
            {visibleCreateDateColumn && <th className="px-4 py-2"></th>}
            <th className="px-4 py-2"></th>
            {visibleCreatedByColumn && <th className="px-4 py-2"></th>}
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.data.map((task) => (
            <tr key={task.id}>
              <td className="border px-4 py-2">{task.id}</td>
              <td className="border px-4 py-2">
                {task.image_path ? (
                  <img
                    src={task.image_path}
                    alt={task.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              {visibleProjectColumn && (
                <td className="border px-4 py-2">
                  {task.project ? (
                    <Link
                      href={route("project.show", task.project.id)}
                      className="cursor:pointer"
                    >
                    {task.project.name}
                  </Link>
                ) : (
                  <span className="text-gray-500">No project</span>
                )}
              </td>)}
              <td className="border px-4 py-2">
                <Link
                      href={route("task.show", task.id)}
                      className="cursor:pointer font-bold"
                    >
                    {task.name}
                  </Link>
              </td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${TASK_STATUS_CLASS_MAP[task.status]}`}
                >
                  {TASK_STATUS_TEXT_MAP[task.status]}
                </span>
              </td>
              {visibleCreateDateColumn && <td className="border px-4 py-2">{task.created_at}</td>}
              <td className="border px-4 py-2">{task.due_date}</td>
              {visibleCreatedByColumn && <td className="border px-4 py-2">{task.created_by.name}</td>}
              <td className="border px-4 py-2 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <Link
                    href={route("task.edit", task.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Edit
                  </Link>
                  <Link
                    href={route("task.destroy", task.id)}
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
      <Pagination links={tasks.meta.links} />
    </>
  );
}
