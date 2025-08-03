
'use client';

import { useState } from 'react';
import { DistributionTable } from '@/components/Distributions/DistributionsTable';
import { FilterDistributions } from '@/components/Distributions/Filter';
import { Pagination } from '@/components/layout/Pagination';

 function Distribution() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string[]>([]);
  const [priority, setPriority] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalRows = 68;

  return (
    <>
      <div className="flex items-center justify-between my-3">
        <div className="pl-6">
          <h1 className="text-2xl font-bold">Distributions</h1>
          <p className="text-sm text-gray-500">
            Recently created CDN distribution from this organization.
          </p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-md mb-0">
        <FilterDistributions
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          createdAt={createdAt}
          setCreatedAt={setCreatedAt}
        />

        <DistributionTable
          search={search}
          status={status}
          priority={priority}
          createdAt={createdAt}
          currentPage={currentPage}
        />

        <Pagination
          totalRows={totalRows}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onRowsPerPageChange={(val) => {
            setRowsPerPage(val);
            setCurrentPage(1);
          }}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
export default Distribution