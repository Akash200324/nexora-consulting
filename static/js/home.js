document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('main-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.remove('bg-transparent', 'border-transparent', 'py-5');
            navbar.classList.add('bg-[#0f0e0d]/95', 'backdrop-blur-md', 'border-b', 'border-[#262422]', 'py-3', 'shadow-xl', 'is-scrolled');
        } else {
            navbar.classList.remove('bg-[#0f0e0d]/95', 'backdrop-blur-md', 'border-b', 'border-[#262422]', 'py-3', 'shadow-xl', 'is-scrolled');
            navbar.classList.add('bg-transparent', 'border-transparent', 'py-5');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle-btn');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('hidden');
            if (!mobileDrawer.classList.contains('hidden')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Also close menu when a link is clicked
        const mobileLinks = mobileDrawer.querySelectorAll('a, button');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Desktop Dropdowns ---
    const dropdownWrappers = document.querySelectorAll('#desktop-nav .relative');
    dropdownWrappers.forEach(wrapper => {
        const menu = wrapper.querySelector('.nav-dropdown-menu');
        const chevron = wrapper.querySelector('svg.lucide-chevron-down');
        
        if (menu) {
            wrapper.addEventListener('mouseenter', () => {
                menu.classList.remove('hidden');
                if (chevron) {
                    chevron.classList.add('rotate-180', 'text-[#c86d51]');
                }
            });
            wrapper.addEventListener('mouseleave', () => {
                menu.classList.add('hidden');
                if (chevron) {
                    chevron.classList.remove('rotate-180', 'text-[#c86d51]');
                }
            });
        }
    });

    // --- Modals Logic ---
    // Function to close all modals
    const closeAllModals = () => {
        document.querySelectorAll('.fixed.inset-0.z-\\[100\\], .fixed.inset-0.z-50').forEach(modal => {
            modal.classList.add('hidden');
        });
    };

    // Close buttons logic inside modals
    document.querySelectorAll('.fixed.inset-0.z-\\[100\\], .fixed.inset-0.z-50').forEach(modal => {
        // Find close buttons
        const closeBtns = modal.querySelectorAll('button');
        closeBtns.forEach(btn => {
            const text = (btn.textContent || '').trim().toLowerCase();
            const ariaLabel = btn.getAttribute('aria-label') || '';
            
            if (
                btn.classList.contains('absolute') && btn.classList.contains('top-4') ||
                text === 'close' || 
                ariaLabel.toLowerCase().includes('close modal') ||
                btn.closest('.border-b') && btn.querySelector('svg') // X button in header
            ) {
                btn.addEventListener('click', closeAllModals);
            }
        });

        // Click outside to close (the backdrop)
        // Some modals use different backdrop classes, so let's attach directly to the modal wrapper
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
        
        // Also attach to specific backdrop divs if present
        const backdrop1 = modal.querySelector('.absolute.inset-0');
        if (backdrop1) {
            backdrop1.addEventListener('click', (e) => {
                if (e.target === backdrop1) closeAllModals();
            });
        }
    });

    // We need to map CTA buttons to open specific modals.
    // Let's identify the modals by their unique headings or IDs.
    // In our generated HTML, we can find modals by their headers.
    
    // Instead of precise targeting (which is hard without IDs), we can identify modals by content or order if needed,
    // but the best way is to manually add IDs to modals in the HTML or use querySelectors based on text.
    // For now, let's select modals by looking for specific text in their headers.
    const allModals = document.querySelectorAll('.fixed.inset-0.z-\\[100\\], .fixed.inset-0.z-50');
    let assessmentModal, discoveryModal, whatsappModal, fgaModal, bpaModal, caseStudy1Modal, caseStudy2Modal, legalModal;

    allModals.forEach(modal => {
        const text = modal.innerText.toLowerCase();
        if (text.includes('business reality assessment')) assessmentModal = modal;
        else if (text.includes('discovery call') || text.includes('get absolute clarity')) discoveryModal = modal;
        else if (text.includes('whatsapp') || text.includes('partner hotline')) whatsappModal = modal;
        else if (text.includes('founders growth accelerator')) fgaModal = modal;
        else if (text.includes('business profit accelerator')) bpaModal = modal;
        else if (text.includes('privacy policy') || text.includes('information')) legalModal = modal;
        else if (text.includes('scaling to $5m') || text.includes('marcus')) caseStudy1Modal = modal;
        else if (text.includes('exit readiness') || text.includes('elena')) caseStudy2Modal = modal;
    });

    // Attach to assessment buttons
    document.querySelectorAll('button').forEach(btn => {
        const text = btn.innerText.toLowerCase();
        
        if (text.includes('take the assessment') || text.includes('take the free assessment')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (assessmentModal) assessmentModal.classList.remove('hidden');
            });
        }
        else if (text.includes('discovery') || text.includes('clarity breakthrough') || text.includes('team performance') || text.includes('masterclass')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (discoveryModal) discoveryModal.classList.remove('hidden');
            });
        }
        else if (text.includes('whatsapp')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (whatsappModal) whatsappModal.classList.remove('hidden');
            });
        }
        else if (text.includes('explore fga') || text === 'founders growth accelerator') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (fgaModal) fgaModal.classList.remove('hidden');
            });
        }
        else if (text.includes('explore bpa') || text === 'business profit accelerator') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (bpaModal) bpaModal.classList.remove('hidden');
            });
        }
        else if (text.includes('read full story')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Simple heuristic for case studies
                if (btn.closest('div').innerText.toLowerCase().includes('marcus')) {
                    if (caseStudy1Modal) caseStudy1Modal.classList.remove('hidden');
                } else {
                    if (caseStudy2Modal) caseStudy2Modal.classList.remove('hidden');
                }
            });
        }
        else if (text.includes('privacy policy') || text.includes('terms of service')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (legalModal) legalModal.classList.remove('hidden');
            });
        }
    });
});
