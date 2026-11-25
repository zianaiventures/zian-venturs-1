import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/blog';
import ArticleImage from './ArticleImage';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
      <Link href={`/blog/${article.slug}`} className="block overflow-hidden">
        <ArticleImage
          src={article.cover_image_url}
          alt={article.title}
          aspectRatio="16/9"
          className="transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
            {article.category}
          </span>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            {article.reading_time && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.reading_time}
              </span>
            )}
          </div>
        </div>

        <h3 className="mt-3 text-lg sm:text-xl font-bold leading-snug text-[#051933] transition group-hover:text-blue-600">
          <Link href={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {article.excerpt}
        </p>

        {article.guest_name && (
          <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-700">
            <span className="text-blue-600">Guest:</span>
            <span className="truncate">{article.guest_name.split(' (')[0]}</span>
          </div>
        )}

        <div className="mt-4 pt-2">
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 transition group-hover:gap-2 group-hover:text-blue-700"
          >
            <span>Read Article</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
