import React from 'react';
import { ArrowRight, Compass, Layers, ShieldCheck, HeartHandshake } from 'lucide-react';

interface PhilosophySectionProps {
  onOpenAssessment: () => void;
  onOpenDiscovery: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  onOpenAssessment,
  onOpenDiscovery,
}) => {
  return (
    <section
      id="philosophy-section"
      className="relative bg-[#fbf9f5] text-[#1e1c1a] py-20 lg:py-28 overflow-hidden"
    >
      {/* Subtle Architectural Watermark */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 text-[140px] sm:text-[220px] lg:text-[300px] font-serif font-black text-[#f0e9dc]/70 select-none pointer-events-none watermark-text z-0">
        IMPACT
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Philosophical Thesis */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            <div className="inline-block">
              <span className="text-[11px] font-sans font-semibold tracking-[0.22em] text-[#a85b42] uppercase border-b border-[#a85b42]/30 pb-1">
                The Core Thesis
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.14] font-normal text-[#171513]">
              Your business should support your life —{' '}
              <span className="italic font-serif-subtle text-[#c86d51]">
                not consume it.
              </span>
            </h2>

            <p className="text-[#59524a] text-base sm:text-lg leading-relaxed font-light">
              Most founders build a prison instead of an empire. You work harder, but the financial needle barely moves. The mental load is crushing, and stepping away feels impossible. It's time to redesign the architecture of your success.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#e8e1d5] pt-6">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#1e1c1a] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#c86d51]"></span>
                  Predictable Margins
                </div>
                <p className="text-xs text-[#736c62] leading-relaxed">
                  Moving from billable hourly trap to high-ticket, productized asset valuation.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#1e1c1a] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#c86d51]"></span>
                  Nervous System Recovery
                </div>
                <p className="text-xs text-[#736c62] leading-relaxed">
                  Reclaiming deep uninterrupted sleep and mental peace of mind as the CEO.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenDiscovery}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#1e1c1a] hover:text-[#c86d51] uppercase transition-colors group"
              >
                <span>Read The Architectural Manifesto</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Founder Portrait in Modern High-Rise */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[490px] aspect-[4/3] sm:aspect-[1.15] rounded-lg overflow-hidden shadow-2xl border border-[#e2d8c9] group">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
                alt="Executive leadership coach in high-rise skyscraper office"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Refined subtle frame border */}
              <div className="absolute inset-0 border border-black/5 pointer-events-none rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
