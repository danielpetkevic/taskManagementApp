import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

export default function TableHeading({
  name,
  sort_direction,
  sort_field,
  sortChanged,
  children,
  isSortable = true,
}) {
  return (
    <th onClick={(e) => sortChanged(name)} className="px-4 py-2">
      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
        {children}
        {isSortable && (
          <div>
            <ChevronUpIcon
              className={`w-4 h-4  ${sort_field === name && sort_direction === "asc" ? "text-cyan-100" : ""}`}
            />
            <ChevronDownIcon
              className={`w-4 h-4 -mt-2  ${sort_field === name && sort_direction === "desc" ? "text-cyan-100" : ""}`}
            />
          </div>
        )}
      </div>
    </th>
  );
}
