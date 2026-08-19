import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Check, Sparkles } from 'lucide-react';
import { assessmentQuestions } from '../data/assessmentData';

interface AssessmentSectionProps {
  onStartFullAssessment: (initialQuestionIndex?: number, initialAnswers?: Record<number, number>) => void;
}

export const AssessmentSection: React.FC<AssessmentSectionProps> = ({
  onStartFullAssessment,
}) => {
  // Inline interactive preview state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({
    1: 3, // Default to "ALWAYS" as in the screenshot for question 1
  });

  const activeQuestion = assessmentQuestions[currentIdx] || assessmentQuestions[0];
  const selectedOptionIdx = selectedAnswers[activeQuestion.id] ?? 3;

  const handleSelectOption = (idx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: idx,
    }));
  };

  const handleContinue = () => {
    if (currentIdx < 2) {
      // Step through inline for first few questions or jump to full assessment
      setCurrentIdx((prev) => prev + 1);
    } else {
      onStartFullAssessment(currentIdx, selectedAnswers);
    }
  };

  const formattedStepNumber = String(currentIdx + 1).padStart(2, '0');
  const formattedTotal = String(assessmentQuestions.length).padStart(2, '0');

  return (
    <section
      id="assessment-section"
      className="relative bg-[#11100f] text-[#f2ede4] py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 text-[140px] sm:text-[220px] lg:text-[320px] font-serif font-black text-[#1b1917]/80 select-none pointer-events-none watermark-text z-0">
        IMPACT
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Copy and CTA */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Tagline */}
            <div>
              <span className="text-[11px] font-sans font-semibold tracking-[0.24em] text-[#c5a880] uppercase">
                The Business Reality Assessment
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-[1.12] font-normal text-[#fcfaf7]">
              Before you change your business,{' '}
              <span className="italic font-serif-subtle text-[#d1ab80]">
                understand it.
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-[#a39a8c] text-sm sm:text-base font-light italic">
              There's no right answer, only an accurate one.
            </p>

            {/* Paragraph */}
            <p className="text-[#bfb8ad] text-sm sm:text-base leading-relaxed font-light">
              Take the first step toward predictable growth. This diagnostic tool identifies the structural gaps in your current architecture and maps your path to freedom.
            </p>

            {/* Meta */}
            <div className="text-[11px] sm:text-[12px] font-sans tracking-[0.18em] text-[#8a8277] uppercase font-medium pt-1">
              <span>02 MINUTES</span>
              <span className="mx-2 text-[#c86d51]">|</span>
              <span>FREE</span>
              <span className="mx-2 text-[#c86d51]">|</span>
              <span>PERSONALISED RESULT</span>
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                onClick={() => onStartFullAssessment(currentIdx, selectedAnswers)}
                id="start-assessment-btn"
                className="inline-flex items-center justify-center gap-2.5 bg-[#c86d51] hover:bg-[#b85d43] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm transition-all duration-300 shadow-xl hover:shadow-[0_8px_25px_rgba(200,109,81,0.3)] hover:-translate-y-0.5"
              >
                <span>START THE FREE ASSESSMENT</span>
                <ArrowRight size={15} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Exact Assessment Card from Screenshot */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div
              id="assessment-widget-card"
              className="w-full max-w-[580px] bg-[#faf8f5] text-[#1e1c1a] rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl border border-[#eae3d6] transition-all duration-300"
            >
              {/* Card Header: Label & Step Counter */}
              <div className="flex items-center justify-between pb-3">
                <span className="text-[10.5px] tracking-[0.2em] font-sans uppercase font-medium text-[#7c756a]">
                  Business Reality Assessment
                </span>
                <span className="text-xs sm:text-sm font-sans font-bold tracking-wider text-[#1e1c1a]">
                  {formattedStepNumber} / {formattedTotal}
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-[1.5px] bg-[#e6dfd3] mb-6 sm:mb-8 overflow-hidden rounded-full">
                <div
                  className="h-full bg-[#c86d51] transition-all duration-400"
                  style={{
                    width: `${((currentIdx + 1) / assessmentQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Heading */}
              <div className="mb-6 sm:mb-8 min-h-[56px] flex flex-col justify-center">
                <h3 className="font-display text-xl sm:text-2xl md:text-[26px] font-normal text-[#171513] leading-snug">
                  {activeQuestion.question}
                </h3>
                {activeQuestion.subtext && (
                  <p className="text-xs text-[#736c62] mt-1.5 font-light">
                    {activeQuestion.subtext}
                  </p>
                )}
              </div>

              {/* Options List matching exact screenshot */}
              <div className="space-y-2.5 sm:space-y-3 mb-8">
                {activeQuestion.options.map((option, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg border transition-all duration-200 flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#c86d51] bg-[#f5ede4] shadow-sm ring-1 ring-[#c86d51]/20'
                          : 'border-[#eae3d6] bg-[#ffffff] hover:border-[#cfc6b7] hover:bg-[#faf7f2]'
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-[13px] font-sans font-semibold tracking-wider uppercase transition-colors ${
                          isSelected ? 'text-[#1e1c1a]' : 'text-[#5a544c]'
                        }`}
                      >
                        {option.label}
                      </span>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono transition-colors ${
                            isSelected ? 'text-[#a85b42] font-bold' : 'text-[#a69e94]'
                          }`}
                        >
                          {option.score}
                        </span>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#c86d51] text-white flex items-center justify-center shadow-sm animate-in zoom-in-50 duration-150">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Card Footer: Step Counter and Continue Button */}
              <div className="flex items-center justify-between pt-4 border-t border-[#eee7dc]">
                <span className="text-xs font-sans text-[#7c756a] font-medium">
                  Step {currentIdx + 1} of {assessmentQuestions.length}
                </span>

                <button
                  onClick={handleContinue}
                  id="assessment-continue-btn"
                  className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-sans font-bold tracking-wider uppercase text-[#1e1c1a] hover:text-[#c86d51] transition-colors py-1.5 group"
                >
                  <span>{currentIdx < 2 ? 'CONTINUE' : 'EXPAND FULL DIAGNOSTIC'}</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1 stroke-[2.5]"
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
