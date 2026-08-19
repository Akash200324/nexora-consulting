import React from 'react';
import { ArrowRight } from 'lucide-react';
import { threeSteps } from '../data/contentData';

interface ThreeStepsSectionProps {
  onOpenAssessment: () => void;
  onOpenDiscovery: () => void;
  onOpenPrograms: () => void;
}

export const ThreeStepsSection: React.FC<ThreeStepsSectionProps> = ({
  onOpenAssessment,
  onOpenDiscovery,
  onOpenPrograms,
}) => {
  const handleStepClick = (index: number) => {
    if (index === 0) onOpenAssessment();
    else if (index === 1) onOpenDiscovery();
    else onOpenPrograms();
  };

  return (
    <section
      id="steps-section"
      className="relative bg-[#11100f] text-[#f7f3eb] py-20 lg:py-28 overflow-hidden text-center"
    >
      {/* Huge Background Watermark: G R O W T H */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[90px] sm:text-[160px] md:text-[220px] lg:text-[280px] font-serif font-black text-[#1b1917]/70 select-none pointer-events-none watermark-text z-0">
        GROWTH
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-normal text-[#fbf8f5] mb-16 lg:mb-20 tracking-tight">
          Your next move is simple.
        </h2>

        {/* 3 Step Columns from Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 max-w-5xl mx-auto">
          {threeSteps.map((step, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={idx}
                onClick={() => handleStepClick(idx)}
                className="flex flex-col items-center text-center space-y-4 group cursor-pointer p-4 rounded-lg hover:bg-white/[0.02] transition-all duration-300"
              >
                {/* Step Number Badge */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-md flex items-center justify-center font-sans font-bold text-sm sm:text-base tracking-wider transition-all duration-300 shadow-lg ${
                    isFirst
                      ? 'bg-[#c86d51] text-white shadow-[#c86d51]/20'
                      : 'bg-[#1a1918] text-[#c5a880] border border-[#332f2b] group-hover:border-[#c86d51] group-hover:text-white'
                  }`}
                >
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="font-sans font-bold text-xs sm:text-sm tracking-[0.2em] text-[#e8e2d8] uppercase group-hover:text-[#c86d51] transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-[13px] text-[#9c9488] leading-relaxed font-light max-w-xs">
                  {step.description}
                </p>

                {/* Subtle affordance */}
                <div className="pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#c86d51] flex items-center gap-1 font-semibold">
                    <span>{idx === 0 ? 'Start Diagnostic' : idx === 1 ? 'Schedule Call' : 'View Pathways'}</span>
                    <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
