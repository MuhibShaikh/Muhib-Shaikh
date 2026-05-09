'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Briefcase, MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { Project } from '@/types';
import { mockService } from '@/services/mockService';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function SavedProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      const data = await mockService.getProjects();
      // Mock saved list: just take the first two
      setProjects(data.slice(0, 2));
      setLoading(false);
    };
    fetchSaved();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold">Saved Projects</h1>
        <p className="text-slate-400 mt-2">Projects you&apos;re watching for future collaboration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))
        ) : projects.length === 0 ? (
          <div className="col-span-2 text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
            <Star className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-6">No saved projects yet.</p>
            <Link href="/dashboard/explore">
              <Button variant="cyber" className="bg-blue-600 hover:bg-blue-700">Explore Projects</Button>
            </Link>
          </div>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col group">
              <CardContent className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600/20 rounded flex items-center justify-center">
                      <Briefcase className="w-3 h-3 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">Startup Name</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-500">
                    <Star className="w-4 h-4 fill-blue-500" />
                  </Button>
                </div>

                <h3 className="text-lg font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-1">{project.title}</h3>

                <div className="flex items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location_type}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.commitment_level} Comm.
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 mt-auto border-t border-white/5 pt-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-slate-500">{project.applicant_count} applicants</span>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-400 p-0 h-auto">
                      Apply Now <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
