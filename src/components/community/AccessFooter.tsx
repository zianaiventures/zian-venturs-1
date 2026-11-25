import React from 'react';

const FOOTER_COLUMNS = [
  {
    heading: 'Community',
    links: [
      { label: 'Podcast', href: '#podcast' },
      { label: 'About', href: '#about' },
      { label: 'Ecosystem', href: '#ecosystem' },
      { label: 'Network', href: '#community' },
      { label: 'Apply as a Founder', href: '/#contact' },
    ],
  },
  {
    heading: 'ZiAn Ventures',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Cohorts', href: '/cohorts' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/97402795/admin/dashboard/' },
      { label: 'Instagram', href: 'https://www.instagram.com/zianaiventures/?hl=en' },
      { label: 'YouTube', href: 'https://www.youtube.com/@ZIANAIVENTURES' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
];

// Same stroke glyphs as the ACCESS `Icon` set so header, body and footer read as one brand.
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/97402795/admin/dashboard/',
    path: 'M5 10.5V19M5 6.6v.1M10.5 19v-4.5a3 3 0 016 0V19M10.5 10.5V19M3 3h18v18H3z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/zianaiventures/?hl=en',
    path: 'M4 8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17 6.8v.1',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@ZIANAIVENTURES',
    path: 'M3 7.5A3.5 3.5 0 016.5 4h11A3.5 3.5 0 0121 7.5v9A3.5 3.5 0 0117.5 20h-11A3.5 3.5 0 013 16.5v-9zM10.5 9.5l5 2.5-5 2.5z',
  },
];

export default function AccessFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#04070e] px-4 pb-8 pt-12 sm:pt-14 sm:px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 leading-none">
              <span className="flex items-center text-[26px] font-extrabold tracking-tight">
                <svg viewBox="0 0 22 26" className="mr-[1px] h-[22px] w-[19px] shrink-0" aria-hidden="true">
                  <defs>
                    <linearGradient id="footerArrow" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1f8bf0" />
                      <stop offset="100%" stopColor="#4fd0ff" />
                    </linearGradient>
                  </defs>
                  <path d="M1 25 L11 1 L21 25 L14.5 25 L11 13 L7.5 25 Z" fill="url(#footerArrow)" />
                </svg>
                <span className="bg-gradient-to-r from-[#4fd0ff] to-[#1f8bf0] bg-clip-text text-transparent">
                  ccess
                </span>
              </span>
              <a
                href="/"
                title="Back to ZiAn Ventures"
                className="flex items-center gap-1 whitespace-nowrap text-[11px] font-medium transition hover:opacity-80"
              >
                <span className="text-slate-400">by</span>
                <span className="rounded bg-white px-1.5 py-[2px] text-[10px] font-extrabold uppercase tracking-wider text-[#04070e]">
                  Zian
                </span>
              </a>
            </div>

            <p className="mt-7 text-[15px] leading-relaxed text-slate-400">
              The exclusive ecosystem matching top-tier software engineers, product designers, and growth
              professionals with high-growth startups and venture studios.
            </p>

            <div className="mt-7 flex items-center gap-5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-slate-500 transition hover:text-[#38bdf8]"
                >
                  <svg
                    className="h-[19px] w-[19px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="min-w-0">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-white">
                  {column.heading}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="block truncate text-[15px] text-slate-400 transition hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-slate-500">© 2026 ACCESS by ZIAN. All rights reserved.</p>
          <p className="flex items-center gap-2.5 text-[13px] text-slate-500">
            <span className="live-dot shrink-0" style={{ background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
            Pre-registering for Cohort 1 • India&apos;s Elite Founder &amp; Builder Network
          </p>
        </div>
      </div>
    </footer>
  );
}
