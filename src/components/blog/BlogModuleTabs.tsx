'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BlogModuleTabs() {
  const pathname = usePathname() || '/blog';
  const isMeetingNotes = pathname.includes('/meeting-notes');
  const isPodcast = !isMeetingNotes && pathname.includes('/podcast');
  const isHub = pathname === '/blog' || pathname === '/blog/';

  return (
    <div className="flex items-center justify-center border-b border-blue-500/20 bg-[#04070e]/85 py-3.5 backdrop-blur-md sticky top-[65px] z-30">
      <div className="inline-flex rounded-full bg-[#051933]/90 border border-blue-500/30 p-1.5 shadow-xl shadow-black/50">
        <Link
          href="/blog"
          className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
            isHub
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
              : 'text-[#b8c7dc] hover:text-white'
          }`}
        >
          <span>Blog Hub</span>
        </Link>

        <Link
          href="/blog/podcast"
          className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
            isPodcast
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
              : 'text-[#b8c7dc] hover:text-white'
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
          <span>Podcast</span>
        </Link>

        <Link
          href="/blog/meeting-notes"
          className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
            isMeetingNotes
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
              : 'text-[#b8c7dc] hover:text-white'
          }`}
        >
          <svg className="h-4 w-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Meeting Notes</span>
          <span className="rounded-full bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
            15
          </span>
        </Link>
      </div>
    </div>
  );
}
