'use client';

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";

export default function LandingPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Colorful Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 dark:bg-indigo-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-rose-500/20 dark:bg-fuchsia-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-emerald-500/20 dark:bg-cyan-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-slate-200/50 dark:border-white/5 bg-white/60 dark:bg-[#020617]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 12l2 2 4-4" /></svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">OmniDoc</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors">Log in</Link>
            <Link href="/dashboard" className="text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-lg">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Vision AI Engine 2.0 is live
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1] mb-6"
        >
          Understand any document, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500">instantly.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed font-medium"
        >
          Upload massive PDFs, manuals, and reports. Our Multimodal RAG AI reads your charts, tables, and text, giving you perfect answers in seconds.
        </motion.p>
        
        {/* UPDATED BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-20"
        >
          <button 
            onClick={() => setIsDemoOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            View Demo
          </button>
          <Link href="/dashboard/pricing" className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Upgrade to Pro
          </Link>
        </motion.div>

        {/* Detailed Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl relative mt-8 mb-32"
        >
          {/* Mockup Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] blur-xl opacity-20 dark:opacity-30 -z-10" />
          
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0B0F19]/90 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/10] relative flex flex-col">
            {/* Mac Window Header */}
            <div className="h-12 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50 dark:bg-[#050811]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="mx-auto h-6 w-64 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
            
            {/* Detailed UI Inside */}
            <div className="flex-1 flex p-6 gap-6">
              {/* Sidebar */}
              <div className="w-48 hidden md:flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded bg-indigo-500" />
                   <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-8 w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg" />
                ))}
                <div className="mt-auto h-24 w-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-3">
                   <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-500/50 rounded mb-2" />
                   <div className="w-2/3 h-2 bg-indigo-200 dark:bg-indigo-500/50 rounded" />
                </div>
              </div>
              
              {/* Main Chat/Graph Area */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="w-full h-32 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4 flex flex-col gap-3">
                   <div className="w-1/4 h-5 bg-slate-200 dark:bg-slate-700 rounded" />
                   <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                   <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                   <div className="w-3/4 h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                
                <div className="flex gap-4 flex-1">
                   {/* Fake Chart 1 */}
                   <div className="flex-1 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 p-4 flex items-end gap-2">
                     {[40, 70, 45, 90, 65, 80].map((h, i) => (
                       <div key={i} className="flex-1 bg-blue-400 dark:bg-blue-500 rounded-t-sm transition-all" style={{ height: `${h}%` }} />
                     ))}
                   </div>
                   {/* Fake Chart 2 */}
                   <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30 p-4 relative overflow-hidden">
                      <div className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[80%] rounded-[100%] border-t-[8px] border-emerald-400 dark:border-emerald-500" />
                      <div className="absolute top-4 left-4 w-1/3 h-4 bg-emerald-200 dark:bg-emerald-800 rounded" />
                   </div>
                </div>

                <div className="w-full h-14 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md mt-auto flex items-center px-4 justify-between">
                   <div className="w-1/3 h-4 bg-slate-100 dark:bg-slate-800 rounded" />
                   <div className="w-8 h-8 bg-indigo-500 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Feature Grid Section to fill the bottom */}
      <section className="py-24 bg-white dark:bg-[#050811] relative z-10 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to analyze documents</h2>
            <p className="text-slate-600 dark:text-slate-400">Powered by the latest Multimodal AI technology.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Vision AI Extraction</h3>
              <p className="text-slate-600 dark:text-slate-400">Understands graphs, charts, and scanned images natively without OCR.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-400">TF-IDF routing combined with optimized API payloads returns answers in milliseconds.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Enterprise Secure</h3>
              <p className="text-slate-600 dark:text-slate-400">Your documents remain local in your backend memory and are wiped on refresh.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-20 bg-slate-900 dark:bg-black text-center relative z-10 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your workflow?</h2>
        <Link href="/dashboard" className="inline-block px-8 py-4 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-400 transition-colors shadow-lg">
          Create your free workspace
        </Link>
      </footer>

      {/* VIEW DEMO MODAL */}
      <AnimatePresence>
        {isDemoOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-12"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#0A0A0B] w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-200 dark:border-slate-800"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#050811]">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Live Demo Chat
                </h3>
                <button onClick={() => setIsDemoOpen(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              
              {/* Actual Chat Interface Container */}
              <div className="flex-1 overflow-hidden relative">
                <ChatInterface />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
