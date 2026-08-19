import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  BarChart3,
  Award,
  Download,
  Calendar,
  Layers,
  Clock,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { assessmentQuestions, calculateAssessmentResult } from '../data/assessmentData';
import { AssessmentScores } from '../types';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestionIndex?: number;
  initialAnswers?: Record<number, number>;
  onBookDiscovery: () => void;
  onOpenProgram: (programId: string) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  initialQuestionIndex = 0,
  initialAnswers = {},
  onBookDiscovery,
  onOpenProgram,
}) => {
  const [currentIdx, setCurrentIdx] = useState(initialQuestionIndex);
  const [answers, setAnswers] = useState<Record<number, number>>(initialAnswers);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<AssessmentScores | null>(null);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(initialQuestionIndex);
      setAnswers((prev) => ({ ...initialAnswers, ...prev }));
    }
  }, [isOpen, initialQuestionIndex]);

  if (!isOpen) return null;

  const currentQ = assessmentQuestions[currentIdx];
  const selectedOptionIdx = answers[currentQ?.id];

  const handleSelect = (optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (selectedOptionIdx === undefined) return;

    if (currentIdx < assessmentQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Calculate final results
      const res = calculateAssessmentResult(answers);
      setResult(res);
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c86d51', '#d4af37', '#fbf9f5', '#1a1918'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
    setResult(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const categoryScoresList = result
    ? [
        { label: 'Income Predictability', score: result.categoryScores.predictability, max: 9, key: 'predictability' },
        { label: 'Operational Autonomy', score: result.categoryScores.freedom, max: 9, key: 'freedom' },
        { label: 'Systems & SOPs', score: result.categoryScores.systems, max: 9, key: 'systems' },
        { label: 'Founder Vitality & Rest', score: result.categoryScores.mindset, max: 9, key: 'mindset' },
      ]
    : [];

  return (
    <div
      id="assessment-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="assessment-modal-container"
        className="relative w-full max-w-3xl bg-[#faf8f5] text-[#1e1c1a] rounded-2xl shadow-2xl border border-[#e2d8c9] my-8 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Top Bar */}
        <div className="bg-[#171615] text-[#e8e2d8] px-6 py-4 flex items-center justify-between border-b border-[#2b2724]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#c86d51]">
              Diagnostic Engine
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs font-serif text-[#cfc8bd]">
              Business Reality Assessment
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

        {/* Modal Body */}
        {!isCompleted ? (
          <div className="p-6 sm:p-10 space-y-6">
            {/* Progress Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-sans text-[#787167]">
                <span className="uppercase tracking-wider font-semibold text-[#a85b42]">
                  {currentQ.categoryLabel}
                </span>
                <span className="font-bold text-[#1e1c1a]">
                  Question {currentIdx + 1} of {assessmentQuestions.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#e8e1d4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#c86d51] transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentIdx + 1) / assessmentQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="py-2 space-y-1.5">
              <h3 className="font-display text-2xl sm:text-3xl text-[#171513] font-normal leading-snug">
                {currentQ.question}
              </h3>
              {currentQ.subtext && (
                <p className="text-xs sm:text-sm text-[#736c62] font-light italic">
                  {currentQ.subtext}
                </p>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? 'border-[#c86d51] bg-[#f5ece2] shadow-md ring-2 ring-[#c86d51]/20'
                        : 'border-[#eae3d6] bg-white hover:border-[#d4c9b8] hover:bg-[#faf7f2]'
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <div
                        className={`text-xs sm:text-sm font-sans font-bold uppercase tracking-wider ${
                          isSelected ? 'text-[#a85b42]' : 'text-[#1e1c1a]'
                        }`}
                      >
                        {opt.label}
                      </div>
                      {opt.description && (
                        <div className="text-xs text-[#736c62] font-light leading-relaxed">
                          {opt.description}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs font-mono font-semibold ${
                          isSelected ? 'text-[#a85b42]' : 'text-[#aba396]'
                        }`}
                      >
                        +{opt.score} pts
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#c86d51] border-[#c86d51] text-white shadow-sm'
                            : 'border-[#d4cbbd] bg-white'
                        }`}
                      >
                        {isSelected && <Check size={13} className="stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-[#eee7dc] flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className={`inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-wider uppercase px-4 py-2.5 rounded transition-colors ${
                  currentIdx === 0
                    ? 'text-[#bbb4a8] cursor-not-allowed'
                    : 'text-[#59524a] hover:text-[#1e1c1a] hover:bg-[#ede6d8]'
                }`}
              >
                <ArrowLeft size={14} />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={selectedOptionIdx === undefined}
                className={`inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase px-6 py-3 rounded-sm transition-all duration-200 shadow-md ${
                  selectedOptionIdx === undefined
                    ? 'bg-[#d8d0c2] text-[#8e877a] cursor-not-allowed'
                    : 'bg-[#c86d51] hover:bg-[#b85d43] text-white shadow-[#c86d51]/20 active:scale-[0.98]'
                }`}
              >
                <span>
                  {currentIdx === assessmentQuestions.length - 1 ? 'Calculate Diagnosis' : 'Next Step'}
                </span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        ) : (
          /* Comprehensive Assessment Results Report */
          <div className="p-6 sm:p-10 space-y-8 print:p-0">
            {/* Header Score Card */}
            <div className="bg-[#171615] text-[#f7f3eb] rounded-xl p-6 sm:p-8 border border-[#2e2a25] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-sans font-bold tracking-[0.24em] text-[#d1ab80] uppercase block">
                    Diagnostic Archetype
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-white font-normal mt-1">
                    {result?.tier}
                  </h3>
                </div>

                <div className="flex items-baseline gap-2 bg-[#262422] px-4 py-3 rounded-lg border border-[#3b3631]">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-[#c86d51]">
                    {result?.percentage}%
                  </span>
                  <span className="text-xs text-[#a8a195] font-sans">
                    Freedom Score ({result?.totalScore} / {result?.maxScore})
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2e2a25]">
                <h4 className="text-sm font-semibold text-[#f0ebe3] font-sans">
                  {result?.headline}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#b5ada1] font-light leading-relaxed mt-1">
                  {result?.summary}
                </p>
              </div>
            </div>

            {/* Category Dimension Scores */}
            <div className="space-y-3">
              <h4 className="text-xs font-sans font-bold tracking-[0.2em] text-[#787167] uppercase">
                Architectural Breakdown Matrix
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryScoresList.map((cat, idx) => {
                  const pct = Math.round((cat.score / cat.max) * 100);
                  return (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg border border-[#eae3d6] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="font-semibold text-[#1e1c1a]">{cat.label}</span>
                        <span className="font-bold text-[#c86d51]">
                          {cat.score} / {cat.max} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#eae3d6] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c86d51] rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prioritized Action Steps */}
            <div className="bg-[#f2ece2] p-5 sm:p-6 rounded-xl border border-[#e0d6c5] space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#c86d51]" />
                <h4 className="text-xs sm:text-sm font-sans font-bold tracking-wider text-[#1e1c1a] uppercase">
                  Immediate 90-Day Strategic Interventions
                </h4>
              </div>

              <div className="space-y-2.5">
                {result?.priorityActions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#423c34]">
                    <span className="w-5 h-5 rounded-full bg-[#c86d51]/15 text-[#a85b42] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onBookDiscovery();
                }}
                className="w-full sm:flex-1 py-3.5 bg-[#c86d51] hover:bg-[#b85d43] text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={15} />
                <span>Book 15-Min Strategy Review</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (result?.recommendedProgram.includes('Founders Growth')) {
                    onOpenProgram('fga');
                  } else {
                    onOpenProgram('bpa');
                  }
                }}
                className="w-full sm:flex-1 py-3.5 bg-[#1a1918] hover:bg-[#282624] text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>View {result?.recommendedProgram}</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={handlePrint}
                className="p-3.5 border border-[#d4cbbe] hover:bg-[#eee7dc] rounded-sm text-[#5a5349] transition-colors"
                title="Print Report"
              >
                <Download size={16} />
              </button>

              <button
                onClick={handleRestart}
                className="p-3.5 border border-[#d4cbbe] hover:bg-[#eee7dc] rounded-sm text-[#5a5349] transition-colors"
                title="Retake Assessment"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
