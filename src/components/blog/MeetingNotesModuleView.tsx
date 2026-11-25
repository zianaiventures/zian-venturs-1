'use client';

import React, { useMemo, useState } from 'react';
import { Article } from '@/types/blog';
import MeetingNotesFeaturedCard from './MeetingNotesFeaturedCard';
import MeetingNotesCard from './MeetingNotesCard';
import MeetingNotesFilterBar from './MeetingNotesFilterBar';

export const MEETING_NOTES_CATEGORIES = [
  'All',
  'Healthcare Innovation',
  'MedTech & AI Diagnostics',
  'Venture Building',
  'Healthcare Commercialization',
  'Investment & Fundraising',
  'Specialty Healthcare Practices',
  'Clinical Evidence & Real-World Pilots',
];

export default function MeetingNotesModuleView({
  initialArticles,
}: {
  initialArticles: Article[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Use defined categories, but ensure any dynamic category in articles is also included if present
  const categories = useMemo(() => {
    const set = new Set<string>(MEETING_NOTES_CATEGORIES);
    initialArticles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set);
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((art) => {
      if (activeCategory !== 'All' && art.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = art.title.toLowerCase().includes(q);
        const inExcerpt = art.excerpt.toLowerCase().includes(q);
        const inCategory = (art.category || '').toLowerCase().includes(q);
        const inContent = (art.content || '').toLowerCase().includes(q);
        if (!inTitle && !inExcerpt && !inCategory && !inContent) return false;
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
      {/* Hero Section */}
      <section className="text-center pt-8 sm:pt-12 pb-4 relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#051933]/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 mb-5 shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>Knowledge & Venture Playbooks</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          MEETING NOTES
        </h1>

        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 mx-auto mt-4 rounded-full shadow-lg shadow-cyan-500/30" />

        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-[#b8c7dc] leading-relaxed font-normal">
          Ideas, discussions and knowledge across healthcare innovation and venture building.
        </p>
      </section>

      {/* Featured Document Spotlight */}
      {featured && (
        <section aria-label="Featured Meeting Note">
          <MeetingNotesFeaturedCard article={featured} />
        </section>
      )}

      {/* Search and Category Filters */}
      <section className="border-t border-cyan-500/20 pt-8" aria-label="Meeting Note Filters">
        <MeetingNotesFilterBar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalArticles={filteredArticles.length}
        />
      </section>

      {/* Responsive Documents Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
      <section aria-label="All Meeting Notes Documents">
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridArticles.map((article) => (
              <MeetingNotesCard key={article.id} article={article} />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-cyan-500/30 bg-[#051933]/50 p-12 text-center backdrop-blur-sm">
            <svg
              className="mx-auto h-12 w-12 text-cyan-400/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-base font-bold text-white">No documents found</h3>
            <p className="mt-1 text-sm text-[#b8c7dc]">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#051933] px-4 py-2 text-xs font-semibold text-cyan-300 hover:border-cyan-400"
            >
              Reset Filters
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
