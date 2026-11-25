'use client';

import React, { useEffect, useState } from 'react';
import { ArticleHeading } from '@/types/blog';

export default function MeetingNotesTableOfContents({
  headings,
}: {
  headings: ArticleHeading[];
}) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav className="w-full rounded-2xl border border-cyan-500/30 bg-[#051933]/90 p-3 sm:p-4 backdrop-blur-xl shadow-xl shadow-black/40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
            Document Outline &bull; Horizontal Navigation
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono hidden md:inline-block">
          Click any section to jump directly
        </span>
      </div>

      {/* Horizontal Scrollable Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
        {headings.map((h, idx) => {
          const isActive = activeId === h.id;
          const label = h.title || (h as any).text || `Section ${idx + 1}`;

          return (
            <a
              key={h.id || idx}
              href={`#${h.id}`}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-500/30 scale-[1.02]'
                  : 'bg-[#04070e]/80 text-[#b8c7dc] border-cyan-500/20 hover:text-white hover:border-cyan-400/40 hover:bg-[#071933]'
              }`}
            >
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                isActive ? 'bg-black/30 text-white' : 'bg-cyan-500/10 text-cyan-300'
              }`}>
                0{idx + 1}
              </span>
              <span>{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
