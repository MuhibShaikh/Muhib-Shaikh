'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, User, Search, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MessagesPage() {
  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] flex gap-6">
      <div className="w-80 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input placeholder="Search chats..." className="pl-10 bg-white/5 border-white/10 h-10" />
        </div>
        <Card className="flex-1 border-white/5 bg-white/[0.02] overflow-hidden">
          <CardContent className="p-0">
            {[
              { name: 'Solaris Team', last: 'Looking forward to...', time: '2m', active: true },
              { name: 'Alex Student', last: 'Here are my portfolio...', time: '1h' },
              { name: 'NexGen AI', last: 'Your application has...', time: '1d' },
            ].map((chat, i) => (
              <div key={i} className={cn(
                "p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all",
                chat.active && "bg-blue-600/10 border-l-2 border-l-blue-600"
              )}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold">{chat.name}</span>
                  <span className="text-[10px] text-slate-500">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{chat.last}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="flex-1 border-white/5 bg-white/[0.02] flex flex-col overflow-hidden">
        <CardHeader className="border-b border-white/5 bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-600/20 flex items-center justify-center border border-blue-600/20">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-base">Solaris Team</CardTitle>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6 flex flex-col justify-end gap-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="max-w-[70%] bg-white/5 p-4 rounded-2xl rounded-bl-none">
              <p className="text-sm text-slate-300">
                Hi! We saw your application for the Frontend Engineer role. Your portfolio looks great, especially the 3D visualization project.
              </p>
              <span className="text-[10px] text-slate-500 mt-2 block">10:42 AM</span>
            </div>
            <div className="max-w-[70%] bg-blue-600 p-4 rounded-2xl rounded-br-none self-end">
              <p className="text-sm text-white">
                Thank you! I really enjoyed building that one. I think those skills would translate well to Solaris AI.
              </p>
              <span className="text-[10px] text-white/50 mt-2 block">10:45 AM</span>
            </div>
          </div>
        </CardContent>
        <div className="p-4 border-t border-white/5 bg-white/[0.01]">
          <div className="relative">
            <Input placeholder="Type your message..." className="pr-12 bg-white/5 border-white/10 h-12" />
            <Button size="icon" className="absolute right-1.5 top-1.5 h-9 w-9 bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
