import React from 'react';
import { ArrowRight, TrendingUp, Clock, ShieldCheck, DollarSign } from 'lucide-react';
import { caseStudies } from '../data/contentData';

interface SuccessStorySectionProps {
  onOpenCaseStudy: (caseStudyId: string) => void;
}

export const SuccessStorySection: React.FC<SuccessStorySectionProps> = ({
  onOpenCaseStudy,
}) => {
  const featuredStory = caseStudies[0];

  return (
    <section
      id="success-story-section"
      className="relative min-h-[640px] lg:min-h-[720px] bg-[#11100f] py-16 lg:py-24 overflow-hidden flex items-center"
    >
      {/* Background Photography of High-Rise Skyline Penthouse Boardroom */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury high-rise penthouse office overlooking metropolitan city skyline at twilight"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.15]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#11100f]/90 via-[#11100f]/60 to-[#11100f]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11100f] via-transparent to-[#11100f]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left space to let background breathe */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6">
            <div className="space-y-4">
              <span className="text-[11px] font-sans font-semibold tracking-[0.24em] text-[#d1ab80] uppercase block">
                Proof of Architectural Scale
              </span>
              <div className="text-3xl font-display text-[#f5f0e6] max-w-md font-light leading-snug">
                "When your operational bottlenecks disappear, revenue follows velocity."
              </div>
            </div>
          </div>

          {/* Right Floating Card from Screenshot */}
          <div className="lg:col-span-7 xl:col-span-6 flex justify-end">
            <div
              id="success-story-card"
              className="w-full max-w-[560px] bg-[#1a1918]/95 backdrop-blur-md border border-[#38332d] rounded-xl p-7 sm:p-9 md:p-10 shadow-2xl space-y-6 text-left"
            >
              {/* Tag */}
              <div>
                <span className="text-[11px] font-sans font-semibold tracking-[0.24em] text-[#d1ab80] uppercase">
                  {featuredStory.tag}
                </span>
              </div>

              {/* Headline */}
              <h3 className="font-display text-xl sm:text-2xl md:text-[25px] font-normal leading-snug text-[#f7f4ef] italic">
                {featuredStory.title}
              </h3>

              {/* Structured Challenge/Approach/Transformation/Result */}
              <div className="space-y-4 text-xs sm:text-[13px] text-[#cbc4b8] font-light leading-relaxed pt-1">
                {/* Challenge */}
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c86d51] mt-2 shrink-0" />
                  <div>
                    <span className="font-semibold text-[11px] tracking-wider uppercase text-[#e8dfd2] font-sans mr-2">
                      The Challenge
                    </span>
                    <span className="text-[#a8a195]">{featuredStory.challenge}</span>
                  </div>
                </div>

                {/* Approach */}
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c86d51] mt-2 shrink-0" />
                  <div>
                    <span className="font-semibold text-[11px] tracking-wider uppercase text-[#e8dfd2] font-sans mr-2">
                      The Approach
                    </span>
                    <span className="text-[#a8a195]">{featuredStory.approach}</span>
                  </div>
                </div>

                {/* Transformation */}
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c86d51] mt-2 shrink-0" />
                  <div>
                    <span className="font-semibold text-[11px] tracking-wider uppercase text-[#e8dfd2] font-sans mr-2">
                      The Transformation
                    </span>
                    <span className="text-[#a8a195]">{featuredStory.transformation}</span>
                  </div>
                </div>

                {/* Result */}
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c86d51] mt-2 shrink-0" />
                  <div>
                    <span className="font-semibold text-[11px] tracking-wider uppercase text-[#e8dfd2] font-sans mr-2">
                      The Result
                    </span>
                    <span className="text-[#a8a195]">{featuredStory.result}</span>
                  </div>
                </div>
              </div>

              {/* Read Full Story Button */}
              <div className="pt-3 border-t border-[#2e2a25]">
                <button
                  onClick={() => onOpenCaseStudy(featuredStory.id)}
                  id="read-case-study-btn"
                  className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase text-[#e8e2d8] hover:text-[#c86d51] transition-colors group"
                >
                  <span>READ THE FULL STORY</span>
                  <ArrowRight
                    size={14}
                    className="stroke-[2.5] transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
