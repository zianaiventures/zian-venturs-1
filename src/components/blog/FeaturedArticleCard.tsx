import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/blog';
import ArticleImage from './ArticleImage';

export default function FeaturedArticleCard({ article }: { article: Article }) {
  if (!article) return null;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 transition duration-300 hover:border-blue-400/60">
      <div className="grid lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px]">
          <Link href={`/blog/${article.slug}`} className="block h-full w-full">
            <ArticleImage
              src={article.cover_image_url}
              alt={article.title}
              aspectRatio="auto"
              className="h-full w-full min-h-[280px] sm:min-h-[380px]"
              priority
            />
          </Link>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-blue-600 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm">
                Featured Spotlight
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {article.category}
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2rem] font-black leading-tight text-[#051933] hover:text-blue-600 transition">
              <Link href={`/blog/${article.slug}`}>
                {article.title}
              </Link>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {article.excerpt}
            </p>

            {article.guest_name && (
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                  {article.guest_name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Guest</p>
                  <p className="truncate text-sm font-bold text-slate-800">{article.guest_name}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
            <span className="text-xs font-semibold text-slate-400">
              {article.reading_time}
            </span>
            <Link
              href={`/blog/${article.slug}`}
              className="glow-btn inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700"
            >
              <span>Read Full Perspective</span>
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
