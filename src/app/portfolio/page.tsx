'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface PortfolioCompany {
  init: string;
  name: string;
  logo?: string;
  links: string[];
  desc: string;
  country: string;
  sector: string;
  stealth: boolean;
}

const activeCompanies: PortfolioCompany[] = [
  { init: 'BL', name: 'Blumberr', logo: '/logos/blumberr-160.png', links: ['in', 'ig'], desc: 'HealthTech — verified healthcare professional hiring network.', country: 'India', sector: 'HRTech', stealth: false },
  { init: 'AU', name: 'Authenta', logo: '/logos/authenta-160.png', links: ['in', 'ig'], desc: 'AI — deepfake detection / digital identity & content authenticity.', country: 'India', sector: 'Artificial Intelligence', stealth: false },
  { init: 'O2', name: 'O2Vend', logo: '/logos/o2vend-160.png', links: ['in', 'fb', 'ig', 'x', 'yt'], desc: 'Retail ERP / POS / eCommerce SaaS (omnichannel, no-code store builder).', country: 'India', sector: 'RetailTech', stealth: false },
  { init: 'BA', name: 'BAE AI (VoxBae / BAE XT)', links: ['in', 'ig'], desc: 'AI-native voice commerce & AI visibility infrastructure (GEO/AEO action layer).', country: 'Singapore', sector: 'Artificial Intelligence', stealth: false },
  { init: 'OZ', name: 'Ozzitech', links: ['in', 'fb', 'ig'], desc: 'Digital agency (web / mobile / eCommerce dev); moving into SaaS + POS product.', country: 'Australia', sector: 'IT Services', stealth: false },
  { init: 'BR', name: 'Broilo', links: [], desc: 'An all-in-one digital platform to manage and track the poultry wholesale supply chain from farm to final payment.', country: 'Australia', sector: 'AgriTech', stealth: true },
  { init: 'MV', name: 'Movrix', links: [], desc: 'An all-in-one digital platform to manage and track operations from initial supply to final payment.', country: 'Australia', sector: 'Supply Chain Logistics', stealth: true },
  { init: 'SM', name: 'Smokeaway (Stealth)', links: [], desc: 'MedTech — surgical clarity (smoke evacuation + LED + electrocautery) for mini-thoracotomy cardiac surgery.', country: 'India', sector: 'MedTech', stealth: true },
  { init: 'NM', name: 'NMT Security Systems (NOVA AI / DRIM)', links: ['in'], desc: 'Cybersecurity — all-in-one Cyber Risk Intelligence platform (EASM, TPRM, GRC, VAPT, vCISO, SOC).', country: 'India + US', sector: 'Cybersecurity', stealth: false },
  { init: 'DN', name: 'Deep Nural (Deepnural)', links: ['in'], desc: 'Cybersecurity — autonomous self-healing AI defence mesh (Recon-X).', country: 'US', sector: 'Cybersecurity', stealth: false },
  { init: 'CH', name: 'Canute Homes', links: ['in', 'fb', 'yt'], desc: 'PropTech / Construction — GRP-panel prefabricated housing (built in a day, 60-yr warranty).', country: 'UK', sector: 'PropTech', stealth: false },
  { init: 'VF', name: 'Venfield', links: ['in', 'fb', 'ig', 'x', 'yt'], desc: 'D2C — premium menswear (reactivation of 6-yr dormant brand).', country: 'India', sector: 'E-commerce', stealth: false },
  { init: 'AN', name: 'Annachy', links: ['in', 'fb', 'ig', 'x', 'yt'], desc: 'A value-focused marketplace that transitions traditional retail legacy into a seamless, digital shopping experience.', country: 'India', sector: 'E-commerce', stealth: false },
  { init: 'TU', name: 'Tank Up', links: ['in', 'fb', 'ig', 'x'], desc: 'On-demand digital platform that delivers automated, doorstep fuel fulfillment directly to assets and fleets.', country: 'India', sector: 'Logistics', stealth: false },
  { init: 'EN', name: 'Enervara', links: ['in', 'ig'], desc: 'A platform that structures continuous patient health data into clinically grounded insights to streamline the transition from initial symptoms to doctor care.', country: 'India', sector: 'HealthTech', stealth: false },
  { init: 'OR', name: 'Ora', links: [], desc: 'An all-in-one enablement platform providing the capital, resources, and networks to launch high-growth startups before turning 19.', country: 'India', sector: 'Venture Capital', stealth: true },
  { init: 'OS', name: 'Onio Seller Services Pvt Ltd', links: ['in', 'fb'], desc: 'E-commerce seller services / marketplace enablement (Amazon, Flipkart).', country: 'India', sector: 'E-commerce', stealth: false },
  { init: 'CA', name: 'Click Art Museum', links: ['in', 'fb', 'ig'], desc: "Experiential — India's first 3D trick-art museum (managed via IOANA Entertainment).", country: 'India', sector: 'Entertainment', stealth: false },
  { init: 'VC', name: 'Vintage Cameras Museum', links: ['in', 'fb', 'ig'], desc: "Experiential — vintage / rare camera museum (world's largest camera-shaped building in SG).", country: 'India', sector: 'Tourism', stealth: true },
  { init: 'LA', name: 'Live Art Museum', links: ['in', 'ig'], desc: 'An immersive, interactive exhibition platform that transforms static art into dynamic, live sensory experiences.', country: 'India', sector: 'ArtTech', stealth: true },
  { init: 'TP', name: 'The Portrait Company', links: ['in'], desc: 'A premium design and curation service that builds bespoke private museums to archive and showcase family legacies and high-value art collections.', country: 'India', sector: 'Luxury Services', stealth: false },
  { init: 'GS', name: 'Grant Snap', links: [], desc: 'An AI browser extension that auto-fills grant and accelerator applications for startups.', country: '—', sector: 'Productivity SaaS', stealth: true },
];

