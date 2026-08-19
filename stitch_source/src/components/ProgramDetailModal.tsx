import React from 'react';
import { X, Check, ArrowRight, Calendar, Users, Shield, Sparkles, BookOpen } from 'lucide-react';
import { programs } from '../data/contentData';

interface ProgramDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId: string | null;
  onBookDiscovery: () => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  isOpen,
  onClose,
  programId,
  onBookDiscovery,
}) => {
  if (!isOpen || !programId) return null;

  const program = programs.find((p) => p.id === programId) || programs[0];

  return (
    <div
      id="program-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="program-modal-container"
        className="relative w-full max-w-3xl bg-[#faf8f5] text-[#1e1c1a] rounded-2xl shadow-2xl border border-[#e2d8c9] my-8 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#171615] text-[#f7f3eb] px-6 py-4 flex items-center justify-between border-b border-[#2b2724]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#c86d51]">
              Program Overview
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs font-serif text-[#cfc8bd]">
              {program.name}
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

        {/* Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Top Banner */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans font-bold tracking-widest text-[#a85b42] uppercase">
                {program.subheading}
              </span>
              {program.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#c86d51]/20 text-[#c86d51] border border-[#c86d51]/30 font-semibold uppercase">
                  {program.badge}
                </span>
              )}
            </div>

            <h3 className="font-display text-2xl sm:text-4xl text-[#171513] font-normal leading-tight">
              {program.headline}
            </h3>

            <p className="text-xs sm:text-sm text-[#736c62] font-light leading-relaxed">
              {program.idealFor}
            </p>
          </div>

          {/* Investment & Duration Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white p-4 sm:p-5 rounded-xl border border-[#eae3d6]">
            <div>
              <div className="text-[10px] font-sans uppercase tracking-wider text-[#8e877d]">
                Duration &amp; Format
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#1e1c1a] mt-0.5">
                {program.duration}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-sans uppercase tracking-wider text-[#8e877d]">
                Investment
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#c86d51] mt-0.5">
                {program.price}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] font-sans uppercase tracking-wider text-[#8e877d]">
                Cohort Status
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">
                Applications Open
              </div>
            </div>
          </div>

          {/* What Is Included */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] text-[#736c62] uppercase">
              Program Architecture &amp; Deliverables
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {program.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-lg border border-[#eae3d6] flex items-start gap-2.5 text-xs text-[#4a443b]"
                >
                  <Check size={14} className="text-[#c86d51] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum / Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] text-[#736c62] uppercase">
              Syllabus &amp; Milestones
            </h4>

            <div className="space-y-2.5">
              {program.modules.map((mod, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3.5 rounded-lg border border-[#eae3d6] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#c86d51] uppercase tracking-wider block">
                      {mod.week}
                    </span>
                    <div className="text-xs sm:text-sm font-semibold text-[#1e1c1a]">
                      {mod.title}
                    </div>
                  </div>
                  <div className="text-xs text-[#736c62] font-light sm:text-right sm:max-w-xs">
                    Outcome: {mod.outcome}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-[#eee7dc] flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBookDiscovery();
              }}
              className="w-full sm:flex-1 py-3.5 bg-[#c86d51] hover:bg-[#b85d43] text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>APPLY FOR {program.name.split(' ')[0]}</span>
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#eae3d6] hover:bg-[#eee7dc] text-xs font-medium text-[#5c554a] rounded-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
