import React from 'react';
import { columns } from '../Distributions/DistributionsTable';

export function DistributionTableSkeleton() {
  const skeletonRows = 5; // number of rows to show

  return (
    <div className="rounded-md border border-gray-200 shadow-sm animate-pulse p-[-24px]">
      <table className="w-full table-fixed border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column,i) => (
              <th
                key={i }
                className="border-b border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide"
              >
                {/* Show header text as placeholder */}
                {typeof column.header === 'string' ? column.header : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              {columns.map((col,i) => (
                <td
                  key={i}
                  className="px-4 py-3"
                >
                  {/* Skeleton block */}
                  <div className="h-4 w-full rounded bg-gray-300"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
