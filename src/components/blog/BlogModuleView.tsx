'use client';

import React, { useMemo, useState } from 'react';
import { Article } from '@/types/blog';
import FeaturedBlogCard from './FeaturedBlogCard';
import BlogCard from './BlogCard';

export default function BlogModuleView({ initialArticles }: { initialArticles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collect all unique categories from the articles
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialArticles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ['All', ...Array.from(set)];
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((art) => {
      if (activeCategory !== 'All' && art.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = art.title.toLowerCase().includes(q);
        const inExcerpt = art.excerpt.toLowerCase().includes(q);
        const inGuest = (art.guest_name || '').toLowerCase().includes(q);
        const inCategory = (art.category || '').toLowerCase().includes(q);
        const inContent = (art.content || '').toLowerCase().includes(q);
        const inKeyword = (art.target_keyword || '').toLowerCase().includes(q);
        if (!inTitle && !inExcerpt && !inGuest && !inCategory && !inContent && !inKeyword) {
          return false;
        }
      }
      return true;
    });
  }, [initialArticles, activeCategory, searchQuery]);

  const featured = useMemo(() => {
    return filteredArticles.find((a) => a.is_featured) || filteredArticles[0];
  }, [filteredArticles]);

  const gridArticles = useMemo(() => {
    if (!featured) return filteredArticles;
    return filteredArticles.filter((a) => a.id !== featured.id);
  }, [filteredArticles, featured]);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Blog Hub Hero */}
      <section className="text-center pt-8 sm:pt-14 pb-4 max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#051933]/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>ZiAn Knowledge Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          INSIGHTS &amp; PERSPECTIVES
        </h1>

        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 mx-auto rounded-full mt-2 mb-3 shadow-lg shadow-cyan-500/30" />

        <p className="text-base sm:text-lg lg:text-xl text-[#b8c7dc] leading-relaxed max-w-2xl mx-auto font-normal">
          Explore ideas, knowledge, founder debriefs, and strategic playbooks across Enterprise AI, MedTech, and Venture Building.
        </p>
      </section>

      {/* Featured Spotlight Card */}
      {featured && (
        <section aria-label="Featured Article Spotlight">
          <FeaturedBlogCard article={featured} />
        </section>
      )}

      {/* Search and Filters Bar */}
      <section className="border-t border-cyan-500/20 pt-8 space-y-6" aria-label="Blog Filters">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all articles, playbooks, speakers..."
              className="w-full rounded-2xl border border-cyan-500/30 bg-[#051933]/80 px-4 py-3 pl-11 text-sm text-white placeholder-slate-400 shadow-inner backdrop-blur-md transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
            <svg
              className="absolute left-3.5 top-3.5 h-4 w-4 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-white"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Article Count */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#b8c7dc] self-end md:self-center">
            <span className="px-3 py-1.5 rounded-full bg-[#051933] border border-cyan-500/30 text-cyan-300 font-bold">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>

        {/* Category Pills Scrolling Container */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/50'
                    : 'bg-[#051933]/70 text-[#b8c7dc] border border-cyan-500/20 hover:border-cyan-400/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of Articles */}
      <section aria-label="Articles Grid">
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridArticles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-cyan-500/30 bg-[#051933]/50 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-cyan-400/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="mt-4 text-base font-bold text-white">No articles found</h3>
            <p className="mt-1 text-sm text-[#b8c7dc]">
              No articles matched &ldquo;{searchQuery}&rdquo;. Try another search term or clear the filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-5 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/30 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
