document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Elements
    const container = document.getElementById('assessment-container');
    const heroBg = document.querySelector('.s5-hero-bg');
    const typoElements = document.querySelectorAll('.s5-typo');
    const scoreArea = document.querySelector('.s5-score-area');
    const sections = document.querySelectorAll('.s5-anim-element');
    const cards = document.querySelectorAll('.s5-card');
    
    const scoreElement = document.getElementById('score-count');
    const ringElement = document.getElementById('score-ring');
    
    // GSAP Cinematic Entrance
    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
        const navbar = document.getElementById('main-navbar');
        
        // Initial setup
        gsap.set(container, { opacity: 1 }); // Remove container opacity-0
        if (heroBg) gsap.set(heroBg, { opacity: 0 }); // REMOVE scale
        if (typoElements.length) gsap.set(typoElements, { y: 15, opacity: 0 });
        if (scoreArea) gsap.set(scoreArea, { y: 20, opacity: 0 });
        if (navbar) gsap.set(navbar, { opacity: 0 });
        
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        
        // 1. Background image slow reveal
        if (heroBg) {
            tl.to(heroBg, { opacity: 1, duration: 1.0 }, 0);
        }
        
        // 1.5 Navbar reveal
        if (navbar) {
            tl.to(navbar, { opacity: 1, duration: 0.8 }, 0.2);
        }
        
        // 2. Large Typography stagger
        if (typoElements.length) {
            tl.to(typoElements, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.2);
        }
        
        // 3. Score area
        if (scoreArea) {
            tl.to(scoreArea, { y: 0, opacity: 1, duration: 0.8 }, 0.4);
        }
        
        // ScrollTrigger for remaining sections and cards
        if (typeof ScrollTrigger !== 'undefined') {
            sections.forEach(section => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });
            
            // Stagger cards within sections
            const cardContainers = document.querySelectorAll('.s5-anim-element');
            cardContainers.forEach(container => {
                const sectionCards = container.querySelectorAll('.s5-card');
                if (sectionCards.length) {
                    gsap.from(sectionCards, {
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                        },
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        }
    } else {
        if (container) container.classList.remove('opacity-0');
    }

    // Score Animation Logic
    if (!scoreElement || !ringElement) return;

    const targetScore = parseInt(scoreElement.getAttribute('data-score'), 10) || 0;
    const duration = 2000;
    let startTimestamp = null;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentScore = Math.floor(easeProgress * targetScore);
      scoreElement.innerText = currentScore;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        scoreElement.innerText = targetScore;
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Delay score animation slightly to sync with entrance
          setTimeout(() => {
            window.requestAnimationFrame(step);
            const percentage = targetScore / 24;
            const targetOffset = 301.59 * (1 - percentage);
            ringElement.style.strokeDashoffset = targetOffset.toString();
          }, typeof gsap !== 'undefined' ? 800 : 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    ringElement.style.strokeDashoffset = '301.59';
    observer.observe(scoreElement);
});
