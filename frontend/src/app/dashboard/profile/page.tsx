'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { theme, setTheme } = useTheme();

  const [toggles, setToggles] = useState({
    marketing: false,
    security: true,
    updates: true,
    desktop: true,
  });

  useEffect(() => {
    setName(localStorage.getItem('omni_name') || "Admin User");
    setEmail(localStorage.getItem('omni_email') || "admin@omnidoc.ai");
  }, []);

  const handleClearKB = async () => {
    if (confirm("Are you sure you want to clear your local vector database? This cannot be undone.")) {
      try {
        await fetch('http://127.0.0.1:5000/api/clear', { method: 'POST' });
        alert("Knowledge Base cleared successfully!");
      } catch (e) {
        alert("Failed to clear KB.");
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 h-full bg-slate-50/50 dark:bg-[#020617] scroll-smooth">
      <div className="p-8 max-w-4xl mx-auto w-full pt-12">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Settings</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-lg">Manage your profile, preferences, and workspace configuration.</p>
        </div>

        <div className="space-y-8">
          
          {/* Profile Information */}
          <section className="bg-white dark:bg-[#0A0A0B] border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Profile Information</h2>
            <div className="flex items-start gap-8 mb-8 pb-8 border-b border-slate-200 dark:border-zinc-800">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl text-white font-bold uppercase shadow-lg shadow-indigo-500/20">
                  {name ? name.substring(0,2) : "AD"}
                </div>
                <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                  Upload picture
                </button>
              </div>
              <div className="flex-1 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Display Name</label>
                  <input type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full max-w-md bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Email Address</label>
                  <input type="email" value={email} readOnly className="w-full max-w-md bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/50 rounded-xl px-4 py-2.5 text-slate-500 dark:text-zinc-500 cursor-not-allowed focus:outline-none" />
                  <p className="text-xs text-slate-500 dark:text-zinc-500 mt-2">Email addresses are tied to your identity and cannot be changed.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Appearance (Theme) */}
          <section className="bg-white dark:bg-[#0A0A0B] border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Appearance</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">Customize how OmniDoc looks on your device.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {['light', 'dark', 'system'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${theme === t ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10' : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'}`}
                >
                  <span className="font-medium text-slate-900 dark:text-white capitalize">{t}</span>
                  {theme === t && <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                </button>
              ))}
            </div>
          </section>

          {/* API Configuration */}
          <section className="bg-white dark:bg-[#0A0A0B] border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">API Configuration</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">Manage your OpenRouter and AI model settings for the RAG engine.</p>
            
            <div className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">OpenRouter API Key</label>
                <input type="password" placeholder="sk-or-v1-..." className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono text-sm tracking-widest" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Default Vision Model</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none font-medium">
                    <option>InclusionAI Ling 3.0 Flash VL (Recommended)</option>
                    <option>Nvidia Nemotron 3 Omni</option>
                    <option>Google Gemini 2.0 Flash</option>
                    <option>Anthropic Claude 3.5 Sonnet</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Max Context Tokens</label>
                <input type="number" defaultValue="8192" className="w-full max-w-[200px] bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white dark:bg-[#0A0A0B] border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Notifications</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">Control what emails and alerts you receive.</p>
            
            <div className="space-y-6">
              {[
                { id: 'security', label: 'Security Alerts', desc: 'Get notified about new logins and security events.' },
                { id: 'updates', label: 'Product Updates', desc: 'Receive emails about new features and product changes.' },
                { id: 'marketing', label: 'Marketing Communications', desc: 'Receive promotional offers and newsletters.' },
                { id: 'desktop', label: 'Desktop Notifications', desc: 'Show toast notifications when RAG jobs complete.' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</h4>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => setToggles(prev => ({...prev, [item.id]: !prev[item.id as keyof typeof prev]}))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-[#0A0A0B] ${toggles[item.id as keyof typeof toggles] ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-zinc-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles[item.id as keyof typeof toggles] ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Danger Zone */}
          <section className="border border-red-200 dark:border-red-900/50 rounded-2xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-red-50 dark:bg-red-900/10 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-red-600 dark:text-red-500 mb-2">Danger Zone</h2>
              <p className="text-sm text-red-500/80 dark:text-red-400/80 mb-6">Irreversible actions regarding your account and data.</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-[#0A0A0B] border border-red-200 dark:border-red-900/50 rounded-xl">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Clear Knowledge Base</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Wipe all embedded documents from the local RAG engine.</p>
                  </div>
                  <button onClick={handleClearKB} className="px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                    Clear Data
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white dark:bg-[#0A0A0B] border border-red-200 dark:border-red-900/50 rounded-xl">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Delete Account</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Permanently delete your account and all associated data.</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Floating Save Bar */}
        <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-white/80 dark:bg-[#0A0A0B]/80 backdrop-blur-xl border-t border-slate-200 dark:border-zinc-800 z-10 flex justify-end pr-8">
          <div className="max-w-4xl mx-auto w-full flex justify-end gap-4 items-center px-4">
             <span className="text-sm text-slate-500 dark:text-zinc-400 font-medium">Unsaved changes</span>
             <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-indigo-500/20">
               Save Changes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
