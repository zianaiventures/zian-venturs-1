'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  // `trailingSlash: true` makes usePathname() answer '/portfolio/'.
  const isPortfolioPage = pathname.replace(/\/$/, '') === '/portfolio';

  if (isPortfolioPage) {
    return (
      <footer className="bg-white mt-20 border-t border-slate-100 pt-16 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h3 className="text-2xl font-extrabold text-[#0a192f] mb-4">ZiAn Ventures</h3>
            <p className="text-blue-600 font-medium mb-4">Startup Builders. Not Service Providers.</p>
            <p className="text-slate-500 leading-relaxed text-sm">
              We partner with visionary founders building the next generation of AI-first and enterprise-scale businesses.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-800 mb-6">Quick Links</p>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li><Link className="hover:text-blue-600 transition" href="/#model">Our Model</Link></li>
              <li><Link className="hover:text-blue-600 transition text-blue-600 font-semibold" href="/portfolio">Portfolio</Link></li>
              <li><Link className="hover:text-blue-600 transition" href="/#pathways">Venture Pathways</Link></li>
              <li><Link className="hover:text-blue-600 transition" href="/#outcomes">Outcomes</Link></li>
              <li><Link className="hover:text-blue-600 transition font-semibold" href="/blog">Blog &amp; Perspectives</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-800 mb-6">Connect</p>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li><a className="hover:text-blue-600 transition" href="https://www.linkedin.com/company/97402795/admin/dashboard/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="hover:text-blue-600 transition" href="/#contact">Partner With Us</a></li>
              <li><Link href="/community" className="text-blue-600 font-bold hover:underline cursor-pointer text-left block">Access By ZiAn &rarr;</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 text-center text-slate-300 text-xs">
          © 2026 ZiAn Ventures. All rights reserved.
        </div>
      </footer>
    );
  }

  return (
    <footer id="site-footer" className="relative pt-20 pb-0 bg-gradient-to-b from-[#020c1b] via-[#051933] to-[#0a1628] overflow-hidden">
      {/* Decorative background orbs & grid */}
      <div className="absolute top-[-150px] left-[-120px] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[-80px] right-[80px] w-[400px] h-[400px] rounded-full bg-blue-400/15 blur-[90px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* CTA STRIP */}
        <div className="bg-gradient-to-r from-blue-900/40 to-blue-600/20 border border-blue-500/30 rounded-[20px] px-5 sm:px-8 md:px-14 py-6 sm:py-8 md:py-10 mb-12 md:mb-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>
          <div>
            <p className="inline-flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/25 text-blue-300 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 sm:mb-4">
              <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              ZiAn Venture Ecosystem — Healthcare &amp; D2C Cohorts
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
              Find Your Place in the<br className="hidden sm:inline" /> ZiAn Healthcare &amp; D2C Cohort Networks
            </h2>
            <p className="text-white/50 text-xs sm:text-sm max-w-lg">
              Healthcare &amp; Direct-to-Consumer Innovation. Join 300+ clinicians, D2C brand founders, and industry leaders.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link href="/cohorts" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg shadow-blue-500/30 transition text-center whitespace-nowrap">
              Explore Cohorts &rarr;
            </Link>
            <Link href="/community" className="px-6 py-3 rounded-full border border-blue-400/40 text-blue-300 hover:bg-blue-600/20 font-bold text-sm text-center transition cursor-pointer">
              Access By ZiAn
            </Link>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          <div>
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">36+</div>
            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Portfolio Companies</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">8</div>
            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Countries</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">$0→Scale</div>
            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Typical Journey</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">4</div>
            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Ventures / Quarter</div>
          </div>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent mb-14"></div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="sm:col-span-2 md:col-span-4">
            <Link href="/" className="inline-block cursor-pointer"><img alt="ZiAn Ventures" src="/logo-light-400.png" className="h-10 md:h-11 object-contain mb-5 hover:opacity-90 transition" style={{ maxWidth: '180px' }} /></Link>
            <p className="text-brand-blue font-semibold text-sm mb-4">Startup Builders. Not Service Providers.</p>
            <p className="text-white/40 text-sm leading-relaxed mb-7">
              We partner with visionary founders building the next generation of AI-first and enterprise-scale businesses across 8 countries.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/company/97402795/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-blue-500/25 bg-blue-500/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-500/30 hover:border-blue-500/70 transition shadow-sm" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.instagram.com/zianaiventures/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-blue-500/25 bg-blue-500/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-500/30 hover:border-blue-500/70 transition shadow-sm" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.youtube.com/@ZIANAIVENTURES" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-blue-500/25 bg-blue-500/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-500/30 hover:border-blue-500/70 transition shadow-sm" aria-label="YouTube">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          <div className="sm:col-span-1 md:col-span-2">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6">Navigate</p>
            <ul className="space-y-4">
              <li><Link className="text-white/50 hover:text-blue-400 text-sm flex items-center gap-1.5 transition" href="/"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>Home</Link></li>
              <li><Link className="text-white/50 hover:text-blue-400 text-sm flex items-center gap-1.5 transition" href="/#outcomes"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>Outcomes</Link></li>
              <li><Link className="text-white/50 hover:text-blue-400 text-sm flex items-center gap-1.5 transition" href="/#pathways"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>Venture Pathways</Link></li>
              <li><Link className="text-white/50 hover:text-blue-400 text-sm flex items-center gap-1.5 transition" href="/#model"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>Our Model</Link></li>
              <li><Link className="text-white/50 hover:text-blue-400 text-sm flex items-center gap-1.5 transition" href="/portfolio"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>Portfolio</Link></li>
              <li><Link className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1.5 font-semibold transition" href="/cohorts"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>Cohorts</Link></li>
              <li><Link className="text-white/50 hover:text-blue-400 text-sm flex items-center gap-1.5 transition" href="/blog"><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>Blog &amp; Perspectives</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-1 md:col-span-3">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6">Venture Pathways</p>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><Link className="hover:text-blue-400 transition" href="/#pathways">AI SaaS</Link></li>
              <li><Link className="hover:text-blue-400 transition" href="/#pathways">Enterprise SaaS</Link></li>
              <li><Link className="hover:text-blue-400 transition" href="/#pathways">Global Commerce</Link></li>
              <li><Link className="hover:text-blue-400 transition" href="/#pathways">B2B Marketplace</Link></li>
              <li><Link className="hover:text-blue-400 transition" href="/#pathways">Compliance Tech</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-3">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6">Get In Touch</p>
            <ul className="space-y-4 mb-7 text-white/50 text-sm">
              <li>
                <Link className="hover:text-blue-400 transition flex items-center gap-2" href="/#contact">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Apply as a Founder
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-400 transition flex items-center gap-2" href="/#contact">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  Partner With Us
                </Link>
              </li>
              <li>
                <a className="hover:text-blue-400 transition flex items-center gap-2" href="https://www.linkedin.com/company/97402795/admin/dashboard/" target="_blank" rel="noopener noreferrer">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                  LinkedIn Profile
                </a>
              </li>
            </ul>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/50 text-xs">Global · India · US · UK · SG · AU</span>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      </div>

      <div className="relative z-10 py-6 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-white/25 text-xs">© 2026 ZiAn Ventures. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition">Privacy Policy</a>
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition">Terms of Use</a>
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
