import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  onRowsPerPageChange: (rows: number) => void;
  onPageChange: (page: number) => void;
  rowsPerPageOptions?: number[];
}

export function Pagination({
  totalRows,
  rowsPerPage,
  currentPage,
  onRowsPerPageChange,
  onPageChange,
  rowsPerPageOptions = [5, 10, 20, 50],
}: PaginationProps) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="flex items-center justify-between py-[6px] text-sm text-gray-700 mt-2">
      {/* Selected Rows Info */}
      <div>
        {`0 of ${totalRows} row(s) selected.`}
      </div>

 

      {/* Pagination Controls */}
      <div className="flex items-center gap-2 whitespace-nowrap">
             {/* Rows per page */}
      <div className="flex items-center gap-2 mr-5">
        <label htmlFor="rowsPerPage" className="whitespace-nowrap">
          Rows per page
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
        >
          {rowsPerPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-1 disabled:text-gray-300 hover:text-indigo-600 border rounded-md"
          aria-label="First Page"
        >
        <ChevronsLeft />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 disabled:text-gray-300 hover:text-indigo-600 border rounded-md"
          aria-label="Previous Page"
        >
         <ChevronLeft />
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 disabled:text-gray-300 hover:text-indigo-600 border rounded-md"
          aria-label="Next Page"
        >
     <ChevronRight />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1 disabled:text-gray-300 hover:text-indigo-600 border rounded-md"
          aria-label="Last Page"
        >
      <ChevronsRight />
        </button>
      </div>
    </div>
  );
}
