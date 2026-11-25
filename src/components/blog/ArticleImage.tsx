'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ArticleImageProps {
  src?: string;
  alt: string;
  category?: string;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  priority?: boolean;
}

export default function ArticleImage({
  src,
  alt,
  category,
  className = '',
  fallbackSrc = '/blog-covers/podcast/building-distribution.jpg',
  aspectRatio = '16/9',
  priority = false,
}: ArticleImageProps) {
  const getCandidates = (primary?: string): string[] => {
    const list: string[] = [];
    if (primary && primary.trim()) {
      let clean = primary.trim();
      if (clean.startsWith('/blog/podcast/')) {
        clean = clean.replace('/blog/podcast/', '/blog-covers/podcast/');
      } else if (clean.startsWith('/blog/meeting-notes/')) {
        clean = clean.replace('/blog/meeting-notes/', '/blog-covers/meeting-notes/');
      }
      list.push(clean);

      if (clean.endsWith('.svg')) {
        list.push(clean.replace('.svg', '.jpg'));
      }
    }

    if (fallbackSrc && !list.includes(fallbackSrc)) {
      list.push(fallbackSrc);
    }
    list.push('/blog-covers/podcast/building-distribution.jpg');
    list.push('/blog-covers/podcast/ai-agent-harness.jpg');
    return Array.from(new Set(list));
  };

  const [candidates, setCandidates] = useState<string[]>(() => getCandidates(src));
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [showInlineFallback, setShowInlineFallback] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const nextList = getCandidates(src);
    setCandidates(nextList);
    setCandidateIndex(0);
    setShowInlineFallback(false);
    setHasError(false);
  }, [src, fallbackSrc]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth === 0) {
        handleError();
      }
    }
  }, [candidateIndex]);

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : '';

  const handleError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setShowInlineFallback(true);
      setHasError(true);
    }
  };

  const currentSrc = candidates[candidateIndex] || fallbackSrc;

  // Render rich inline generative cover if image files fail to load
  if (showInlineFallback || hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#030919] via-[#061838] to-[#02050c] p-6 flex flex-col justify-between select-none ${aspectClass} ${className}`}
      >
        {/* Ambient Glowing Tech Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-black uppercase tracking-wider text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {category || 'ZiAn Editorial'}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            ZiAn Ventures
          </span>
        </div>

        {/* Center Title */}
        <div className="relative z-10 my-auto py-2">
          <h4 className="text-base sm:text-lg lg:text-xl font-black text-white leading-snug tracking-tight line-clamp-3">
            {alt}
          </h4>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between border-t border-cyan-500/20 pt-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Perspective &amp; Analysis
          </span>
          <span className="text-xs font-mono text-slate-400">
            ZiAn Intelligence
          </span>
        </div>

        {/* Corner Neon Border */}
        <div className="absolute inset-0 border border-cyan-500/20 rounded-2xl pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${aspectClass} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt || 'ZiAn Ventures Editorial Cover'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={handleError}
        className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
      />
    </div>
  );
}
