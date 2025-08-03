'use client';
import * as React from "react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebouncee";
import { CirclePlus } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { MultiSelectPopover } from "./MultiSelectPopover";
import { DateFilterPopover } from "./DateFilterPopover";
import { SortButton } from "./SortButton";

import { priorityMap, statusMap } from "@/lib/filtersMap";
import { ResetFilters } from "./ResetButton";

const statusOptions = ['Provisioning', 'Active', 'Suspended', 'Inactive'];
const priorityOptions = ['Low', 'Medium', 'High'];

type FilterValues = {
  from: string;
  to: string;
  startTime: string;
  endTime: string;
};
export const FilterDistributions = ({
  search, setSearch,
  status, setStatus,
  priority, setPriority,
  setSort,
  setCreatedAt,
  
}: {
  search: string;
  setSearch: (val: string) => void;
  status: string[];
  setStatus: (val: string[]) => void;
  priority: string[];
  setPriority: (val: string[]) => void;
  createdAt: string;
  setCreatedAt: (val: string) => void;
  setSort: (val: string) => void;
}) => {
  const [localSearch, setLocalSearch] = useState(search);
  const [statusSearch, setStatusSearch] = useState("");
  const [prioritySearch, setPrioritySearch] = useState("");
  const [toggleSort, setToggleSort] = useState("ASC");

  const debouncedSearch = useDebounce(localSearch, 600);

  useEffect(() => setSearch(debouncedSearch));
  useEffect(() => setLocalSearch(search), [search]);

  const toggleStatus = (value: string) => {
    const lowerVal = value.toLowerCase();
    setStatus(
      status.some((s) => s.toLowerCase() === lowerVal)
        ? status.filter((s) => s.toLowerCase() !== lowerVal)
        : [...status, value]
    );
  };

  const togglePriority = (value: string) => {
    const lowerVal = value.toLowerCase();
    setPriority(
      priority.some((p) => p.toLowerCase() === lowerVal)
        ? priority.filter((p) => p.toLowerCase() !== lowerVal)
        : [...priority, value]
    );
  };

  const [filter, setFilter] = React.useState<FilterValues>({
    from: "", 
    to: "",
    startTime: "00:00 AM",
    endTime: "00:00 AM",
  });

  const handleFilterChange = (newFilter: FilterValues) => {
    setFilter(newFilter);
  };

  // Check if any filter is active
  const isFilterActive =
    localSearch !== "" ||
    status.length > 0 ||
    priority.length > 0 ||
    filter.from !== "" ||
    filter.to !== "";

  // Reset all filters function
  const resetAllFilters = () => {
    setLocalSearch("");
    setStatus([]);
    setPriority([]);
    setFilter({
      from: "",
      to: "",
      startTime: "00:00 AM",
      endTime: "00:00 AM",
    });
    setCreatedAt(""); 
  };

  return (
    <div className="flex md:flex-row flex-col md:justify-between flex-wrap gap-2 items-start pb-5 pt-2">
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

        <DateFilterPopover
          value={filter}
          onChange={handleFilterChange}
        />

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