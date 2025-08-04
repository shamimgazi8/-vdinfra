import {
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Hourglass,
  SearchCheck,
  CircleX,
  CircleAlert,
  CircleCheck,
} from 'lucide-react';

export const statusMap: Record<
  string,
  { icon: React.ReactNode; colorClass: string }
> = {
  provisioning: { icon: <Hourglass className="w-4 h-4 text-[#04A57D]" fill='#04A57D' />, colorClass: 'text-black' },
  active: { icon: <CircleCheck className="w-4 h-4 text-white" fill='#00B262' />, colorClass: 'text-black' },
  suspended: { icon: <CircleX className="w-4 h-4 text-white" fill='#EE382B' />, colorClass: 'text-black' },
  inactive: { icon: <CircleAlert className="w-4 h-4 text-white" fill='#FF6900' />, colorClass: 'text-black' },
};

export const priorityMap: Record<
  string,
  { icon: React.ReactNode; colorClass: string }
> = {
  low: { icon: <ArrowUp />, colorClass: 'text-black' },
  medium: { icon: <ArrowRight />, colorClass: 'text-black' },
  high: { icon: <ArrowDown />, colorClass: 'text-black' },
};
