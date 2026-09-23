'use client';

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<'email' | 'verify' | 'loading'>('email');
  const [errorMsg, setErrorMsg] = useState("");

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep('loading');
    setErrorMsg("");
    
    try {
      const res = await fetch('http://127.0.0.1:5000/api/auth/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code");
      setStep('verify');
    } catch (err: any) {
      setErrorMsg(err.message);
      setStep('email');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setErrorMsg("");
    
    try {
      const res = await fetch('http://127.0.0.1:5000/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      
      // Save token
      localStorage.setItem('omni_token', data.token);
      localStorage.setItem('omni_email', data.email);
      
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message);
      setStep('verify');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0B] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-emerald-500/5 blur-[100px] mix-blend-normal" />
      </div>

      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors bg-white/50 dark:bg-zinc-900/50 px-4 py-2 rounded-full backdrop-blur-md border border-slate-200 dark:border-zinc-800 shadow-sm">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Home
        </Link>
      </div>

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl relative z-10 transition-all duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-zinc-100 flex items-center justify-center shadow-lg mb-4">
            <svg className="w-6 h-6 text-white dark:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 12l2 2 4-4" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {step === 'verify' ? 'Check your email' : 'Welcome back'}
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-2 text-center">
            {step === 'verify' ? `We sent a code to ${email}` : 'Sign in to your OmniDoc account'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg text-center animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {step === 'loading' ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-700 border-t-emerald-500 rounded-full animate-spin" />
            <p className="mt-4 text-sm text-slate-500 dark:text-zinc-400 font-medium">Processing...</p>
          </div>
        ) : step === 'email' ? (
          <form className="space-y-4 animate-in fade-in zoom-in duration-300" onSubmit={handleSendEmail}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1.5">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-[#0A0A0B] border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-shadow"
                placeholder="admin@example.com"
              />
            </div>
            <button 
              type="submit"
              className="w-full mt-6 bg-slate-900 dark:bg-zinc-100 text-white dark:text-black rounded-xl py-3 font-semibold hover:bg-slate-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              Continue with Email
            </button>
            <div className="mt-6 text-center text-sm text-slate-500 dark:text-zinc-500">
              Don't have an account? <Link href="#" className="font-medium text-slate-900 dark:text-zinc-300 hover:underline">Sign up</Link>
            </div>
          </form>
        ) : (
          <form className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" onSubmit={handleVerify}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1.5">Verification Code</label>
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-[#0A0A0B] border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-shadow tracking-[0.5em] text-center font-mono text-lg"
                placeholder="000000"
                maxLength={6}
              />
            </div>
            <button 
              type="submit"
              className="w-full mt-6 bg-emerald-600 text-white rounded-xl py-3 font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Verify & Login
            </button>
            <div className="mt-6 text-center text-sm text-slate-500 dark:text-zinc-500">
              Didn't receive it? <button type="button" onClick={() => setStep('email')} className="font-medium text-slate-900 dark:text-zinc-300 hover:underline">Try another email</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
