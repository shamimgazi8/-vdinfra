'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

type FilterPreset =
  | 'all_time'
  | 'last_8h'
  | 'last_24h'
  | 'last_7d'
  | 'last_30d'
  | 'this_month'
  | 'custom';

export const DateFilterPopover = ({
  value,
  onChange,
}: {
  value?: { from?: string; to?: string; startTime?: string; endTime?: string };
  onChange: (val: { from: string; to: string; startTime: string; endTime: string }) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const from = value?.from ? new Date(value.from) : undefined;
    const to = value?.to ? new Date(value.to) : undefined;
    if (from || to) {
      return { from, to };
    }
    return undefined;
  });
  const [startTime, setStartTime] = useState(value?.startTime ?? '00:00 AM');
  const [endTime, setEndTime] = useState(value?.endTime ?? '00:00 AM');
  const [selectedPreset, setSelectedPreset] = useState<FilterPreset>('custom');

  useEffect(() => {
    if (!value?.from && !value?.to) {
      setDateRange(undefined);
      setStartTime('00:00 AM');
      setEndTime('00:00 AM');
      setSelectedPreset('custom');
    }
  }, [value]);

  const filterPresets = [
    { label: 'All Time', value: 'all_time' },
    { label: 'Last 8 Hours', value: 'last_8h' },
    { label: 'Last 24 Hours', value: 'last_24h' },
    { label: 'Last 7 Days', value: 'last_7d' },
    { label: 'Last 30 Days', value: 'last_30d' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Custom Date Range', value: 'custom' },
  ];

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleApplyFilter = () => {
    if (dateRange?.from && dateRange?.to) {
      onChange({
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        startTime,
        endTime,
      });
      setOpen(false);
    }
  };

  const handleClearFilter = () => {
    setDateRange(undefined);
    setStartTime('00:00 AM');
    setEndTime('00:00 AM');
    onChange({ from: '', to: '', startTime: '00:00 AM', endTime: '00:00 AM' });
    setOpen(false);
  };

  const setCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    setEndTime(formattedTime);
  };

  const formatDateRange = () => {
    if (!dateRange?.from && !dateRange?.to) {
      return 'Created At';
    }
    const fromFormatted = dateRange.from ? format(dateRange.from, 'MMM d, yyyy') : '';
    const toFormatted = dateRange.to ? format(dateRange.to, 'MMM d, yyyy') : '';

    if (fromFormatted && toFormatted) {
      return `${fromFormatted} - ${toFormatted}`;
    }
    if (fromFormatted) {
      return `${fromFormatted}`;
    }
    return 'Created At';
  };

  const formatTimeRange = () => {
    if (startTime !== '00:00 AM' || endTime !== '00:00 AM') {
      return `${startTime} - ${endTime}`;
    }
    return 'All Day';
  };

  const getButtonText = () => {
    const dateText = formatDateRange();
    const timeText = formatTimeRange();

    if (dateText === 'Created At' && timeText === 'All Day') {
      return 'Created At';
    }
    if (dateRange?.from) {
      return `${dateText} | ${timeText}`;
    }
    return dateText;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('bg-white text-black border hover:bg-black hover:text-white border-dashed')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {getButtonText()}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[800px] scale-[0.9] p-0" align="start">
        <div className="flex">
          {/* Left Panel */}
          <div className="flex w-64 flex-col p-4 border-r">
            {filterPresets.map((preset) => (
              <Button
                key={preset.value}
                variant="ghost"
                onClick={() => setSelectedPreset(preset.value as FilterPreset)}
                className={cn('justify-start mb-2', selectedPreset === preset.value && 'bg-gray-100 font-semibold')}
              >
                {preset.label}
              </Button>
            ))}
          </div>

          {/* Calendar & Time */}
          <div className="flex-1 p-4">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              defaultMonth={dateRange?.from || new Date()}
              classNames={{
                month: 'space-y-4',
                head_row: 'flex justify-around',
                head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                row: 'flex w-full mt-2',
                cell: cn(
                  'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md',
                  dateRange?.from && dateRange?.to && 'day-range-start day-range-end'
                ),
                day: cn('h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-black', 'hover:bg-gray-200'),
                day_range_start: 'rounded-l-md bg-[#16A34A] text-white hover:bg-[#16A34A] hover:text-white',
                day_range_end: 'rounded-r-md bg-[#16A34A] text-white hover:bg-[#16A34A] hover:text-white',
                day_selected: 'rounded-md bg-[#16A34A] text-white hover:bg-[#16A34A] hover:text-white',
                day_range_middle: 'rounded-none bg-[#D1FAE5] text-black hover:bg-[#D1FAE5]',
                day_today: 'bg-gray-200 text-gray-900',
              }}
            />

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1 mr-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <Input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mt-1"
                    placeholder="e.g. 08:00 AM"
                  />
                </div>
                <div className="flex-1 ml-2">
                  <label className="text-sm font-medium flex justify-between">
                    End Time
                    <span className="text-sm font-medium text-[#16A34A] ml-4 cursor-pointer pb-1" onClick={setCurrentTime}>
                      Current Time
                    </span>
                  </label>
                  <Input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mt-1"
                    placeholder="e.g. 05:00 PM"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button variant="outline" onClick={handleClearFilter}>
                  Clear Filter
                </Button>
                <Button className="bg-[#04A57D] hover:bg-[#04A57D]/90 text-white" onClick={handleApplyFilter}>
                  Apply Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
