import React, { useState, useEffect } from 'react';
import { ChevronDown, MessageSquare, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { navCategories } from '../data/contentData';

interface NavbarProps {
  onOpenAssessment: () => void;
  onOpenDiscovery: () => void;
  onOpenProgram: (programId: string) => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAssessment,
  onOpenDiscovery,
  onOpenProgram,
  onOpenWhatsApp,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f0e0d]/95 backdrop-blur-md border-b border-[#262422] py-3 shadow-xl'
          : 'bg-[#0e0d0c]/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group text-left"
          id="brand-logo-link"
        >
          <div className="w-10 h-10 border border-[#c86d51]/60 bg-[#171615] flex flex-col items-center justify-center rounded-sm transition-all duration-300 group-hover:border-[#c86d51] group-hover:shadow-[0_0_15px_rgba(200,109,81,0.25)]">
            <span className="text-[11px] tracking-widest font-serif font-bold text-[#e6e2dd] leading-none">
              IW
            </span>
            <div className="w-4 h-[1px] bg-[#c86d51] my-[2px]"></div>
            <span className="text-[7px] tracking-tighter text-[#a69e94] uppercase font-sans">
              Coach
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif tracking-[0.18em] text-[13px] sm:text-[14px] font-medium text-[#f3efe9] uppercase leading-tight group-hover:text-white transition-colors">
              Impact Wave
            </span>
            <span className="text-[8.5px] sm:text-[9px] tracking-[0.22em] text-[#8e877e] uppercase font-sans font-light">
              Coaching &amp; Consulting
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" id="desktop-nav">
          {/* For Founders */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('founders')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              id="nav-dropdown-founders"
              className="flex items-center gap-1.5 text-[13px] tracking-wide text-[#d4cfc7] hover:text-white transition-colors py-2 font-medium"
            >
              For Founders
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-[#a39b90] ${
                  activeDropdown === 'founders' ? 'rotate-180 text-[#c86d51]' : ''
                }`}
              />
            </button>

            {true && (
              <div class="absolute top-full left-0 w-80 bg-[#171615] border border-[#2e2a26] rounded-md shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 hidden nav-dropdown-menu" data-menu="founders">
                <div class="space-y-1">
                  {navCategories.founders.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveDropdown(null);
                        if (item.title.includes('Founders Growth')) onOpenProgram('fga');
                        else if (item.title.includes('Business Profit')) onOpenProgram('bpa');
                        else onOpenDiscovery();
                      }}
                      className="w-full text-left p-2.5 rounded hover:bg-[#23211f] transition-colors group flex items-start justify-between"
                    >
                      <div>
                        <div className="text-[13px] font-medium text-[#f0ebe3] group-hover:text-[#c86d51] transition-colors flex items-center gap-2">
                          {item.title}
                          {item.badge && (
                            <span className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-[#c86d51]/20 text-[#e89078] border border-[#c86d51]/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#918a80] mt-0.5 font-light leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* For Teams */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('teams')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              id="nav-dropdown-teams"
              className="flex items-center gap-1.5 text-[13px] tracking-wide text-[#d4cfc7] hover:text-white transition-colors py-2 font-medium"
            >
              For Teams
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-[#a39b90] ${
                  activeDropdown === 'teams' ? 'rotate-180 text-[#c86d51]' : ''
                }`}
              />
            </button>

            {true && (
              <div class="absolute top-full left-0 w-80 bg-[#171615] border border-[#2e2a26] rounded-md shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 hidden nav-dropdown-menu" data-menu="teams">
                <div class="space-y-1">
                  {navCategories.teams.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenDiscovery();
                      }}
                      className="w-full text-left p-2.5 rounded hover:bg-[#23211f] transition-colors group"
                    >
                      <div className="text-[13px] font-medium text-[#f0ebe3] group-hover:text-[#c86d51] transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#918a80] mt-0.5 font-light">
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Learn */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('learn')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              id="nav-dropdown-learn"
              className="flex items-center gap-1.5 text-[13px] tracking-wide text-[#d4cfc7] hover:text-white transition-colors py-2 font-medium"
            >
              Learn
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-[#a39b90] ${
                  activeDropdown === 'learn' ? 'rotate-180 text-[#c86d51]' : ''
                }`}
              />
            </button>

            {true && (
              <div class="absolute top-full left-0 w-72 bg-[#171615] border border-[#2e2a26] rounded-md shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 hidden nav-dropdown-menu" data-menu="learn">
                <div class="space-y-1">
                  {navCategories.learn.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenDiscovery();
                      }}
                      className="w-full text-left p-2 rounded hover:bg-[#23211f] transition-colors group"
                    >
                      <div className="text-[13px] font-medium text-[#f0ebe3] group-hover:text-[#c86d51]">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#918a80] mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Free */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('free')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              id="nav-dropdown-free"
              className="flex items-center gap-1.5 text-[13px] tracking-wide text-[#d4cfc7] hover:text-white transition-colors py-2 font-medium"
            >
              Free
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-[#a39b90] ${
                  activeDropdown === 'free' ? 'rotate-180 text-[#c86d51]' : ''
                }`}
              />
            </button>

            {true && (
              <div class="absolute top-full left-0 w-72 bg-[#171615] border border-[#2e2a26] rounded-md shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 hidden nav-dropdown-menu" data-menu="free">
                <div class="space-y-1">
                  {navCategories.free.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveDropdown(null);
                        if (item.title.includes('Assessment')) onOpenAssessment();
                        else onOpenWhatsApp();
                      }}
                      className="w-full text-left p-2 rounded hover:bg-[#23211f] transition-colors group flex items-start justify-between"
                    >
                      <div>
                        <div className="text-[13px] font-medium text-[#f0ebe3] group-hover:text-[#c86d51]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#918a80] mt-0.5">{item.desc}</div>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/40">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <a
            href="#philosophy-section"
            className="text-[13px] tracking-wide text-[#d4cfc7] hover:text-white transition-colors font-medium"
          >
            About
          </a>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {/* WhatsApp Direct Action */}
          <button
            onClick={onOpenWhatsApp}
            id="nav-whatsapp-btn"
            className="flex items-center gap-1.5 text-[12.5px] text-[#d6d0c7] hover:text-[#25D366] transition-colors py-1.5 px-3 rounded-full hover:bg-white/5"
            title="Chat on WhatsApp"
          >
            <MessageSquare size={15} className="text-[#25D366]" />
            <span className="font-sans font-medium">WhatsApp</span>
          </button>

          {/* Primary Assessment CTA */}
          <button
            onClick={onOpenAssessment}
            id="nav-take-assessment-btn"
            className="inline-flex items-center justify-center gap-2 bg-[#c86d51] hover:bg-[#b85d43] text-white text-[12px] uppercase tracking-wider font-semibold px-4 sm:px-5 py-2.5 rounded-sm transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#c86d51]/20 active:scale-[0.98]"
          >
            <span>TAKE THE ASSESSMENT</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="mobile-menu-toggle-btn"
          className="lg:hidden p-2 text-[#d4cfc7] hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {true && (
        <div
          id="mobile-nav-drawer"
          class="lg:hidden bg-[#141312] border-b border-[#2b2724] px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200 hidden"
        >
          <div className="space-y-2 border-b border-white/10 pb-4">
            <div className="text-[11px] uppercase tracking-wider text-[#918a80] font-semibold px-2">
              Programmes &amp; Solutions
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProgram('fga');
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#ece7df] hover:bg-white/5 rounded"
            >
              Founders Growth Accelerator (Cohort)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProgram('bpa');
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#ece7df] hover:bg-white/5 rounded"
            >
              Business Profit Accelerator (1:1 Advisory)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiscovery();
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#ece7df] hover:bg-white/5 rounded"
            >
              Leadership &amp; Team Performance
            </button>
            <a
              href="#philosophy-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-[#ece7df] hover:bg-white/5 rounded"
            >
              About Ranjitha &amp; Framework
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment();
              }}
              className="w-full py-3 bg-[#c86d51] hover:bg-[#b85d43] text-white text-xs tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-2"
            >
              <span>TAKE THE FREE ASSESSMENT</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full py-2.5 bg-white/5 border border-white/10 text-xs text-[#e8e4dc] rounded flex items-center justify-center gap-2"
            >
              <MessageSquare size={15} className="text-[#25D366]" />
              <span>Connect on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
