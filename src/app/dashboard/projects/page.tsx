'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MoreVertical, Edit, Trash, Users, Eye } from 'lucide-react';
import { Project } from '@/types';
import { mockService } from '@/services/mockService';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function StartupProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await mockService.getProjects();
      // Filter for startup's own projects in a real app
      setProjects(data.filter(p => p.startup_id === 'startup-1'));
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <p className="text-slate-400 mt-2">Create and monitor your startup collaboration opportunities.</p>
        </div>
        <Button variant="cyber" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                        project.status === 'open' ? "bg-green-500/10 text-green-500" : "bg-slate-500/10 text-slate-500"
                      )}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-1 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {project.applicant_count} Applicants
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Edit className="w-3.5 h-3.5" />
                        Last updated {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Link href={`/dashboard/projects/${project.id}`} className="flex-1 md:flex-none">
                      <Button variant="outline" className="w-full md:w-auto h-10 border-white/10 bg-white/5">
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1 md:flex-none h-10 border-white/10 bg-white/5">
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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
