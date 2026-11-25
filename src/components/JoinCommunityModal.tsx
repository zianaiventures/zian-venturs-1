'use client';

import React, { useState, useEffect } from 'react';

export function openCommunityModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-community-modal'));
  }
}

const INTEREST_OPTIONS = [
  'Healthcare Cohort (Clinicians & Healthtech)',
  'D2C & Consumer Brands Cohort',
  'Venture Co-Building & Studio Support',
  'Angel Investing & Syndicate Deals',
  'Mentorship & Executive Advisory',
  'Venture Pathways (AI SaaS, Enterprise & Commerce)',
  'Other',
];

export default function JoinCommunityModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    company: '',
    linkedin: '',
    interestedIn: [] as string[],
    otherInterest: '',
  });

  useEffect(() => {
    const handleOpen = () => {
      setSubmittedRefId(null);
      setFormError(null);
      setIsOpen(true);
    };

    window.addEventListener('open-community-modal', handleOpen);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest('a, button');
      if (btn) {
        const text = btn.textContent?.toLowerCase() || '';
        const href = btn.getAttribute('href');

        if (
          text.includes('access by zian') ||
          text.includes('join our community') ||
          text.includes('join community') ||
          btn.getAttribute('data-community-modal') === 'true'
        ) {
          e.preventDefault();
          handleOpen();
        }
      }
    };

    document.addEventListener('click', handleGlobalClick, true);

    return () => {
      window.removeEventListener('open-community-modal', handleOpen);
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  const handleCheckboxChange = (val: string) => {
    setFormData((prev) => {
      const exists = prev.interestedIn.includes(val);
      if (exists) {
        return { ...prev, interestedIn: prev.interestedIn.filter((i) => i !== val) };
      } else {
        return { ...prev, interestedIn: [...prev.interestedIn, val] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const refId = `ZIAN-COMM-${Math.floor(1000 + Math.random() * 9000)}`;

    const finalInterestedIn = formData.interestedIn.map((item) =>
      item === 'Other'
        ? formData.otherInterest.trim()
          ? `Other: ${formData.otherInterest.trim()}`
          : 'Other'
        : item
    );

    const interestedInStr = finalInterestedIn.join(', ');

    try {
      setSubmittedRefId(refId);
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] modal-backdrop flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div className="bg-[#0a192f] border border-blue-500/30 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 lg:p-10 relative shadow-2xl my-6 sm:my-8 text-white">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 text-slate-400 hover:text-white bg-slate-900 border border-slate-700 rounded-full p-2 transition z-20"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>

        <div className="mb-6 sm:mb-8 pr-8">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span>ZiAn Global Ecosystem</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">ACCESS by ZiAn</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            Connect with 300+ clinicians, D2C brand founders, investors, and venture co-building partners across global hubs.
          </p>
        </div>

        {!submittedRefId ? (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                placeholder="e.g. Alex Morgan / Dr. Sarah Jenkins"
                className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Work Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 placeholder-slate-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Location (City, Country) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. San Francisco, CA / London / Bengaluru"
                  className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 placeholder-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Current Role *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Founder, Chief Medical Officer, Partner"
                  className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Vanguard Health / Aura Brands"
                  className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                LinkedIn Profile URL *
              </label>
              <input
                type="url"
                required
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full bg-blue-950/60 border border-blue-500/30 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-400 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                What are you interested in? (Select all that apply) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {INTEREST_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2.5 bg-blue-950/40 p-2.5 sm:p-3 rounded-xl border border-blue-500/20 cursor-pointer hover:border-blue-400 transition"
                  >
                    <input
                      type="checkbox"
                      checked={formData.interestedIn.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="rounded text-blue-600 focus:ring-0 shrink-0"
                    />
                    <span className="text-slate-200 text-xs">{option}</span>
                  </label>
                ))}
              </div>

              {formData.interestedIn.includes('Other') && (
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-blue-300 mb-1.5">
                    Please specify your interest *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.otherInterest}
                    onChange={(e) => setFormData({ ...formData, otherInterest: e.target.value })}
                    placeholder="e.g. Strategic distribution, OEM manufacturing, IP advisory..."
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

            <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition text-center disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto glow-btn bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl text-xs sm:text-sm transition shadow-lg shadow-blue-600/30 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit & Join ACCESS by ZiAn'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 sm:py-8">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 sm:w-8 h-7 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Welcome to ZiAn Ecosystem</h3>
            <p className="text-slate-300 text-xs sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
              Thank you for applying to ACCESS by ZiAn. Our venture team will review your profile and send your exclusive access details shortly.
            </p>
            <div className="p-3.5 sm:p-4 bg-blue-950/50 border border-blue-500/20 rounded-2xl max-w-sm mx-auto mb-8 text-xs text-blue-300 font-mono">
              Ref ID: <span>{submittedRefId}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl text-xs sm:text-sm transition"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
