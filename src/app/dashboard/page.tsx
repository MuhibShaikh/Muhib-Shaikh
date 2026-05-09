'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Users, Briefcase, TrendingUp, ArrowUpRight, Clock, MessageSquare, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { profile } = useAuth();

  const stats = profile?.role === 'startup' ? [
    { label: 'Active Projects', value: '4', icon: Briefcase, color: 'text-blue-500', trend: '+1' },
    { label: 'New Applicants', value: '18', icon: Users, color: 'text-purple-500', trend: '+5' },
    { label: 'Timeline Updates', value: '12', icon: History, color: 'text-green-500', trend: '+2' },
  ] : [
    { label: 'Open Projects', value: '42', icon: Rocket, color: 'text-blue-500', trend: '+8' },
    { label: 'My Applications', value: '6', icon: FileText, color: 'text-amber-500', trend: '0' },
    { label: 'Saved', value: '12', icon: History, color: 'text-green-500', trend: '+3' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name?.split(' ')[0]}</h1>
        <p className="text-slate-400 mt-2">Here is the latest from your startup ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="relative overflow-hidden group border-white/5 bg-white/[0.02]">
              <div className="absolute top-0 right-0 p-4">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-2 text-[10px] text-green-500 font-bold">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {stat.trend}
                  <span className="text-slate-600 ml-1">since last week</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-white/5 bg-white/[0.02]">
          <CardHeader>
            <CardTitle className="text-lg">Recent Timeline Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { startup: 'NexGen AI', title: 'Seed Round Closed', time: '2h ago', type: 'milestone' },
                { startup: 'Solaris', title: 'New Dashboard Live', time: '5h ago', type: 'product' },
                { startup: 'Verity', title: 'Welcome @sarah to the team', time: '1d ago', type: 'team' },
              ].map((update, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 cursor-pointer group">
                  <div className="w-10 h-10 rounded bg-blue-600/10 flex items-center justify-center border border-blue-600/20 group-hover:bg-blue-600/20 transition-all">
                    <Rocket className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-bold">{update.startup}</p>
                      <span className="text-[10px] text-slate-600 font-bold uppercase">{update.time}</span>
                    </div>
                    <p className="text-sm text-slate-400">{update.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/explore" className="block text-center mt-6 text-xs text-blue-500 hover:text-blue-400 font-bold uppercase tracking-wider">
              Explore all startups
            </Link>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-white/5 bg-white/[0.02]">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              <Link href={profile?.role === 'startup' ? "/dashboard/my-startup" : "/dashboard/explore"}>
                <Button className="w-full justify-start h-11 bg-white/5 hover:bg-white/10 border-white/10 text-sm font-medium" variant="outline">
                  <Rocket className="w-4 h-4 mr-3 text-blue-500" />
                  {profile?.role === 'startup' ? 'Manage Startup' : 'Find Projects'}
                </Button>
              </Link>
              <Link href="/dashboard/messages">
                <Button className="w-full justify-start h-11 bg-white/5 hover:bg-white/10 border-white/10 text-sm font-medium" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-3 text-purple-500" />
                  Messages
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button className="w-full justify-start h-11 bg-white/5 hover:bg-white/10 border-white/10 text-sm font-medium" variant="outline">
                  <Settings className="w-4 h-4 mr-3 text-slate-500" />
                  Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-blue-600/5">
            <CardContent className="p-6">
              <h4 className="font-bold text-sm mb-2">Build in Public</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Transparency builds trust. Start sharing your journey today to attract the best talent.
              </p>
              <Button size="sm" variant="cyber" className="w-full text-[10px] h-8 bg-blue-600 hover:bg-blue-700">
                Share an Update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { FileText, Settings } from 'lucide-react';
