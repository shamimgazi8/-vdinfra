
import { Button } from '@/components/ui/button';
import { ChevronRight, PanelRightOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between  bg-white p-4 px-6  rounded-4xl">
      <div className="flex items-center gap-4">

      <div className=' pr-4 border-r-[1px]'><PanelRightOpen /></div>

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
              <span className="text-gray-900 font-semibold">
                Distributions
              </span>
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