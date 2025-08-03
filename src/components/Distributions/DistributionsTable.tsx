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
import {
  BrushCleaning,
  ChartNetwork,
  CircleAlert,
  CircleX,
  Hourglass,
  MoreVertical,
  SearchCheck,
  Settings,
  ShieldAlert,
  Trash,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<Distribution>[] = [
  {
    accessorKey: 'name',
    header: 'Label',
    size: 210,
  },
  {
    accessorKey: 'cname',
    header: 'Domain',
    size: 180,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 150,
    cell: ({ row }) => {
      const status = (row.getValue('status') as string)?.toLowerCase();

      const statusMap: Record<
        string,
        { icon?: React.ReactNode; colorClass: string }
      > = {
        provisioning: {
          icon: <Hourglass className="w-4 h-4 text-green-500" />,
          colorClass: 'text-black',
        },
        active: {
          icon: <SearchCheck className="w-4 h-4 text-green-500" />,
          colorClass: 'text-black',
        },
        suspended: {
          icon: <CircleX className="w-4 h-4 text-red-500" />,
          colorClass: 'text-black',
        },
        inactive: {
          icon: <CircleAlert className="w-4 h-4 text-yellow-600" />,
          colorClass: 'text-black',
        },
      };

      const { icon, colorClass } = statusMap[status] ?? {
        colorClass: 'text-gray-500',
      };

      return (
        <div className="inline-flex items-center gap-2 capitalize p-1 border rounded-md max-w-max">
          <span
            className={`h-3 w-3 rounded-full ${colorClass} flex items-center justify-center`}
          >
            {icon}
          </span>
          <span className={colorClass}>{status ?? 'unknown'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Date Modified',
    size: 100,
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'));
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    },
  },
  {
    accessorKey: 'time',
    id: 'time',
    header: 'Time',
    size: 100,
    cell: ({ row }) => {
      const date = new Date(row.original.updated_at);
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    },
  },
  {
    accessorKey: 'action',
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    size: 10,
    cell: ({ row }) => {
      const distribution = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-0.5 hover:bg-transparent focus:outline-none focus:ring-0 rounded">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] p-1">
            <span className=' font-semibold pl-2 '>Actions</span>
            <DropdownMenuItem className='pb-2 mb-2 border-b-[1px]' onClick={() => console.log('View', distribution)}>
              <ChartNetwork />View Analytics
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Edit', distribution)}>
              <BrushCleaning />Purge
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Edit', distribution)}>
              <Settings />Manage
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Edit', distribution)}>
              <ShieldAlert />Disable
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log('Delete', distribution)}
              className="text-red-600 pt-2 mt-2 border-t-[1px]"
            >
             <Trash className=' text-red-600' /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DistributionTable({
  search,
  status,
  priority,
  createdAt,
  currentPage,
  rowsPerPage,
  sort,
}: {
  search: string;
  status: string[]; 
  priority: string[];
  createdAt: string;
  currentPage: number;
  rowsPerPage: number;
  sort: string;
}) {
  const statusFilter = status.length ? status.map((s) => s.toLowerCase()) : undefined;
  const priorityFilter = priority.length ? priority.map((p) => p.toLowerCase()) : undefined;

  const { data = [], isLoading, isError } = useDistributions({
    page: currentPage,
    limit: rowsPerPage,
    sort,
    filter: {
      cname: search || undefined,
      status: statusFilter,
      priority: priorityFilter,
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
    return (
      <div className="p-6 text-center text-muted-foreground">
        <DistributionTableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load distributions.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <div className="min-w-[800px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
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
                <TableRow key={row.id} className="hover:bg-transparent">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-2 px-3"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
    </div>
  );
}
