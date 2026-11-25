'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CHANNEL_HANDLE,
  episodeLabel,
  formatDuration,
  thumbnailSrc,
  watchUrl,
  type CommunityVideo,
  type EpisodeCategory,
} from '@/lib/community-videos';

const HERO_FEATURES = [
  { title: 'Vetted Network', copy: 'Curated founders & builders', icon: 'shield' },
  { title: 'Actionable GTM', copy: 'Tactical sandbox growth', icon: 'bolt' },
  { title: 'Premium Stacks', copy: 'Build with Next.js, Go, AI', icon: 'sparkle' },
] as const;

const EPISODE_FILTERS: Array<'All Episodes' | EpisodeCategory> = [
  'All Episodes',
  'Entrepreneurs',
  'Investors',
  'Leaders',
  'Influencers',
];

const PILLARS = [
  { title: 'Media', copy: 'Podcasts, debates & deep dives', icon: 'mic' },
  { title: 'Events', copy: 'Curated offline experiences', icon: 'calendar' },
  { title: 'Community', copy: 'Private network of vetted peers', icon: 'people' },
  { title: 'Access', copy: 'Direct connection to leading startups', icon: 'key' },
] as const;

const QUOTE_POINTS = [
  'Real founders. Real decisions. Real numbers.',
  'GTM playbooks built from actual execution.',
  'Global expansion strategies that actually work.',
  'Curated access to the right ecosystem.',
  'Built by builders, for builders going global.',
];

const PROGRAMS = [
  {
    title: 'Incubator Showcase',
    copy: 'Spotlight incubators, accelerators, and ecosystem enablers that are shaping the next generation of Indian startups.',
    link: 'Partner With Us',
    icon: 'building',
  },
  {
    title: 'Investor Showcase',
    copy: 'Feature VCs, angel investors, and investment leaders. Connect directly with founders who are at the right stage.',
    link: 'Get Featured',
    icon: 'dollar',
  },
  {
    title: 'Operator Showcase',
    copy: 'Showcase growth operators, marketers, builders, and execution leaders who are the backbone of every great startup.',
    link: 'Join Network',
    icon: 'gear',
  },
  {
    title: 'Podcast with Leaders',
    copy: 'Deep 45–60 minute conversations with founders, operators, and investors. No fluff. Just the decisions, numbers, and real playbooks.',
    link: 'Listen Now',
    icon: 'mic',
  },
  {
    title: 'Builder Community',
    copy: 'Private circles, offline meetups, and direct access to trusted peer cohorts to help you solve hard company problems.',
    link: 'Apply to Cohort',
    icon: 'people',
  },
] as const;

const MEMBERSHIP_PERKS = [
  'Curated founder-to-investor introductions',
  'Operator insights & tactical playbooks',
  'Live fireside sessions with leaders',
  'Exclusive ACCESS by ZIAN offline events',
  'Ecosystem hiring board & talent network',
  'Early access to podcast deep-dives',
  'GTM playbooks & global expansion frameworks',
];

const PLATFORMS = [
  { name: 'ZiAn Ventures', handle: 'zianai.ventures', href: '/', icon: 'globe', tone: '#38bdf8' },
  { name: 'LinkedIn', handle: 'ZiAn Ventures', href: 'https://www.linkedin.com/company/97402795/admin/dashboard/', icon: 'linkedin', tone: '#38bdf8' },
  { name: 'Instagram', handle: '@zianaiventures', href: 'https://www.instagram.com/zianaiventures/?hl=en', icon: 'instagram', tone: '#f472b6' },
  { name: 'YouTube', handle: CHANNEL_HANDLE, href: 'https://www.youtube.com/@ZIANAIVENTURES', icon: 'youtube', tone: '#ff4d5e' },
] as const;

const AUTO_ROTATE_MS = 6000;

