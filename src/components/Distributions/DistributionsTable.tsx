
'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Distribution, initialData } from '@/data/distributions';
import { DropdownMenu } from '@/components/ui/dropdown-menu'; // and other Shadcn components

export const columns: ColumnDef<Distribution>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'domain',
    header: 'Domain',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      // Use Tailwind to style the status indicators (dots)
      const status = row.getValue('status');
      const statusColor = {
        Provisioning: 'text-sky-500',
        Active: 'text-green-500',
        Suspended: 'text-red-500',
        Inactive: 'text-orange-500',
      }[status as string] || 'text-gray-500';

      return (
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${statusColor}`}></span>
          <span>{status as string}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'dateModified',
    header: 'Date Modified',
  },
  {
    accessorKey: 'time',
    header: 'Time',
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      // The actions dropdown menu
      return (
        <DropdownMenu>
          {/* Dropdown Menu Trigger and Content from Shadcn */}
          {/* ... */}
        </DropdownMenu>
      );
    },
  },
];

export function DistributionTable() {
  const [data, setData] = React.useState<Distribution[]>(initialData);
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}