'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitFormToGoogleScript } from '@/config/api';

interface CohortDetailInfo {
  id: 'healthcare' | 'd2c';
  name: string;
  badge: string;
  tagline: string;
  tags: string[];
  metrics: {
    members: string;
    capital: string;
    partners: string;
  };
  whoCanJoin: string[];
  whatYouGet: string[];
  community: string;
  networking: string;
  investmentOps: string;
  strategicPartnerships: string;
  mentorship: string;
  ventureOps: string;
}

const COHORTS_DATA: Record<'healthcare' | 'd2c', CohortDetailInfo> = {
  healthcare: {
    id: 'healthcare',
    name: 'ZIAN Healthcare Cohort',
    badge: 'Healthcare Innovation',
    tagline: 'A curated clinical ecosystem connecting doctors, hospital directors, healthtech founders, and institutional healthcare investors.',
    tags: ['Doctors & Clinicians', 'Hospitals & Health Systems', 'IVF & Reproductive', 'Ophthalmology', 'Cosmetology', 'Digital Health Startups'],
    metrics: {
      members: '180+ Verified Clinicians',
      capital: '$25M+ Clinical Pilots',
      partners: '35+ Hospital Partners',
    },
    whoCanJoin: [
      'Doctors & Clinical Specialists',
      'Hospital Owners & Health System Directors',
      'IVF & Reproductive Health Leaders',
      'Ophthalmologists & Optometry Chains',
      'Cosmetologists & Aesthetic Clinics',
      'Early to Series-A Healthcare Startups',
    ],
    whatYouGet: [
      'Direct enterprise clinical trial & pilot access across partner hospital networks.',
      'Co-building studio capital, HIPAA & regulatory tech engineering support.',
      'Warm introductions to institutional healthcare VC syndicates ($250k–$3M).',
      'Quarterly executive roundtables with hospital CEOs & medical directors.',
    ],
    community: '180+ verified clinicians, digital health founders, and hospital board members across global hubs.',
    networking: 'Monthly private fireside chats & exclusive medical-tech demo days in SF, Boston, and Bengaluru.',
    investmentOps: 'Co-investment syndicates from $250k to $3M for digital health, MedTech, and clinical diagnostics.',
    strategicPartnerships: 'Direct integrations with hospital management systems and health insurance networks.',
    mentorship: '1-on-1 advisor matching with senior hospital executives, regulatory experts, and FDA advisors.',
    ventureOps: 'Co-creation of spin-out medical startups with leading clinical practitioners.',
  },
  d2c: {
    id: 'd2c',
    name: 'ZIAN D2C (Direct-to-Consumer) Cohort',
    badge: 'D2C & Consumer Brands',
    tagline: 'An exclusive ecosystem for D2C brand founders, e-commerce operators, CPG innovators, growth marketers, and retail investors.',
    tags: ['D2C & E-Commerce', 'Consumer Brands', 'CPG & FMCG', 'Growth Marketing', 'Supply Chain Tech', 'Omni-Channel Retail'],
    metrics: {
      members: '120+ D2C Founders & Leaders',
      capital: '$18M+ Growth Capital',
      partners: '45+ Retail Partners',
    },
    whoCanJoin: [
      'D2C Brand Founders & E-Commerce Entrepreneurs',
      'Consumer Brand Leaders & CPG Executives',
      'Growth Marketers & Performance Agencies',
      'Supply Chain, Logistics & Omni-Channel Partners',
      'Health & Beauty, Fashion, and Lifestyle Brands',
      'Early to Series-A Consumer Tech Startups',
    ],
    whatYouGet: [
      'Direct access to retail distribution networks, marketplaces, and omni-channel buyers.',
      'Performance marketing scaling playbooks & omni-channel expansion capital.',
      'Warm introductions to consumer brand VC syndicates ($100k–$2M).',
      'Monthly growth masterminds & conversion rate optimization roundtables.',
    ],
    community: '120+ verified D2C founders, e-commerce brand builders, and retail distribution leaders.',
    networking: 'Monthly growth teardowns & D2C brand showcase events in NYC, SF, and Bengaluru.',
    investmentOps: 'Co-investment syndicates from $100k to $2M for inventory funding, marketing scale, and global expansion.',
    strategicPartnerships: 'Retail distribution partnerships, supply chain optimization, and global fulfillment network discounts.',
    mentorship: '1-on-1 advisor matching with successful D2C brand founders, CMOs, and retail executives.',
    ventureOps: 'Co-creation of omni-channel brand extensions and tech-enabled consumer products.',
  },
};

