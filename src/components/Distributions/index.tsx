'use client';

import { useState } from 'react';
import { DistributionTable } from '@/components/Distributions/DistributionsTable';
import { FilterDistributions } from '@/components/Distributions/Filters';
import { Pagination } from '@/components/layout/Pagination';

function Distribution() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string[]>([]);
  const [priority, setPriority] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState({ from: '', to: '', startTime: '00:00 AM', endTime: '00:00 AM' });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('-created_at');
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  return (
    <>
      <div className="flex items-center justify-between my-3">
        <div className="pl-6">
          <h1 className="md:text-2xl font-bold">Distributions</h1>
          <p className="md:text-sm text-[10px] text-gray-500">
            Recently created CDN distribution from this organization.
          </p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl mb-0">
        <FilterDistributions
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          createdAt={createdAt}
          setCreatedAt={setCreatedAt}
          setSort={setSort}
        />

        <DistributionTable
          search={search}
          status={status}
          priority={priority}
          createdAt={createdAt}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          sort={sort}
          setTotalPages={setTotalPages}
          setSort={setSort}
        />

        <Pagination
          totalRows={totalRows}
          totalPages={totalPages}
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

export default Distribution;
