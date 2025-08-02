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
import { DropdownMenu } from '@/components/ui/dropdown-menu';
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

  // Map statuses to icon components or color classes
  const statusMap: Record<
    string,
    { icon?: React.ReactNode; colorClass: string }
  > = {
    provisioning: { icon: <Hourglass className="w-4 h-4 text-green-500" />, colorClass: 'text-black' },
    active: { icon: <SearchCheck className="w-4 h-4 text-green-500" />, colorClass: 'text-black' },
    suspended: { icon: <CircleX className="w-4 h-4 text-red-500" />, colorClass: 'text-black' },
    inactive: { icon: <CircleAlert className="w-4 h-4 text-yellow-600" />, colorClass: 'text-black' },
  };

  // Fallback if unknown status
  const { icon, colorClass } = statusMap[status] ?? { colorClass: 'text-gray-500' };

  return (
<div
  className={`inline-flex items-center gap-2 capitalize p-2 border rounded-md max-w-max`}
>
  {/* Colored dot */}
  <span className={`h-3 w-3 rounded-full ${colorClass} flex items-center justify-center`}>
    {icon ? icon : null}
  </span>
  {/* Status text with matching color */}
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
    month: 'short',  // May
    day: 'numeric',  // 11
    year: 'numeric'  // 2025
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
    cell: ( ) => {
      return (
        <DropdownMenu>

        </DropdownMenu>
      );
    },
  },
];


export function DistributionTable() {
    const params = React.useMemo(() => ({
    page: 1,
    limit: 10,
    sort: '-created_at',
  }), []);
  const {
    data = [],
    isLoading,
    isError,
  } = useDistributions(params);

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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