export default function CohortsPage() {
  const [selectedCohortFilter, setSelectedCohortFilter] = useState<'all' | 'healthcare' | 'd2c'>('all');
  const [activeOverviewId, setActiveOverviewId] = useState<'healthcare' | 'd2c' | null>(null);

  // Application Modal state
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    targetCohort: 'healthcare' as 'healthcare' | 'd2c',
    fullname: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    company: '',
    industry: 'Healthcare',
    otherIndustry: '',
    experience: '4-7 years',
    linkedin: '',
    website: '',
    specialty: '',
    lookingFor: [] as string[],
    otherLookingFor: '',
  });

  const openJoinModalForCohort = (cohortId: 'healthcare' | 'd2c') => {
    setFormData((prev) => ({
      ...prev,
      targetCohort: cohortId,
      industry: cohortId === 'healthcare' ? 'Healthcare' : 'D2C Brand',
      otherIndustry: '',
      otherLookingFor: '',
      lookingFor: [],
    }));
    setFormStep(1);
    setSubmittedRefId(null);
    setFormError(null);
    setJoinModalOpen(true);
  };

  const handleCheckboxChange = (val: string) => {
    setFormData((prev) => {
      const exists = prev.lookingFor.includes(val);
      if (exists) {
        return { ...prev, lookingFor: prev.lookingFor.filter((item) => item !== val) };
      } else {
        return { ...prev, lookingFor: [...prev.lookingFor, val] };
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const isHealthcare = formData.targetCohort === 'healthcare';
    const prefix = isHealthcare ? 'ZIAN-HEALTH' : 'ZIAN-D2C';
    const refId = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

    const finalIndustry =
      formData.industry === 'Other'
        ? formData.otherIndustry.trim()
          ? `Other: ${formData.otherIndustry.trim()}`
          : 'Other'
        : formData.industry;

    const payload: Record<string, any> = isHealthcare
      ? {
          module: 'Healthcare',
          sheetName: 'Healthcare',
          targetCohort: formData.targetCohort,
          fullName: formData.fullname,
          emailAddress: formData.email,
          phoneNumber: formData.phone,
          location: formData.location,
          currentRole: formData.role,
          companyBrandHospital: formData.company,
          industryFocus: finalIndustry,
          yearsOfExperience: formData.experience,
          linkedinProfileUrl: formData.linkedin,
          companyBrandWebsite: formData.website,
          specialtySectorNiche: formData.specialty,
          clinicalPilots: formData.lookingFor.includes('Clinical Pilots') ? 'Yes' : 'No',
          ventureCapital: formData.lookingFor.includes('Venture Capital') ? 'Yes' : 'No',
          hospitalPartnerships: formData.lookingFor.includes('Hospital Partnerships') ? 'Yes' : 'No',
          mentorship: formData.lookingFor.includes('Mentorship') ? 'Yes' : 'No',
          regulatoryAdvisory: formData.lookingFor.includes('Regulatory Advisory') ? 'Yes' : 'No',
          ventureCoBuilding: formData.lookingFor.includes('Venture Co-Building') ? 'Yes' : 'No',
        }
      : {
          module: 'D2C',
          sheetName: 'D2C',
          targetCohort: formData.targetCohort,
          fullName: formData.fullname,
          emailAddress: formData.email,
          phoneNumber: formData.phone,
          location: formData.location,
          currentRole: formData.role,
          companyBrandHospital: formData.company,
          industryFocus: finalIndustry,
          yearsOfExperience: formData.experience,
          linkedinProfileUrl: formData.linkedin,
          companyBrandWebsite: formData.website,
        };

    try {
      await submitFormToGoogleScript(payload);
      setSubmittedRefId(refId);
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentOverviewCohort = activeOverviewId ? COHORTS_DATA[activeOverviewId] : null;

  return (
    <main className="bg-[#051933] text-white min-h-screen">
      {/* TOP HEADER RIBBON */}
      <div className="bg-[#030e1a] border-b border-blue-500/20 py-2.5 px-4 sm:px-6 md:px-12 flex justify-between items-center text-xs">
        <div className="flex items-center gap-2 text-blue-300 font-semibold truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="truncate">ZiAn Innovation Cohorts — Healthcare &amp; D2C Networks</span>
        </div>
        <div className="text-blue-400/80 font-medium hidden md:block shrink-0 ml-4">
          Exclusively for Clinicians, D2C Founders &amp; Venture Partners
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-blue-500/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[400px] bg-blue-600/15 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-500/30 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest text-blue-400 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span>ZIAN Industry Cohorts</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 sm:mb-6">
            Startup Venture Cohorts <br className="hidden sm:inline" />
            <span className="gradient-text">for Founders and Industry Leaders</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg md:text-xl max-w-3xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10">
            Specialized accelerator ecosystems connecting clinicians, hospital leaders, D2C brand founders, e-commerce operators, and institutional venture partners.
          </p>

          {/* TAB FILTER BUTTONS */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            <button
              onClick={() => setSelectedCohortFilter('all')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold transition ${
                selectedCohortFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-blue-950/60 text-slate-300 hover:text-white border border-blue-500/20'
              }`}
            >
              All Cohorts (2)
            </button>
            <button
              onClick={() => setSelectedCohortFilter('healthcare')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold transition flex items-center gap-2 ${
                selectedCohortFilter === 'healthcare'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-blue-950/60 text-slate-300 hover:text-white border border-blue-500/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Healthcare Cohort
            </button>
            <button
              onClick={() => setSelectedCohortFilter('d2c')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold transition flex items-center gap-2 ${
                selectedCohortFilter === 'd2c'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-blue-950/60 text-slate-300 hover:text-white border border-blue-500/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              D2C Cohort
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <button
              onClick={() => setActiveOverviewId('healthcare')}
              className="w-full sm:w-auto glow-btn bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <span>Explore Healthcare Cohort</span>
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
            <button
              onClick={() => setActiveOverviewId('d2c')}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2"
            >
              <span>Explore D2C Cohort</span>
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
            <Link
              href="/#contact"
              className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-white border border-blue-500/30 hover:border-blue-400 font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition flex items-center justify-center gap-2"
            >
              <span>Access By ZiAn</span>
              <svg className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </Link>
          </div>

          {/* KEY METRICS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pt-8 border-t border-blue-500/15">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-950/40 border border-blue-500/10">
              <div className="text-xl sm:text-3xl font-extrabold text-white">2 Specialized</div>
              <div className="text-[10px] sm:text-xs text-blue-300/70 font-semibold uppercase tracking-wider mt-1">Healthcare &amp; D2C</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-950/40 border border-blue-500/10">
              <div className="text-xl sm:text-3xl font-extrabold text-white">300+</div>
              <div className="text-[10px] sm:text-xs text-blue-300/70 font-semibold uppercase tracking-wider mt-1">Verified Leaders &amp; Founders</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-950/40 border border-blue-500/10">
              <div className="text-xl sm:text-3xl font-extrabold text-white">$43M+</div>
              <div className="text-[10px] sm:text-xs text-blue-300/70 font-semibold uppercase tracking-wider mt-1">Pilots, Capital &amp; Scale</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-950/40 border border-blue-500/10">
              <div className="text-xl sm:text-3xl font-extrabold text-white">80+</div>
              <div className="text-[10px] sm:text-xs text-blue-300/70 font-semibold uppercase tracking-wider mt-1">Hospital &amp; Retail Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COHORTS SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto space-y-12 sm:space-y-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-2 sm:mb-3">Venture Accelerator Programs</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">Active ZiAn Cohorts</h2>
          <p className="text-slate-400 text-xs sm:text-base max-w-2xl mx-auto mt-2 sm:mt-3">
            Dedicated vertical accelerators designed for founders, clinicians, brand operators, and industry visionaries.
          </p>
        </div>

        {/* HEALTHCARE COHORT CARD */}
        {(selectedCohortFilter === 'all' || selectedCohortFilter === 'healthcare') && (
          <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 relative group overflow-hidden border border-blue-500/30">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl group-hover:bg-blue-500/30 transition"></div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-blue-900/60 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 sm:mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 sm:w-8 h-6 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <div className="inline-block bg-blue-950 border border-blue-500/30 text-blue-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {COHORTS_DATA.healthcare.badge}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4">{COHORTS_DATA.healthcare.name}</h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {COHORTS_DATA.healthcare.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  {COHORTS_DATA.healthcare.tags.map((tag) => (
                    <span key={tag} className="bg-blue-950/90 border border-blue-500/30 text-blue-300 text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 bg-blue-950/40 p-4 sm:p-6 rounded-2xl border border-blue-500/20">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">Key Healthcare Benefits</h4>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                    <span>Direct clinical trial &amp; pilot deployment across partner hospital networks.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>HIPAA &amp; regulatory tech engineering advisory with capital co-building.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                    <span>Warm introductions to institutional healthcare VC syndicates ($250k–$3M).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <span>Quarterly executive roundtables with hospital CEOs &amp; medical directors.</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setActiveOverviewId('healthcare')}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition text-center shadow-lg shadow-blue-600/30"
                  >
                    View Full Overview
                  </button>
                  <button
                    onClick={() => openJoinModalForCohort('healthcare')}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 border border-blue-500/40 text-blue-300 font-bold py-3 px-4 rounded-xl text-xs transition text-center"
                  >
                    Apply to Healthcare
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* D2C COHORT CARD */}
        {(selectedCohortFilter === 'all' || selectedCohortFilter === 'd2c') && (
          <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 relative group overflow-hidden border border-purple-500/30">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl group-hover:bg-purple-500/30 transition"></div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 sm:mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 sm:w-8 h-6 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <div className="inline-block bg-purple-950 border border-purple-500/30 text-purple-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {COHORTS_DATA.d2c.badge}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4">{COHORTS_DATA.d2c.name}</h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {COHORTS_DATA.d2c.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  {COHORTS_DATA.d2c.tags.map((tag) => (
                    <span key={tag} className="bg-purple-950/90 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 bg-purple-950/40 p-4 sm:p-6 rounded-2xl border border-purple-500/20">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">Key D2C &amp; E-Commerce Benefits</h4>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
                    <span>Direct access to retail distribution networks &amp; global marketplaces.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-pink-400 mt-1.5 shrink-0"></span>
                    <span>Performance marketing scaling playbooks &amp; omni-channel growth capital.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                    <span>Warm introductions to consumer brand VC syndicates ($100k–$2M).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <span>Monthly CRO roundtables &amp; supply chain fulfillment discounts.</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setActiveOverviewId('d2c')}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition text-center shadow-lg shadow-purple-600/30"
                  >
                    View Full Overview
                  </button>
                  <button
                    onClick={() => openJoinModalForCohort('d2c')}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-purple-300 font-bold py-3 px-4 rounded-xl text-xs transition text-center"
                  >
                    Apply to D2C
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* COHORT DETAIL OVERVIEW MODAL */}
      {currentOverviewCohort && (
        <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#0a192f] border border-blue-500/30 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8 lg:p-10 relative shadow-2xl">
            <button
              onClick={() => setActiveOverviewId(null)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-slate-400 hover:text-white bg-slate-900 border border-slate-700 rounded-full p-2 transition z-20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>

            {/* MODAL COHORT SWITCHER TABS */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-blue-500/15 pb-4 pr-10">
              <button
                onClick={() => setActiveOverviewId('healthcare')}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition ${
                  activeOverviewId === 'healthcare'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Healthcare Cohort
              </button>
              <button
                onClick={() => setActiveOverviewId('d2c')}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition ${
                  activeOverviewId === 'd2c'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                D2C Cohort
              </button>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className={`inline-block border text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${
                currentOverviewCohort.id === 'healthcare'
                  ? 'bg-blue-950 border-blue-500/30 text-blue-400'
                  : 'bg-purple-950 border-purple-500/30 text-purple-400'
              }`}>
                {currentOverviewCohort.badge}
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3">{currentOverviewCohort.name}</h2>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">{currentOverviewCohort.tagline}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-blue-950/40 border border-blue-500/20 rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span>Who Can Join?</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentOverviewCohort.whoCanJoin.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${currentOverviewCohort.id === 'healthcare' ? 'bg-blue-400' : 'bg-purple-400'}`}></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-950/40 border border-blue-500/20 rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span>What You Get</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentOverviewCohort.whatYouGet.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4 mb-6 sm:mb-8 bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-800 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-blue-400 uppercase tracking-wider block mb-1">Community:</span>
                  <p className="text-slate-300">{currentOverviewCohort.community}</p>
                </div>
                <div>
                  <span className="font-bold text-cyan-400 uppercase tracking-wider block mb-1">Networking &amp; Events:</span>
                  <p className="text-slate-300">{currentOverviewCohort.networking}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="font-bold text-amber-400 uppercase tracking-wider block mb-1">Investment Opportunities:</span>
                  <p className="text-slate-300">{currentOverviewCohort.investmentOps}</p>
                </div>
                <div>
                  <span className="font-bold text-purple-400 uppercase tracking-wider block mb-1">Strategic Partnerships:</span>
                  <p className="text-slate-300">{currentOverviewCohort.strategicPartnerships}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="font-bold text-indigo-400 uppercase tracking-wider block mb-1">Mentorship &amp; Advisory:</span>
                  <p className="text-slate-300">{currentOverviewCohort.mentorship}</p>
                </div>
                <div>
                  <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-1">Venture Opportunities:</span>
                  <p className="text-slate-300">{currentOverviewCohort.ventureOps}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-blue-500/20">
              <button
                onClick={() => setActiveOverviewId(null)}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-6 py-3 rounded-xl text-sm transition text-center"
              >
                Close Overview
              </button>
              <button
                onClick={() => {
                  const target = currentOverviewCohort.id;
                  setActiveOverviewId(null);
                  openJoinModalForCohort(target);
                }}
                className={`w-full sm:w-auto glow-btn font-bold px-8 py-3 rounded-xl text-sm transition shadow-lg text-center ${
                  currentOverviewCohort.id === 'healthcare'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                }`}
              >
                Apply to Join {currentOverviewCohort.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOIN COHORT MULTI-STEP MODAL */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#0a192f] border border-blue-500/30 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8 lg:p-10 relative shadow-2xl my-6 sm:my-8">
            <button
              onClick={() => setJoinModalOpen(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-slate-400 hover:text-white bg-slate-900 border border-slate-700 rounded-full p-2 transition z-20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>

            <div className="mb-6 sm:mb-8 pr-8">
              <div className="text-blue-400 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mb-1">
                ZIAN Cohort Registration
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                Apply to Join {formData.targetCohort === 'healthcare' ? 'Healthcare Cohort' : 'D2C Cohort'}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {formData.targetCohort === 'healthcare'
                  ? 'For clinicians, hospital executives, medical specialists, and healthtech founders.'
                  : 'For D2C founders, e-commerce operators, CPG leaders, and growth marketers.'}
              </p>
            </div>

            <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-blue-500/15">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs flex items-center justify-center ${formStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</div>
                <span className="text-xs font-semibold text-white hidden sm:inline">Basic Info</span>
              </div>
              <div className="h-0.5 flex-1 bg-blue-900/60 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs flex items-center justify-center ${formStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</div>
                <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Professional</span>
              </div>
              <div className="h-0.5 flex-1 bg-blue-900/60 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs flex items-center justify-center ${formStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</div>
                <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Cohort Details</span>
              </div>
            </div>

            {!submittedRefId ? (
              <form onSubmit={handleFormSubmit}>
                {formStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-4">Step 1 — Basic Information</h3>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Target Cohort *</label>
                      <select
                        value={formData.targetCohort}
                        onChange={(e) => {
                          const newCohort = e.target.value as 'healthcare' | 'd2c';
                          setFormData({
                            ...formData,
                            targetCohort: newCohort,
                            industry: newCohort === 'healthcare' ? 'Healthcare' : 'D2C Brand',
                            otherIndustry: '',
                            otherLookingFor: '',
                          });
                        }}
                        className="w-full bg-blue-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-400"
                      >
                        <option value="healthcare">ZIAN Healthcare Cohort (Clinicians &amp; Healthtech)</option>
                        <option value="d2c">ZIAN D2C Cohort (Consumer Brands &amp; E-Commerce)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullname}
                        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                        placeholder={formData.targetCohort === 'healthcare' ? 'e.g. Dr. Sarah Jenkins' : 'e.g. Alex Morgan'}
                        className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 019-2834"
                          className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Location (City, Country) *</label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. San Francisco, CA / New York / Bengaluru"
                        className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button type="button" onClick={() => setFormStep(2)} className="w-full sm:w-auto glow-btn bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 rounded-xl text-xs sm:text-sm transition text-center">
                        Next: Professional Info &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {formStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-4">Step 2 — Professional Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Current Role *</label>
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder={formData.targetCohort === 'healthcare' ? 'e.g. Chief Medical Officer / Founder' : 'e.g. D2C Founder / Head of Growth'}
                          className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Company / Brand / Hospital *</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder={formData.targetCohort === 'healthcare' ? 'e.g. Vanguard Health Systems' : 'e.g. Aura Consumer Brands'}
                          className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Industry Focus *</label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full bg-blue-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                        >
                          {formData.targetCohort === 'healthcare' ? (
                            <>
                              <option value="Healthcare">Healthcare &amp; Clinical Medicine</option>
                              <option value="MedTech">MedTech &amp; Devices</option>
                              <option value="Digital Health">Digital Health &amp; Telemedicine</option>
                              <option value="Biotech">Biotech &amp; Clinical Research</option>
                              <option value="Other">Other (Please specify)</option>
                            </>
                          ) : (
                            <>
                              <option value="D2C Brand">D2C &amp; E-Commerce Brand</option>
                              <option value="Consumer Goods">Consumer Packaged Goods (CPG)</option>
                              <option value="Growth Agency">Performance Marketing &amp; Growth</option>
                              <option value="Retail Tech">Retail &amp; Omni-Channel Tech</option>
                              <option value="Other">Other (Please specify)</option>
                            </>
                          )}
                        </select>
                        {formData.industry === 'Other' && (
                          <div className="mt-2.5">
                            <input
                              type="text"
                              required
                              value={formData.otherIndustry}
                              onChange={(e) => setFormData({ ...formData, otherIndustry: e.target.value })}
                              placeholder="Please specify your industry focus..."
                              className="w-full bg-blue-950/80 border border-blue-400/50 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 placeholder-slate-400"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Years of Experience *</label>
                        <select
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="w-full bg-blue-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                        >
                          <option value="1-3 years">1-3 years</option>
                          <option value="4-7 years">4-7 years</option>
                          <option value="8-12 years">8-12 years</option>
                          <option value="12+ years">12+ years</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">LinkedIn Profile URL</label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Company / Brand Website</label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://yourbrand.com"
                          className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div className="pt-6 flex flex-col-reverse sm:flex-row justify-between gap-3">
                      <button type="button" onClick={() => setFormStep(1)} className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition text-center">
                        &larr; Back
                      </button>
                      <button type="button" onClick={() => setFormStep(3)} className="w-full sm:w-auto glow-btn bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 rounded-xl text-xs sm:text-sm transition text-center">
                        Next: Cohort Details &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {formStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-4">Step 3 — Cohort Objectives</h3>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Specialty / Sector Niche *</label>
                      <input
                        type="text"
                        value={formData.specialty}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        placeholder={formData.targetCohort === 'healthcare' ? 'e.g. Surgical Robotics, IVF, FemTech, Diagnostics' : 'e.g. Beauty & Personal Care, Sustainable Fashion, Health Drinks'}
                        className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">What are you looking for? (Select all that apply)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                        {(formData.targetCohort === 'healthcare'
                          ? ['Clinical Pilots', 'Venture Capital', 'Hospital Partnerships', 'Mentorship', 'Regulatory Advisory', 'Venture Co-Building', 'Other']
                          : ['Retail Distribution', 'Growth Capital', 'Performance Scaling', 'Supply Chain Tech', 'Influencer/Channel Scale', 'Venture Co-Building', 'Other']
                        ).map((option) => (
                          <label key={option} className="flex items-center gap-2.5 bg-blue-950/40 p-3 rounded-xl border border-blue-500/20 cursor-pointer hover:border-blue-400 transition">
                            <input
                              type="checkbox"
                              checked={formData.lookingFor.includes(option)}
                              onChange={() => handleCheckboxChange(option)}
                              className="rounded text-blue-600 focus:ring-0 shrink-0"
                            />
                            <span className="text-slate-200 text-xs">{option}</span>
                          </label>
                        ))}
                      </div>
                      {formData.lookingFor.includes('Other') && (
                        <div className="mt-3">
                          <label className="block text-xs font-semibold text-blue-300 mb-1.5">
                            Please specify what else you are looking for *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.otherLookingFor}
                            onChange={(e) => setFormData({ ...formData, otherLookingFor: e.target.value })}
                            placeholder="e.g. Strategic expansion, OEM partners, IP licensing..."
                            className="w-full bg-blue-950/80 border border-blue-400/50 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 placeholder-slate-400"
                          />
                        </div>
                      )}
                    </div>

                    {formError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center">
                        {formError}
                      </div>
                    )}

                    <div className="pt-6 flex flex-col-reverse sm:flex-row justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition text-center disabled:opacity-50"
                      >
                        &larr; Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full sm:w-auto glow-btn font-bold px-8 py-3 rounded-xl text-xs sm:text-sm transition shadow-lg text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          formData.targetCohort === 'healthcare'
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                        }`}
                      >
                        {isSubmitting
                          ? 'Submitting Application...'
                          : `Apply to Join ${formData.targetCohort === 'healthcare' ? 'Healthcare Cohort' : 'D2C Cohort'}`}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 sm:w-8 h-7 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Application Received</h3>
                <p className="text-slate-300 text-xs sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for applying to the {formData.targetCohort === 'healthcare' ? 'ZIAN Healthcare Cohort' : 'ZIAN D2C Cohort'}. Our venture team will review your application and contact you shortly.
                </p>
                <div className="p-3.5 sm:p-4 bg-blue-950/50 border border-blue-500/20 rounded-2xl max-w-sm mx-auto mb-8 text-xs text-blue-300 font-mono">
                  Ref ID: <span>{submittedRefId}</span>
                </div>
                <button onClick={() => setJoinModalOpen(false)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl text-xs sm:text-sm transition">
                  Return to Cohorts
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
