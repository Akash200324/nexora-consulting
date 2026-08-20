document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = document.getElementById('assessment-container');
    const imageBlock = document.querySelector('#s3-image-block img');
    const gradient = document.getElementById('s3-gradient');
    const gradientMobile = document.getElementById('s3-gradient-mobile');
    const textElements = document.querySelectorAll('.s3-text-element');
    
    if (typeof gsap === 'undefined') {
        if (container) container.classList.remove('opacity-0');
        textElements.forEach(el => el.classList.remove('opacity-0', 'translate-y-4'));
        if (gradient) gradient.classList.remove('opacity-0');
        if (gradientMobile) gradientMobile.classList.remove('opacity-0');
        return;
    }

    if (!prefersReducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Container fade in
        tl.to(container, { opacity: 1, duration: 0.2 });

        // Image gently reveals
        if (imageBlock) {
            tl.fromTo(imageBlock,
                { scale: 1.05, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' },
                "-=0.1"
            );
        }

        // Cinematic gradient fade in
        if (gradient) {
            tl.to(gradient, { opacity: 1, duration: 1.2 }, "-=1.0");
        }
        if (gradientMobile) {
            tl.to(gradientMobile, { opacity: 1, duration: 1.2 }, "-=1.2");
        }

        // Text stagger (eyebrow -> heading -> supporting -> button)
        if (textElements.length) {
            tl.to(textElements,
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
                "-=0.6"
            );
        }
    } else {
        if (container) container.classList.remove('opacity-0');
        textElements.forEach(el => el.classList.remove('opacity-0', 'translate-y-4'));
        if (gradient) gradient.classList.remove('opacity-0');
        if (gradientMobile) gradientMobile.classList.remove('opacity-0');
    }

    // Continue button action (navigate to Section 4)
    const continueBtn = document.getElementById('s3-continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
                gsap.to(container, {
                    opacity: 0, 
                    y: -20,
                    duration: 0.5, 
                    ease: 'power2.inOut',
                    onComplete: () => { window.location.href = '/assessment/section-4/'; }
                });
            } else {
                window.location.href = '/assessment/section-4/';
            }
        });
    }
});