const mnaCompanies: PortfolioCompany[] = [
  { init: 'CL', name: 'Conclev (Conclev AI)', links: ['in', 'fb', 'ig'], desc: 'AI — intelligent contract management / contract lifecycle.', country: 'US', sector: 'LegalTech', stealth: false },
  { init: 'BA', name: 'Bautomate', links: ['in', 'ig', 'x', 'yt'], desc: 'An AI-powered platform that automates complex business workflows and document processing for enterprises.', country: 'US + India', sector: 'Enterprise Software', stealth: false },
  { init: 'TP', name: 'Testpress', links: ['in', 'fb', 'ig'], desc: 'EdTech — LMS, online assessment, proctoring & video (Tpstreams).', country: 'India', sector: 'EdTech', stealth: false },
];

const inactiveCompanies: PortfolioCompany[] = [
  { init: 'SM', name: 'Shared Machines', links: ['in', 'ig'], desc: 'A B2B marketplace that optimizes asset utilization by automating heavy machinery rentals.', country: 'India', sector: 'B2B Marketplaces', stealth: false },
  { init: 'DF', name: 'Dhan Foundation', links: ['in', 'fb', 'ig'], desc: 'A grassroots development platform scaling community led microfinance and resource conservation.', country: 'India', sector: 'Social Impact', stealth: false },
  { init: 'PA', name: 'Phosphene AI', links: ['in'], desc: 'An advanced computer vision platform that automates complex visual data analysis.', country: 'India', sector: 'DeepTech', stealth: false },
  { init: 'PV', name: 'Pixelview', links: ['in'], desc: 'An early generative AI pioneer specializing in deep-learning visual synthesis, super-resolution, and image inpainting.', country: 'India', sector: 'Generative AI', stealth: true },
  { init: 'PR', name: 'Pristene', links: [], desc: 'All-in-one backend-as-a-service (BaaS) platform designed to streamline database, authentication, and hosting infrastructure for developers.', country: 'India', sector: 'DevTools', stealth: true },
  { init: 'AR', name: 'Arimugham (now Focuzon & Flyskool)', links: [], desc: 'A professional networking and talent marketplace platform tailored specifically for the cinema and media industry.', country: 'India', sector: 'Media & Entertainment', stealth: true },
];

const SVG_ICONS: Record<string, string> = {
  in: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle>',
  ig: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',
  fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>',
  x: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>',
  yt: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>',
};

