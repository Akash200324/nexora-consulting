document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If GSAP is missing or user prefers reduced motion, reveal everything immediately
    if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        const hiddenElements = document.querySelectorAll('.fga-wrapper, .fga-anim-text, .fga-anim-card, .fga-anim-card-single, .fga-anim-img, .fga-anim-hero-img');
        hiddenElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initial page load transition
    const wrapper = document.querySelector('.fga-wrapper');
    if (wrapper) {
        gsap.set(wrapper, { opacity: 0 });
        gsap.to(wrapper, { opacity: 1, duration: 0.6, ease: "power2.out" });
    }

    // Hero Image Animation
    const heroImg = document.querySelector('.fga-anim-hero-img');
    if (heroImg) {
        gsap.fromTo(heroImg, 
            { scale: 1.05 },
            { scale: 1, duration: 1.6, ease: "power3.out" }
        );
    }

    // Text Reveal (Typography)
    const textElements = gsap.utils.toArray('.fga-anim-text');
    textElements.forEach((el) => {
        gsap.fromTo(el, 
            { y: 40, opacity: 0 },
            {
                y: 0, 
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    once: true
                }
            }
        );
    });

    // Cards/Boxes Reveal (with stagger)
    const cardContainers = gsap.utils.toArray('.fga-anim-card-container');
    cardContainers.forEach((container) => {
        const cards = container.querySelectorAll('.fga-anim-card');
        if (cards.length > 0) {
            gsap.fromTo(cards, 
                { y: 30, opacity: 0 },
                {
                    y: 0, 
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
    });

    // Single Cards
    const singleCards = gsap.utils.toArray('.fga-anim-card-single');
    singleCards.forEach((card) => {
        gsap.fromTo(card,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power2.out",
                scrollTrigger: {
                    trigger: card, start: "top 80%", once: true
                }
            }
        );
    });

    // Images Reveal
    const imgElements = gsap.utils.toArray('.fga-anim-img');
    imgElements.forEach((img) => {
        gsap.fromTo(img,
            { scale: 1.05, opacity: 0 },
            {
                scale: 1, opacity: 1, duration: 1.4, ease: "power3.out",
                scrollTrigger: {
                    trigger: img.parentElement, // use parent for trigger to avoid jumping
                    start: "top 80%", 
                    once: true
                }
            }
        );
    });
});
