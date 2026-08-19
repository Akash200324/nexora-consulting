document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Page Transition (Entry Animation)
    // We remove the Tailwind classes that hide it initially, and let GSAP take over
    const container = document.getElementById('assessment-container');
    if (container) {
        container.classList.remove('opacity-0', 'translate-y-8');
    }

    // Ensure GSAP is available (loaded via base.html)
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded');
        return;
    }

    // Set up the initial state for the typography and elements
    const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    // Elements to animate
    const bgText = document.querySelector('.font-display-lg.text-\\[20vw\\]');
    const label = document.querySelector('.bg-secondary\\/10');
    const heading = document.querySelector('h1.font-display-lg');
    const paragraph = document.querySelector('p.font-body-lg');
    const cta = document.querySelector('#assessment-container button');
    const timeInfo = document.querySelector('.opacity-50');

    // Initial states
    gsap.set([label, heading, paragraph, cta, timeInfo], { 
        y: 30, 
        opacity: 0 
    });
    
    if (bgText) {
        gsap.set(bgText, { scale: 0.95, opacity: 0 });
    }

    // Animation sequence
    if (bgText) {
        tl.to(bgText, {
            scale: 1,
            opacity: 0.05,
            duration: 2,
            ease: 'power2.out'
        }, 0);
    }

    tl.to(label, {
        y: 0,
        opacity: 1,
        duration: 0.8
    }, 0.2)
    .to(heading, {
        y: 0,
        opacity: 1,
        duration: 1
    }, 0.3)
    .to(paragraph, {
        y: 0,
        opacity: 0.8,
        duration: 1
    }, 0.4)
    .to(cta, {
        y: 0,
        opacity: 1,
        duration: 0.8
    }, 0.6)
    .to(timeInfo, {
        y: 0,
        opacity: 0.5,
        duration: 0.8
    }, 0.7);

    // 2. Subtle floating animation on scroll (parallax effect)
    if (typeof ScrollTrigger !== 'undefined') {
        // Floating background text
        if (bgText) {
            gsap.to(bgText, {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#assessment-container',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5 // gentle scrub for parallax
                }
            });
        }
        
        // Very subtle drift for the text content
        const textWrapper = document.querySelector('.col-span-12.text-center');
        if (textWrapper) {
            gsap.to(textWrapper, {
                y: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#assessment-container',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5
                }
            });
        }
    }

    // Section 2 Logic
    const section02 = document.querySelector('.assessment-section-02');
    if (section02) {
        const cards = section02.querySelectorAll('.assessment-card');
        const continueBtn = section02.querySelector('#action-continue');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Reset all cards
                cards.forEach(c => {
                    c.classList.remove('bg-secondary', 'shadow-xl', '-translate-y-2');
                    c.classList.add('bg-surface-container');
                    
                    const label = c.querySelector('.card-label');
                    label.classList.remove('text-on-secondary');
                    label.classList.add('text-on-surface-variant');
                    label.style.opacity = '1';

                    const text = c.querySelector('.card-text');
                    text.classList.remove('text-on-secondary');
                    text.classList.add('text-on-surface');

                    const icon = c.querySelector('.card-icon');
                    icon.classList.remove('opacity-100', 'scale-100');
                    icon.classList.add('opacity-0', 'scale-50');
                });

                // Activate selected card
                card.classList.remove('bg-surface-container');
                card.classList.add('bg-secondary', 'shadow-xl', '-translate-y-2');
                
                const label = card.querySelector('.card-label');
                label.classList.remove('text-on-surface-variant');
                label.classList.add('text-on-secondary');
                label.style.opacity = '0.7';

                const text = card.querySelector('.card-text');
                text.classList.remove('text-on-surface');
                text.classList.add('text-on-secondary');

                const icon = card.querySelector('.card-icon');
                icon.classList.remove('opacity-0', 'scale-50');
                icon.classList.add('opacity-100', 'scale-100');

                // Enable continue button
                if (continueBtn) {
                    continueBtn.classList.remove('bg-surface-variant', 'text-on-surface-variant', 'opacity-40', 'pointer-events-none');
                    continueBtn.classList.add('bg-secondary', 'text-on-secondary', 'opacity-100', 'shadow-lg', 'hover:shadow-xl', 'hover:-translate-y-1', 'cursor-pointer');
                }
            });
        });
    }
});
