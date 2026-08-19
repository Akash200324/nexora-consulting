import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, MessageSquare, ArrowRight, User, Mail, Building2 } from 'lucide-react';

interface DiscoveryCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: () => void;
}

export const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({
  isOpen,
  onClose,
  onOpenWhatsApp,
}) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('10:00 AM GST (Dubai)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    revenue: '$500k - $1M ARR',
    bottleneck: 'Trapped in client delivery & working 60+ hours',
  });
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const dates = ['Tomorrow', 'Thursday', 'Friday', 'Next Monday', 'Next Tuesday'];
  const times = [
    '09:30 AM GST (Dubai)',
    '11:00 AM GST (Dubai)',
    '02:30 PM GST (Dubai)',
    '04:00 PM GST (Dubai)',
    '06:00 PM GST (Dubai)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div
      id="discovery-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="discovery-modal-container"
        className="relative w-full max-w-2xl bg-[#faf8f5] text-[#1e1c1a] rounded-2xl shadow-2xl border border-[#e2d8c9] my-8 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#171615] text-[#f7f3eb] px-6 py-4 flex items-center justify-between border-b border-[#2b2724]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#c86d51]">
              Executive Strategy
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs font-serif text-[#cfc8bd]">
              15-Minute Diagnostic Discovery Call
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

        {/* Content */}
        {!isBooked ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl text-[#171513] font-normal">
                Book Your 15-Minute Reality Audit
              </h3>
              <p className="text-xs sm:text-[13px] text-[#736c62] font-light leading-relaxed">
                Direct strategic teardown with Ranjitha's senior advisory team. We will review your current business architecture, identify profit leakage, and map your delegation roadmap.
              </p>
            </div>

            {/* Date / Time Selector */}
            <div className="space-y-3 bg-white p-4 sm:p-5 rounded-xl border border-[#eae3d6]">
              <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#736c62] flex items-center gap-1.5">
                <Calendar size={14} className="text-[#c86d51]" />
                <span>Select Available Date</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {dates.map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`px-3 py-1.5 text-xs rounded border transition-all font-medium ${
                      selectedDate === d
                        ? 'bg-[#c86d51] text-white border-[#c86d51]'
                        : 'bg-[#faf8f5] text-[#544e45] border-[#eae3d6] hover:border-[#c5a880]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="pt-2 text-xs font-sans font-bold uppercase tracking-wider text-[#736c62] flex items-center gap-1.5">
                <Clock size={14} className="text-[#c86d51]" />
                <span>Select Time Slot</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {times.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`p-2 text-xs rounded border text-left transition-all ${
                      selectedTime === t
                        ? 'bg-[#171615] text-white border-[#171615]'
                        : 'bg-[#faf8f5] text-[#544e45] border-[#eae3d6] hover:border-[#c5a880]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Founder Form */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#635c52] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#eae3d6] rounded-md text-xs sm:text-sm text-[#1e1c1a] focus:outline-none focus:border-[#c86d51]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#635c52] block mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="founder@company.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#eae3d6] rounded-md text-xs sm:text-sm text-[#1e1c1a] focus:outline-none focus:border-[#c86d51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#635c52] block mb-1">
                    Company Name &amp; Website
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Vance Advisory Group"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#eae3d6] rounded-md text-xs sm:text-sm text-[#1e1c1a] focus:outline-none focus:border-[#c86d51]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#635c52] block mb-1">
                    Current Annual Revenue Tier
                  </label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#eae3d6] rounded-md text-xs sm:text-sm text-[#1e1c1a] focus:outline-none focus:border-[#c86d51]"
                  >
                    <option>$250k - $500k ARR</option>
                    <option>$500k - $1M ARR</option>
                    <option>$1M - $3M ARR</option>
                    <option>$3M - $10M+ ARR</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3.5 bg-[#c86d51] hover:bg-[#b85d43] text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>CONFIRM 15-MINUTE DISCOVERY CALL</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenWhatsApp();
                }}
                className="w-full sm:w-auto px-4 py-3.5 bg-white border border-[#eae3d6] hover:bg-[#f5ede2] text-xs font-medium text-[#25D366] rounded-sm flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={14} />
                <span>Chat Instantly via WhatsApp</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation View */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#c86d51]/15 text-[#c86d51] flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl text-[#171513]">
                Discovery Session Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-[#736c62] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#1e1c1a]">{formData.name || 'Founder'}</span>. A calendar invitation for <span className="font-semibold text-[#c86d51]">{selectedDate} at {selectedTime}</span> has been routed to your email.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#eae3d6] max-w-md mx-auto text-left text-xs space-y-1.5">
              <div className="text-[#8e877d] uppercase tracking-wider font-bold text-[10px]">
                Preparation Note
              </div>
              <p className="text-[#4f483e] leading-relaxed">
                Please have your approximate monthly gross revenue, founder weekly hours, and key service offerings ready for our 15-minute architectural review.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#171615] hover:bg-[#282624] text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-sm transition-colors"
              >
                Return to Experience
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
