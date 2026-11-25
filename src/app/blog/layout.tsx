import React from 'react';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Blog & Perspectives | ZiAn Ventures',
  description: 'Ideas, operational playbooks, and strategic perspectives from deep tech founders, operators, and enterprise AI leaders.',
  keywords: [
    'ZiAn Blog',
    'AI Perspectives',
    'Agentic AI',
    'Enterprise AI',
    'Startup Building',
    'Healthcare Innovation',
  ],
  path: 'blog',
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#04070e] text-[#b8c7dc] selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Ambient background glows matching ZiAn site */}
      <div className="absolute top-[-160px] left-[-120px] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-100px] w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {children}
        </div>
      </div>
    </div>
  );
}
