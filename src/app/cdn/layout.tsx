// app/dashboard/layout.tsx
'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 border rounded-2xl m-1">
        <Header />
        <main className="p-[2px] flex-1 overflow-y-auto rounded-3xl bg-gray-100 border-[1px] m-4 mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
