'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/blog';
import ArticleImage from './ArticleImage';

export default function MeetingNotesCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#051933]/75 backdrop-blur-md shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-blue-500/15">
      <Link href={`/blog/${article.slug}`} className="block overflow-hidden relative">
        <ArticleImage
          src={article.cover_image_url}
          alt={article.title}
          aspectRatio="16/9"
          fallbackSrc="/blog/meeting-notes/meeting-notes-fallback.svg"
          className="transition duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-[#051933]/90 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-sm">
            {article.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-3">
            <span className="flex items-center gap-1.5 text-cyan-400/80">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{article.reading_time}</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500">Document</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold leading-snug text-white transition group-hover:text-cyan-300">
            <Link href={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#b8c7dc]">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-blue-500/15 flex items-center justify-between">
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition group-hover:gap-2"
          >
            <span>Read Meeting Note</span>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
