'use client';

import { useState } from "react";

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annually'>('monthly');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0A0A0B] p-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12 border-b border-slate-200 dark:border-zinc-800 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Subscription</h1>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full p-1 flex items-center shadow-sm">
            <button 
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billing === 'monthly' ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-zinc-700' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBilling('annually')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billing === 'annually' ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-zinc-700' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Annually <span className="text-emerald-500 ml-1">(2 months free)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          
          {/* Free Tier */}
          <div className="bg-white dark:bg-[#0A0A0B] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col h-full shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Free</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">$0</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6 min-h-[40px]">
              For individuals who want to try out advanced AI document analysis.
            </p>
            <button className="w-full py-2.5 bg-slate-100 dark:bg-zinc-900 text-slate-400 dark:text-zinc-500 rounded-xl font-medium text-sm mb-6 cursor-not-allowed border border-slate-200 dark:border-zinc-800">
              Subscribed
            </button>
            <div className="text-sm text-slate-600 dark:text-zinc-300 font-medium mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              50 Pages per month
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Plans feature</div>
            <ul className="space-y-3 flex-1">
              <li className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Basic PDF parsing
              </li>
              <li className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Standard TF-IDF routing
              </li>
            </ul>
          </div>

          {/* Starter Tier */}
          <div className="bg-white dark:bg-[#0A0A0B] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col h-full shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Starter</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">${billing === 'monthly' ? '10' : '8'}</span>
              <span className="text-sm text-slate-500 dark:text-zinc-400">/mo</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6 min-h-[40px]">
              For hobbyists analyzing larger documents and research papers.
            </p>
            <button className="w-full py-2.5 bg-white dark:bg-[#0A0A0B] text-slate-900 dark:text-white rounded-xl font-medium text-sm mb-6 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors shadow-sm">
              Subscribe
            </button>
            <div className="text-sm text-slate-600 dark:text-zinc-300 font-medium mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              500 Pages per month
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Everything in free, plus</div>
            <ul className="space-y-3 flex-1">
              <li className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Table extraction tools
              </li>
              <li className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Chat history export
              </li>
            </ul>
          </div>

          {/* PRO Tier (Highlighted) */}
          <div className="bg-white dark:bg-[#0A0A0B] border border-slate-900 dark:border-zinc-700 rounded-2xl flex flex-col h-full shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="bg-slate-900 dark:bg-zinc-800 text-center py-2 text-xs font-bold text-white uppercase tracking-wider">
              Most Popular
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Pro</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">${billing === 'monthly' ? '20' : '16'}</span>
                <span className="text-sm text-slate-500 dark:text-zinc-400">/mo</span>
              </div>
              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-sm uppercase tracking-wider">First month 50% off</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6 min-h-[40px]">
                For professionals requiring full Multimodal Vision capabilities.
              </p>
              <button className="w-full py-2.5 bg-slate-900 dark:bg-zinc-100 text-white dark:text-black rounded-xl font-bold text-sm mb-6 hover:bg-slate-800 dark:hover:bg-white transition-colors shadow-md">
                Subscribe
              </button>
              <div className="text-sm text-slate-600 dark:text-zinc-300 font-medium mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                2,000 Pages per month
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Everything in starter, plus</div>
              <ul className="space-y-3 flex-1">
                <li className="text-xs text-slate-900 dark:text-zinc-100 font-medium flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Full Vision-Language processing
                </li>
                <li className="text-xs text-slate-900 dark:text-zinc-100 font-medium flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Chart & Graph reasoning
                </li>
                <li className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Priority API bandwidth
                </li>
              </ul>
            </div>
          </div>

          {/* MAX Tier */}
          <div className="bg-white dark:bg-[#0A0A0B] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col h-full shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Max</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">${billing === 'monthly' ? '35' : '28'}</span>
              <span className="text-sm text-slate-500 dark:text-zinc-400">/mo</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6 min-h-[40px]">
              For growing teams requiring massive data ingestion and zero limits.
            </p>
            <button className="w-full py-2.5 bg-white dark:bg-[#0A0A0B] text-slate-900 dark:text-white rounded-xl font-medium text-sm mb-6 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors shadow-sm">
              Subscribe
            </button>
            <div className="text-sm text-slate-600 dark:text-zinc-300 font-medium mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Unlimited Pages
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Everything in pro, plus</div>
            <ul className="space-y-3 flex-1">
              <li className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Dedicated compute cluster
              </li>
              <li className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Custom Model finetuning
              </li>
              <li className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                24/7 Priority Support
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
