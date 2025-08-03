import { Button } from '@/components/ui/button';
import { ChevronRight, PanelRightOpen, PanelRightClose } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-white p-4 px-6 rounded-4xl">
      <div className="flex items-center gap-4">
        <div
          onClick={onToggleSidebar}
          className="pr-4 border-r-[1px] cursor-pointer select-none"
          aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onToggleSidebar();
          }}
        >
          {sidebarOpen ? (
            <PanelRightClose size={20} className="text-gray-500" />
          ) : (
            <PanelRightOpen size={20} className="text-gray-500" />
          )}
        </div>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500">
          <ol className="inline-flex items-center space-x-2">
            <li>
              <a href="#" className="flex items-center hover:text-gray-700">
                Products
              </a>
            </li>
            <li>
              <ChevronRight className="h-3 w-3" />
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-gray-700">
                CDN
              </a>
            </li>
            <li>
              <ChevronRight className="h-3 w-3" />
            </li>
            <li aria-current="page">
              <span className="text-gray-900 font-semibold">Distributions</span>
            </li>
          </ol>
        </nav>
      </div>

      <Button variant="default" className="bg-[#04A57D] hover:bg-green-700 text-white">
        + Create Distribution
      </Button>
    </header>
  );
}
