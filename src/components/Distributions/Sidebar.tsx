

import Link from 'next/link';
import {
  SquareTerminal,
  BarChart2,
  Table,
  RefreshCcw,
  BadgeAlert,
  Shield,
  HelpCircle,
  ChevronLeft,
} from 'lucide-react';



const sidebarLinks = [
  {
    category: 'General',
    items: [
      { name: 'Distributions', href: '/distributions', icon: Table },
      { name: 'Statistics', href: '/statistics', icon: BarChart2 },
      { name: 'Prefetch', href: '/prefetch', icon: RefreshCcw },
      { name: 'Purge', href: '/purge', icon: BadgeAlert },
      { name: 'Certificate', href: '/certificate', icon: Shield },
    ],
  },
];

const helpLinks = [
  { name: 'Support', icon: HelpCircle },
  { name: 'Feedback', icon: SquareTerminal },
];

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 flex-col  bg-white p-4 lg:flex">
      <div className="flex items-center gap-2 p-2 mb-6 justify-between">
 
        <span className="font-bold text-lg text-gray-800 flex justify-center items-center gap-2"> <ChevronLeft  />CDN</span>
        <div className="h-8 w-8 rounded-full bg-red-500"></div>
      </div>

      <nav className="flex-1">
        {sidebarLinks.map((section, index) => (
          <div key={index} className="mb-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-500">
              {section.category}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 rounded-md p-2 transition-colors
                      hover:bg-gray-100 text-gray-700
                      ${item.name === 'Distributions' ? 'bg-gray-100 font-semibold' : ''}
                    `}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-auto  pt-4 ">
        <ul className="space-y-1 flex gap-2 justify-center items-center">
          {helpLinks.map((item) => (
            <li key={item.name}>
              <button
                className="flex w-full items-center gap-3 rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}