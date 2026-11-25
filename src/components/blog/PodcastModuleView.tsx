'use client';

import React, { useMemo, useState } from 'react';
import { Article } from '@/types/blog';
import FeaturedArticleCard from './FeaturedArticleCard';
import ArticleCard from './ArticleCard';
import CategoryFilterBar from './CategoryFilterBar';

export default function PodcastModuleView({ initialArticles }: { initialArticles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Build categories strictly from available articles
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
        const inKeyword = (art.target_keyword || '').toLowerCase().includes(q);
        if (!inTitle && !inExcerpt && !inGuest && !inKeyword) return false;
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
      {/* Editorial Hero Section */}
      <section className="text-center pt-8 sm:pt-12 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 mb-5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Access Asia Podcast Series</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#051933] max-w-4xl mx-auto leading-[1.12]">
          PODCAST PERSPECTIVES
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Ideas and perspectives from conversations, presented through our editorial content.
        </p>
      </section>

      {/* Featured Article Spotlight */}
      {featured && (
        <section aria-label="Featured Podcast Article">
          <FeaturedArticleCard article={featured} />
        </section>
      )}

      {/* Filter and Search Controls */}
      <section className="border-t border-slate-200/70 pt-8" aria-label="Article Filters">
        <CategoryFilterBar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalArticles={filteredArticles.length}
        />
      </section>

      {/* Responsive Articles Grid */}
      <section aria-label="All Podcast Articles">
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-4 text-base font-bold text-slate-800">No matching articles found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search terms or clearing the category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-5 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
