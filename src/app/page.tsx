'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Rocket, Users, Target, ArrowRight, Menu, X, Check, Search, TrendingUp, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-100 overflow-x-hidden selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Sandbox</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#explore" className="text-sm text-slate-400 hover:text-white transition-colors">Explore</Link>
              <Link href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How it works</Link>
              <Link href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="cyber" size="sm" className="bg-blue-600 hover:bg-blue-700">Join Platform</Button>
              </Link>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/5 p-4 space-y-4">
            <Link href="#explore" className="block text-slate-400" onClick={() => setIsMenuOpen(false)}>Explore</Link>
            <Link href="#how-it-works" className="block text-slate-400" onClick={() => setIsMenuOpen(false)}>How it works</Link>
            <Link href="#pricing" className="block text-slate-400" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full text-white border-white/10">Sign In</Button>
              </Link>
              <Link href="/signup" className="w-full">
                <Button variant="cyber" className="w-full">Join Platform</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-medium mb-6 inline-block">
              Building the next generation of startups, together.
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
              Where startups grow <br className="hidden md:block" /> and students build.
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Sandbox connects ambitious startups with talented students. Build in public, find collaborators, and join the journey from idea to IPO.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#explore" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                  Explore Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section / Stats */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Startups", value: "500+" },
              { label: "Student Projects", value: "2.4k" },
              { label: "Hired Talent", value: "1.2k" },
              { label: "Venture Capital", value: "$45M+" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-bold leading-tight">A purposeful way to <br/> collaborate on real work.</h2>
              <div className="space-y-6">
                {[
                  { icon: Target, title: "Startups Build in Public", desc: "Share milestones, progress logs, and updates to attract talent and investors." },
                  { icon: Users, title: "Students Join Teams", desc: "Apply to real projects, gain hands-on experience, and build your portfolio." },
                  { icon: TrendingUp, title: "Measurable Growth", desc: "Track performance, validate ideas, and observe the trajectory of rising startups." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-10 h-10 shrink-0 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <Card className="border-white/10 bg-white/5 overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Timeline_Update_01.log</div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-blue-600/20 flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">NexGen AI</div>
                        <div className="text-[10px] text-slate-500">2 hours ago • Milestone Reached</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300 leading-relaxed">
                      &quot;Just deployed our v2.4 core engine. Latency reduced by 40%. Huge thanks to @alex_student for the optimization work!&quot;
                    </div>
                    <div className="aspect-video rounded bg-slate-900 flex items-center justify-center border border-white/5">
                      <div className="text-xs text-slate-600 italic">Screenshot: Dashboard Preview</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects / Discovery Preview */}
      <section id="explore" className="py-32 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Discover Opportunities</h2>
              <p className="text-slate-400">Join high-growth startups and build something meaningful.</p>
            </div>
            <Link href="/signup">
              <Button variant="ghost" className="text-blue-500 hover:text-blue-400 hover:bg-transparent p-0">
                View all projects <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { startup: "Solaris", title: "Frontend Engineer (React)", tags: ["React", "Tailwind", "Framer"], level: "High" },
              { startup: "Verity", title: "AI Researcher", tags: ["Python", "PyTorch", "ML"], level: "Medium" },
              { startup: "Atlas", title: "Product Designer", tags: ["Figma", "UI/UX", "Branding"], level: "Low" }
            ].map((p, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="group">
                <Card className="h-full border-white/5 bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-xs font-medium text-slate-500">{p.startup}</div>
                      <div className="px-2 py-0.5 rounded bg-blue-600/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider">
                        {p.level} Commitment
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-blue-500 transition-colors">{p.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded bg-white/5 text-[10px] text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full text-xs h-9 border-white/10 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">Sandbox</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              The professional collaboration platform for the next generation of builders.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div>
              <div className="text-white font-bold mb-4">Product</div>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#">Explore Startups</Link></li>
                <li><Link href="#">Browse Projects</Link></li>
                <li><Link href="#">Build in Public</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-bold mb-4">Platform</div>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#">For Students</Link></li>
                <li><Link href="#">For Startups</Link></li>
                <li><Link href="#">For Investors</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-bold mb-4">Legal</div>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 flex justify-between items-center text-xs text-slate-600">
          <p>© 2024 Sandbox. Build the future.</p>
          <div className="flex gap-4">
            <Link href="#">Twitter</Link>
            <Link href="#">LinkedIn</Link>
            <Link href="#">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
