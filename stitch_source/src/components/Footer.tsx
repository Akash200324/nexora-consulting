import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';
import { navCategories } from '../data/contentData';

interface FooterProps {
  onOpenAssessment: () => void;
  onOpenDiscovery: () => void;
  onOpenProgram: (programId: string) => void;
  onOpenWhatsApp: () => void;
  onOpenLegalModal: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAssessment,
  onOpenDiscovery,
  onOpenProgram,
  onOpenWhatsApp,
  onOpenLegalModal,
}) => {
  return (
    <footer id="main-footer" className="relative bg-[#0a0a09] text-[#d4cfc7] pt-20 pb-28 border-t border-[#1f1d1b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid from Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-[#211f1d]">
          {/* Brand Info & Mission (4 cols) */}
          <div className="md:col-span-4 space-y-6 text-left">
            {/* Logo Box */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border border-[#c86d51]/70 bg-[#141312] flex flex-col items-center justify-center rounded-sm">
                <span className="text-xs tracking-widest font-serif font-bold text-[#e6e2dd] leading-none">
                  IW
                </span>
                <div className="w-5 h-[1px] bg-[#c86d51] my-1" />
                <span className="text-[7.5px] tracking-tighter text-[#a69e94] uppercase font-sans">
                  Coach
                </span>
              </div>

              <div>
                <div className="font-serif tracking-[0.2em] text-sm font-semibold text-[#f5f1ea] uppercase">
                  Impact Wave
                </div>
                <div className="text-[9px] tracking-[0.24em] text-[#8c857b] uppercase font-sans">
                  Coaching &amp; Consulting
                </div>
              </div>
            </div>

            {/* Mission Statement from Screenshot */}
            <p className="text-xs sm:text-[13px] text-[#918a80] leading-relaxed font-light max-w-sm">
              Precision coaching for high-stakes leadership and organizational transformation. We help founders redesign the architecture of their success.
            </p>

            {/* Direct Connect Quick Action */}
            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 text-xs text-[#25D366] hover:underline font-medium"
              >
                <MessageSquare size={14} />
                <span>Direct Executive Advisory WhatsApp</span>
              </button>
            </div>
          </div>

          {/* 4 Nav Columns from Screenshot (8 cols) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-left">
            {/* Column 1: For Founders */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#f0ebe3] uppercase">
                For Founders
              </h4>
              <ul className="space-y-2.5 text-xs text-[#968f84] font-light">
                <li>
                  <button
                    onClick={() => onOpenProgram('fga')}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Founders Growth Accelerator
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenProgram('bpa')}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Business Profit Accelerator
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Clarity Breakthrough
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenAssessment}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Business Clarity
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: For Teams */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#f0ebe3] uppercase">
                For Teams
              </h4>
              <ul className="space-y-2.5 text-xs text-[#968f84] font-light">
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Team Performance
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Sales Performance
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Leadership Performance
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Mental Wellness
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Learn */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#f0ebe3] uppercase">
                Learn
              </h4>
              <ul className="space-y-2.5 text-xs text-[#968f84] font-light">
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Masterclass
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    5 Levers
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Impact Library
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Workshops
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Free */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#f0ebe3] uppercase">
                Free
              </h4>
              <ul className="space-y-2.5 text-xs text-[#968f84] font-light">
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    Webinars
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenWhatsApp}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    WhatsApp Communities
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenDiscovery}
                    className="hover:text-[#c86d51] transition-colors text-left"
                  >
                    The Coached CEO
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar from Screenshot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#787167]">
          <div>
            © 2024 Impact Wave Coaching &amp; Consulting
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <button
              onClick={() => onOpenLegalModal('Contact Information')}
              className="hover:text-[#d4cfc7] transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => onOpenLegalModal('Privacy Policy')}
              className="hover:text-[#d4cfc7] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegalModal('Terms of Service')}
              className="hover:text-[#d4cfc7] transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenLegalModal('Refund Policy')}
              className="hover:text-[#d4cfc7] transition-colors"
            >
              Refund Policy
            </button>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#d4cfc7] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#d4cfc7] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Action Bar from Screenshot */}
      <div
        id="floating-assessment-bar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#161514]/95 backdrop-blur-md border-t border-[#2e2a26] py-3.5 px-4 shadow-[0_-4px_25px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="text-[11px] sm:text-xs tracking-[0.2em] font-sans font-bold text-[#e6e1d8] uppercase">
            Ready to Scale Predictably?
          </div>

          <button
            onClick={onOpenAssessment}
            id="bottom-sticky-assessment-btn"
            className="inline-flex items-center gap-2 bg-[#1f1d1b] hover:bg-[#c86d51] border border-[#3b352f] hover:border-[#c86d51] text-[#f2ede4] hover:text-white text-[11px] sm:text-xs font-sans font-semibold tracking-wider uppercase px-4 sm:px-6 py-2 rounded-sm transition-all duration-200 group"
          >
            <span>TAKE THE ASSESSMENT</span>
            <ArrowRight
              size={13}
              className="stroke-[2.5] transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
