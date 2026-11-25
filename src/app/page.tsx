'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeroCanvas from '@/components/HeroCanvas';
import TiltCard from '@/components/TiltCard';

import { submitFormToGoogleScript } from '@/config/api';

// Outcomes Data
const outcomesData: Record<
  string,
  {
    title: string;
    subtitle: string;
    valuation: string;
    funding: string;
    metric1: string;
    metric1Label: string;
    metric2: string;
    metric2Label: string;
    linePath: string;
    areaPath: string;
    dots: number[];
    dotTooltips: string[];
    highlights: string[];
  }
> = {
  'ai-saas': {
    title: 'AI SaaS',
    subtitle: 'Vertical enterprise intelligence',
    valuation: 'Concept → revenue-backed SaaS valuation.',
    funding: 'Pitch stage → investor-ready venture.',
    metric1: '$0 → $50K',
    metric1Label: 'ARR Growth',
    metric2: '30',
    metric2Label: 'Paying Customers',
    linePath: 'M 0 180 L 100 150 L 200 130 L 300 90 L 400 70 L 500 30',
    areaPath: 'M 0 180 L 100 150 L 200 130 L 300 90 L 400 70 L 500 30 L 500 180 Z',
    dots: [180, 150, 130, 90, 70, 30],
    dotTooltips: [
      'Month 1: $0 ARR (Kickoff)',
      'Month 2: $8K ARR (Alpha Release)',
      'Month 3: $15K ARR (Beta Program)',
      'Month 4: $28K ARR (Product Launch)',
      'Month 5: $38K ARR (Expansion)',
      'Month 6: $50K ARR (30 Customers)',
    ],
    highlights: [
      '30-member team built',
      '6,000 organic subscribers',
      'International partnerships',
    ],
  },
  'enterprise-saas': {
    title: 'Enterprise SaaS',
    subtitle: 'Process automation & infrastructure',
    valuation: 'Seed stage → Series A scale valuation.',
    funding: 'Pre-seed metrics → VC institutional ready.',
    metric1: '3.5x YoY',
    metric1Label: 'Revenue Growth',
    metric2: '12',
    metric2Label: 'Enterprise Clients',
    linePath: 'M 0 180 L 100 160 L 200 120 L 300 110 L 400 60 L 500 40',
    areaPath: 'M 0 180 L 100 160 L 200 120 L 300 110 L 400 60 L 500 40 L 500 180 Z',
    dots: [180, 160, 120, 110, 60, 40],
    dotTooltips: [
      'Month 1: 1 Enterprise Client',
      'Month 2: 2 Clients (+10% ARR)',
      'Month 3: 4 Clients (API Integrations)',
      'Month 4: 5 Clients (Direct Sync)',
      'Month 5: 9 Clients (Expansion)',
      'Month 6: 12 Enterprise Clients (3.5x YoY)',
    ],
    highlights: [
      'Integrated with Fortune 500 APIs',
      'Custom ML forecasting modules',
      'Direct ERP sync enabled',
    ],
  },
  'global-commerce': {
    title: 'Global Commerce',
    subtitle: 'Next-gen retail & logistics',
    valuation: 'Regional presence → Global supply valuation.',
    funding: 'Cross-border compliance ready.',
    metric1: '$2.4M',
    metric1Label: 'GMV Processed',
    metric2: '14',
    metric2Label: 'Countries Active',
    linePath: 'M 0 170 L 100 140 L 200 135 L 300 100 L 400 80 L 500 50',
    areaPath: 'M 0 170 L 100 140 L 200 135 L 300 100 L 400 80 L 500 50 L 500 180 Z',
    dots: [170, 140, 135, 100, 80, 50],
    dotTooltips: [
      'Month 1: $150K GMV (Regional Test)',
      'Month 2: $400K GMV (Multi-currency Release)',
      'Month 3: $480K GMV (EU Integration)',
      'Month 4: $980K GMV (Asia Launch)',
      'Month 5: $1.5M GMV (Australia Setup)',
      'Month 6: $2.4M GMV (14 Countries Active)',
    ],
    highlights: [
      'Automated customs classification',
      'Multi-currency checkout infrastructure',
      '99.8% shipping SLA met',
    ],
  },
  'b2b-marketplace': {
    title: 'B2B Marketplace',
    subtitle: 'Liquidity for fragmented industries',
    valuation: 'Transactional model → Managed marketplace multiples.',
    funding: 'High volume unit economics proven.',
    metric1: '$8.5M',
    metric1Label: 'Transaction Volume',
    metric2: '1,200+',
    metric2Label: 'Active Vendors',
    linePath: 'M 0 180 L 100 170 L 200 140 L 300 120 L 400 70 L 500 20',
    areaPath: 'M 0 180 L 100 170 L 200 140 L 300 120 L 400 70 L 500 20 L 500 180 Z',
    dots: [180, 170, 140, 120, 70, 20],
    dotTooltips: [
      'Month 1: $200K Volume (100 Vendors)',
      'Month 2: $500K Volume (220 Vendors)',
      'Month 3: $1.8M Volume (500 Vendors)',
      'Month 4: $3.2M Volume (750 Vendors)',
      'Month 5: $5.8M Volume (980 Vendors)',
      'Month 6: $8.5M Transaction Volume (1,200+ Vendors)',
    ],
    highlights: [
      'Instant supplier payouts enabled',
      'AI-based dynamic match engine',
      '18% month-over-month growth',
    ],
  },
  'compliance-tech': {
    title: 'Compliance Tech',
    subtitle: 'Regulated market acceleration',
    valuation: 'High risk profile → Low risk institutional value.',
    funding: 'ISO 27001 & SOC2 certified setup.',
    metric1: '100%',
    metric1Label: 'Audit Pass Rate',
    metric2: '45',
    metric2Label: 'Financial Institutions',
    linePath: 'M 0 160 L 100 150 L 200 120 L 300 100 L 400 90 L 500 60',
    areaPath: 'M 0 160 L 100 150 L 200 120 L 300 100 L 400 90 L 500 60 L 500 180 Z',
    dots: [160, 150, 120, 100, 90, 60],
    dotTooltips: [
      'Month 1: 5 Institutions (Audit prep)',
      'Month 2: 8 Institutions (Pre-audit check)',
      'Month 3: 15 Institutions (100% Pass Rate)',
      'Month 4: 24 Institutions (API Launch)',
      'Month 5: 32 Institutions (Risk scoring active)',
      'Month 6: 45 Financial Institutions',
    ],
    highlights: [
      'Real-time risk scoring API',
      'Zero data leakage record',
      'Zero compliance penalties',
    ],
  },
};

