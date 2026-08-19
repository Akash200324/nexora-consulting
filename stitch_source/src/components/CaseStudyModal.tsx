import React from 'react';
import { X, ArrowRight, TrendingUp, Clock, ShieldCheck, Quote } from 'lucide-react';
import { caseStudies } from '../data/contentData';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudyId: string | null;
  onBookDiscovery: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  onClose,
  caseStudyId,
  onBookDiscovery,
}) => {
  if (!isOpen) return null;

  const study = caseStudies.find((c) => c.id === caseStudyId) || caseStudies[0];

  return (
    <div
      id="case-study-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="case-study-modal-container"
        className="relative w-full max-w-3xl bg-[#faf8f5] text-[#1e1c1a] rounded-2xl shadow-2xl border border-[#e2d8c9] my-8 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#171615] text-[#f7f3eb] px-6 py-4 flex items-center justify-between border-b border-[#2b2724]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#c86d51]">
              Case Study
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs font-serif text-[#cfc8bd]">
              {study.founder} ({study.companyType})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#9c9488] hover:text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Main Title */}
          <div className="space-y-3">
            <span className="text-xs font-sans font-bold tracking-widest text-[#a85b42] uppercase">
              {study.tag}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#171513] font-normal leading-snug">
              {study.title}
            </h3>
          </div>

          {/* Metrics Comparison Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-xl border border-[#eae3d6] shadow-sm">
            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-[#eae3d6] pb-4 sm:pb-0 sm:pr-4">
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#918a80]">
                Baseline (Before Intervention)
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-[#4a433a]">
                <div>• Revenue: <span className="font-semibold text-[#1e1c1a]">{study.startingMetrics.revenue}</span></div>
                <div>• Founder Workload: <span className="font-semibold text-rose-700">{study.startingMetrics.hoursPerWeek}</span></div>
                <div>• Net Margin: <span className="font-semibold text-[#1e1c1a]">{study.startingMetrics.margin}</span></div>
              </div>
            </div>

            <div className="space-y-2 sm:pl-4">
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#c86d51]">
                Scale Result (12 Months Later)
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-[#4a433a]">
                <div>• Revenue: <span className="font-semibold text-emerald-800">{study.endingMetrics.revenue}</span></div>
                <div>• Founder Workload: <span className="font-semibold text-emerald-800">{study.endingMetrics.hoursPerWeek}</span></div>
                <div>• Net Margin: <span className="font-semibold text-emerald-800">{study.endingMetrics.margin}</span></div>
              </div>
            </div>
          </div>

          {/* Quote Block */}
          <div className="bg-[#f3ece0] p-5 sm:p-6 rounded-xl border-l-4 border-[#c86d51] space-y-2">
            <p className="font-display text-base sm:text-lg text-[#1e1c1a] italic">
              "{study.keyQuote}"
            </p>
            <div className="text-xs font-sans font-bold tracking-wider uppercase text-[#8a5b42]">
              — {study.founder}, Founder &amp; CEO
            </div>
          </div>

          {/* Full Narrative Breakdown */}
          <div className="space-y-4 text-xs sm:text-sm text-[#474139] leading-relaxed font-light">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] text-[#736c62] uppercase">
              The Architectural Turnaround
            </h4>
            {study.fullStoryParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-4 border-t border-[#eee7dc] flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBookDiscovery();
              }}
              className="w-full sm:flex-1 py-3.5 bg-[#c86d51] hover:bg-[#b85d43] text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Map Your Own Turnaround (15-Min Call)</span>
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#eae3d6] hover:bg-[#eee7dc] text-xs font-medium text-[#5c554a] rounded-sm transition-colors"
            >
              Close Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
