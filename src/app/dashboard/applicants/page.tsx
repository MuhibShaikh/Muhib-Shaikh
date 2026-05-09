'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Mail, ExternalLink, User, Search, Filter } from 'lucide-react';
import { Application } from '@/types';
import { mockService } from '@/services/mockService';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ApplicantsPage() {
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

  const handleAction = async (id: string, status: 'accepted' | 'rejected') => {
    toast.info(`Application ${status}`);
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Applicants</h1>
          <p className="text-slate-400 mt-2">Review students who want to join your startup journey.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 border-white/10 bg-white/5">
            <Filter className="w-4 h-4 mr-2" />
            All Statuses
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))
        ) : applications.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-2xl">
            <User className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No applications received yet.</p>
          </div>
        ) : (
          applications.map((app) => (
            <Card key={app.id} className="border-white/5 bg-white/[0.02] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-4">
                <div className="p-6 lg:border-r border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded bg-blue-600/20 flex items-center justify-center border border-blue-600/20">
                      <User className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Alex Student</h3>
                      <p className="text-xs text-slate-500">Applied for Senior Frontend</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Links</div>
                    {app.portfolio_links.map((link, i) => (
                      <a key={i} href="#" className="flex items-center gap-2 text-xs text-blue-500 hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        {link}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3 p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pitch</div>
                      <p className="text-sm text-slate-300 leading-relaxed italic">
                        &quot;{app.short_app}&quot;
                      </p>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      app.status === 'pending' ? "bg-amber-500/10 text-amber-500" :
                      app.status === 'accepted' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>
                      {app.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Why fit?</div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {app.fit_explanation}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex gap-3">
                    {app.status === 'pending' ? (
                      <>
                        <Button
                          onClick={() => handleAction(app.id, 'accepted')}
                          className="bg-green-600 hover:bg-green-700 text-xs h-9"
                        >
                          <Check className="w-4 h-4 mr-2" /> Accept
                        </Button>
                        <Button
                          onClick={() => handleAction(app.id, 'rejected')}
                          variant="outline"
                          className="border-red-500/50 text-red-500 hover:bg-red-500/10 text-xs h-9"
                        >
                          <X className="w-4 h-4 mr-2" /> Reject
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" className="h-9 text-xs border-white/10">
                        <Mail className="w-4 h-4 mr-2" /> Message Candidate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
