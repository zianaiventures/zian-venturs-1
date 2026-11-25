'use client';

import React, { useState } from 'react';
import ArticleImage from './ArticleImage';

const IMAGE_STYLES = [
  {
    id: '3d-render',
    label: '3D Photorealistic Render',
    description: 'Cinematic depth-of-field, glowing audio waveforms, and floating frosted glassmorphism cards.',
    src: '/blog/meeting-notes/meeting-notes-hero.png',
  },
  {
    id: 'architectural-vector',
    label: 'Architectural Vector Blueprint',
    description: 'Precision isometric perspective grid, structured decision matrix, and crystal-clear vector lines.',
    src: '/blog/meeting-notes/meeting-notes-preview.svg',
  },
];

export default function MeetingNotesPlaceholder() {
  const [selectedStyle, setSelectedStyle] = useState(IMAGE_STYLES[0]);

  return (
    <div className="py-10 sm:py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Future Module Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#051933] leading-tight">
          MEETING NOTES
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto">
          Reserved for future meeting notes content.
        </p>

        {/* Visual Preview Showcase with Style Switcher */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xl shadow-slate-200/50 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Visual Artwork Preview</p>
              <h3 className="text-base font-extrabold text-[#051933]">{selectedStyle.label}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedStyle.description}</p>
            </div>

            {/* Style Selector Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
              {IMAGE_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedStyle.id === style.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {style.label.split(' ')[0]} {style.label.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-950">
            <ArticleImage
              src={selectedStyle.src}
              alt={selectedStyle.label}
              aspectRatio="16/9"
              priority
              className="w-full"
            />
          </div>
        </div>

        {/* Clean Empty State Requirement */}
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-12 shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-slate-900">
            Meeting Notes content will be available here.
          </h3>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            This module architecture is preserved and ready for future meeting notes integration. No mock records or generated summaries are populated.
          </p>
        </div>
      </div>
    </div>
  );
}
