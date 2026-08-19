import React from 'react';
import { X, Shield, FileText, Mail, Phone, MapPin } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div
      id="legal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="legal-modal-container"
        className="relative w-full max-w-2xl bg-[#faf8f5] text-[#1e1c1a] rounded-2xl shadow-2xl border border-[#e2d8c9] my-8 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#171615] text-[#f7f3eb] px-6 py-4 flex items-center justify-between border-b border-[#2b2724]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#c86d51]">
              Information
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs font-serif text-[#cfc8bd]">{title}</span>
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
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#4d463d] leading-relaxed">
          <h3 className="font-display text-2xl text-[#171513] font-normal">{title}</h3>

          {title.includes('Contact') ? (
            <div className="space-y-4">
              <p>
                Impact Wave Coaching &amp; Consulting provides executive advisory, organizational design, and leadership profit mastery to international founders across the Middle East, Europe, and Asia-Pacific.
              </p>

              <div className="bg-white p-5 rounded-xl border border-[#eae3d6] space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#c86d51]" />
                  <span>advisory@impactwavecoaching.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#c86d51]" />
                  <span>DIFC Gate Precinct, Dubai, United Arab Emirates &amp; Mayfair, London</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#c86d51]" />
                  <span>+971 4 000 0000 / Direct WhatsApp Partner Hotline</span>
                </div>
              </div>
            </div>
          ) : title.includes('Privacy') ? (
            <div className="space-y-3">
              <p>
                We respect founder privacy with uncompromising confidentiality. All diagnostic inputs, revenue disclosures, team architecture notes, and proprietary operational materials submitted through our assessment or advisory channels are encrypted and never shared with third parties.
              </p>
              <p>
                Diagnostic results are stored temporarily to render your personalized PDF report and are governed by international data protection compliance (GDPR / UAE Federal Law No. 45).
              </p>
            </div>
          ) : title.includes('Refund') ? (
            <div className="space-y-3">
              <p>
                Our 13-week Founders Growth Accelerator cohort is backed by our 100% 30-Day Execution Guarantee. If you complete all sprint modules, attend weekly teardowns, and do not identify at least 3x the program value in profit optimizations, we refund your enrollment immediately.
              </p>
              <p>
                1:1 Business Profit Accelerator advisory partnerships are governed by customized bilateral engagement contracts with structured deliverable milestones.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p>
                By accessing this platform and our Business Reality Assessment, you agree to engage respectfully with our intellectual property, frameworks, and copyrighted methodology (The 5 Levers, 3-Layer Delegation Protocol, and Impact Wave diagnostic systems).
              </p>
              <p>
                All rights reserved © 2024 Impact Wave Coaching &amp; Consulting.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-[#eee7dc]">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#171615] text-white text-xs font-sans font-semibold tracking-wider uppercase rounded-sm hover:bg-[#2c2926] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
