import {
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Hourglass,
  SearchCheck,
  CircleX,
  CircleAlert,
} from 'lucide-react';

export const statusMap: Record<
  string,
  { icon: React.ReactNode; colorClass: string }
> = {
  provisioning: { icon: <Hourglass className="w-4 h-4 text-green-500" />, colorClass: 'text-black' },
  active: { icon: <SearchCheck className="w-4 h-4 text-green-500" />, colorClass: 'text-black' },
  suspended: { icon: <CircleX className="w-4 h-4 text-red-500" />, colorClass: 'text-black' },
  inactive: { icon: <CircleAlert className="w-4 h-4 text-yellow-600" />, colorClass: 'text-black' },
};

export const priorityMap: Record<
  string,
  { icon: React.ReactNode; colorClass: string }
> = {
  low: { icon: <ArrowUp />, colorClass: 'text-black' },
  medium: { icon: <ArrowRight />, colorClass: 'text-black' },
  high: { icon: <ArrowDown />, colorClass: 'text-black' },
};
