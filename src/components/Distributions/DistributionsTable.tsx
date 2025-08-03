'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
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
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useDistributionMeta } from '@/hooks/useDistributionMeta';

export const columns: ColumnDef<Distribution>[] = [
  {
    accessorKey: 'name',
    header: 'Label',
    size: 210,
    enableSorting: false,
  },
  {
    accessorKey: 'cname',
    header: 'Domain',
    size: 180,
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 150,
    enableSorting: false,
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
        <div className="inline-flex items-center gap-2 capitalize p-1 border rounded-md max-w-max">
          <span className={`h-3 w-3 rounded-full ${colorClass} flex items-center justify-center`}>{icon}</span>
          <span className={colorClass}>{status ?? 'unknown'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Date Modified',
    size: 100,
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
    cell: ({ row }) => {
      const distribution = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-0.5 hover:bg-transparent focus:outline-none focus:ring-0 rounded">
              <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] p-1">
            <span className="font-semibold pl-2">Actions</span>
            <DropdownMenuItem className="pb-2 mb-2 border-b-[1px]" onClick={() => console.log('View', distribution)}>
              <ChartNetwork /> View Analytics
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Purge', distribution)}>
              <BrushCleaning /> Purge
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Manage', distribution)}>
              <Settings /> Manage
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Disable', distribution)}>
              <ShieldAlert /> Disable
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Delete', distribution)} className="text-red-600 pt-2 mt-2 border-t-[1px]">
              <Trash className="text-red-600" /> Delete
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
  setSort,
  setTotalPages,
}: {
  search: string;
  status: string[];
  priority: string[];
  createdAt: { from: string; to: string; startTime: string; endTime: string }; // <-- updated
  currentPage: number;
  rowsPerPage: number;
  sort: string;
  setSort: (value: string) => void;
  setTotalPages: (value: number) => void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const statusFilter = status.length ? status.map((s) => s.toLowerCase()) : undefined;
  const priorityFilter = priority.length ? priority.map((p) => p.toLowerCase()) : undefined;

  const params = React.useMemo(
    () => ({
      page: currentPage,
      limit: rowsPerPage,
      sort,
      filter: {
        cname: search || undefined,
        status: statusFilter,
        priority: priorityFilter,
        created_at_from: createdAt.from || undefined,
        created_at_to: createdAt.to || undefined,
      },
    }),
    [currentPage, rowsPerPage, sort, search, statusFilter, priorityFilter, createdAt]
  );

  const { data = [], isLoading, isError } = useDistributions(params);
  const { data: meta } = useDistributionMeta(params);

  React.useEffect(() => {
    if (typeof meta?.totalPages === 'number') {
      setTotalPages(meta.totalPages);
    }
  }, [meta, setTotalPages]);

  React.useEffect(() => {
    if (sorting.length > 0) {
      setSort(sorting[0]?.id || '');
    }
  }, [sorting, setSort]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <DistributionTableSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 text-center text-red-500">Failed to load distributions.</div>;
  }

  return (
    <div className="w-full rounded-md border">
      {/* Desktop Table */}
      <div className="hidden md:block w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ width: header.getSize() }}
                      className={`cursor-pointer select-none text-black/70 pl-3 ${
                        header.column.getCanSort() ? 'hover:text-black' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <>
                            {header.column.getIsSorted() === 'asc' && <ArrowUp className="w-4 h-4" />}
                            {header.column.getIsSorted() === 'desc' && <ArrowDown className="w-4 h-4" />}
                            {!header.column.getIsSorted() && <ChevronsUpDown className="w-4 h-4" />}
                          </>
                        )}
                      </div>
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
                      <TableCell key={cell.id} className="py-2 px-3" style={{ width: cell.column.getSize() }}>
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
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full overflow-x-hidden">
        <div className="flex flex-col items-start ml-2 gap-4 py-2">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="w-[300px] max-w-full p-2 flex flex-col gap-4 border rounded-md bg-white shadow-sm box-border"
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="flex justify-between text-xs whitespace-nowrap overflow-hidden">
                    <span className="text-gray-500 font-medium capitalize">
                      {typeof cell.column.columnDef.header === 'string'
                        ? cell.column.columnDef.header
                        : cell.column.id}
                    </span>
                    <span className="text-gray-800 text-right max-w-[60%] truncate">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500 text-center py-6">No results found!</div>
          )}
        </div>
      </div>
    </div>
  );
}
