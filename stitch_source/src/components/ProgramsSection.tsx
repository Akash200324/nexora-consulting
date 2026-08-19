import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { programs } from '../data/contentData';

interface ProgramsSectionProps {
  onOpenProgram: (programId: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenProgram }) => {
  const fga = programs.find((p) => p.id === 'fga') || programs[0];
  const bpa = programs.find((p) => p.id === 'bpa') || programs[1];

  return (
    <section
      id="programs-section"
      className="relative bg-[#fbf9f5] text-[#1c1a18] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-18 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-normal text-[#171513]">
            Choose Your Path
          </h2>
          <div className="w-12 h-[1.5px] bg-[#c5a880] mx-auto" />
        </div>

        {/* Two Cards Grid from Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Card 1: Founders Growth Accelerator (Light Card) */}
          <div
            id="program-card-fga"
            className="relative bg-[#ffffff] rounded-xl p-8 sm:p-10 md:p-12 border border-[#eae3d6] shadow-xl flex flex-col justify-between overflow-hidden group hover:border-[#c86d51]/50 transition-all duration-300"
          >
            {/* Top Right Watermark 01 */}
            <div className="absolute top-4 right-6 text-6xl sm:text-7xl font-serif font-bold text-[#f0e9dc] select-none pointer-events-none watermark-text">
              01
            </div>

            <div className="space-y-6 relative z-10">
              {/* Tag */}
              <div>
                <span className="text-[10.5px] sm:text-[11px] font-sans font-semibold tracking-[0.22em] text-[#a85b42] uppercase">
                  {fga.subheading}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl sm:text-3xl md:text-[34px] font-normal text-[#171513] leading-snug">
                {fga.headline}
              </h3>

              {/* Bullets */}
              <ul className="space-y-3 pt-2 text-xs sm:text-[13px] text-[#544e45] font-light">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c86d51] shrink-0" />
                  <span>13-week cohort</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c86d51] shrink-0" />
                  <span className="font-medium text-[#1e1c1a]">AED 1,500</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c86d51] shrink-0" />
                  <span>Next cohort starting soon</span>
                </li>
              </ul>
            </div>

            {/* Bottom Button */}
            <div className="pt-10 relative z-10">
              <button
                onClick={() => onOpenProgram('fga')}
                id="explore-fga-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#c86d51] hover:bg-[#b85d43] text-white text-xs font-sans font-semibold tracking-widest uppercase px-7 py-3.5 rounded-sm transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#c86d51]/20 active:scale-[0.98]"
              >
                <span>EXPLORE FGA</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Card 2: Business Profit Accelerator (Dark Card) */}
          <div
            id="program-card-bpa"
            className="relative bg-[#131211] text-[#f7f3eb] rounded-xl p-8 sm:p-10 md:p-12 border border-[#2b2723] shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-[#c5a880]/50 transition-all duration-300"
          >
            {/* Top Right Watermark 02 */}
            <div className="absolute top-4 right-6 text-6xl sm:text-7xl font-serif font-bold text-[#23201d] select-none pointer-events-none watermark-text">
              02
            </div>

            <div className="space-y-6 relative z-10">
              {/* Tag */}
              <div>
                <span className="text-[10.5px] sm:text-[11px] font-sans font-semibold tracking-[0.22em] text-[#d1ab80] uppercase">
                  {bpa.subheading}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl sm:text-3xl md:text-[34px] font-normal text-[#fcfaf7] leading-snug">
                {bpa.headline}
              </h3>

              {/* Bullets */}
              <ul className="space-y-3 pt-2 text-xs sm:text-[13px] text-[#b8b0a2] font-light">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shrink-0" />
                  <span>High-touch 1:1 pathway</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shrink-0" />
                  <span>Includes Business Growth Assessment (USD 499 value)</span>
                </li>
              </ul>
            </div>

            {/* Bottom Button */}
            <div className="pt-10 relative z-10">
              <button
                onClick={() => onOpenProgram('bpa')}
                id="explore-bpa-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#1b1918] hover:bg-[#262321] border border-[#3d3731] hover:border-[#d1ab80] text-[#e8e2d8] hover:text-white text-xs font-sans font-semibold tracking-widest uppercase px-7 py-3.5 rounded-sm transition-all duration-200 shadow-md active:scale-[0.98]"
              >
                <span>EXPLORE BPA</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
