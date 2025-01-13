"use client";

import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { staticData } from './data'; // Import static data
import DataTableSearch, { FilterType } from './data-table-search';
import { BasicDataTable } from './basic-data-table';
import { columns } from './columns';

export function DataTable() {
  const [rowCount] = useState<number>(staticData.length); // Total rows from static data
  const [tableData, setTableData] = useState(staticData); // Use static data
  const [isLoading] = useState(false); // No loading state required for static data
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<FilterType[]>([]);

  // Filter static data locally
  const handleFiltersChange = (newFilters: FilterType[]) => {
    setFilters(newFilters);
    setPagination({ pageIndex: 0, pageSize }); // Reset pagination

    const filteredData = staticData.filter((item) => {
      return newFilters.every((filter) => {
        const value = item[filter.field as keyof typeof item];
        switch (filter.operator) {
          case 'contains':
            return String(value).toLowerCase().includes(filter.value.toLowerCase());
          case 'equals':
            return String(value).toLowerCase() === filter.value.toLowerCase();
          case 'startsWith':
            return String(value).toLowerCase().startsWith(filter.value.toLowerCase());
          case 'endsWith':
            return String(value).toLowerCase().endsWith(filter.value.toLowerCase());
          case 'before':
            return new Date(value as string) < new Date(filter.value);
          case 'after':
            return new Date(value as string) > new Date(filter.value);
          default:
            return true;
        }
      });
    });

    setTableData(filteredData);
  };

  const table = useReactTable({
    data: tableData.slice(
      pageIndex * pageSize,
      (pageIndex + 1) * pageSize
    ), // Paginate the filtered data
    columns,
    pageCount: Math.ceil(rowCount / pageSize),
    state: {
      pagination: { pageIndex, pageSize },
      globalFilter: filters,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  return (
    <div>
      <div className="border-b">
        <div className="container mx-auto">
          <div className="py-1 mt-1">
            <h1 className="text-3xl font-semibold">Report Table</h1>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2"></div>
              <div className="flex items-center space-x-2">
                <DataTableSearch onFiltersChange={handleFiltersChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10">
        <BasicDataTable table={table} isLoading={isLoading} showPagination={true} />
      </div>
    </div>
  );
}
