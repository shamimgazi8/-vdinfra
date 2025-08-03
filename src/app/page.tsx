'use client';

import { useState } from 'react';
import { DistributionTable } from '@/components/Distributions/DistributionsTable';
import { Sidebar } from '@/components/Distributions/Sidebar';
import { Header } from '@/components/Distributions/Header';
import { FilterDistributions } from '@/components/Distributions/Filter';
import { Pagination } from '@/components/Distributions/Pagination';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string[]>([]); 
  const [priority, setPriority] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalRows = 68;
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1 border rounded-2xl m-1 ">
        <Header />
        <main className="p-[2px] flex-1 overflow-y-auto rounded-3xl bg-gray-100 border-[1px] m-4 mt-0 ">
          <div className="flex items-center justify-between my-3">
            <div className='pl-6'>
              <h1 className="text-2xl font-bold">Distributions</h1>
              <p className="text-sm text-gray-500">
                Recently created CDN distribution from this organization.
              </p>
            </div>
          </div>
          <div className='bg-white p-5 rounded-lg shadow-md mb-0'>
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
              setCurrentPage(1);   }}
               onPageChange={(page) => setCurrentPage(page)}
    />
          </div>
        </main>
      </div>
    </div>
  );
}
