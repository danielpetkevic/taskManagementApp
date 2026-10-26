import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import TableHeading from '@/Components/TableHeading';
import { Link, router } from '@inertiajs/react';

export default function UserTable({ users, queryParams }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('user.index'), queryParams, {
            preserveScroll: true,
        });
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') {
            return;
        } else {
            searchFieldChanged(name, e.target.value);
        }
    };

    const sortChanged = (name) => {
        if (queryParams.sort_field === name) {
            queryParams.sort_direction =
                queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('user.index'), queryParams, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <table className="w-full table-auto">
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
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Name
                        </TableHeading>
                        <TableHeading
                            name="email"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Email
                        </TableHeading>
                        <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Created At
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
                        <th className="px-4 py-2">
                            <TextInput
                                className="w-full"
                                placeholder="Search by name..."
                                onBlur={(e) =>
                                    searchFieldChanged('name', e.target.value)
                                }
                                onKeyPress={(e) => onKeyPress('name', e)}
                                defaultValue={queryParams.name}
                            />
                        </th>
                        <th className="px-4 py-2">
                            <TextInput
                                className="w-full"
                                placeholder="Search by email..."
                                onBlur={(e) =>
                                    searchFieldChanged('email', e.target.value)
                                }
                                onKeyPress={(e) => onKeyPress('email', e)}
                                defaultValue={queryParams.email}
                            />
                        </th>
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map((user) => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 border">{user.id}</td>
                            <td className="px-4 py-2 border">
                                <Link
                                    href={route('user.show', user.id)}
                                    className="font-bold hover:underline"
                                >
                                    {user.name}
                                </Link>
                            </td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">
                                {user.created_at}
                            </td>
                            <td className="px-4 py-2 border whitespace-nowrap">
                                <div className="gap-4 flex items-center">
                                    <Link
                                        href={route('user.edit', user.id)}
                                        as="button"
                                        className="text-green-500 hover:text-green-700"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('user.destroy', user.id)}
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
            <Pagination links={users.meta.links} />
        </>
    );
}
