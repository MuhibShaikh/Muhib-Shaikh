'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Rocket,
  LayoutDashboard,
  Search,
  History,
  Settings,
  LogOut,
  User,
  Briefcase,
  FileText,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase, isDemoMode } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useAuth();

  const handleLogout = async () => {
    if (isDemoMode) {
      router.push('/');
      return;
    }
    await supabase.auth.signOut();
    router.push('/');
  };

  const commonItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Search, label: 'Explore', href: '/dashboard/explore' },
  ];

  const startupItems = [
    { icon: Rocket, label: 'My Startup', href: '/dashboard/my-startup' },
    { icon: Briefcase, label: 'Projects', href: '/dashboard/projects' },
    { icon: FileText, label: 'Applicants', href: '/dashboard/applicants' },
  ];

  const studentItems = [
    { icon: FileText, label: 'My Applications', href: '/dashboard/my-applications' },
    { icon: History, label: 'Saved Projects', href: '/dashboard/saved' },
  ];

  const investorItems = [
    { icon: TrendingUp, label: 'Watchlist', href: '/dashboard/watchlist' },
  ];

  const bottomItems = [
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const menuItems = [
    ...commonItems,
    ...(profile?.role === 'startup' ? startupItems : []),
    ...(profile?.role === 'student' ? studentItems : []),
    ...(profile?.role === 'investor' ? investorItems : []),
  ];

  return (
    <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">Sandbox</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-2">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Main</div>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
              pathname === item.href
                ? "bg-blue-600/10 text-blue-500"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              pathname === item.href ? "text-blue-500" : "text-slate-400 group-hover:text-white"
            )} />
            {item.label}
          </Link>
        ))}

        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mt-8 mb-2">Preferences</div>
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
              pathname === item.href
                ? "bg-blue-600/10 text-blue-500"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              pathname === item.href ? "text-blue-500" : "text-slate-400 group-hover:text-white"
            )} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-4 mb-2">
          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
            <User className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-slate-200">{profile?.full_name || 'Guest User'}</p>
            <p className="text-[10px] text-slate-500 truncate uppercase font-bold tracking-wider">{profile?.role || 'Guest'}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-500 hover:text-red-400 hover:bg-red-400/5 h-9"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
