'use client';

import { useState } from 'react';
import { TrendingUp, Rocket, Eye, ArrowUpRight, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

export default function WatchlistPage() {
  const [loading] = useState(false);

  const startups = [
    { name: 'NexGen AI', industry: 'Cloud Infra', stage: 'MVP', growth: '+24%', updates: 5 },
    { name: 'Solaris', industry: 'CleanTech', stage: 'Seed', growth: '+12%', updates: 3 },
    { name: 'Verity', industry: 'Trust & Safety', stage: 'Idea', growth: '+8%', updates: 2 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Investor Watchlist</h1>
          <p className="text-slate-400 mt-2">Observe startup growth and build-in-public timelines.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input placeholder="Search startups..." className="pl-10 h-10 bg-white/5 border-white/10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))
        ) : (
          startups.map((startup, i) => (
            <Card key={i} className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                      <Rocket className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{startup.name}</h3>
                      <p className="text-sm text-slate-500">{startup.industry} • {startup.stage} Stage</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Growth</div>
                      <div className="text-green-500 text-sm font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        {startup.growth}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Updates</div>
                      <div className="text-white text-sm font-bold">{startup.updates} this month</div>
                    </div>
                    <Button variant="outline" className="h-10 border-white/10 bg-white/5 text-xs">
                      <Eye className="w-4 h-4 mr-2" /> View Timeline
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card className="border-blue-600/20 bg-blue-600/5">
        <CardContent className="p-8 text-center space-y-4">
          <TrendingUp className="w-10 h-10 text-blue-500 mx-auto" />
          <h2 className="text-xl font-bold">Investor MVP Access</h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            As an investor, you can track the progress of startups on Sandbox.
            Full metrics and direct contact features are coming soon in the next release.
          </p>
          <Button variant="cyber" className="bg-blue-600 hover:bg-blue-700">Request Full Access</Button>
        </CardContent>
      </Card>
    </div>
  );
}
