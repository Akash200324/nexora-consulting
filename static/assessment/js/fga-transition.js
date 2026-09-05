document.addEventListener("DOMContentLoaded", () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const fgaLink = document.querySelector('.fga-transition-link');
    
    if (fgaLink) {
        fgaLink.addEventListener('click', (e) => {
            const href = fgaLink.getAttribute('href');
            
            // Only intercept if we have a valid route to FGA
            if (href && href !== '#') {
                if (prefersReducedMotion) {
                    // Fallback to normal navigation
                    return;
                }
                
                e.preventDefault();
                
                // Select the main wrapper to fade out
                const container = document.querySelector('#assessment-container') || document.body;
                
                if (window.gsap) {
                    gsap.to(container, {
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.inOut",
                        onComplete: () => {
                            window.location.href = href;
                        }
                    });
                } else {
                    // Fallback if GSAP fails to load
                    window.location.href = href;
                }
            }
        });
    }
});
