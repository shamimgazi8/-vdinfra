
import { Input } from '@/components/ui/input';
import { DistributionTable } from '@/components/Distributions/DistributionsTable';
import { Sidebar } from '@/components/Distributions/Sidebar';
import { Header } from '@/components/Distributions/TopNav';

export default function HomePage() {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1 border rounded-2xl m-1 ">
        <Header />
        <main className="p-[2px] flex-1 overflow-y-auto rounded-3xl bg-gray-100 border-[1px] m-4 ">
          <div className="flex items-center justify-between my-3">
            <div className=' pl-6'>
              <h1 className="text-2xl font-bold">Distributions</h1>
              <p className="text-sm text-gray-500">
                Recently created CDN distribution from this organization.
              </p>
            </div>
     
          </div>
          <div className=' bg-white p-5 rounded-lg shadow-md mb-6'>

          <div className="flex items-center gap-4 mb-4">
            <Input placeholder="Search titles..." />
          </div>

          <DistributionTable />
          </div>
        </main>
      </div>
    </div>
  );
}