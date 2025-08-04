'use client';

import { useState, useEffect } from 'react';
import { CirclePlus } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { MultiSelectPopover } from './MultiSelectPopover';
import { DateFilterPopover } from './DateFilterPopover';
import { SortButton } from './SortButton';
import { priorityMap, statusMap } from '@/lib/filtersMap';
import { ResetFilters } from './ResetButton';

const statusOptions = ['Provisioning', 'Active', 'Suspended', 'Inactive'];
const priorityOptions = ['Low', 'Medium', 'High'];

export const FilterDistributions = ({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  createdAt,
  setCreatedAt,
  setSort,
}: {
  search: string;
  setSearch: (val: string) => void;
  status: string[];
  setStatus: (val: string[]) => void;
  priority: string[];
  setPriority: (val: string[]) => void;
  createdAt: { from: string; to: string; startTime: string; endTime: string };
  setCreatedAt: (val: { from: string; to: string; startTime: string; endTime: string }) => void;
  setSort: (val: string) => void;
}) => {
  const [localSearch, setLocalSearch] = useState(search);
  const [statusSearch, setStatusSearch] = useState('');
  const [prioritySearch, setPrioritySearch] = useState('');
  const [toggleSort, setToggleSort] = useState('ASC');

  // Debounce search input (custom hook or npm package)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 600);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  // Keep localSearch in sync with external search
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Toggle status filter
  const toggleStatus = (value: string) => {
    const lowerVal = value.toLowerCase();
    setStatus(
      status.some((s) => s.toLowerCase() === lowerVal)
        ? status.filter((s) => s.toLowerCase() !== lowerVal)
        : [...status, value]
    );
  };

  // Toggle priority filter
  const togglePriority = (value: string) => {
    const lowerVal = value.toLowerCase();
    setPriority(
      priority.some((p) => p.toLowerCase() === lowerVal)
        ? priority.filter((p) => p.toLowerCase() !== lowerVal)
        : [...priority, value]
    );
  };

  const isFilterActive =
    localSearch !== '' ||
    status.length > 0 ||
    priority.length > 0 ||
    createdAt.from !== '' ||
    createdAt.to !== '';

  // Reset all filters
  const resetAllFilters = () => {
    setLocalSearch('');
    setStatus([]);
    setPriority([]);
    setCreatedAt({ from: '', to: '', startTime: '00:00 AM', endTime: '00:00 AM' });
  };

  return (
   <div className="md:sticky top-0 z-30 bg-white flex md:flex-row flex-col md:justify-between flex-wrap gap-2 items-start pb-5 pt-2">
      <div className="flex md:flex-row flex-col md:items-center gap-4 flex-wrap">
        <SearchInput value={localSearch} onChange={setLocalSearch} />

        <MultiSelectPopover
          icon={<CirclePlus className="mr-1" />}
          label="Status"
          search={statusSearch}
          setSearch={setStatusSearch}
          options={statusOptions}
          selected={status}
          toggleValue={toggleStatus}
          iconMap={statusMap}
        />

        <DateFilterPopover value={createdAt} onChange={setCreatedAt} />

        <MultiSelectPopover
          icon={<CirclePlus className="mr-1" />}
          label="Priority"
          search={prioritySearch}
          setSearch={setPrioritySearch}
          options={priorityOptions}
          selected={priority}
          toggleValue={togglePriority}
          iconMap={priorityMap}
        />

        {isFilterActive && <ResetFilters onReset={resetAllFilters} />}
      </div>

      <SortButton toggleSort={toggleSort} setToggleSort={setToggleSort} setSort={setSort} />
    </div>
  );
};
