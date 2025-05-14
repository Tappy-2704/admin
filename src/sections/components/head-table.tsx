import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type SortDirection = "asc" | "desc" | null;

interface Column {
  field: string;
  label: string;
  sort?: boolean;
}
interface TableHeaderProps {
  columns: Column[];
  onSort?: (field: string, direction: SortDirection) => void;
}

const TableHead: React.FC<TableHeaderProps> = ({ columns, onSort }) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSortClick = (field: string) => {
    let newDirection: SortDirection = null;

    if (sortField !== field) {
      newDirection = "asc";
    } else {
      if (sortDirection === "asc") newDirection = "desc";
      else if (sortDirection === "desc") newDirection = null;
      else newDirection = "asc";
    }

    setSortField(newDirection ? field : null);
    setSortDirection(newDirection);

    if (onSort) onSort(field, newDirection);
  };

  return (
    <thead className="text-primary-color font-semibold text-[13px] rounded-[8px] bg-white dark:bg-main-dark-color shadow-[2px_2px_10px_0px_rgba(15,41,156,0.16)]">
      <tr>
        {columns.map((column) => (
          <th
            key={column.field}
            className="relative px-6 py-3 text-center dark:text-white cursor-pointer"
            onClick={() => column.sort && handleSortClick(column.field)}
          >
            <div className="flex items-center justify-center gap-1">
              {column.label}
              {column.sort && (
                <span className="flex flex-col items-center text-[10px]">
                  <ChevronUp
                    className={`w-3 h-3 ${
                      sortField === column.field && sortDirection === "asc"
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
                  />
                  <ChevronDown
                    className={`w-3 h-3 -mt-1 ${
                      sortField === column.field && sortDirection === "desc"
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
                  />
                </span>
              )}
            </div>

            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[1px] h-8 opacity-20 bg-[#4E4E4E] dark:bg-white" />
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
