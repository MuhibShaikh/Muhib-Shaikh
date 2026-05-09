'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TimelineUpdate } from '@/types';
import { mockService } from '@/services/mockService';
import { Rocket, Trophy, Zap, Image as ImageIcon, Users, Plus, Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function MyStartupPage() {
  const [updates, setUpdates] = useState<TimelineUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      const data = await mockService.getTimelineUpdates('startup-1');
      setUpdates(data);
      setLoading(false);
    };
    fetchUpdates();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'product_update': return <Zap className="w-4 h-4 text-blue-500" />;
      case 'win': return <Check className="w-4 h-4 text-green-500" />;
      case 'screenshot': return <ImageIcon className="w-4 h-4 text-purple-500" />;
      case 'team_update': return <Users className="w-4 h-4 text-blue-400" />;
      default: return <Rocket className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">NexGen AI</h1>
              <p className="text-slate-400">Decentralized Cloud Computing Infrastructure</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-slate-500">
            <span>CleanTech</span>
            <span>•</span>
            <span>MVP Stage</span>
            <span>•</span>
            <span>1,200 followers</span>
          </div>
        </div>
        <Button variant="cyber" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Post Update
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-12 relative">
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-white/5" />

        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="relative pl-16">
              <Skeleton className="h-40 w-full" />
            </div>
          ))
        ) : (
          updates.map((update) => (
            <div key={update.id} className="relative pl-16">
              <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-black border-2 border-blue-600/50 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>

              <Card className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                <CardHeader className="pb-3 flex flex-row items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(update.type)}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{update.type.replace('_', ' ')}</span>
                    </div>
                    <CardTitle className="text-xl font-bold">{update.title}</CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      {new Date(update.created_at).toLocaleDateString(undefined, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">
                    {update.content}
                  </p>
                  {update.type === 'screenshot' && (
                    <div className="mt-6 aspect-video rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center italic text-xs text-slate-600">
                      Attachment: Preview Image
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
