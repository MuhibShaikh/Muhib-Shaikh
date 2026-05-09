'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Lock, Search, Zap, Code, FileSearch, ArrowRight, Menu, X, Check, Play } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold tracking-tight">Sandbox</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How it works</Link>
              <Link href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="cyber" size="sm">Get Started</Button>
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
            <Link href="#features" className="block text-slate-400" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link href="#how-it-works" className="block text-slate-400" onClick={() => setIsMenuOpen(false)}>How it works</Link>
            <Link href="#pricing" className="block text-slate-400" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full text-white border-white/10">Sign In</Button>
              </Link>
              <Link href="/signup" className="w-full">
                <Button variant="cyber" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-medium mb-6 inline-block">
              Introducing AI-Powered Cybersecurity Analysis
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
              Analyze threats before <br className="hidden md:block" /> they touch your system.
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Sandbox is the modern AI-powered platform to safely test prompts, links, and payloads in isolated environments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg" variant="cyber">
                  Start Analyzing Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#demo" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section id="demo" className="py-24 px-4 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20" />
            <div className="relative p-2 md:p-4">
               <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center border border-white/5 group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Interactive Sandbox Demo</h3>
                      <p className="text-slate-400">See how Sandbox identifies a zero-day exploit in real-time.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Sandbox Works</h2>
            <p className="text-slate-400">Three layers of protection for your digital assets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2 z-0" />

             {[
               { step: "01", title: "Input Content", desc: "Paste a URL, code snippet, or upload a suspicious file into the analyzer." },
               { step: "02", title: "AI Analysis", desc: "Our neural networks perform behavioral analysis and pattern matching in an isolated container." },
               { step: "03", title: "Safety Verdict", desc: "Receive a detailed report with risk scores, vulnerability details, and recommended actions." }
             ].map((s, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-black border border-blue-500/50 flex items-center justify-center mb-6 text-blue-500 font-bold text-xl shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                   {s.step}
                 </div>
                 <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                 <p className="text-slate-400 leading-relaxed">{s.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unmatched Protection</h2>
            <p className="text-slate-400">Everything you need to stay safe in an AI-driven world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Instant Analysis", desc: "Real-time scanning of suspicious links and payloads with ultra-fast AI models." },
              { icon: Search, title: "URL Deep Scan", desc: "Detailed behavioral analysis of websites including hidden redirects and scripts." },
              { icon: Code, title: "Prompt Inspection", desc: "Identify potential jailbreaks and prompt injections before they reach your LLMs." },
              { icon: Lock, title: "Isolated Sandbox", desc: "Every analysis runs in a completely isolated virtual environment for zero risk." },
              { icon: FileSearch, title: "Payload Forensics", desc: "Break down malicious code snippets to understand exactly how they work." },
              { icon: Shield, title: "Adaptive Security", desc: "Our AI learns from global threat patterns to protect you from zero-day exploits." }
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                  <f.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Choose the plan that fits your security needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { plan: "Starter", price: "Free", features: ["10 scans / month", "URL Analysis", "Basic Reports", "Community Support"] },
              { plan: "Professional", price: "$29", features: ["Unlimited scans", "File Payloads", "AI Prompt Analysis", "Priority Support", "Detailed Forensics"], popular: true },
              { plan: "Enterprise", price: "Custom", features: ["Custom AI Models", "API Access", "Role-based Access", "SLA Guarantee", "Dedicated Support"] }
            ].map((p, i) => (
              <Card key={i} className={cn("relative flex flex-col", p.popular && "border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.1)]")}>
                {p.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{p.plan}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">{p.price}</span>
                    {p.price !== "Free" && p.price !== "Custom" && <span className="text-slate-500 text-sm">/month</span>}
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-slate-400">
                        <Check className="w-4 h-4 text-blue-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.popular ? "cyber" : "outline"} className="w-full">
                    {p.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              { q: "Is it safe to upload malicious files?", a: "Yes, Sandbox executes all files in a strictly isolated, ephemeral virtual environment. Once the analysis is complete, the environment is completely destroyed." },
              { q: "What kind of AI models do you use?", a: "We use a combination of fine-tuned LLMs for prompt analysis and proprietary behavioral models for detecting zero-day exploits in code and URLs." },
              { q: "Do you offer API access?", a: "API access is available on our Enterprise plan. You can integrate Sandbox directly into your CI/CD pipelines or security workflows." },
              { q: "How accurate is the risk score?", a: "Our risk score is calculated using hundreds of signals. While no system is perfect, Sandbox maintains a 99.8% detection rate for known threats." }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {faq.q}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed pl-3.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-bold">Sandbox</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
          </div>
          <p className="text-sm text-slate-500">
            © 2024 Sandbox Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

import { cn } from '@/lib/utils';
