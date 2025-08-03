'use client';

import { useMemo, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, CalendarSearch, CirclePlus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDebounce } from '@/hooks/useDebouncee';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Hourglass,
  SearchCheck,
  CircleX,
  CircleAlert,
} from 'lucide-react';

const statusOptions = ['Provisioning', 'Active', 'Suspended', 'Inactive'];

const statusMap: Record<string, { icon: React.ReactNode; colorClass: string }> = {
  provisioning: { icon: <Hourglass className="w-4 h-4 text-green-500" />, colorClass: 'text-black' },
  active: { icon: <SearchCheck className="w-4 h-4 text-green-500" />, colorClass: 'text-black' },
  suspended: { icon: <CircleX className="w-4 h-4 text-red-500" />, colorClass: 'text-black' },
  inactive: { icon: <CircleAlert className="w-4 h-4 text-yellow-600" />, colorClass: 'text-black' },
};

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
  priority: string;
  setPriority: (val: string) => void;
  createdAt: string;
  setCreatedAt: (val: string) => void;
  setSort:(val:string)=> void
}) => {
  const [localSearch, setLocalSearch] = useState(search);
  const [statusSearch, setStatusSearch] = useState('');
  const debouncedSearch = useDebounce(localSearch, 600);
  const [toggleSort,setToggleSort]= useState('ASC')


  
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const filteredStatuses = useMemo(() => {
    return statusOptions.filter((s) =>
      s.toLowerCase().includes(statusSearch.toLowerCase())
    );
  }, [statusSearch]);

  const filteredPriorities = useMemo(() => {
    return ['Low', 'Medium', 'High'].filter((p) =>
      p.toLowerCase().includes(priority.toLowerCase())
    );
  }, [priority]);

  // Toggle status in array
  const toggleStatus = (value: string) => {
    const lowerVal = value.toLowerCase();
    if (status.some(s => s.toLowerCase() === lowerVal)) {
      setStatus(status.filter(s => s.toLowerCase() !== lowerVal));
    } else {
      setStatus([...status, value]);
    }
  };

  return (
    <div className=' flex justify-between'>
      <div className="flex items-center gap-4 mb-4">
        <Input
          className="w-[200px]"
          placeholder="Search titles..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        {/* Status Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-white text-black border hover:bg-black hover:text-white"
            >
              <CirclePlus className="mr-1" />
              Status
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <Input
              placeholder="Search status..."
              className="mb-2"
              value={statusSearch}
              onChange={(e) => setStatusSearch(e.target.value)}
            />
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
              {filteredStatuses.map((s) => {
                const key = s.toLowerCase();
                const { icon, colorClass } = statusMap[key] ?? {
                  icon: null,
                  colorClass: 'text-gray-500',
                };
                const isSelected = status.some(st => st.toLowerCase() === key);

                return (
                  <Button
                    key={s}
                    variant="ghost"
                    className="flex items-center gap-2 justify-start"
                    onClick={() => toggleStatus(s)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        checked ? setStatus([...status, s]) : setStatus(status.filter(st => st.toLowerCase() !== key))
                      }
                      className="pointer-events-auto"
                    />
                    <span className={`flex items-center gap-1 capitalize ${colorClass}`}>
                      {icon}
                      {s}
                    </span>
                  </Button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>

        {/* Created At */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-white text-black border hover:bg-black hover:text-white"
            >
              <CalendarSearch className="mr-1" />
              Created At
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <Input
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </PopoverContent>
        </Popover>

        {/* Priority Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-white text-black border hover:bg-black hover:text-white"
            >
              <CirclePlus className="mr-1" />
              Priority
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <Input
              placeholder="Search priority..."
              className="mb-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
            <div className="flex flex-col gap-1">
              {filteredPriorities.map((p) => (
                <Button
                  key={p}
                  variant={p === priority ? 'default' : 'ghost'}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
         <Button
              variant="outline"
              className="bg-white text-black border hover:bg-black hover:text-white"
              onClick={()=>{
                const Sort=toggleSort==='ASC'? 'created_at':'-created_at' ;
                if(toggleSort==='ASC'){
                  setToggleSort('DSC')
                }else{
                  setToggleSort('ASC')
                }
                setSort(Sort)
              }}
            
            >
              <ArrowUpDown className="mr-1" />
              Sort
            </Button>
    </div>
  );
};
