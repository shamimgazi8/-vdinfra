import React from 'react';

export function DistributionTableSkeleton() {
  const rows = 5;
  const columns = 10;

  return (
    <div className="rounded-md border border-gray-200 shadow-sm animate-pulse overflow-hidden">
      <table className="w-full table-fixed border-collapse">
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
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
