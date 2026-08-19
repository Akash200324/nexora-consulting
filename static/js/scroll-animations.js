document.addEventListener("DOMContentLoaded", () => {
    // Wait for fonts to load before calculating heights
    document.fonts.ready.then(() => {
        initAnimations();
    });

    // Fallback if fonts take too long
    setTimeout(() => {
        initAnimations();
    }, 2000);
});

let isInitialized = false;

function initAnimations() {
    if (isInitialized) return;
    isInitialized = true;

    // ==========================================
    // PHASE 1 DIAGNOSTIC: LENIS DISABLED
    // ==========================================
    // const lenis = new Lenis({
    //     lerp: 0.1,             
    //     wheelMultiplier: 1.1,  
    //     smoothWheel: true,
    //     smoothTouch: false,
    // });

    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ force3D: true });

    // lenis.on('scroll', ScrollTrigger.update);
    // gsap.ticker.add((time) => {
    //     lenis.raf(time * 1000);
    // });
    // gsap.ticker.lagSmoothing(0);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        
        // --- 1. HERO SECTION (Opening Scene) ---
        const heroSection = document.querySelector('#hero-section');
        const heroImg = document.querySelector('#hero-section img');
        const heroTextElements = gsap.utils.toArray('.hero-text-anim');
        
        // On Load Reveal
        const heroLoadTl = gsap.timeline();
        const heroHeadlineLines = heroSection?.querySelectorAll('h1 span.block');
        const heroSubText = heroSection?.querySelector('p');
        const heroCta = heroSection?.querySelector('#hero-cta-btn');
        const heroMicroInfo = heroSection?.querySelector('.hero-delay-3');
        const heroLabel = heroSection?.querySelector('.hero-delay-1:not(h1)');

        if (heroImg) {
            gsap.set(heroImg.parentElement, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
            gsap.set(heroImg, { scale: 1.05 });
            heroLoadTl.to(heroImg.parentElement, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.6,
                ease: 'power3.inOut'
            })
            .to(heroImg, {
                scale: 1,
                duration: 1.6,
                ease: 'power3.inOut'
            }, "<");
        }
        if (heroHeadlineLines && heroHeadlineLines.length) {
            gsap.set(heroHeadlineLines, { y: 40, opacity: 0, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
            heroLoadTl.to(heroHeadlineLines, {
                y: 0,
                opacity: 1,
                clipPath: 'polygon(0% -50%, 100% -50%, 100% 150%, 0% 150%)',
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out'
            }, "-=1.0");
        }
        
        const remainingElements = [];
        if (heroLabel) remainingElements.push(heroLabel);
        if (heroSubText) remainingElements.push(heroSubText);
        if (heroMicroInfo) remainingElements.push(heroMicroInfo);
        if (heroCta) remainingElements.push(heroCta);

        if (remainingElements.length) {
            gsap.set(remainingElements, { y: 20, opacity: 0 });
            heroLoadTl.to(remainingElements, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            }, "-=0.6");
        }

        // On Scroll Departure & Parallax
        if (heroSection && heroImg) {
            gsap.fromTo(heroImg, 
                { yPercent: 0, scale: 1 },
                {
                    yPercent: 8,
                    scale: 0.95,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroSection,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
            gsap.fromTo(heroTextElements, 
                { y: 0, opacity: 1 },
                {
                    y: -100, 
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroSection,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }

        // --- 3. PHILOSOPHY SECTION ---
        const philSection = document.querySelector('#philosophy-section');
        const philTextCol = philSection?.querySelector('.lg\\:col-span-6:first-child');
        const philImgContainer = philSection?.querySelector('.lg\\:col-span-6:last-child');
        
        if (philSection) {
            // Typography & Text entrance
            const philHeading = philTextCol?.querySelector('h2');
            if (philHeading) {
                gsap.fromTo(philHeading, 
                    { y: 40, opacity: 0, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }, 
                    { y: 0, opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: philHeading, start: 'top 85%', toggleActions: 'play none none reverse' }}
                );
            }
            const philParas = philTextCol?.querySelectorAll('p, div, a');
            if (philParas) {
                gsap.fromTo(philParas, 
                    { y: 30, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: philSection, start: 'top 80%', toggleActions: 'play none none reverse' }}
                );
            }

            // Image Reveal (Step 2)
            const philImg = philImgContainer?.querySelector('img');
            if (philImg) {
                gsap.set(philImg.parentElement, { overflow: 'hidden' });
                gsap.fromTo(philImg, 
                    { scale: 1.05, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }, 
                    { scale: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: philImgContainer, start: 'top 80%', toggleActions: 'play none none reverse' }}
                );
            }

            // Exit parallax scrub
            gsap.fromTo(philTextCol, { y: 0, opacity: 1 }, {
                y: -100, opacity: 0.3, ease: 'none', scrollTrigger: { trigger: philSection, start: 'center top', end: 'bottom top', scrub: true }
            });
            gsap.fromTo(philImgContainer, { y: 0 }, {
                y: -40, ease: 'none', scrollTrigger: { trigger: philSection, start: 'center top', end: 'bottom top', scrub: true }
            });
        }

        // --- 4. ASSESSMENT SECTION ---
        const assSection = document.querySelector('#assessment-section');
        const assText = assSection?.querySelector('.lg\\:col-span-5');
        const assCard = assSection?.querySelector('#assessment-widget-card');

        if (assSection) {
            const assHeading = assText?.querySelector('h2');
            const assParas = assText?.querySelectorAll('p, .text-\\[11px\\], .text-xs');
            const assBoxes = assCard?.querySelectorAll('button');

            const assTl = gsap.timeline({
                scrollTrigger: {
                    trigger: assSection,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            if (assHeading) {
                assTl.fromTo(assHeading, 
                    { y: 40, opacity: 0, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }, 
                    { y: 0, opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.2, ease: 'power3.out' }
                );
            }
            if(assParas && assParas.length > 0) {
                assTl.fromTo(assParas, 
                    { x: -15, y: 15, opacity: 0 }, 
                    { x: 0, y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out' },
                    "-=0.8"
                );
            }
            if(assBoxes && assBoxes.length > 0) {
                assTl.fromTo(assBoxes,
                    { y: 20, opacity: 0, scale: 0.98 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                    "-=0.6"
                );
            }

            // Parallax background layer
            gsap.fromTo(assCard, { y: 0 }, {
                y: -80, ease: 'none', scrollTrigger: { trigger: assSection, start: 'center 40%', end: 'bottom top', scrub: true }
            });
        }

        // --- 5. SUCCESS STORY ---
        const successSection = document.querySelector('#success-story-section');
        const successImg = successSection?.querySelector('img');
        const successCard = document.querySelector('#success-story-card');
        const successHeading = successSection?.querySelector('h3');
        
        if (successSection && successImg) {
            if (successHeading) {
                gsap.fromTo(successHeading, 
                    { y: 40, opacity: 0, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }, 
                    { y: 0, opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: successHeading, start: 'top 85%', toggleActions: 'play none none reverse' }}
                );
            }

            // Image Reveal (Step 2)
            gsap.set(successImg.parentElement, { overflow: 'hidden' });
            gsap.fromTo(successImg, 
                { scale: 1.05, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }, 
                { scale: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: successSection, start: 'top 80%', toggleActions: 'play none none reverse' }}
            );
            
            // Subtle 5% image parallax
            gsap.fromTo(successImg, { yPercent: -2.5 }, { yPercent: 2.5, ease: 'none', scrollTrigger: { trigger: successSection, start: 'top bottom', end: 'bottom top', scrub: true }});
            
            // Fast card entrance
            gsap.fromTo(successCard, 
                { y: 60, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: successSection, start: 'top 75%', toggleActions: 'play none none reverse' }}
            );
        }

        // --- 6. STEPS SECTION ---
        const stepsSection = document.querySelector('#steps-section');
        const steps = gsap.utils.toArray('#steps-section .grid > div');
        const stepWatermark = stepsSection?.querySelector('.watermark-text');
        
        if (stepsSection && steps.length === 3) {
            gsap.set(steps[0], { opacity: 1, y: 0, scale: 1 });     
            gsap.set(steps[1], { opacity: 0, y: 100, scale: 0.9 }); 
            gsap.set(steps[2], { opacity: 0, y: 100, scale: 0.9 }); 
            
            const stepTl = gsap.timeline({
                scrollTrigger: { trigger: stepsSection, start: "center center", end: "+=1000", pin: true, scrub: true, anticipatePin: 1 }
            });

            if(stepWatermark) {
                stepTl.to(stepWatermark, { y: -150, ease: 'none', duration: 4.4 }, 0); 
            }

            stepTl.to(steps[0], { opacity: 0, y: -100, scale: 0.95, duration: 1 }, 0)
                  .to(steps[1], { opacity: 1, y: 0, scale: 1, duration: 1 }, 0)
                  .to({}, { duration: 0.6 })
                  .to(steps[1], { opacity: 0, y: -100, scale: 0.95, duration: 1 })
                  .to(steps[2], { opacity: 1, y: 0, scale: 1, duration: 1 }, "<")
                  .to({}, { duration: 0.8 });
        }

        // --- 7. PROGRAMS SECTION ---
        const progSection = document.querySelector('#programs-section');
        const progHeading = progSection?.querySelector('h2');
        const progCard1 = document.querySelector('#program-card-fga');
        const progCard2 = document.querySelector('#program-card-bpa');

        if (progSection) {
            const progDivider = progSection.querySelector('.bg-\\[\\#c5a880\\]');
            
            const progTl = gsap.timeline({
                scrollTrigger: {
                    trigger: progSection,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            if (progHeading) {
                progTl.fromTo(progHeading, 
                    { y: 40, opacity: 0, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }, 
                    { y: 0, opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.2, ease: 'power3.out' }
                );
            }
            if (progDivider) {
                progTl.fromTo(progDivider,
                    { scaleX: 0, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out', transformOrigin: 'center' },
                    "-=0.8"
                );
            }
            if (progCard1 && progCard2) {
                progTl.fromTo(progCard1,
                    { x: -30, y: 40, opacity: 0 },
                    { x: 0, y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                    "-=0.6"
                )
                .fromTo(progCard2,
                    { x: 30, y: 40, opacity: 0 },
                    { x: 0, y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                    "-=0.85" // Quick stagger
                );
            }
            
            gsap.fromTo([progCard1, progCard2], { y: 0 }, { y: -60, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: progSection, start: 'center center', end: 'bottom top', scrub: true } });
        }

        // --- 8. TESTIMONIALS ---
        const testSection = document.querySelector('#testimonials-section');
        const testHeading = testSection?.querySelector('h2');
        const testImgContainer = testSection?.querySelector('.lg\\:col-span-5');
        
        if (testSection) {
            if (testHeading) {
                gsap.fromTo(testHeading, 
                    { y: 40, opacity: 0, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }, 
                    { y: 0, opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: testHeading, start: 'top 85%', toggleActions: 'play none none reverse' }}
                );
            }

            // Image Reveal (Step 2)
            const testImg = testImgContainer?.querySelector('img');
            if (testImg) {
                gsap.set(testImg.parentElement, { overflow: 'hidden' });
                gsap.fromTo(testImg, 
                    { scale: 1.05, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }, 
                    { scale: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: testImgContainer, start: 'top 80%', toggleActions: 'play none none reverse' }}
                );
            }

            // Keep the subtle floating scrub for the image container (approx 5% equivalent in pixels)
            gsap.fromTo(testImgContainer, { y: 20 }, { y: -20, ease: 'none', scrollTrigger: { trigger: testSection, start: 'top bottom', end: 'bottom top', scrub: true }});
        }

        // --- 9. MOUSE MOVEMENT ---
        // PHASE 1 DIAGNOSTIC: DISABLED
        // if(assCard || successCard) { ... }
    });

    mm.add("(max-width: 768px)", () => {
        // Lightweight Mobile Animations
        const allSections = gsap.utils.toArray('section');
        allSections.forEach(sec => {
            const elements = sec.querySelectorAll('h2, h3, p, .group, .hero-delay-3, #hero-cta-btn');
            if(elements.length) {
                gsap.fromTo(elements, 
                    { y: 20, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: sec, start: 'top 85%', toggleActions: 'play none none reverse' }}
                );
            }
            const img = sec.querySelector('img:not(.exclude-parallax)');
            // Only very subtle parallax on mobile if any
            if (img && !sec.closest('#steps-section')) {
                gsap.fromTo(img, { yPercent: 0, scale: 1.05 }, { yPercent: 2, scale: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: sec, start: 'top 80%', toggleActions: 'play none none reverse' }});
            }
        });
        
        const heroText = gsap.utils.toArray('.hero-text-anim');
        gsap.to(heroText, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out' });
        
        const heroImg = document.querySelector('#hero-section img');
        if (heroImg) {
            gsap.set(heroImg.parentElement, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
        }
    });
}
