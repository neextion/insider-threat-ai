
"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Column<T> = {
  accessor: keyof T;
  header: string;
  cell?: (value: T[keyof T]) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
};

export const DataTable = <T extends { id: string | number }>({ columns, data, onRowClick }: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    if (sortConfig.direction === 'ascending') {
      return <ChevronUp className="inline ml-2 h-4 w-4" />;
    }
    return <ChevronDown className="inline ml-2 h-4 w-4" />;
  };

  return (
    <div className="overflow-x-auto bg-primary rounded-lg shadow-md">
      <table className="w-full text-left">
        <thead className="border-b border-secondary">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor as string}
                className="p-4 cursor-pointer hover:bg-secondary"
                onClick={() => requestSort(column.accessor)}
              >
                {column.header}
                {getSortIcon(column.accessor)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className={`border-b border-secondary ${onRowClick ? 'cursor-pointer hover:bg-secondary' : ''}`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column) => (
                <td key={column.accessor as string} className="p-4">
                  {column.cell ? column.cell(row[column.accessor]) : String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
