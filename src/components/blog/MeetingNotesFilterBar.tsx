'use client';

import React from 'react';

interface MeetingNotesFilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalArticles: number;
}

export default function MeetingNotesFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalArticles,
}: MeetingNotesFilterBarProps) {
  return (
    <div className="space-y-6">
      {/* Search Input and Summary Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search meeting notes, venture models, clinical pilots..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#051933]/90 border border-cyan-500/25 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition backdrop-blur-md shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <div className="text-xs font-mono text-cyan-400/90 whitespace-nowrap self-end sm:self-center">
          Showing <span className="font-bold text-white">{totalArticles}</span> documents
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan-500/20">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-500/25 scale-[1.02]'
                  : 'bg-[#051933]/80 text-[#b8c7dc] border-cyan-500/20 hover:text-white hover:border-cyan-400/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
