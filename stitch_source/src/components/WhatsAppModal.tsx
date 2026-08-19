import React, { useState } from 'react';
import { X, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState(
    'Hi Ranjitha, I reviewed the Business Reality Assessment and would like to discuss my operational architecture.'
  );

  if (!isOpen) return null;

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/971500000000?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div
      id="whatsapp-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="whatsapp-modal-container"
        className="relative w-full max-w-lg bg-[#faf8f5] text-[#1e1c1a] rounded-2xl shadow-2xl border border-[#e2d8c9] overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#128C7E] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} />
            <span className="text-xs font-sans font-bold tracking-wider uppercase">
              Direct Executive WhatsApp
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-xl sm:text-2xl text-[#171513]">
              Connect with Advisory Team
            </h3>
            <p className="text-xs text-[#736c62] leading-relaxed">
              We respond to founder inquiries within 2 hours during business hours (Dubai / London timezone).
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#635c52] block">
              Pre-filled Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3.5 bg-white border border-[#eae3d6] rounded-md text-xs sm:text-sm text-[#1e1c1a] focus:outline-none focus:border-[#25D366]"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#8e877e]">
            <ShieldCheck size={14} className="text-[#25D366]" />
            <span>Strict confidentiality and NDA standards apply to all messages.</span>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans font-bold tracking-widest uppercase rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Launch WhatsApp Chat</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={onClose}
              className="px-5 py-3.5 bg-white border border-[#eae3d6] text-xs font-medium text-[#5c554a] rounded-sm hover:bg-[#eee7dc] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
