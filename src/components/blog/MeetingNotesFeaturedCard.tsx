'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/blog';
import ArticleImage from './ArticleImage';

export default function MeetingNotesFeaturedCard({ article }: { article: Article }) {
  if (!article) return null;

  return (
    <div className="overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#051933]/80 backdrop-blur-xl shadow-2xl shadow-blue-950/60 transition duration-300 hover:border-cyan-400/60">
      <div className="grid lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] overflow-hidden">
          <Link href={`/blog/${article.slug}`} className="block h-full w-full group">
            <ArticleImage
              src={article.cover_image_url}
              alt={article.title}
              aspectRatio="auto"
              fallbackSrc="/blog/meeting-notes/meeting-notes-fallback.svg"
              className="h-full w-full min-h-[300px] sm:min-h-[400px] object-cover transition duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#051933] via-transparent to-transparent lg:hidden opacity-80 pointer-events-none" />
          </Link>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-cyan-500/20">
                Featured Document
              </span>
              <span className="rounded-full bg-[#04070e]/80 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                {article.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-black leading-tight text-white transition hover:text-cyan-300">
              <Link href={`/blog/${article.slug}`}>
                {article.title}
              </Link>
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#b8c7dc]">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{article.reading_time}</span>
            </div>

            <Link
              href={`/blog/${article.slug}`}
              className="glow-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-400/40 hover:scale-[1.02]"
            >
              <span>Read Meeting Note</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
