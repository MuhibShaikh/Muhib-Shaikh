'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { isDemoMode } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen bg-black">
        <aside className="w-64 border-r border-white/5 p-6 space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-2 pt-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </aside>
        <main className="flex-1 p-8">
          <Skeleton className="h-12 w-1/4 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </main>
      </div>
    );
  }

  if (!user && !isDemoMode) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        {isDemoMode && <DemoBanner />}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
