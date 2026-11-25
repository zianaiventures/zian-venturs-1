'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Podcast', target: 'podcast' },
  { label: 'About', target: 'about' },
  { label: 'Ecosystem', target: 'ecosystem' },
  { label: 'Community', target: 'community' },
  { label: 'Connect', target: 'connect' },
];

const SITE_LINKS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Cohorts', href: '/cohorts' },
];

export default function AccessNavbar() {
  const [active, setActive] = useState('podcast');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ target }) => document.getElementById(target)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4">
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 sm:gap-6 rounded-3xl border px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 transition-all duration-300 ${
          isScrolled
            ? 'border-[#38bdf8]/20 bg-[#04070e]/92 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl'
            : 'border-white/[0.07] bg-[#070c17]/70 backdrop-blur-md'
        }`}
      >
        <div className="flex shrink-0 items-center gap-2 leading-none">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-[22px] sm:text-[26px] font-extrabold tracking-tight"
            aria-label="ACCESS — back to top"
          >
            <svg viewBox="0 0 22 26" className="mr-[1px] h-[22px] w-[19px] shrink-0" aria-hidden="true">
              <defs>
                <linearGradient id="accessArrow" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1f8bf0" />
                  <stop offset="100%" stopColor="#4fd0ff" />
                </linearGradient>
              </defs>
              <path d="M1 25 L11 1 L21 25 L14.5 25 L11 13 L7.5 25 Z" fill="url(#accessArrow)" />
            </svg>
            <span className="bg-gradient-to-r from-[#4fd0ff] to-[#1f8bf0] bg-clip-text text-transparent">
              ccess
            </span>
          </a>
          <Link
            href="/"
            title="Back to ZiAn Ventures"
            className="flex items-center gap-1 whitespace-nowrap text-[11px] font-medium tracking-wide transition hover:opacity-80"
            aria-label="ZiAn Ventures home"
          >
            <span className="text-slate-400">by</span>
            <span className="rounded bg-white px-1.5 py-[2px] text-[10px] font-extrabold uppercase tracking-wider text-[#04070e]">
              Zian
            </span>
          </Link>
        </div>

        <nav aria-label="ACCESS page sections" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_ITEMS.map(({ label, target }) => {
            const isActive = active === target;
            return (
              <a
                key={target}
                href={`#${target}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(target);
                }}
                className={`relative text-[15px] transition-colors duration-200 ${
                  isActive ? 'font-semibold text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-[#38bdf8] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            title="Back to ZiAn Ventures"
            className="hidden sm:flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[14px] font-medium text-slate-200 transition hover:border-[#38bdf8]/45 hover:bg-[#38bdf8]/10 hover:text-white sm:px-4"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            <span className="hidden lg:inline">ZiAn Ventures</span>
            <span className="lg:hidden">ZiAn</span>
          </Link>
          <a
            href="/#contact"
            className="glow-btn hidden rounded-full bg-gradient-to-r from-[#1f8bf0] to-[#38bdf8] px-6 py-2.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(56,189,248,0.7)] transition sm:block"
          >
            Join Us
          </a>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            className="rounded-xl border border-white/10 p-2.5 text-slate-300 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-2 max-w-[1400px] rounded-2xl border border-white/10 bg-[#04070e]/97 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] py-3 text-sm font-medium text-slate-100 transition hover:border-[#38bdf8]/45 hover:bg-[#38bdf8]/10"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Back to ZiAn Ventures
          </Link>
          <div className="mt-4 flex flex-col border-t border-white/5 pt-4">
            {NAV_ITEMS.map(({ label, target }) => (
              <a
                key={target}
                href={`#${target}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(target);
                }}
                className={`border-b border-white/5 py-3 text-left text-sm last:border-0 ${
                  active === target ? 'font-semibold text-[#38bdf8]' : 'text-slate-300'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href="/#contact"
            className="mt-4 block w-full rounded-xl bg-gradient-to-r from-[#1f8bf0] to-[#38bdf8] py-3 text-center text-sm font-semibold text-white"
          >
            Join Us
          </a>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
            {SITE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-white/10 py-2 text-center text-xs text-slate-300 transition hover:border-[#38bdf8]/40 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
