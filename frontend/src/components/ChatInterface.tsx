'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ConfidenceIndicator } from './ui/ConfidenceIndicator';
import { Badge } from './ui/Badge';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: string;
  confidence?: number;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am OmniDoc QA. Upload an enterprise document, and ask me to extract data, summarize charts, or answer questions.',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const clearKnowledgeBase = async () => {
      try {
        await fetch('http://127.0.0.1:5000/api/clear', { method: 'POST' });
      } catch (err) {
        console.error("Failed to clear backend memory", err);
      }
    };
    clearKnowledgeBase();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `**Document processed:** ${file.name}\n\nYou can now ask me anything about this document.`
      }]);
    } catch (error: any) {
      console.error('Upload error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `**Upload Error:** ${error.message}`
      }]);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: userMsg
    }]);
    
    setIsLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg }),
      });
      
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer || "I could not generate an answer.",
        source: data.source,
        confidence: data.confidence
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error connecting to the RAG backend."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0A0A0B] relative">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 dark:border-none dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-700 dark:text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 12l2 2 4-4" /></svg>
                </div>
              )}
              
              <div className={`max-w-[85%] ${message.role === 'user' ? 'bg-slate-800 text-white dark:bg-zinc-800/80 dark:text-zinc-100 rounded-2xl rounded-tr-sm px-5 py-3 shadow-sm' : 'text-slate-700 dark:text-zinc-300 py-1'}`}>
                <div className="prose prose-slate dark:prose-invert max-w-none text-[15px] leading-relaxed">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                
                {(message.source || message.confidence) && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200 dark:border-zinc-800/50">
                    {message.source && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-medium text-slate-500 dark:text-zinc-400 shadow-sm">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                        {message.source}
                      </div>
                    )}
                    {message.confidence !== undefined && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-medium text-slate-500 dark:text-zinc-400 shadow-sm">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                        Confidence: <span className={message.confidence > 80 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}>{message.confidence}%</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 dark:border-none dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-700 dark:text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 12l2 2 4-4" /></svg>
              </div>
              <div className="py-2 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-zinc-600 rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-50 via-slate-50 dark:from-[#0A0A0B] dark:via-[#0A0A0B] to-transparent pt-10 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.txt,.md"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute left-3 p-2 text-slate-400 dark:text-zinc-400 hover:text-slate-600 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors z-10 disabled:opacity-50"
              title="Upload Document"
            >
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
              )}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your documents..."
              disabled={isLoading}
              className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl pl-14 pr-14 py-4 text-[15px] text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-zinc-700 transition-all shadow-lg"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 p-2 bg-slate-900 dark:bg-zinc-100 text-white dark:text-black hover:bg-slate-800 dark:hover:bg-white rounded-lg transition-colors z-10 disabled:opacity-50 disabled:bg-slate-200 dark:disabled:bg-zinc-800 disabled:text-slate-400 dark:disabled:text-zinc-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[11px] text-slate-500 dark:text-zinc-500">OmniDoc AI can make mistakes. Check important info.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