export default function CommunityExperience({ videos }: { videos: CommunityVideo[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [filter, setFilter] = useState<(typeof EPISODE_FILTERS)[number]>('All Episodes');
  const railRef = useRef<HTMLDivElement | null>(null);
  const [railProgress, setRailProgress] = useState(0);

  const total = videos.length;
  const active = videos[Math.min(activeIndex, total - 1)];

  useEffect(() => {
    if (!isRotating || total < 2) return;
    const timer = window.setInterval(() => setActiveIndex((i) => (i + 1) % total), AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [isRotating, total]);

  const filtered = useMemo(
    () => (filter === 'All Episodes' ? videos : videos.filter((v) => v.category === filter)),
    [videos, filter]
  );

  const syncRail = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const scrollable = rail.scrollWidth - rail.clientWidth;
    setRailProgress(scrollable > 0 ? rail.scrollLeft / scrollable : 0);
  }, []);

  useEffect(() => {
    syncRail();
  }, [filtered, syncRail]);

  const nudgeRail = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.8, 1020), behavior: 'smooth' });
  };

  const scrollToId = (id: string) => {
    if (id === 'apply') {
      window.location.assign('/#contact');
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
  };

  if (!active) return null;

  return (
    <main id="top" className="access-page min-h-screen bg-[#04070e] pt-20 sm:pt-24 text-white">
      <HeroSection
        active={active}
        activeIndex={activeIndex}
        total={total}
        onSelect={setActiveIndex}
        onHoverPause={(paused) => setIsRotating(!paused)}
      />

      <ConversationsSection
        videos={videos}
        filtered={filtered}
        filter={filter}
        setFilter={setFilter}
        railRef={railRef}
        onScroll={syncRail}
        nudgeRail={nudgeRail}
        railProgress={railProgress}
      />

      <AboutSection />
      <EcosystemSection onJump={scrollToId} />
      <NetworkSection />
      <ConnectSection />
    </main>
  );
}

/* ------------------------------------------------------------------ hero */