export default function HomePage() {
  // Selected outcome tab state
  const [activeOutcome, setActiveOutcome] = useState('ai-saas');
  const [tooltipText, setTooltipText] = useState('Hover graph points to view details');
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  const currentOutcome = outcomesData[activeOutcome];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const form = e.currentTarget;
    const nameInput = form.querySelector<HTMLInputElement>('#name')?.value || '';
    const emailInput = form.querySelector<HTMLInputElement>('#email')?.value || '';
    const pathwayInput = form.querySelector<HTMLSelectElement>('#pathway-select')?.value || '';
    const descriptionInput = form.querySelector<HTMLTextAreaElement>('#description')?.value || '';

    try {
      await submitFormToGoogleScript({
        module: 'Partner',
        sheetName: 'Partner',
        name: nameInput,
        workEmail: emailInput,
        preferredPathway: pathwayInput,
        ventureUnfairAdvantage: descriptionInput,
      });

      alert('Application submitted! We will contact you soon.');
      form.reset();
    } catch (err: any) {
      console.error(err);
      const errMsg = err?.message || 'Failed to submit application. Please try again.';
      setFormError(errMsg);
      alert(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="hero-section-wrap relative pt-10 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-32 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden" data-purpose="hero-section">
        <div className="absolute rounded-full filter blur-[80px] pointer-events-none w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_70%)] top-[-200px] right-[-100px]"></div>
        <div className="absolute rounded-full filter blur-[80px] pointer-events-none w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] bottom-[-100px] left-[10%]"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
          {/* Hero Content */}
          <div data-purpose="hero-text-content">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3.5 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-400 text-xs font-bold">Accepting Cohort Applications</span>
            </div>
            <div>
              <span className="inline-block border border-blue-500/30 bg-blue-500/10 text-brand-lightBlue px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-6 uppercase">
                Your Startup Building Partner
              </span>
            </div>
            <h1 className="text-[2rem] leading-[1.12] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 tracking-tight">
              Best Startup Building <br className="hidden sm:block" />
              <span className="text-brand-blue">Company in India</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium mb-8 text-gray-400">
              <span>Idea</span>
              <span className="text-brand-blue">→</span>
              <span>MVP</span>
              <span className="text-brand-blue">→</span>
              <span>Revenue</span>
              <span className="text-brand-blue">→</span>
              <span className="text-white font-bold">Funding Ready</span>
            </div>
            <p className="text-gray-400 text-base sm:text-lg max-w-md mb-4 leading-relaxed">
              ZiAn Ventures partners with ambitious founders to transform innovative ideas into scalable businesses through product development, venture building, revenue growth and funding readiness.
            </p>
            <p className="text-white font-bold text-base sm:text-lg mb-8">
              The institutional partner for founders with unfair advantages.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link className="inline-block text-center bg-brand-blue text-white px-8 sm:px-10 py-3.5 rounded-full font-bold text-base sm:text-lg hover:bg-blue-600 transition shadow-xl shadow-blue-500/20 glow-btn" href="/community">
                Access By ZiAn
              </Link>
              <Link className="inline-block text-center border border-blue-500/30 text-blue-300 hover:bg-blue-600/20 px-8 py-3.5 rounded-full font-bold text-base transition" href="/cohorts">
                Explore Cohorts
              </Link>
            </div>
          </div>

          {/* Hero Visual: Canvas + Orbit Rings */}
          <div className="hidden md:block relative w-full aspect-square max-w-[420px] md:max-w-[480px] lg:max-w-[560px] mx-auto mt-6 md:mt-0">
            <HeroCanvas />

            {/* Orbit rings */}
            <div className="absolute inset-[10%] rounded-full border border-blue-500/22 animate-[orbitSpin_18s_linear_infinite] pointer-events-none z-10">
              <span className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full shadow-[0_0_12px_4px_rgba(59,130,246,0.6)]"></span>
            </div>
            <div className="absolute inset-[22%] rounded-full border border-blue-400/18 animate-[orbitSpin_26s_linear_infinite_reverse] pointer-events-none z-10">
              <span className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full shadow-[0_0_12px_4px_rgba(59,130,246,0.6)]"></span>
            </div>
            <div className="absolute inset-[34%] rounded-full border border-blue-500/28 animate-[orbitSpin_14s_linear_infinite] pointer-events-none z-10">
              <span className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full shadow-[0_0_12px_4px_rgba(59,130,246,0.6)]"></span>
            </div>

            {/* Centre hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_0_10px_rgba(59,130,246,0.15),0_0_0_20px_rgba(59,130,246,0.07)] mx-auto mb-1.5 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">ZiAn Ventures</p>
            </div>

            {/* Floating metric cards */}
            <div className="absolute top-[6%] left-1 sm:left-0 bg-slate-900/85 border border-blue-500/30 backdrop-blur-md rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 z-30 whitespace-nowrap">
              <div className="text-lg sm:text-xl font-extrabold text-blue-400 leading-none">36+</div>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/40 mt-0.5">Portfolio Co.</div>
            </div>
            <div className="absolute top-[6%] right-1 sm:right-0 bg-slate-900/85 border border-blue-500/30 backdrop-blur-md rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 z-30 whitespace-nowrap">
              <div className="text-lg sm:text-xl font-extrabold text-blue-400 leading-none">200+</div>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/40 mt-0.5">Investors</div>
            </div>
            <div className="absolute bottom-[12%] left-1 sm:left-0 bg-slate-900/85 border border-blue-500/30 backdrop-blur-md rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 z-30 whitespace-nowrap">
              <div className="text-lg sm:text-xl font-extrabold text-blue-400 leading-none">8</div>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/40 mt-0.5">Countries</div>
            </div>
            <div className="absolute bottom-[12%] right-1 sm:right-0 bg-slate-900/85 border border-blue-500/30 backdrop-blur-md rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 z-30 whitespace-nowrap">
              <div className="text-lg sm:text-xl font-extrabold text-blue-400 leading-none">C-Suite</div>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/40 mt-0.5">Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-brand-dark pb-16 sm:pb-24 px-4 sm:px-6" data-purpose="stats-section">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 tilt-container">
          <TiltCard className="bg-slate-800/20 border border-slate-800 p-5 sm:p-8 rounded-2xl text-center">
            <div className="text-3xl sm:text-4xl font-bold text-brand-blue mb-3 sm:mb-4">200+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 leading-tight">
              Global Angel Investors &amp; <br /> VC Partners
            </div>
          </TiltCard>
          <TiltCard className="bg-slate-800/20 border border-slate-800 p-5 sm:p-8 rounded-2xl text-center">
            <div className="text-3xl sm:text-4xl font-bold text-brand-blue mb-3 sm:mb-4">C-Suite</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 leading-tight">
              VP &amp; Managing Director- <br /> Level Network
            </div>
          </TiltCard>
          <TiltCard className="bg-slate-800/20 border border-slate-800 p-5 sm:p-8 rounded-2xl text-center">
            <div className="text-3xl sm:text-4xl font-bold text-brand-blue mb-3 sm:mb-4">5</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 leading-tight">
              Continents — India, US, <br /> Singapore, Australia, UK
            </div>
          </TiltCard>
          <TiltCard className="bg-slate-800/20 border border-slate-800 p-5 sm:p-8 rounded-2xl text-center">
            <div className="text-3xl sm:text-4xl font-bold text-brand-blue mb-3 sm:mb-4">15+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 leading-tight">
              Active Portfolio Sectors
            </div>
          </TiltCard>
        </div>
      </section>

      {/* VENTURE PATHWAYS */}
      <section className="bg-brand-dark py-16 sm:py-24 px-4 sm:px-6" data-purpose="venture-pathways" id="pathways">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">Choose Your Path</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">Venture Pathways</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-5 leading-relaxed">
              Our cohort is limited to four ventures per pathway per quarter to ensure deep-dive execution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 tilt-container">
            {/* Pathway 1 */}
            <TiltCard className="bg-[#071324]/90 backdrop-blur-md border border-slate-800 p-6 sm:p-8 lg:p-10 rounded-3xl flex flex-col h-full hover:bg-[#0a1c38]/90 transition-all duration-300">
              <p className="text-brand-blue text-[10px] font-bold uppercase mb-4">Idea Stage Founders</p>
              <h3 className="text-3xl font-bold mb-6 text-white">Venture Lab</h3>
              <p className="text-gray-400 mb-10 flex-grow">For founders in the ideation phase. We validate, prototype and build the foundation together.</p>
              <div className="bg-slate-900/60 border border-slate-800/60 p-6 rounded-xl mb-8">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Journey</p>
                <p className="text-xs font-medium leading-relaxed text-gray-300">
                  <span className="text-brand-blue font-semibold">Idea</span> → MVP → Validation → <span className="text-brand-blue font-semibold">Revenue</span> → Expansion
                </p>
              </div>
              <Link className="border border-slate-700 text-brand-lightBlue py-4 rounded-full text-center font-bold text-sm hover:bg-brand-blue hover:text-white hover:border-brand-blue transition glow-btn" href="/community">Access By ZiAn</Link>
            </TiltCard>

            {/* Pathway 2 */}
            <TiltCard className="bg-[#071324]/90 backdrop-blur-md border border-slate-800 p-6 sm:p-8 lg:p-10 rounded-3xl flex flex-col h-full hover:bg-[#0a1c38]/90 transition-all duration-300">
              <p className="text-brand-blue text-[10px] font-bold uppercase mb-4">MVP — Weak Execution</p>
              <h3 className="text-3xl font-bold mb-6 text-white">Venture Build</h3>
              <p className="text-gray-400 mb-10 flex-grow">For early-stage products needing institutional-grade engineering and GTM support.</p>
              <div className="bg-slate-900/60 border border-slate-800/60 p-6 rounded-xl mb-8">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Journey</p>
                <p className="text-xs font-medium leading-relaxed text-gray-300">
                  MVP → <span className="text-brand-blue font-semibold underline decoration-2 underline-offset-4">Revenue</span> → Expansion
                </p>
              </div>
              <Link className="border border-slate-700 text-brand-lightBlue py-4 rounded-full text-center font-bold text-sm hover:bg-brand-blue hover:text-white hover:border-brand-blue transition glow-btn" href="/community">Access By ZiAn</Link>
            </TiltCard>

            {/* Pathway 3 */}
            <TiltCard className="bg-[#071324]/90 backdrop-blur-md border border-slate-800 p-6 sm:p-8 lg:p-10 rounded-3xl flex flex-col h-full hover:bg-[#0a1c38]/90 transition-all duration-300">
              <p className="text-brand-blue text-[10px] font-bold uppercase mb-4">Startups With Traction</p>
              <h3 className="text-3xl font-bold mb-6 text-white">Venture Scale</h3>
              <p className="text-gray-400 mb-10 flex-grow">For revenue-positive companies ready for institutional funding and global expansion.</p>
              <div className="bg-slate-900/60 border border-slate-800/60 p-6 rounded-xl mb-8">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Journey</p>
                <p className="text-xs font-medium leading-relaxed text-gray-300">
                  <span className="text-brand-blue font-semibold">Revenue</span> → Expansion
                </p>
              </div>
              <Link className="border border-slate-700 text-brand-lightBlue py-4 rounded-full text-center font-bold text-sm hover:bg-brand-blue hover:text-white hover:border-brand-blue transition glow-btn" href="/community">Access By ZiAn</Link>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* STARTUP BUILDING MODEL */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden" data-purpose="building-model" id="model">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">How We Work</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">Our Startup Building Model</h2>
            <p className="text-brand-blue font-bold text-lg sm:text-xl mb-8 sm:mb-12">One team. One direction. One outcome.</p>
            <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
              Fragmentation kills early ventures. Founders spend approximately 70% of their energy managing providers and mentors. We become the single execution layer — advising, building, deploying, and scaling alongside you.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
              <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold mb-6">1</div>
                <h3 className="text-brand-dark font-bold mb-2">Validation</h3>
                <p className="text-gray-500 text-sm">Problem-market fit through operator insights.</p>
              </div>
              <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold mb-6">2</div>
                <h3 className="text-brand-dark font-bold mb-2">Product</h3>
                <p className="text-gray-500 text-sm">Rapid MVP engineering with AI-native architecture.</p>
              </div>
              <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold mb-6">3</div>
                <h3 className="text-brand-dark font-bold mb-2">Go-To-Market</h3>
                <p className="text-gray-500 text-sm">Institutional network activation for first sales.</p>
              </div>
              <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold mb-6">4</div>
                <h3 className="text-brand-dark font-bold mb-2">Hiring</h3>
                <p className="text-gray-500 text-sm">Staffing the founding team from our talent pool.</p>
              </div>
              <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold mb-6">5</div>
                <h3 className="text-brand-dark font-bold mb-2">Funding</h3>
                <p className="text-gray-500 text-sm">Preparation for external venture capital rounds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-100" data-purpose="portfolio-teaser" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4">Global Ecosystem</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">Our Portfolio Companies</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">36+ companies across AI, HealthTech, Cybersecurity, E-commerce, and more — spanning 8 countries and 30 sectors.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-12">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-2">36+</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Companies</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-2">8</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Countries</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-2">30</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Sectors</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-2">3</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Portfolio Groups</div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/portfolio" className="inline-block w-full sm:w-auto bg-brand-blue text-white px-8 sm:px-12 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-blue-600 transition shadow-xl shadow-blue-500/20 glow-btn">
              Explore Full Portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* OUTCOMES REPORT */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6" data-purpose="outcomes-report" id="outcomes">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4">Track Record</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark">Selected Outcomes</h2>
          </div>
          <div className="space-y-5">
            {/* Outcomes Tabs (Horizontal, Compact) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5" id="outcomes-tabs">
              {[
                { id: 'ai-saas', title: 'AI SaaS', desc: 'Vertical enterprise intelligence' },
                { id: 'enterprise-saas', title: 'Enterprise SaaS', desc: 'Process automation & infrastructure' },
                { id: 'global-commerce', title: 'Global Commerce', desc: 'Next-gen retail & logistics' },
                { id: 'b2b-marketplace', title: 'B2B Marketplace', desc: 'Liquidity for fragmented industries' },
                { id: 'compliance-tech', title: 'Compliance Tech', desc: 'Regulated market acceleration' },
              ].map((tab) => {
                const isActive = activeOutcome === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveOutcome(tab.id);
                      setTooltipText('Hover graph points to view details');
                      setHoveredDot(null);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl transition-all duration-300 focus:outline-none cursor-pointer relative overflow-hidden border ${
                      isActive
                        ? 'border-blue-500 bg-white shadow-lg shadow-blue-500/10 scale-[1.01]'
                        : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h3 className="font-bold text-brand-dark text-xs sm:text-sm">{tab.title}</h3>
                      {isActive && (
                        <div className="active-badge w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_#3B82F6] shrink-0"></div>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-1">{tab.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Report Content Panel (Compact & Attractive Dashboard) */}
            <div className="bg-gradient-to-br from-[#061830] via-[#041226] to-[#020b18] border border-blue-500/25 rounded-2xl p-4 sm:p-6 md:p-8 transition duration-300 w-full shadow-2xl relative overflow-hidden" id="outcome-report-panel">
              {/* Background ambient glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    <span>Outcome Report</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight" id="report-title">
                    {currentOutcome.title}{' '}
                    <span className="text-blue-400/80 font-medium text-lg md:text-xl block sm:inline sm:ml-2" id="report-subtitle">
                      &bull; {currentOutcome.subtitle}
                    </span>
                  </h3>
                </div>

                <Link className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/30 glow-btn" href="/community">
                  <span>Access By ZiAn</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </Link>
              </div>

              {/* Main Content Grid: 2 Columns */}
              <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Column: Key Stats & Highlights */}
                <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                  {/* Inflection & Readiness */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-slate-900/60 border border-blue-500/15 p-3.5 rounded-xl">
                      <p className="text-blue-400 text-[10px] font-extrabold uppercase tracking-wider mb-1">Valuation Inflection</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-200">{currentOutcome.valuation}</p>
                    </div>
                    <div className="bg-slate-900/60 border border-blue-500/15 p-3.5 rounded-xl">
                      <p className="text-blue-400 text-[10px] font-extrabold uppercase tracking-wider mb-1">Funding Readiness</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-200">{currentOutcome.funding}</p>
                    </div>
                  </div>

                  {/* Big Metric Badges */}
                  <div className="grid grid-cols-2 gap-3 bg-blue-950/40 border border-blue-500/20 p-4 rounded-xl">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">{currentOutcome.metric1}</div>
                      <p className="text-[10px] text-blue-300/70 font-extrabold uppercase mt-0.5">{currentOutcome.metric1Label}</p>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">{currentOutcome.metric2}</div>
                      <p className="text-[10px] text-blue-300/70 font-extrabold uppercase mt-0.5">{currentOutcome.metric2Label}</p>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex-1">
                    <p className="text-blue-400 text-[10px] font-extrabold uppercase tracking-wider mb-2">Key Highlights</p>
                    <ul className="space-y-2" id="report-highlights">
                      {currentOutcome.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-slate-200 text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0 shadow-[0_0_6px_#3B82F6]"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Growth Graph */}
                <div className="lg:col-span-6 bg-slate-900/80 rounded-xl border border-blue-500/15 p-4 flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                    <p className="text-blue-400 text-[10px] font-extrabold uppercase tracking-wider">Growth Progress (6 Months)</p>
                    <span className={`text-[11px] font-medium transition sm:text-right sm:max-w-[55%] ${hoveredDot !== null ? 'text-blue-300 font-bold' : 'text-slate-400'}`}>
                      {tooltipText}
                    </span>
                  </div>

                  <div className="relative h-36 sm:h-44 w-full my-auto px-1 sm:px-2">
                    <svg viewBox="-12 -10 524 220" className="w-full h-full overflow-visible" id="outcome-chart">
                      <line x1="0" y1="180" x2="500" y2="180" stroke="#1e293b" strokeWidth="1" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="4" />
                      <line x1="0" y1="60" x2="500" y2="60" stroke="#1e293b" strokeWidth="1" strokeDasharray="4" />

                      <defs>
                        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d={currentOutcome.areaPath} fill="url(#chart-grad)" id="chart-area" className="transition-all duration-500 ease-in-out" />
                      <path d={currentOutcome.linePath} fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" id="chart-line" className="draw-line transition-all duration-500 ease-in-out" />

                      <g id="chart-dots">
                        {currentOutcome.dots.map((cy, idx) => {
                          const cx = idx * 100;
                          return (
                            <circle
                              key={idx}
                              cx={cx}
                              cy={cy}
                              r="6"
                              fill="#60A5FA"
                              stroke="#051933"
                              strokeWidth="2"
                              className="cursor-pointer hover:scale-125 transition-transform origin-center"
                              onMouseEnter={() => {
                                setHoveredDot(idx);
                                setTooltipText(currentOutcome.dotTooltips[idx]);
                              }}
                              onMouseLeave={() => {
                                setHoveredDot(null);
                                setTooltipText('Hover graph points to view details');
                              }}
                            />
                          );
                        })}
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-6 gap-1 text-center text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase pt-2 border-t border-slate-800">
                    <span>Month 1</span>
                    <span>Month 2</span>
                    <span>Month 3</span>
                    <span>Month 4</span>
                    <span>Month 5</span>
                    <span>Month 6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK REACH */}
      <section className="bg-brand-dark pt-16 sm:pt-24 pb-10 sm:pb-12 px-4 sm:px-6 text-center" data-purpose="network-reach">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-6">Our Reach</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8">Network &amp; Global Reach</h2>
          <p className="text-gray-400 text-base sm:text-xl leading-relaxed">
            Zian primarily operates with C-level, VP and Managing Director-level leaders along with former executives from leading global organizations.
          </p>
        </div>
      </section>

      {/* CAPITAL NETWORK CTA */}
      <section className="bg-brand-dark pb-24 px-4 sm:px-6" data-purpose="capital-network-cta">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="mb-4 md:mb-0 max-w-xl text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">Capital Network</h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Direct access to our network of 200+ global angel investors and VC partners across 5 continents.
              </p>
            </div>
            <Link className="w-full sm:w-auto text-center inline-block bg-brand-blue text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-blue-600 transition shadow-2xl shadow-blue-500/20 whitespace-nowrap glow-btn" href="/community">
              Access By ZiAn
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT / APPLY SECTION */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6" id="contact" data-purpose="contact-section">
        <div className="max-w-3xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-10 md:p-16 border border-slate-800 shadow-2xl">
          <div className="text-center mb-10">
            <p className="text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4">Start Your Journey</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Apply to ZiAn Ventures</h2>
            <p className="text-gray-400">Tell us about your venture and unfair advantages. Our team will review and respond within 72 hours.</p>
          </div>

          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-2" htmlFor="name">Your Name</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue" id="name" type="text" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-2" htmlFor="email">Work Email</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue" id="email" type="email" placeholder="john@company.com" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-2" htmlFor="pathway-select">Preferred Pathway</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-brand-blue" id="pathway-select" defaultValue="build">
                <option className="bg-[#051933]" value="lab">Venture Lab (Idea Stage)</option>
                <option className="bg-[#051933]" value="build">Venture Build (MVP &amp; Execution)</option>
                <option className="bg-[#051933]" value="scale">Venture Scale (Traction &amp; Scale)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-2" htmlFor="description">Tell us about your venture &amp; unfair advantage</label>
              <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue h-32" id="description" placeholder="We are building..." required></textarea>
            </div>
            {formError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs text-center">
                {formError}
              </div>
            )}
            <button
              className="w-full bg-brand-blue text-white py-4 rounded-full font-bold hover:bg-blue-600 transition shadow-xl shadow-blue-500/20 glow-btn disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
