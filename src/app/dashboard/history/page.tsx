'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockService } from '@/services/mockService';
import { Analysis } from '@/types';
import { Search, Link as LinkIcon, MessageSquare, Code, ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyses = async () => {
      const data = await mockService.getAnalyses();
      setAnalyses(data);
      setLoading(false);
    };
    fetchAnalyses();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'url': return <LinkIcon className="w-4 h-4" />;
      case 'prompt': return <MessageSquare className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-amber-500';
      case 'high': return 'text-orange-500';
      case 'critical': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analysis History</h1>
        <p className="text-slate-400 mt-2">View and manage your previous security scans.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-4 text-xs font-bold uppercase text-slate-500">Analysis</th>
                  <th className="p-4 text-xs font-bold uppercase text-slate-500">Type</th>
                  <th className="p-4 text-xs font-bold uppercase text-slate-500">Threat Level</th>
                  <th className="p-4 text-xs font-bold uppercase text-slate-500">Score</th>
                  <th className="p-4 text-xs font-bold uppercase text-slate-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="p-4"><Skeleton className="h-4 w-48" /></td>
                      <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                      <td className="p-4"><Skeleton className="h-4 w-8" /></td>
                      <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                    </tr>
                  ))
                ) : (
                  analyses.map((analysis) => (
                    <tr key={analysis.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer group">
                      <td className="p-4">
                        <div className="font-medium text-sm group-hover:text-blue-400 transition-colors">{analysis.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{analysis.content}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          {getIcon(analysis.type)}
                          <span className="capitalize">{analysis.type}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={cn("flex items-center gap-2 text-xs font-bold", getThreatColor(analysis.threat_level))}>
                          {analysis.threat_level === 'low' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                          {analysis.threat_level.toUpperCase()}
                        </div>
                      </td>
                      <td className="p-4 font-mono text-sm">{analysis.risk_score}</td>
                      <td className="p-4 text-xs text-slate-500">
                        {new Date(analysis.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
