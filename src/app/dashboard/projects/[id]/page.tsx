'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Rocket, MapPin, Clock, Users, ArrowLeft, Send, Link as LinkIcon } from 'lucide-react';
import { Project } from '@/types';
import { mockService } from '@/services/mockService';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [application, setApplication] = useState({
    short_app: '',
    portfolio_links: '',
    fit_explanation: ''
  });

  useEffect(() => {
    const fetchProject = async () => {
      const data = await mockService.getProjectById(id as string);
      setProject(data);
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Application submitted successfully!');
    setIsApplying(false);
    router.push('/dashboard/explore');
  };

  if (loading) return <div className="p-8 max-w-4xl mx-auto"><Skeleton className="h-96 w-full" /></div>;
  if (!project) return <div className="p-8 text-center">Project not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <Button variant="ghost" onClick={() => router.back()} className="text-slate-500 hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explore
      </Button>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Rocket className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Solaris AI</span>
            </div>
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {project.location_type}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {project.commitment_level} Commitment
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" /> {project.applicant_count} Applicants
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-bold mb-4">About the project</h3>
            <p className="text-slate-400 leading-relaxed">
              {project.description}
            </p>
            <h3 className="text-xl font-bold mt-8 mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {project.required_skills.map(skill => (
                <span key={skill} className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-500 text-xs font-medium border border-blue-600/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 shrink-0">
          <Card className="border-white/10 bg-white/5 sticky top-24">
            <CardHeader>
              <CardTitle>Apply for Role</CardTitle>
              <CardDescription>Share your interest and experience with the startup team.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Short Bio / Pitch</label>
                  <Input
                    placeholder="Briefly describe yourself..."
                    required
                    value={application.short_app}
                    onChange={e => setApplication({...application, short_app: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Portfolio / Links</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <Input
                      placeholder="https://github.com/..."
                      className="pl-10"
                      value={application.portfolio_links}
                      onChange={e => setApplication({...application, portfolio_links: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Why are you a good fit?</label>
                  <Textarea
                    placeholder="Tell us about your interest in this startup..."
                    className="min-h-[100px]"
                    required
                    value={application.fit_explanation}
                    onChange={e => setApplication({...application, fit_explanation: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isApplying}>
                  {isApplying ? "Submitting..." : "Submit Application"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
