'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Link as LinkIcon, MessageSquare, Code, FileCode, Shield, AlertTriangle, CheckCircle, Info, RefreshCcw, Upload, FileText, PieChart } from 'lucide-react';
import { mockService } from '@/services/mockService';
import { Analysis } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function SandboxPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('url');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input && !fileName) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await mockService.analyzeContent(activeTab, input || fileName || 'Uploaded File');
      setResult(data);
      toast.success('Analysis complete');
    } catch (error) {
      toast.error('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setInput(`Content of ${file.name} (simulated)`);
      toast.info(`File ${file.name} uploaded successfully`);
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

  const getThreatBg = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500/10 border-green-500/20';
      case 'medium': return 'bg-amber-500/10 border-amber-500/20';
      case 'high': return 'bg-orange-500/10 border-orange-500/20';
      case 'critical': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-slate-500/10 border-slate-500/20';
    }
  };

  // Mock data for charts
  const chartData = [
    { name: 'Malicious', value: result?.risk_score || 0, color: '#ef4444' },
    { name: 'Safe', value: 100 - (result?.risk_score || 0), color: '#22c55e' },
  ];

  const vulnerabilityData = [
    { name: 'Redir', score: 85 },
    { name: 'XSS', score: 45 },
    { name: 'SQLi', score: 12 },
    { name: 'Buffer', score: 67 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Sandbox Analyzer</h1>
        <p className="text-slate-400 mt-2">Test suspicious content in an isolated environment powered by AI.</p>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/[0.02]">
        <CardContent className="pt-6">
          <Tabs defaultValue="url" onValueChange={(v) => { setActiveTab(v); setInput(''); setFileName(null); }}>
            <TabsList className="bg-white/5 border border-white/10 p-1 mb-6">
              <TabsTrigger value="url" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                <LinkIcon className="w-4 h-4" /> URL
              </TabsTrigger>
              <TabsTrigger value="prompt" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                <MessageSquare className="w-4 h-4" /> Prompt
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                <Code className="w-4 h-4" /> Code
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                <Upload className="w-4 h-4" /> File
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="relative">
                {activeTab === 'file' ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="h-32 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center bg-black/40 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                    />
                    <Upload className="w-8 h-8 text-slate-500 mb-2" />
                    <p className="text-sm text-slate-400">
                      {fileName ? `Selected: ${fileName}` : "Click or drag to upload a suspicious file"}
                    </p>
                  </div>
                ) : (
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      activeTab === 'url' ? "https://example.com/suspicious-path" :
                      activeTab === 'prompt' ? "Paste LLM prompt here..." :
                      "Paste code or payload content here..."
                    }
                    className="h-14 pl-4 pr-32 bg-black/40"
                  />
                )}

                {activeTab !== 'file' && (
                  <Button
                    type="submit"
                    disabled={loading || !input}
                    className="absolute right-2 top-2 h-10"
                    variant="cyber"
                  >
                    {loading ? (
                      <RefreshCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                )}
              </div>

              {activeTab === 'file' && (
                <Button
                  type="submit"
                  disabled={loading || !fileName}
                  className="w-full h-12"
                  variant="cyber"
                >
                  {loading ? (
                    <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Shield className="w-4 h-4 mr-2" />
                  )}
                  {loading ? "Analyzing..." : "Analyze File"}
                </Button>
              )}
            </form>
          </Tabs>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 space-y-4"
          >
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
              <Shield className="absolute inset-0 m-auto w-8 h-8 text-blue-500 animate-pulse" />
            </div>
            <p className="text-slate-400 animate-pulse">Running AI behavioral analysis...</p>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={cn("md:col-span-2", getThreatBg(result.threat_level))}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {result.threat_level === 'low' ? <CheckCircle className="text-green-500" /> : <AlertTriangle className={getThreatColor(result.threat_level)} />}
                        {result.threat_level.toUpperCase()} THREAT DETECTED
                      </CardTitle>
                      <CardDescription className="text-slate-300 mt-1">{result.title}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={cn("text-4xl font-black", getThreatColor(result.threat_level))}>
                        {result.risk_score}
                      </div>
                      <div className="text-xs font-bold opacity-70">RISK SCORE</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center py-4 border-t border-white/10 mt-4">
                    <p className="text-slate-200 leading-relaxed">
                      {result.summary}
                    </p>
                    <div className="h-40 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="w-4 h-4" />
                    Risk Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vulnerabilityData}>
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                        <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Security Verdict
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 space-y-1">
                    <p className="text-xs text-slate-500 font-bold uppercase">Behavioral Scan</p>
                    <p className="text-sm">{result.details.behavioral_analysis}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 font-bold uppercase">Detected Vulnerabilities</p>
                    <div className="flex flex-wrap gap-2">
                      {result.details.vulnerabilities.map((v, i) => (
                        <span key={i} className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[10px] font-bold">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20 bg-green-500/[0.02]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Recommended Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.details.recommended_actions.map((action, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
