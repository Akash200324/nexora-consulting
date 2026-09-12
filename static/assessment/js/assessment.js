document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = document.getElementById('assessment-container');
    
    if (typeof gsap === 'undefined') {
        if (container) container.classList.remove('opacity-0', 'translate-y-8');
        return;
    }
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    // Elements
    const bgText = document.querySelector('.font-display-lg.text-\\[20vw\\]');
    const label = document.querySelector('.bg-secondary\\/10');
    const heading = document.querySelector('h1.font-display-lg');
    const paragraph = document.querySelector('p.font-body-lg');
    const s1Cta = document.querySelector('#assessment-container a.group');
    const timeInfo = document.querySelector('.opacity-50');
    const textWrapper = document.querySelector('.col-span-12.text-center');

    const section02 = document.querySelector('.assessment-section-02');
    const s2Context = section02?.querySelector('.flex.items-center.gap-6');
    const s2Heading = section02?.querySelector('h1.font-display-md');
    const s2Para = section02?.querySelector('p.font-body-lg');
    const s2Cards = section02?.querySelectorAll('.assessment-card');
    const s2Action = section02?.querySelector('.flex.justify-end');
    const continueBtn = section02?.querySelector('#action-continue');

    // 1. Initial Page Reveal & Transition setup
    if (container) {
        container.classList.remove('opacity-0', 'translate-y-8');
        if (prefersReducedMotion) {
            gsap.set(container, { opacity: 1 });
        } else {
            // Fade in container instantly so inner elements can be animated
            gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        }
    }

    // Section 1 -> Section 2 Page Transition
    if (s1Cta && s1Cta.tagName === 'A' && !prefersReducedMotion) {
        s1Cta.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = s1Cta.getAttribute('href');
            gsap.to(container, {
                opacity: 0,
                y: -15,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    window.location.href = targetUrl;
                }
            });
        });
    }

    if (prefersReducedMotion) {
        // Stop here for reduced motion, leaving everything visible and functional
        return; 
    }

    // ==========================================
    // DESKTOP ANIMATIONS
    // ==========================================
    mm.add("(min-width: 769px)", () => {
        // SECTION 1
        if (heading && !section02) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            const initialElements = [label, heading, paragraph, s1Cta, timeInfo].filter(Boolean);
            gsap.set(initialElements, { y: 30, opacity: 0 });
            
            if (bgText) {
                gsap.set(bgText, { scale: 0.95, opacity: 0 });
                tl.to(bgText, { scale: 1, opacity: 0.05, duration: 2, ease: 'power2.out' }, 0);
            }

            if (label) tl.to(label, { y: 0, opacity: 1, duration: 0.8 }, 0.2);
            if (heading) tl.to(heading, { y: 0, opacity: 1, duration: 1 }, 0.3);
            if (paragraph) tl.to(paragraph, { y: 0, opacity: 0.8, duration: 1 }, 0.4);
            if (s1Cta) tl.to(s1Cta, { y: 0, opacity: 1, duration: 0.8 }, 0.6);
            if (timeInfo) tl.to(timeInfo, { y: 0, opacity: 0.5, duration: 0.8 }, 0.7);

            if (typeof ScrollTrigger !== 'undefined') {
                if (bgText) {
                    gsap.to(bgText, {
                        y: -100, ease: 'none',
                        scrollTrigger: { trigger: '#assessment-container', start: 'top top', end: 'bottom top', scrub: 1.5 }
                    });
                }
                if (textWrapper) {
                    gsap.to(textWrapper, {
                        y: -30, ease: 'none',
                        scrollTrigger: { trigger: '#assessment-container', start: 'top top', end: 'bottom top', scrub: 1.5 }
                    });
                }
            }
        }

        // SECTION 2 (Cinematic Entrance)
        if (section02) {
            const tl2 = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
            
            const s2TextElements = [s2Context, s2Heading, s2Para].filter(Boolean);
            if (s2TextElements.length) gsap.set(s2TextElements, { opacity: 0, y: 25 });
            if (s2Cards && s2Cards.length) gsap.set(s2Cards, { opacity: 0, y: 25 });
            if (s2Action) gsap.set(s2Action, { opacity: 0, y: 20 });
            
            tl2.to(s2TextElements, { opacity: 1, y: 0, stagger: 0.12 }, 0.2);
            if (s2Cards && s2Cards.length) tl2.to(s2Cards, { opacity: 1, y: 0, stagger: 0.1 }, "-=0.4");
            if (s2Action) tl2.to(s2Action, { opacity: 1, y: 0 }, "-=0.4");
        }
    });

    // ==========================================
    // MOBILE ANIMATIONS
    // ==========================================
    mm.add("(max-width: 768px)", () => {
        if (typeof ScrollTrigger !== 'undefined') {
            
            // SECTION 1
            if (heading && !section02) {
                const s1Elements = [label, heading, paragraph, s1Cta, timeInfo].filter(Boolean);
                if (s1Elements.length > 0) {
                    gsap.fromTo(s1Elements, 
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
                          scrollTrigger: { trigger: '#assessment-container', start: 'top 85%', toggleActions: 'play none none reverse' }
                        }
                    );
                }
            }

            // SECTION 2 (ScrollTrigger-based lightweight entry)
            if (section02) {
                const s2TextElements = [s2Context, s2Heading, s2Para].filter(Boolean);
                if (s2TextElements.length > 0) {
                    gsap.fromTo(s2TextElements,
                        { y: 25, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
                          scrollTrigger: { trigger: section02, start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                }

                if (s2Cards && s2Cards.length > 0) {
                    gsap.fromTo(s2Cards,
                        { y: 25, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
                          scrollTrigger: { trigger: '#assessment-grid', start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                }

                if (s2Action) {
                    gsap.fromTo(s2Action,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
                          scrollTrigger: { trigger: s2Action, start: 'top 95%', toggleActions: 'play none none reverse' }
                        }
                    );
                }
            }
        }
    });

    // ==========================================
    // SECTION 2 DIAGNOSTIC LOGIC
    // ==========================================
    if (section02) {
        const questionsData = [
            {
                title: "How often does your business require your personal involvement to keep day-to-day operations moving?",
                options: ["", "", "", "", ""]
            },
            {
                title: "How often do operational tasks take you away from working on the strategic growth of your business?",
                options: ["", "", "", "", ""]
            },
            {
                title: "How often do you experience uncertainty about where your next month's revenue will come from?",
                options: ["", "", "", "", ""]
            },
            {
                title: "How often do your current systems or processes struggle to keep up with the growth of your business?",
                options: ["", "", "", "", ""]
            },
            {
                title: "How often do you find yourself working IN the business instead of working ON the business?",
                options: ["", "", "", "", ""]
            },
            {
                title: "How often do you feel that significant business growth would create additional pressure on you or your team?",
                options: ["", "", "", "", ""]
            }
        ];

        let currentQuestionIndex = 0;
        const answers = {};
        let currentSelection = null;

        const headingEl = section02.querySelector('#s2-heading');
        const numberEl = section02.querySelector('#current-question-number');
        const progressFill = section02.querySelector('#progress-bar-fill');
        const prevBtn = section02.querySelector('#action-previous');
        const contBtn = section02.querySelector('#action-continue');

        function updateDOMForQuestion(index) {
            const q = questionsData[index];
            headingEl.textContent = q.title;
            numberEl.textContent = `0${index + 1} / 06`;
            progressFill.style.width = `${((index + 1) / 6) * 100}%`;
            
            s2Cards.forEach((card, i) => {
                const desc = card.querySelector('.description-text');
                if (desc) desc.textContent = q.options[i];
            });

            // Handle Previous Button visibility
            if (index === 0) {
                prevBtn.classList.remove('opacity-100', 'pointer-events-auto', 'cursor-pointer');
                prevBtn.classList.add('opacity-0', 'pointer-events-none');
            } else {
                prevBtn.classList.remove('opacity-0', 'pointer-events-none');
                prevBtn.classList.add('opacity-100', 'pointer-events-auto', 'cursor-pointer');
            }

            // Restore selection if exists
            resetAllCards();
            currentSelection = answers[index] || null;
            if (currentSelection) {
                const selectedCard = Array.from(s2Cards).find(c => c.getAttribute('data-value') === currentSelection);
                if (selectedCard) activateCard(selectedCard);
                enableContinue();
            } else {
                disableContinue();
            }
        }

        function resetAllCards() {
            s2Cards.forEach(c => {
                c.classList.remove('bg-[#1f1d1b]/90', 'border-[#c86d51]', 'ring-1', 'ring-[#c86d51]/30', 'shadow-sm', '-translate-y-1');
                c.classList.add('bg-[#1a1918]/60', 'border-[#38332d]');
                
                const cardLabel = c.querySelector('.card-label');
                if (cardLabel) {
                    cardLabel.classList.remove('text-[#d1ab80]', 'font-bold');
                    cardLabel.classList.add('text-[#787167]');
                }

                const cardText = c.querySelector('.card-text');
                if (cardText) {
                    cardText.classList.remove('text-[#ffffff]');
                    cardText.classList.add('text-[#e8dfd2]');
                }

                const cardIconContainer = c.querySelector('.card-icon-container');
                if (cardIconContainer) {
                    cardIconContainer.classList.remove('bg-[#c86d51]', 'border-transparent', 'shadow-[0_0_10px_rgba(200,109,81,0.3)]');
                    cardIconContainer.classList.add('bg-transparent', 'border-[#38332d]');
                }

                const cardIcon = c.querySelector('.card-icon');
                if (cardIcon) {
                    cardIcon.classList.remove('opacity-100', 'scale-100');
                    cardIcon.classList.add('opacity-0', 'scale-50');
                }
            });
        }

        function activateCard(card) {
            card.classList.remove('bg-[#1a1918]/60', 'border-[#38332d]');
            card.classList.add('bg-[#1f1d1b]/90', 'border-[#c86d51]', 'ring-1', 'ring-[#c86d51]/30', 'shadow-sm', '-translate-y-1');
            
            const cardLabel = card.querySelector('.card-label');
            if (cardLabel) {
                cardLabel.classList.remove('text-[#787167]');
                cardLabel.classList.add('text-[#d1ab80]', 'font-bold');
            }

            const cardText = card.querySelector('.card-text');
            if (cardText) {
                cardText.classList.remove('text-[#e8dfd2]');
                cardText.classList.add('text-[#ffffff]');
            }

            const cardIconContainer = card.querySelector('.card-icon-container');
            if (cardIconContainer) {
                cardIconContainer.classList.remove('bg-transparent', 'border-[#38332d]');
                cardIconContainer.classList.add('bg-[#c86d51]', 'border-transparent', 'shadow-[0_0_10px_rgba(200,109,81,0.3)]');
            }

            const cardIcon = card.querySelector('.card-icon');
            if (cardIcon) {
                cardIcon.classList.remove('opacity-0', 'scale-50');
                cardIcon.classList.add('opacity-100', 'scale-100');
            }
        }

        function enableContinue() {
            if (contBtn) {
                contBtn.classList.remove('bg-[#211f1d]', 'text-[#5e584f]', 'pointer-events-none', 'shadow-none');
                contBtn.classList.add('bg-[#c86d51]', 'text-white', 'hover:bg-[#b85d43]', 'shadow-md', 'hover:shadow-lg', 'hover:-translate-y-0.5', 'cursor-pointer');
            }
        }

        function disableContinue() {
            if (contBtn) {
                contBtn.classList.add('bg-[#211f1d]', 'text-[#5e584f]', 'pointer-events-none', 'shadow-none');
                contBtn.classList.remove('bg-[#c86d51]', 'text-white', 'hover:bg-[#b85d43]', 'shadow-md', 'hover:shadow-lg', 'hover:-translate-y-0.5', 'cursor-pointer');
            }
        }

        if (s2Cards) {
            s2Cards.forEach(card => {
                card.addEventListener('click', () => {
                    resetAllCards();
                    activateCard(card);
                    currentSelection = card.getAttribute('data-value');
                    enableContinue();
                });
            });
        }

        function transitionQuestion(direction) {
            const outX = direction === 'forward' ? -30 : 30;
            const inX = direction === 'forward' ? 30 : -30;
            const elementsToAnimate = [section02.querySelector('#s2-eyebrow'), headingEl, ...s2Cards];
            
            contBtn.style.pointerEvents = 'none';
            prevBtn.style.pointerEvents = 'none';
            
            s2Cards.forEach(c => c.style.pointerEvents = 'none');

            gsap.to(elementsToAnimate, {
                x: outX,
                opacity: 0,
                duration: 0.35,
                ease: 'power2.inOut',
                stagger: 0.02,
                onComplete: () => {
                    updateDOMForQuestion(currentQuestionIndex);
                    
                    gsap.fromTo(elementsToAnimate, 
                        { x: inX, opacity: 0 },
                        { 
                            x: 0, 
                            opacity: 1, 
                            duration: 0.45, 
                            ease: 'power2.out',
                            stagger: 0.04,
                            onComplete: () => {
                                contBtn.style.pointerEvents = '';
                                prevBtn.style.pointerEvents = '';
                                s2Cards.forEach(c => c.style.pointerEvents = '');
                            }
                        }
                    );
                }
            });
        }

        if (contBtn) {
            contBtn.addEventListener('click', () => {
                if (!currentSelection) return;
                
                answers[currentQuestionIndex] = currentSelection;
                
                if (currentQuestionIndex < 5) {
                    currentQuestionIndex++;
                    transitionQuestion('forward');
                } else {
                    // Final Calculation
                    const payload = {
                        q1: parseInt(answers[0] || 0),
                        q2: parseInt(answers[1] || 0),
                        q3: parseInt(answers[2] || 0),
                        q4: parseInt(answers[3] || 0),
                        q5: parseInt(answers[4] || 0),
                        q6: parseInt(answers[5] || 0)
                    };
                    
                    contBtn.style.pointerEvents = 'none';
                    prevBtn.style.pointerEvents = 'none';

                    // Get CSRF token
                    const getCookie = (name) => {
                        let cookieValue = null;
                        if (document.cookie && document.cookie !== '') {
                            const cookies = document.cookie.split(';');
                            for (let i = 0; i < cookies.length; i++) {
                                const cookie = cookies[i].trim();
                                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                    break;
                                }
                            }
                        }
                        return cookieValue;
                    };
                    const csrftoken = getCookie('csrftoken');

                    fetch('/assessment/section-2/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrftoken
                        },
                        body: JSON.stringify({ answers: payload })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Hide action area and animate out the question before navigating
                            const elementsToAnimate = [section02.querySelector('#s2-eyebrow'), headingEl, ...s2Cards];
                            
                            gsap.to(section02.querySelector('#assessment-action-area'), { opacity: 0, duration: 0.4, ease: 'power2.inOut' });

                            gsap.to(elementsToAnimate, {
                                x: -30,
                                opacity: 0,
                                duration: 0.5,
                                ease: 'power2.inOut',
                                stagger: 0.02,
                                onComplete: () => {
                                    window.location.href = '/assessment/section-3/';
                                }
                            });
                        } else {
                            alert("Error saving answers: " + (data.error || "Unknown error"));
                            contBtn.style.pointerEvents = '';
                            prevBtn.style.pointerEvents = '';
                        }
                    })
                    .catch(err => {
                        console.error('Error:', err);
                        alert("Network error saving answers. Please try again.");
                        contBtn.style.pointerEvents = '';
                        prevBtn.style.pointerEvents = '';
                    });
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentQuestionIndex > 0) {
                    if (currentSelection) answers[currentQuestionIndex] = currentSelection;
                    currentQuestionIndex--;
                    transitionQuestion('backward');
                }
            });
        }
    }
});
