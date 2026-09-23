'use client';

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authEmail, setAuthEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('omni_token');
    const email = localStorage.getItem('omni_email');
    if (!token) {
      router.push('/login');
    } else {
      setAuthEmail(email || "Admin User");
    }
  }, [router]);
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0A0A0B]">
      {/* ElevenLabs Style Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-zinc-800/50 bg-white dark:bg-[#0A0A0B] flex flex-col p-4 hidden md:flex h-screen sticky top-0">
        <Link href="/" className="flex items-center gap-3 mb-10 px-2 mt-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 rounded bg-slate-800 dark:bg-zinc-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-white dark:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 12l2 2 4-4" /></svg>
          </div>
          <span className="font-medium text-slate-900 dark:text-zinc-100 tracking-tight text-sm">OmniDoc Studio</span>
        </Link>
        
        <nav className="flex-1 space-y-1">
          <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard' ? 'bg-slate-100 dark:bg-zinc-800/50 text-slate-900 dark:text-zinc-100' : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/30 hover:text-slate-900 dark:hover:text-zinc-200'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            Workspace
          </Link>
          <Link href="/dashboard/pricing" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard/pricing' ? 'bg-slate-100 dark:bg-zinc-800/50 text-slate-900 dark:text-zinc-100' : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/30 hover:text-slate-900 dark:hover:text-zinc-200'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            Billing
          </Link>
          <Link href="/dashboard/profile" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard/profile' ? 'bg-slate-100 dark:bg-zinc-800/50 text-slate-900 dark:text-zinc-100' : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/30 hover:text-slate-900 dark:hover:text-zinc-200'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06-.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
            Settings
          </Link>
        </nav>
        
        <div className="mt-auto">
          <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase">
                {authEmail ? authEmail.substring(0,2) : "AD"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-slate-900 dark:text-zinc-100 truncate">{authEmail || "Admin User"}</p>
                <button 
                  onClick={() => { localStorage.clear(); router.push('/login'); }}
                  className="text-xs text-red-500 hover:text-red-600 font-medium text-left transition-colors"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-zinc-400">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>
      
      {/* Main Dashboard Canvas */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top sticky header */}
        <header className="h-14 border-b border-slate-200 dark:border-zinc-800/50 bg-white/80 dark:bg-[#0A0A0B]/80 backdrop-blur-md flex items-center px-6 sticky top-0 z-10">
          <h1 className="text-[15px] font-medium text-slate-900 dark:text-zinc-100">Document Workspace</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">Engine Online</span>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>
    </div>
  );
}
