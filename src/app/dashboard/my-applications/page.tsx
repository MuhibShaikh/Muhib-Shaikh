'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Clock, CheckCircle2, XCircle, Search, ExternalLink } from 'lucide-react';
import { Application } from '@/types';
import { mockService } from '@/services/mockService';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await mockService.getApplications();
      setApplications(data);
      setLoading(false);
    };
    fetchApplications();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="text-slate-400 mt-2">Track your progress joining ambitious startup teams.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))
        ) : applications.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
            <Rocket className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-6">You haven&apos;t applied to any projects yet.</p>
            <Link href="/dashboard/explore">
              <Button variant="cyber" className="bg-blue-600 hover:bg-blue-700">Explore Projects</Button>
            </Link>
          </div>
        ) : (
          applications.map((app) => (
            <Card key={app.id} className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                      <Rocket className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Senior Frontend Architect</h3>
                      <p className="text-sm text-slate-500">NexGen AI • Applied {new Date(app.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Status</div>
                      <div className={cn(
                        "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider",
                        app.status === 'pending' ? "text-amber-500" :
                        app.status === 'accepted' ? "text-green-500" : "text-red-500"
                      )}>
                        {app.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                        {app.status === 'accepted' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {app.status === 'rejected' && <XCircle className="w-3.5 h-3.5" />}
                        {app.status}
                      </div>
                    </div>

                    <Link href={`/dashboard/projects/${app.project_id}`}>
                      <Button variant="outline" className="h-10 border-white/10 bg-white/5 text-xs">
                        View Project <ExternalLink className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
