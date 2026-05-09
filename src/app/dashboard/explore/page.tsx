'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Clock, Briefcase, Filter, ArrowRight, Star } from 'lucide-react';
import { Project } from '@/types';
import { mockService } from '@/services/mockService';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ExplorePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await mockService.getProjects();
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Explore Projects</h1>
          <p className="text-slate-400 mt-2">Discover startups building the future and find your next collaboration.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search by role or tech stack..."
              className="pl-10 h-10 bg-white/5 border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-10 border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-white/5 bg-white/[0.02]">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col group">
              <CardContent className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600/20 rounded flex items-center justify-center">
                      <Briefcase className="w-3 h-3 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">Solaris AI</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-blue-500">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>

                <h3 className="text-lg font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-1">{project.title}</h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-500 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

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
                      View Details <ArrowRight className="ml-1 w-4 h-4" />
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