export default function PortfolioPage() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all unique sectors sorted alphabetically
  const allSectors = useMemo(() => {
    const sectors = new Set<string>();
    [...activeCompanies, ...mnaCompanies, ...inactiveCompanies].forEach((c) => sectors.add(c.sector));
    return Array.from(sectors).sort();
  }, []);

  const filterCompany = (c: PortfolioCompany) => {
    const matchesSector = sectorFilter === 'all' || c.sector === sectorFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q);

    return matchesSector && matchesSearch;
  };

  const filteredActive = useMemo(() => activeCompanies.filter(filterCompany), [sectorFilter, searchQuery]);
  const filteredMna = useMemo(() => mnaCompanies.filter(filterCompany), [sectorFilter, searchQuery]);
  const filteredInactive = useMemo(() => inactiveCompanies.filter(filterCompany), [sectorFilter, searchQuery]);

  const totalVisibleCount =
    (typeFilter === 'all' || typeFilter === 'active' ? filteredActive.length : 0) +
    (typeFilter === 'all' || typeFilter === 'mna' ? filteredMna.length : 0) +
    (typeFilter === 'all' || typeFilter === 'inactive' ? filteredInactive.length : 0);

  const renderCompanyRow = (c: PortfolioCompany, index: number) => (
    <div
      key={`${c.name}-${index}`}
      className="bg-white border-b border-slate-100 p-5 md:py-4 transition hover:bg-slate-50/80"
    >
      {/* Desktop 5-Column Grid */}
      <div className="hidden lg:grid gap-4 items-center min-w-0" style={{ gridTemplateColumns: 'minmax(150px,220px) minmax(0,1fr) minmax(72px,100px) minmax(96px,140px) minmax(88px,120px)' }}>
        <div className="flex items-start gap-3 min-w-0">
          {c.logo ? (
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-[#0a192f] p-1 flex items-center justify-center">
              <img src={c.logo} alt={c.name} loading="lazy" decoding="async" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600 text-xs shrink-0">
              {c.init}
            </div>
          )}
          <div className="min-w-0">
            <div className="font-bold text-[#0a192f] text-sm leading-snug">{c.name}</div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {c.links.map((link, lIdx) => (
                <a key={lIdx} href="#" className="social-pill shrink-0">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    dangerouslySetInnerHTML={{ __html: SVG_ICONS[link] || '' }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-slate-600 text-sm leading-relaxed">{c.desc}</div>
        <div className="text-xs font-semibold text-slate-500">{c.country}</div>
        <div>
          <span className="portfolio-tag text-xs font-bold px-3 py-1 rounded-full inline-block">{c.sector}</span>
        </div>
        <div className="text-right">
          {c.stealth ? (
            <span className="text-xs text-slate-400 italic font-medium">Stealth</span>
          ) : (
            <Link href="/#contact" className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 transition">
              Visit Website →
            </Link>
          )}
        </div>
      </div>

      {/* Mobile & Tablet Card Layout */}
      <div className="lg:hidden space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {c.logo ? (
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-[#0a192f] p-1 flex items-center justify-center">
                <img src={c.logo} alt={c.name} loading="lazy" decoding="async" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600 text-xs shrink-0">
                {c.init}
              </div>
            )}
            <div>
              <div className="font-bold text-[#0a192f] text-base leading-snug">{c.name}</div>
              <div className="text-xs text-slate-500">{c.country} &bull; <span className="font-semibold text-blue-600">{c.sector}</span></div>
            </div>
          </div>

          {c.stealth ? (
            <span className="text-xs text-slate-400 italic font-medium shrink-0">Stealth</span>
          ) : (
            <Link href="/#contact" className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 transition shrink-0">
              Visit →
            </Link>
          )}
        </div>

        <p className="text-slate-600 text-xs leading-relaxed">{c.desc}</p>

        {c.links.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Social:</span>
            {c.links.map((link, lIdx) => (
              <a key={lIdx} href="#" className="social-pill shrink-0">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  dangerouslySetInnerHTML={{ __html: SVG_ICONS[link] || '' }}
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="bg-[#f8fafc] text-[#0f172a] min-h-screen py-10 md:py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-8 md:mb-10">
          <p className="section-tag text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-3">Global Ecosystem</p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0a192f] tracking-tight leading-tight mb-3">
            Our Global Portfolio of Technology Startups
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-3xl leading-relaxed">
            We partner with visionary founders building the next generation of AI-first and enterprise-scale businesses, helping them scale with capital, engineering, and go-to-market support.
          </p>
        </div>

        {/* FILTERS & SEARCH ROW */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-end mb-8 md:mb-10">
          <div className="w-full sm:flex-1 min-w-0 lg:min-w-[180px]">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Search Companies</label>
            <input
              type="text"
              placeholder="Search by name, sector, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-blue-600 text-sm font-semibold focus:outline-none focus:border-blue-500 shadow-sm placeholder-slate-400"
            />
          </div>

          <div className="w-full sm:flex-1 min-w-0 lg:min-w-[160px]">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Portfolio Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-blue-600 text-sm font-semibold focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="active">Active / Embedded Engagements</option>
              <option value="mna">M&amp;A and Exits</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="w-full sm:flex-1 min-w-0 lg:min-w-[160px]">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">All Categories</label>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-blue-600 text-sm font-semibold focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer"
            >
              <option value="all">All Categories</option>
              {allSectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-14">
          <div className="bg-white rounded-2xl p-4 sm:p-6 text-center border border-slate-200 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">{totalVisibleCount}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Filtered Companies</div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 text-center border border-slate-200 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">8</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Countries</div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 text-center border border-slate-200 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">30</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sectors</div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 text-center border border-slate-200 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">3</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Portfolio Groups</div>
          </div>
        </div>

        {/* SECTION 1: ACTIVE / EMBEDDED ENGAGEMENTS */}
        {(typeFilter === 'all' || typeFilter === 'active') && (
          <div className="mb-14">
            <h2 className="text-sm font-extrabold text-[#0a192f] uppercase tracking-widest mb-5 pb-4 border-b border-slate-200">
              Active / Embedded Engagements ({filteredActive.length})
            </h2>

            <div className="hidden lg:grid bg-slate-200/80 border border-slate-300 border-b-0 rounded-t-xl px-5 py-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 gap-4" style={{ gridTemplateColumns: 'minmax(150px,220px) minmax(0,1fr) minmax(72px,100px) minmax(96px,140px) minmax(88px,120px)' }}>
              <div>Company</div>
              <div>Description</div>
              <div>Country</div>
              <div>Sector</div>
              <div className="text-right">Action</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-b-xl lg:rounded-t-none rounded-xl overflow-hidden shadow-sm">
              {filteredActive.length > 0 ? (
                filteredActive.map((c, i) => renderCompanyRow(c, i))
              ) : (
                <div className="p-8 text-center text-slate-400 text-sm">No active companies found matching filters.</div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 2: M&A AND EXITS */}
        {(typeFilter === 'all' || typeFilter === 'mna') && (
          <div className="mb-14">
            <h2 className="text-sm font-extrabold text-[#0a192f] uppercase tracking-widest mb-5 pb-4 border-b border-slate-200">
              M&amp;A and Exits ({filteredMna.length})
            </h2>

            <div className="hidden lg:grid bg-slate-200/80 border border-slate-300 border-b-0 rounded-t-xl px-5 py-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 gap-4" style={{ gridTemplateColumns: 'minmax(150px,220px) minmax(0,1fr) minmax(72px,100px) minmax(96px,140px) minmax(88px,120px)' }}>
              <div>Company</div>
              <div>Description</div>
              <div>Country</div>
              <div>Sector</div>
              <div className="text-right">Action</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-b-xl lg:rounded-t-none rounded-xl overflow-hidden shadow-sm">
              {filteredMna.length > 0 ? (
                filteredMna.map((c, i) => renderCompanyRow(c, i))
              ) : (
                <div className="p-8 text-center text-slate-400 text-sm">No M&amp;A companies found matching filters.</div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 3: INACTIVE */}
        {(typeFilter === 'all' || typeFilter === 'inactive') && (
          <div className="mb-20">
            <h2 className="text-sm font-extrabold text-[#0a192f] uppercase tracking-widest mb-5 pb-4 border-b border-slate-200">
              Inactive ({filteredInactive.length})
            </h2>

            <div className="hidden lg:grid bg-slate-200/80 border border-slate-300 border-b-0 rounded-t-xl px-5 py-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 gap-4" style={{ gridTemplateColumns: 'minmax(150px,220px) minmax(0,1fr) minmax(72px,100px) minmax(96px,140px) minmax(88px,120px)' }}>
              <div>Company</div>
              <div>Description</div>
              <div>Country</div>
              <div>Sector</div>
              <div className="text-right">Action</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-b-xl lg:rounded-t-none rounded-xl overflow-hidden shadow-sm">
              {filteredInactive.length > 0 ? (
                filteredInactive.map((c, i) => renderCompanyRow(c, i))
              ) : (
                <div className="p-8 text-center text-slate-400 text-sm">No inactive companies found matching filters.</div>
              )}
            </div>
          </div>
        )}

        {/* JOIN CTA */}
        <div className="bg-[#0a192f] text-white rounded-3xl p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-2xl">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">Join our Portfolio</h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Interested in becoming a strategic partner? Let's discuss how our AI and operational capital can accelerate your next phase of growth.
            </p>
          </div>
          <Link
            href="/#contact"
            className="w-full sm:w-auto text-center bg-blue-600 text-white px-8 sm:px-10 py-4 rounded-full font-bold text-base hover:bg-blue-500 transition shadow-xl shadow-blue-500/30 whitespace-nowrap glow-btn"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </main>
  );
}