function HeroSection({
  active,
  activeIndex,
  total,
  onSelect,
  onHoverPause,
}: {
  active: CommunityVideo;
  activeIndex: number;
  total: number;
  onSelect: (index: number) => void;
  onHoverPause: (paused: boolean) => void;
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-12 sm:pb-16 lg:pb-20 pt-3 sm:pt-6 md:px-12">
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[#1f8bf0]/12 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-[#38bdf8]/8 blur-[140px]" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#38bdf8]/25 bg-[#0b1a2e]/70 px-4 py-1.5 text-[12.5px] font-medium text-[#7dd3fc]">
            <Icon name="sparkle" className="h-4 w-4" />
            Pre-registering for Cohort 1
          </span>

          <h1 className="mt-5 sm:mt-6 text-[clamp(2.4rem,4.2vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Where <Accent>Builders</Accent>
            <br />
            Meet <Accent>Scale</Accent>.
          </h1>

          <p className="mt-4 sm:mt-5 max-w-xl text-[16.5px] sm:text-[18px] leading-[1.6] text-slate-400">
            ACCESS by ZIAN is India&apos;s elite startup developer ecosystem. We match top builders with
            high-growth startups, back them with expert advice, and host unscripted founder roundtables.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href="/#contact"
              className="glow-btn inline-flex items-center gap-2.5 rounded-full bg-white px-7 sm:px-8 py-3.5 text-[15px] font-bold text-[#04070e] transition hover:bg-slate-100"
            >
              Join Us
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <a
              href="#ecosystem"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('ecosystem');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
              }}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-7 sm:px-8 py-3.5 text-[15px] font-semibold text-white transition hover:border-[#38bdf8]/40 hover:bg-white/[0.07]"
            >
              Explore Ecosystem
            </a>
          </div>

          <div className="mt-8 sm:mt-10 grid max-w-2xl gap-x-5 gap-y-5 border-t border-white/[0.07] pt-6 sm:pt-7 sm:grid-cols-3">
            {HERO_FEATURES.map((feature) => (
              <div key={feature.title} className="flex min-w-0 items-start gap-3 sm:gap-3.5">
                <span className="grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#38bdf8]">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-bold leading-snug text-white">{feature.title}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-slate-500">{feature.copy}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <BroadcastCard
          active={active}
          activeIndex={activeIndex}
          total={total}
          onSelect={onSelect}
          onHoverPause={onHoverPause}
        />
      </div>
    </section>
  );
}

function BroadcastCard({
  active,
  activeIndex,
  total,
  onSelect,
  onHoverPause,
}: {
  active: CommunityVideo;
  activeIndex: number;
  total: number;
  onSelect: (index: number) => void;
  onHoverPause: (paused: boolean) => void;
}) {
  const tabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tab = tabsRef.current?.querySelector<HTMLElement>(`[data-ep="${activeIndex}"]`);
    tab?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div
      onMouseEnter={() => onHoverPause(true)}
      onMouseLeave={() => onHoverPause(false)}
      className="relative mx-auto min-w-0 w-full max-w-[540px] overflow-hidden rounded-[24px] border border-[#38bdf8]/15 bg-gradient-to-b from-[#0a1526] to-[#070d18] p-5 shadow-[0_30px_70px_-38px_rgba(0,0,0,0.95)] sm:p-6 lg:ml-auto lg:mr-0"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff4d5e]">
          <span className="live-dot" style={{ background: '#ff4d5e', boxShadow: '0 0 10px #ff4d5e' }} />
          Live Sandbox Broadcast
        </span>
        <span className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
            Episode #{String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="rounded-full border border-[#38bdf8]/30 px-2.5 py-1 text-[11px] font-medium text-[#7dd3fc]">
            Auto-Scrolling
          </span>
        </span>
      </div>

      <div
        ref={tabsRef}
        className="access-hide-scroll mt-3.5 sm:mt-4 flex items-center gap-2 overflow-x-auto pb-1"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/[0.07] text-slate-600">
          <Icon name="chevronLeft" className="h-3.5 w-3.5" />
        </span>
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              data-ep={index}
              onClick={() => onSelect(index)}
              className={`shrink-0 rounded-lg px-2.5 py-1 font-mono text-[11px] tracking-wider transition ${
                isActive
                  ? 'bg-[#1f8bf0] font-bold text-white shadow-[0_0_18px_-4px_rgba(56,189,248,0.8)]'
                  : 'border border-white/[0.07] text-slate-500 hover:border-[#38bdf8]/30 hover:text-slate-300'
              }`}
            >
              {episodeLabel(index)}
            </button>
          );
        })}
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/[0.07] text-slate-600">
          <Icon name="chevronRight" className="h-3.5 w-3.5" />
        </span>
      </div>

      <h2 className="mt-3.5 line-clamp-2 text-[17px] sm:text-[18px] font-bold leading-[1.35] text-white" title={active.title}>
        {active.title}
      </h2>
      <p className="mt-1.5 text-[12.5px] sm:text-[13px] leading-relaxed text-slate-400">
        {active.series.split(' · ')[1] ?? 'Unscripted conversations with the builders shaping the ecosystem.'}
      </p>

      <a
        href={watchUrl(active.id)}
        target="_blank"
        rel="noreferrer"
        className="group relative mt-3.5 block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060b14]"
      >
        <img
          src={thumbnailSrc(active.id)}
          alt=""
          loading="eager"
          className="aspect-video w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <span className="absolute left-2.5 top-2.5 flex items-center gap-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
          <span className="live-dot" style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          {active.series.split(' · ')[0]}
          <span className="text-slate-400">· {active.category}</span>
        </span>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#ff2d55] shadow-[0_0_30px_-6px_rgba(255,45,85,0.9)] transition group-hover:scale-110">
          <Icon name="play" className="ml-0.5 h-[18px] w-[18px] text-white" />
        </span>
        <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-md bg-black/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
          Click to play video
        </span>
      </a>

      <div className="mt-3.5 flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
          Preview ({episodeLabel(activeIndex)})
        </span>
        <span className="flex items-end gap-[3px]">
          {[10, 18, 26, 16, 22, 12].map((height, i) => (
            <span
              key={i}
              className="access-wave w-[3px] rounded-full bg-[#38bdf8]"
              style={{ height, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </span>
        <span className="font-mono text-[11px] text-slate-500">{formatDuration(active.published)}</span>
      </div>

      <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#1f8bf0] to-[#4fd0ff] transition-[width] duration-700"
          style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
        />
      </div>

      <a
        href={watchUrl(active.id)}
        target="_blank"
        rel="noreferrer"
        className="mt-3.5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#ff2d55] to-[#e11d48] py-3 text-[14px] font-bold text-white shadow-[0_16px_34px_-18px_rgba(255,45,85,0.8)] transition hover:brightness-110"
      >
        <Icon name="play" className="h-4 w-4" />
        Play Video Stream Now
      </a>

      <div className="mt-3 flex items-center justify-between text-[11.5px] sm:text-[12px]">
        <span className="text-slate-500">Verified Audience: 420+ Builders</span>
        <a href={`https://www.youtube.com/@ZIANAIVENTURES`} target="_blank" rel="noreferrer" className="font-medium text-[#38bdf8] hover:underline">
          Join Chat Room
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- podcast */

function ConversationsSection({
  videos,
  filtered,
  filter,
  setFilter,
  railRef,
  onScroll,
  nudgeRail,
  railProgress,
}: {
  videos: CommunityVideo[];
  filtered: CommunityVideo[];
  filter: string;
  setFilter: (f: (typeof EPISODE_FILTERS)[number]) => void;
  railRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
  nudgeRail: (dir: 1 | -1) => void;
  railProgress: number;
}) {
  return (
    <section id="podcast" className="border-t border-white/[0.05] bg-[#050912] px-4 py-14 sm:py-16 lg:py-20 sm:px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow index="001" label="Build Conversations" />
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[12px] font-medium text-emerald-300">
            <span className="live-dot" style={{ background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
            Auto-Synced Live from {CHANNEL_HANDLE}
          </span>
        </div>

        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
          <div>
            <h2 className="text-[1.85rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-[36px] lg:text-[46px]">
              Conversations That <Accent>Move</Accent> the Needle
            </h2>
            <p className="mt-3 sm:mt-4 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-slate-400">
              Unscripted founder roundtables, AI masterclasses, and venture strategy. Scroll horizontally to
              browse episodes.
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-5 self-start sm:self-auto">
            <span className="font-mono text-[13px] text-slate-500">{filtered.length} Episodes</span>
            <span className="flex items-center gap-2">
              <button
                onClick={() => nudgeRail(-1)}
                aria-label="Previous episodes"
                className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#38bdf8]/40 hover:text-white"
              >
                <Icon name="chevronLeft" className="h-4 w-4" />
              </button>
              <button
                onClick={() => nudgeRail(1)}
                aria-label="Next episodes"
                className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#38bdf8]/40 hover:text-white"
              >
                <Icon name="chevronRight" className="h-4 w-4" />
              </button>
            </span>
          </div>
        </div>

        <div className="mt-6 sm:mt-7 flex flex-wrap gap-2 sm:gap-2.5">
          {EPISODE_FILTERS.map((option) => {
            const isActive = option === filter;
            return (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`rounded-full px-4 sm:px-5 py-2 text-[13px] sm:text-[14px] font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1f8bf0] to-[#38bdf8] text-white shadow-[0_10px_28px_-14px_rgba(56,189,248,0.9)]'
                    : 'border border-white/[0.09] bg-white/[0.02] text-slate-400 hover:border-[#38bdf8]/30 hover:text-white'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div
          ref={railRef}
          onScroll={onScroll}
          className="access-hide-scroll mt-6 sm:mt-8 flex snap-x snap-mandatory gap-5 sm:gap-6 overflow-x-auto pb-2"
        >
          {filtered.map((video) => (
            <EpisodeCard key={video.id} video={video} number={videos.indexOf(video)} />
          ))}
        </div>

        <div className="mt-5 sm:mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1f8bf0] to-[#4fd0ff] transition-[width,margin] duration-200"
            style={{ width: `${Math.max(railProgress, 0.12) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}

function EpisodeCard({ video, number }: { video: CommunityVideo; number: number }) {
  const href = watchUrl(video.id);
  return (
    <article className="w-[280px] sm:w-[310px] xl:w-[320px] shrink-0 snap-start rounded-2xl border border-white/[0.07] bg-[#070d18] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#38bdf8]/25 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.9)]">
      <a href={href} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-xl">
        <img
          src={thumbnailSrc(video.id)}
          alt={video.title}
          loading="lazy"
          className="aspect-video w-full bg-[#0b1420] object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        <span className="absolute left-2.5 top-2.5 rounded-md border border-[#38bdf8]/30 bg-black/65 px-2 py-1 font-mono text-[10px] tracking-wider text-[#7dd3fc] backdrop-blur">
          {episodeLabel(number)}
        </span>
        <span className="absolute right-2.5 top-2.5 rounded-md bg-black/65 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur">
          {video.category}
        </span>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#ff2d55] shadow-[0_0_26px_-6px_rgba(255,45,85,0.95)] transition group-hover:scale-110">
          <Icon name="play" className="ml-0.5 h-4 w-4 text-white" />
        </span>
      </a>

      <h3 className="mt-3 line-clamp-2 text-[15px] sm:text-[16px] font-bold leading-snug text-white" title={video.title}>
        {video.title}
      </h3>
      <p className="mt-2 text-[12.5px]">
        <span className="font-semibold text-[#38bdf8]">{video.series.split(' · ')[0]}</span>
        <span className="text-slate-500"> · {video.series.split(' · ')[1]}</span>
      </p>

      <div className="mt-3.5 flex items-center justify-between border-t border-white/[0.06] pt-3">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#ff2d55]/35 bg-[#ff2d55]/10 px-3 py-1.5 text-[12px] font-semibold text-[#ff6b81] transition hover:bg-[#ff2d55]/20 hover:text-white"
        >
          <Icon name="play" className="h-3 w-3" />
          Watch Episode
        </a>
        <span className="flex items-center gap-2">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Open episode in a new tab"
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.07] text-slate-500 transition hover:border-[#38bdf8]/30 hover:text-white"
          >
            <Icon name="external" className="h-3.5 w-3.5" />
          </a>
        </span>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------- about */

function AboutSection() {
  return (
    <section id="about" className="border-t border-white/[0.05] px-4 py-14 sm:py-16 lg:py-20 sm:px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Eyebrow index="002" label="About Access by Zian" />

        <div className="mt-6 sm:mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 items-start">
          <div>
            <h2 className="text-[1.85rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-[36px] lg:text-[46px]">
              More Than a Platform.
              <br />
              It&apos;s a <Accent>Movement</Accent>.
            </h2>

            <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16.5px] leading-[1.7] text-slate-400">
              ACCESS by ZIAN is a modern founder ecosystem built for{' '}
              <strong className="font-bold text-white">ambitious builders who are serious about the journey</strong>.
              Not a podcast. Not a conference. A living, breathing network where the right people meet, connect,
              and grow together.
            </p>

            <p className="mt-4 text-[15px] sm:text-[16.5px] leading-[1.7] text-slate-400">
              We sit at the intersection of{' '}
              <strong className="font-bold text-white">media, community, events, and access</strong> — creating a
              flywheel that compounds over time. Every conversation we host, every event we run, and every founder
              we spotlight adds another layer to the ecosystem.
            </p>

            <p className="mt-4 text-[15px] sm:text-[16.5px] leading-[1.7] text-slate-400">
              The goal is simple:{' '}
              <strong className="font-bold text-white">
                make it impossible for serious founders to not know each other.
              </strong>
            </p>

            <div className="mt-7 sm:mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="glass-card rounded-2xl border border-white/[0.07] bg-[#070d18] p-5 sm:p-6"
                >
                  <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#38bdf8]">
                    <Icon name={pillar.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[17px] font-bold text-white">{pillar.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{pillar.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative h-fit overflow-hidden rounded-3xl border border-[#38bdf8]/15 bg-gradient-to-b from-[#0a1526] to-[#070d18] p-6 sm:p-8 lg:sticky lg:top-28">
            <p className="text-[20px] sm:text-[24px] font-bold leading-[1.35] tracking-[-0.015em] text-[#4fd0ff]">
              &ldquo;The best decisions happen when the right people are in the same room.&rdquo;
            </p>

            <ul className="mt-6 sm:mt-7 space-y-3 sm:space-y-3.5">
              {QUOTE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14px] sm:text-[15px] text-slate-300">
                  <span className="mt-[3px] text-[#38bdf8]">
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-7 sm:mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">
              <span className="font-mono text-[12px] tracking-wider text-[#38bdf8]">100% Vetted Community</span>
              <span className="text-[13px] text-slate-500">Global Founders</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- ecosystem */

function EcosystemSection({ onJump }: { onJump: (id: string) => void }) {
  const [tab, setTab] = useState('All Programs');
  const tabs = ['All Programs', 'Showcases', 'Media', 'Community'];

  const visible = useMemo(() => {
    if (tab === 'Showcases') return PROGRAMS.filter((p) => p.title.includes('Showcase'));
    if (tab === 'Media') return PROGRAMS.filter((p) => p.icon === 'mic');
    if (tab === 'Community') return PROGRAMS.filter((p) => p.icon === 'people');
    return PROGRAMS;
  }, [tab]);

  return (
    <section id="ecosystem" className="border-t border-white/[0.05] bg-[#050912] px-4 py-14 sm:py-16 lg:py-20 sm:px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Eyebrow index="003" label="Ecosystem Directory" />

        <h2 className="mt-5 sm:mt-6 text-[1.85rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-[36px] lg:text-[46px]">
          The <Accent>Ecosystem</Accent> Programs
        </h2>

        <p className="mt-3 sm:mt-4 max-w-2xl text-[15px] sm:text-[16px] leading-relaxed text-slate-400">
          Targeted programs and access channels connecting builders, operators, and institutional capital across critical company milestones.
        </p>

        <div className="mt-6 sm:mt-7 flex flex-wrap gap-2 sm:gap-2.5">
          {tabs.map((option) => {
            const isActive = option === tab;
            return (
              <button
                key={option}
                onClick={() => setTab(option)}
                className={`rounded-full px-4 sm:px-5 py-2 text-[13px] sm:text-[14px] font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1f8bf0] to-[#38bdf8] text-white shadow-[0_10px_28px_-14px_rgba(56,189,248,0.9)]'
                    : 'border border-white/[0.09] bg-white/[0.02] text-slate-400 hover:border-[#38bdf8]/30 hover:text-white'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-7 sm:mt-9 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((program, position) => {
            const number = PROGRAMS.indexOf(program) + 1;
            return (
              <div
                key={program.title}
                className="glass-card flex flex-col rounded-2xl border border-white/[0.07] bg-[#070d18] p-6 sm:p-7 transition duration-300 hover:border-[#38bdf8]/30 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[12px] sm:text-[13px] tracking-wider text-[#38bdf8]">
                    {String(number).padStart(2, '0')}
                  </span>
                  <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#38bdf8]">
                    <Icon name={program.icon} className="h-5 w-5" />
                  </span>
                </div>

                <h3 className="mt-4 sm:mt-5 text-[18px] sm:text-[20px] font-bold text-white">{program.title}</h3>
                <p className="mt-2.5 flex-1 text-[13.5px] sm:text-[14px] leading-relaxed text-slate-400">{program.copy}</p>

                <button
                  onClick={() => (program.link === 'Listen Now' ? onJump('podcast') : onJump('apply'))}
                  className="mt-5 sm:mt-6 self-start text-[13.5px] sm:text-[14px] font-semibold text-[#38bdf8] transition hover:text-[#4fd0ff]"
                >
                  {program.link} →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- community */

function NetworkSection() {
  return (
    <section id="community" className="border-t border-white/[0.05] px-4 py-14 sm:py-16 lg:py-20 sm:px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Eyebrow index="004" label="Community Network" />

        <div className="mt-6 sm:mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-[1.85rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-[36px] lg:text-[46px]">
              The Network Is
              <br />
              The <Accent>Product</Accent>.
            </h2>

            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-slate-400">
              The Access by Zian community is curated, not crowded. Every member is vetted. Every introduction is
              intentional — built for signal, not volume.
            </p>

            <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.7] text-slate-400">
              Founders talk with founders, operators share execution playbooks, and investors access high-conviction deal
              flow aligned with their thesis.
            </p>

            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#38bdf8]/25 bg-[#0b1a2e]/60 px-3 py-1.5 text-xs font-semibold text-[#7dd3fc]">
                <Icon name="shield" className="h-3.5 w-3.5" /> 100% Vetted
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300">
                <Icon name="bolt" className="h-3.5 w-3.5 text-[#38bdf8]" /> Zero Noise
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300">
                <Icon name="key" className="h-3.5 w-3.5 text-[#38bdf8]" /> Direct Access
              </span>
            </div>

            <div className="mt-6 sm:mt-7">
              <a
                href="/#contact"
                className="glow-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1f8bf0] to-[#38bdf8] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-14px_rgba(56,189,248,0.9)] transition"
              >
                Apply for Community Access
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {MEMBERSHIP_PERKS.map((perk) => (
                <div
                  key={perk}
                  className="glass-card flex items-start gap-3 rounded-xl border border-white/[0.07] bg-[#070d18] p-4 transition duration-200 hover:border-[#38bdf8]/30"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#38bdf8]/10 text-[#38bdf8]">
                    <Icon name="arrowRight" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[13.5px] sm:text-[14px] font-medium leading-snug text-slate-200">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- connect */

function ConnectSection() {
  return (
    <section id="connect" className="border-t border-white/[0.05] bg-[#050912] px-4 py-14 sm:py-16 lg:py-20 sm:px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-[#38bdf8]/45" />
          <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-[#38bdf8]">The Ecosystem</span>
          <span className="h-px w-10 bg-[#38bdf8]/45" />
        </div>

        <h2 className="mt-5 text-center text-[1.85rem] font-extrabold leading-[1.1] tracking-[-0.025em] sm:text-[36px] lg:text-[46px]">
          Connect With <Accent>ACCESS</Accent> <span className="text-slate-500">by</span> <Accent>ZIAN</Accent>
        </h2>

        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-center text-[15px] sm:text-[16px] leading-relaxed text-slate-400">
          Find us across every platform — conversations, content, and community all in one ecosystem.
        </p>

        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target={platform.href.startsWith('http') ? '_blank' : undefined}
              rel={platform.href.startsWith('http') ? 'noreferrer' : undefined}
              className="glass-card group rounded-2xl border border-white/[0.07] bg-[#070d18] p-6 sm:p-7 text-center transition duration-300 hover:border-[#38bdf8]/30 hover:-translate-y-1"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] transition group-hover:border-[#38bdf8]/30">
                <Icon name={platform.icon} className="h-5 w-5" style={{ color: platform.tone }} />
              </span>
              <span className="mt-4 block text-[17px] font-bold text-white">{platform.name}</span>
              <span className="mt-1 block font-mono text-[12.5px]" style={{ color: platform.tone }}>
                {platform.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ shared */

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-b from-[#5ec8ff] to-[#1e88e5] bg-clip-text text-transparent">{children}</span>
  );
}

function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 bg-[#38bdf8]/45" />
      <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-[#38bdf8]">
        {index} — {label}
      </span>
    </div>
  );
}

const PATHS: Record<string, React.ReactNode> = {
  shield: <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6l7-3z" />,
  bolt: <path d="M13 2L4.5 13.5H11l-1 8.5 9.5-12H12l1-8z" />,
  sparkle: <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.4L12 3zm6.5 8.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />,
  arrowRight: <path d="M4 12h15m-6-6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  play: <path d="M8 5.5v13l11-6.5-11-6.5z" />,
  external: <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />,
  mic: (
    <>
      <path d="M12 3a3 3 0 013 3v5a3 3 0 01-6 0V6a3 3 0 013-3z" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" />
    </>
  ),
  calendar: (
    <>
      <path d="M4 6.5h16v14H4v-14z" />
      <path d="M4 11h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  people: (
    <>
      <path d="M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2.5 20a6.5 6.5 0 0113 0" />
      <path d="M16 5.5a3 3 0 010 6M17.5 14.5a5.5 5.5 0 014 5.5" />
    </>
  ),
  key: (
    <>
      <path d="M15.5 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
      <path d="M13 8L4 17v3h3l1-1v-2h2v-2h2l3-3" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6a1 1 0 011-1h8a1 1 0 011 1v15M14 10h5a1 1 0 011 1v10M3 21h18" />
      <path d="M7 8.5h3M7 12.5h3M7 16.5h3M17 13.5h1M17 17.5h1" />
    </>
  ),
  dollar: (
    <>
      <path d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z" />
      <path d="M14.5 9.5A2.5 2.5 0 0012 8h-.5a2 2 0 000 4h1a2 2 0 010 4H12a2.5 2.5 0 01-2.5-1.5M12 6.5v11" />
    </>
  ),
  gear: (
    <>
      <path d="M12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 8.6a3.4 3.4 0 100 6.8 3.4 3.4 0 000-6.8z" />
      <path
        strokeWidth={2.4}
        d="M12 3.4v2.4M12 18.2v2.4M20.6 12h-2.4M5.8 12H3.4M18 6l-1.7 1.7M7.7 16.3 6 18M18 18l-1.7-1.7M7.7 7.7 6 6"
      />
    </>
  ),
  globe: (
    <>
      <path d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z" />
      <path d="M2.8 9h18.4M2.8 15h18.4M12 2.5c2.5 3 2.5 16 0 19M12 2.5c-2.5 3-2.5 16 0 19" />
    </>
  ),
  linkedin: (
    <>
      <path d="M5 10.5V19M5 6.6v.1M10.5 19v-4.5a3 3 0 016 0V19" />
      <path d="M10.5 10.5V19M3 3h18v18H3z" />
    </>
  ),
  instagram: (
    <>
      <path d="M4 8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8z" />
      <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17 6.8v.1" />
    </>
  ),
  youtube: (
    <>
      <path d="M3 7.5A3.5 3.5 0 016.5 4h11A3.5 3.5 0 0121 7.5v9A3.5 3.5 0 0117.5 20h-11A3.5 3.5 0 013 16.5v-9z" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" />
    </>
  ),
};

function Icon({
  name,
  className = 'h-5 w-5',
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const isSolid = name === 'play' || name === 'bolt' || name === 'sparkle';
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill={isSolid ? 'currentColor' : 'none'}
      stroke={isSolid ? 'none' : 'currentColor'}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.sparkle}
    </svg>
  );
}
