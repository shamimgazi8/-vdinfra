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
import { useDistributions } from '@/hooks/useDistributions';
import { Distribution } from '@/types';
import { DistributionTableSkeleton } from '../ui/Skelton';
import { CircleAlert, CircleX, Hourglass, SearchCheck } from 'lucide-react';

export const columns: ColumnDef<Distribution>[] = [
  {
    accessorKey: 'name',
    header: 'Label',
  },
  {
    accessorKey: 'cname',
    header: 'Domain',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = (row.getValue('status') as string)?.toLowerCase();

      const statusMap: Record<string, { icon?: React.ReactNode; colorClass: string }> = {
        provisioning: { icon: <Hourglass className="w-4 h-4 text-green-500" />, colorClass: 'text-black' },
        active: { icon: <SearchCheck className="w-4 h-4 text-green-500" />, colorClass: 'text-black' },
        suspended: { icon: <CircleX className="w-4 h-4 text-red-500" />, colorClass: 'text-black' },
        inactive: { icon: <CircleAlert className="w-4 h-4 text-yellow-600" />, colorClass: 'text-black' },
      };

      const { icon, colorClass } = statusMap[status] ?? { colorClass: 'text-gray-500' };

      return (
        <div className={`inline-flex items-center gap-2 capitalize p-2 border rounded-md max-w-max`}>
          <span className={`h-3 w-3 rounded-full ${colorClass} flex items-center justify-center`}>
            {icon}
          </span>
          <span className={colorClass}>{status ?? 'unknown'}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'updated_at',
    header: 'Date Modified',
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'));
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    }
  },
  {
    id: 'time',
    header: 'Time',
    cell: ({ row }) => {
      const date = new Date(row.original.updated_at);
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    }
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: () => <div>{/* Add action menu here */}</div>,
  },
];

export function DistributionTable({
  search,
  status,
  priority,
  createdAt,
  currentPage ,
}: {
  search: string;
  status: string[];
  priority: string;
  createdAt: string;
  currentPage: number; 
}) {
  // Convert status array to comma-separated string or send array as is if API supports
  // Assuming API accepts comma-separated string for filtering multiple statuses
  const statusFilter = status.length ? status.map(s => s.toLowerCase()).join(',') : undefined;

  const { data = [], isLoading, isError } = useDistributions({
    page: currentPage,
    limit: 10,
    sort: '-created_at',
    filter: {
      cname: search || undefined,
      status: statusFilter,
      priority: priority || undefined,
      created_at_from: createdAt || undefined,
      created_at_to: createdAt || undefined,
    },
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">
      <DistributionTableSkeleton />
    </div>;
  }

  if (isError) {
    return <div className="p-6 text-center text-red-500">Failed to load distributions.</div>;
  }

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
                    : flexRender(header.column.columnDef.header, header.getContext())}
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
                No results found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
