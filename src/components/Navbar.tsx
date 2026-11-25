'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  // `trailingSlash: true` makes usePathname() answer '/portfolio/', so compare against
  // the slash-free form the route constants in this file are written as.
  const path = pathname.replace(/\/$/, '') || '/';

  const isPortfolioPage = path === '/portfolio';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change or screen resize
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isPortfolioPage) {
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <nav className="max-w-7xl mx-auto py-3.5 px-4 sm:px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="flex items-center shrink-0">
            <img alt="ZiAn Ventures" className="h-9 sm:h-10 md:h-11 object-contain" style={{ maxWidth: '170px' }} src="/logo-400.png" />
          </Link>

          {/* Desktop & Tablet Links */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-7 text-gray-600 font-medium text-sm">
            <Link className="hover:text-blue-600 transition" href="/">Home</Link>
            <Link className="hover:text-blue-600 transition" href="/#outcomes">Outcomes</Link>
            <Link className="hover:text-blue-600 transition" href="/#pathways">Venture Pathways</Link>
            <Link className="hover:text-blue-600 transition" href="/#model">Our Model</Link>
            <Link className="text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5" href="/portfolio">Portfolio</Link>
            <Link className="hover:text-blue-600 transition font-semibold" href="/cohorts">Cohorts</Link>
            <Link className={`hover:text-blue-600 transition font-semibold ${path.startsWith('/blog') ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5' : ''}`} href="/blog">Blog</Link>
            <Link
              href="/community"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition shadow-md shadow-blue-500/20 text-xs font-bold glow-btn cursor-pointer inline-block"
            >
              Access By ZiAn
            </Link>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-slate-100 focus:outline-none transition"
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </nav>

        {/* Mobile & Tablet Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-gray-200 px-6 py-5 flex flex-col space-y-3.5 text-gray-700 font-medium shadow-xl">
            <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 py-1.5 border-b border-gray-100 transition text-sm" href="/">Home</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 py-1.5 border-b border-gray-100 transition text-sm" href="/#outcomes">Outcomes</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 py-1.5 border-b border-gray-100 transition text-sm" href="/#pathways">Venture Pathways</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 py-1.5 border-b border-gray-100 transition text-sm" href="/#model">Our Model</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="text-blue-600 font-bold py-1.5 border-b border-gray-100 text-sm" href="/portfolio">Portfolio</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 font-semibold py-1.5 border-b border-gray-100 text-sm" href="/cohorts">Cohorts &amp; Ecosystem</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className={`hover:text-blue-600 font-semibold py-1.5 border-b border-gray-100 text-sm ${path.startsWith('/blog') ? 'text-blue-600 font-bold' : ''}`} href="/blog">Blog</Link>
            <Link
              href="/community"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-blue-600 text-white font-bold py-3 rounded-xl text-center text-sm hover:bg-blue-700 transition shadow-md shadow-blue-600/30 mt-2 block w-full cursor-pointer"
            >
              Access By ZiAn
            </Link>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50">
      <nav
        id="main-nav"
        className={`py-3 sm:py-3.5 px-4 sm:px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          isScrolled
            ? 'bg-[#051933]/95 shadow-2xl shadow-black/50 border-b border-blue-500/25 backdrop-blur-md'
            : 'bg-[#051933]/85 backdrop-blur-md border-b border-blue-500/15'
        }`}
      >
        <Link href="/" className="logo-wrap flex items-center gap-3 shrink-0">
          <img alt="ZiAn Ventures Logo" className="h-9 sm:h-10 md:h-11 object-contain" style={{ maxWidth: '170px' }} src="/logo-light-400.png" />
        </Link>

        {/* Desktop & Tablet Links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-7">
          <Link className={`text-sm font-medium transition ${path === '/' ? 'text-white font-semibold' : 'text-white/70 hover:text-white'}`} href="/">
            Home
          </Link>
          <Link className="text-white/70 hover:text-white text-sm font-medium transition" href="/#outcomes">
            Outcomes
          </Link>
          <Link className="text-white/70 hover:text-white text-sm font-medium transition" href="/#pathways">
            Venture Pathways
          </Link>
          <Link className="text-white/70 hover:text-white text-sm font-medium transition" href="/#model">
            Our Model
          </Link>
          <Link className="text-white/70 hover:text-white text-sm font-medium transition" href="/portfolio">
            Portfolio
          </Link>
          <Link className={`text-sm font-semibold transition ${path === '/cohorts' ? 'text-brand-lightBlue border-b-2 border-brand-lightBlue pb-0.5' : 'text-brand-lightBlue hover:text-white'}`} href="/cohorts">
            Cohorts
          </Link>
          <Link className={`text-sm font-semibold transition ${path.startsWith('/blog') ? 'text-blue-400 border-b-2 border-blue-400 pb-0.5 font-bold' : 'text-white/80 hover:text-white'}`} href="/blog">
            Blog
          </Link>
          <Link
            href="/community"
            className="glow-btn relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer inline-flex"
          >
            <span>Access By ZiAn</span>
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          </Link>
        </div>

        {/* Mobile & Tablet Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 focus:outline-none transition"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
      </nav>

      {/* Mobile & Tablet Dropdown Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#051933]/98 backdrop-blur-xl border-b border-blue-500/20 px-6 py-5 flex flex-col space-y-3.5 shadow-2xl">
          <Link onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-1.5 border-b border-white/5 text-sm font-medium block transition" href="/">
            Home
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-1.5 border-b border-white/5 text-sm font-medium block transition" href="/#outcomes">
            Outcomes
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-1.5 border-b border-white/5 text-sm font-medium block transition" href="/#pathways">
            Venture Pathways
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-1.5 border-b border-white/5 text-sm font-medium block transition" href="/#model">
            Our Model
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-1.5 border-b border-white/5 text-sm font-medium block transition" href="/portfolio">
            Portfolio
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} className="text-brand-lightBlue font-bold py-1.5 border-b border-white/5 text-sm block transition" href="/cohorts">
            Cohorts &amp; Ecosystem
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} className={`py-1.5 border-b border-white/5 text-sm block transition ${path.startsWith('/blog') ? 'text-blue-400 font-bold' : 'text-white/80 hover:text-white'}`} href="/blog">
            Blog
          </Link>
          <Link
            href="/community"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 rounded-xl text-sm text-center block mt-2 shadow-lg shadow-blue-500/30 transition w-full cursor-pointer"
          >
            Access By ZiAn
          </Link>
        </div>
      )}
    </header>
  );
}
