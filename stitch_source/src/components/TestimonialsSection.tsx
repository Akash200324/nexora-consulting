import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/contentData';

interface TestimonialsSectionProps {
  onOpenTestimonialDetail: (testimonialId: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenTestimonialDetail,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeTestimonial = testimonials[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials-section"
      className="relative bg-[#fbf9f5] text-[#1c1a18] py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Watermark PROOF */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] sm:text-[180px] md:text-[240px] lg:text-[320px] font-serif font-black text-[#f0e8db]/60 select-none pointer-events-none watermark-text z-0">
        PROOF
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag & Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-18 space-y-3">
          <div>
            <span className="text-[11px] font-sans font-semibold tracking-[0.24em] text-[#a85b42] uppercase">
              Client Stories
            </span>
          </div>
          <div className="w-12 h-[1px] bg-[#c5a880] mx-auto" />

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-[1.15] font-normal text-[#171513]">
            Real people. Real businesses.{' '}
            <span className="italic font-serif-subtle text-[#c86d51]">
              Real transformation.
            </span>
          </h2>
        </div>

        {/* Testimonial Card Container */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#eae3d6] shadow-xl">
          {/* Left Column: Portrait with Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-xl overflow-hidden shadow-xl border border-[#e2d8c9] group">
              <img
                src={activeTestimonial.image}
                alt={activeTestimonial.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Bottom Badge: CLIENT STORY 01 / 03 */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-md shadow-md flex items-center justify-between border border-[#e8e1d5]">
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#1e1c1a] uppercase">
                  Client Story {activeTestimonial.number} / {activeTestimonial.total}
                </span>
                <span className="text-[10px] text-[#787167] font-light">
                  {activeTestimonial.location}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Quote, Author, Read More Stories */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Large Serif Quote from Screenshot */}
            <div className="relative">
              <blockquote className="font-display text-xl sm:text-2xl md:text-[27px] font-normal leading-[1.3] text-[#171513] italic">
                "{activeTestimonial.quote.replace(/^"|"$/g, '')}"
              </blockquote>
            </div>

            {/* Author Details */}
            <div className="pt-2">
              <div className="font-display text-lg sm:text-xl font-semibold text-[#171513]">
                {activeTestimonial.name}
              </div>
              <div className="text-[11px] font-sans tracking-[0.2em] text-[#736c62] uppercase font-semibold mt-0.5">
                {activeTestimonial.title}
              </div>
              <div className="text-xs text-[#9c9488] font-light">
                {activeTestimonial.company}
              </div>
            </div>

            {/* Key Metrics Pill */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#eee7dc]">
              {activeTestimonial.metrics.map((m, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[10px] uppercase font-sans tracking-wider text-[#8a8277]">
                    {m.label}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#c86d51]">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar: Read More Stories & Prev/Next buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => onOpenTestimonialDetail(activeTestimonial.id)}
                id="read-more-stories-btn"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase text-[#1e1c1a] hover:text-[#c86d51] transition-colors group"
              >
                <span>READ MORE STORIES</span>
                <ArrowRight
                  size={14}
                  className="stroke-[2.5] transition-transform group-hover:translate-x-1"
                />
              </button>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-[#ded5c6] flex items-center justify-center text-[#5e584f] hover:bg-[#1e1c1a] hover:text-white hover:border-[#1e1c1a] transition-all"
                  aria-label="Previous story"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-[#ded5c6] flex items-center justify-center text-[#5e584f] hover:bg-[#1e1c1a] hover:text-white hover:border-[#1e1c1a] transition-all"
                  aria-label="Next story"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
