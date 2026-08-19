import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenAssessment: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAssessment }) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] lg:min-h-[96vh] bg-[#11100f] text-white pt-28 sm:pt-32 pb-16 lg:pb-24 overflow-hidden flex items-center"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#c86d51]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#a85038]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Hero Content (7 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 lg:space-y-7 text-left">
            {/* Tagline */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.24em] text-[#d1ab80] uppercase">
                International Profit &amp; Mindset Coach
              </span>
            </div>

            {/* Display Headings */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-[68px] leading-[1.08] font-normal tracking-[-0.01em] text-[#fbf8f5]">
              <span className="block">Work Less.</span>
              <span className="block">Earn Predictably.</span>
              <span className="block italic text-[#d4af37] font-serif-subtle">
                Sleep Better.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#bfb8ad] text-base sm:text-lg md:text-[19px] font-light leading-relaxed max-w-xl">
              Build a business that creates predictable income without demanding everything from you.
            </p>

            {/* Meta Badges */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] tracking-[0.18em] text-[#a89f92] uppercase font-sans font-medium">
              <span>2 MIN</span>
              <span className="text-[#c86d51]">•</span>
              <span>FREE</span>
              <span className="text-[#c86d51]">•</span>
              <span>PERSONALISED</span>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenAssessment}
                id="hero-cta-btn"
                className="inline-flex items-center justify-center gap-3 bg-[#c86d51] hover:bg-[#b85d43] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 sm:px-8 py-3.5 sm:py-4 rounded-sm transition-all duration-300 shadow-xl hover:shadow-[0_8px_25px_rgba(200,109,81,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>TAKE THE FREE ASSESSMENT</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Trust Indicator Pill */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-[#8c857b]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#c86d51]" />
                <span>Over 350+ Founders Coached</span>
              </div>
              <div className="hidden sm:inline text-neutral-700">•</div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#c86d51]" />
                <span>$42M+ Combined Client Valuation Added</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image (5 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-[4/5] rounded-lg overflow-hidden border border-[#2b2724] shadow-2xl group">
              {/* Premium Luxury Coach Photography */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                alt="Ranjitha - International Profit and Mindset Coach in luxury executive lounge"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100f] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#11100f]/40 via-transparent to-transparent" />

              {/* Ambient Lamp Glow Overlay effect */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#161514]/85 backdrop-blur-md border border-[#332f2b] p-4 rounded-md shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#d1ab80] font-medium font-sans">
                    Executive Architecture
                  </div>
                  <div className="font-serif text-sm text-[#f5f1eb] mt-0.5">
                    "Freedom is engineered, not stumbled upon."
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#c86d51]/20 border border-[#c86d51]/40 flex items-center justify-center text-[#e89078] shrink-0">
                  <Sparkles size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
