'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Activity, ShieldCheck, ArrowUpRight, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total Analyses', value: '128', icon: Activity, color: 'text-blue-500', trend: '+12%' },
  { label: 'Threats Blocked', value: '42', icon: ShieldAlert, color: 'text-red-500', trend: '+5%' },
  { label: 'Secure Score', value: '98/100', icon: ShieldCheck, color: 'text-green-500', trend: '+2%' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Security Overview</h1>
        <p className="text-slate-400 mt-2">Welcome back. Here is what happened while you were away.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-2 text-xs text-green-500">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {stat.trend}
                  <span className="text-slate-500 ml-1">since last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Analysis Complete', desc: 'URL: malicious-site.phishing...', time: '2 mins ago', type: 'high' },
                { title: 'New Prompt Scan', desc: 'Jailbreak attempt detected in input...', time: '1 hour ago', type: 'medium' },
                { title: 'System Updated', desc: 'Threat database version 2.4.1 deployed', time: '5 hours ago', type: 'low' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={cn(
                    "w-2 h-2 mt-2 rounded-full",
                    activity.type === 'high' ? 'bg-red-500' :
                    activity.type === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                  )} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-slate-500">{activity.desc}</p>
                  </div>
                  <span className="text-xs text-slate-600">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/dashboard/sandbox?type=url" className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center text-center">
              <Zap className="w-8 h-8 text-blue-500 mb-3" />
              <span className="text-sm font-medium">New Scan</span>
            </Link>
            <Link href="/dashboard/history" className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center text-center">
              <History className="w-8 h-8 text-blue-500 mb-3" />
              <span className="text-sm font-medium">History</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
