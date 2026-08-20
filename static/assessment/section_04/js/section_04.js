document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = document.getElementById('assessment-container');
    const bgAnim = document.querySelector('.s4-anim-fade');
    const leftColElements = document.querySelectorAll('.s4-left-col > *');
    const formGroups = document.querySelectorAll('.s4-form-group');
    const actions = document.querySelector('.s4-actions');
    const rightCol = document.querySelector('.s4-right-col');
    
    // Set initial states for GSAP elements if GSAP is loaded
    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
        gsap.set([bgAnim, ...leftColElements, rightCol, ...formGroups, actions], { opacity: 0, y: 15 });
        gsap.set(rightCol, { opacity: 0, y: 30 }); // Start right col slightly lower
        
        // Initial container reveal
        gsap.to(container, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
        
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Background SVG fade
        if (bgAnim) {
            tl.to(bgAnim, { opacity: 0.2, y: 0, duration: 1.5 }, 0.1);
        }

        // Left column stagger
        if (leftColElements.length) {
            tl.to(leftColElements, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.2);
        }

        // Right column container reveal
        if (rightCol) {
            tl.to(rightCol, { y: 0, opacity: 1, duration: 0.8 }, 0.4);
        }

        // Form fields stagger
        if (formGroups.length) {
            tl.to(formGroups, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.6);
        }

        // Action buttons
        if (actions) {
            tl.to(actions, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2");
        }
    } else {
        // Fallback if GSAP is unavailable or reduced motion is preferred
        if (container) container.classList.remove('opacity-0', 'translate-y-4');
    }

    // --- Form Validation Logic ---
    const form = document.getElementById('s4-form');
    
    // Regular Expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Allow +, spaces, hyphens, and numbers. Must have at least 7 digits.
    const phoneRegex = /^[\+\s\-\d]*$/;
    
    const validateField = (input) => {
        let isValid = true;
        let errorMsg = '';
        const id = input.id;
        const errorSpan = document.getElementById(`${id}-error`);
        const isRequired = input.hasAttribute('required');
        
        // Clear previous error styles
        input.classList.remove('border-error');
        if (id !== 'consent' && input.nextElementSibling && input.nextElementSibling.tagName === 'LABEL') {
            input.nextElementSibling.classList.remove('text-error');
        }

        // Required check
        if (isRequired && (input.type === 'checkbox' ? !input.checked : !input.value.trim())) {
            isValid = false;
            errorMsg = id === 'consent' ? 'You must agree to continue.' : 'This field is required.';
        } 
        // Email check
        else if (id === 'email' && input.value.trim() && !emailRegex.test(input.value.trim())) {
            isValid = false;
            errorMsg = 'Please enter a valid email address.';
        }
        // WhatsApp check
        else if (id === 'whatsapp' && input.value.trim()) {
            const val = input.value.trim();
            const digitCount = (val.match(/\d/g) || []).length;
            if (!phoneRegex.test(val) || digitCount < 7 || digitCount > 15) {
                isValid = false;
                errorMsg = 'Please enter a valid phone number.';
            }
        }

        // Display error if invalid
        if (!isValid) {
            if (errorSpan) {
                errorSpan.textContent = errorMsg;
                errorSpan.classList.remove('opacity-0');
            }
            if (id !== 'consent') {
                input.classList.add('border-error');
                if (input.nextElementSibling && input.nextElementSibling.tagName === 'LABEL') {
                    input.nextElementSibling.classList.add('text-error');
                }
            }
        } else {
            // Hide error if valid
            if (errorSpan) {
                errorSpan.classList.add('opacity-0');
            }
        }

        return isValid;
    };

    if (form) {
        // Validate on blur for all inputs
        const inputs = form.querySelectorAll('.s4-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            input.addEventListener('input', () => {
                // Optionally clear error while typing if it currently has one
                const errorSpan = document.getElementById(`${input.id}-error`);
                if (errorSpan && !errorSpan.classList.contains('opacity-0')) {
                    // Only clear the error UI state, don't fully validate until blur/submit
                    errorSpan.classList.add('opacity-0');
                    input.classList.remove('border-error');
                    if (input.id !== 'consent' && input.nextElementSibling && input.nextElementSibling.tagName === 'LABEL') {
                        input.nextElementSibling.classList.remove('text-error');
                    }
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Do not actually submit to backend yet
            
            let formIsValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    formIsValid = false;
                }
            });

            if (!formIsValid) {
                return; // Stop here if form is invalid
            }

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

            // Collect data
            const data = {};
            inputs.forEach(input => {
                data[input.id] = input.type === 'checkbox' ? input.checked : input.value.trim();
            });

            // Map frontend IDs to model fields
            const payload = {
                full_name: data.fullName,
                company: data.company,
                email: data.email,
                whatsapp: data.whatsapp,
                industry: data.industry,
                team_size: data.teamSize,
                revenue: data.revenue,
                consent: data.consent
            };
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Submitting...';
            submitBtn.style.pointerEvents = 'none';

            fetch('/assessment/section-4/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    submitBtn.innerHTML = '<span class="material-symbols-outlined">check</span> Submitted';
                    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
                        gsap.to(container, {
                            opacity: 0, 
                            y: -20, 
                            duration: 0.5, 
                            ease: 'power2.inOut',
                            onComplete: () => { window.location.href = '/assessment/section-5/'; }
                        });
                    } else {
                        window.location.href = '/assessment/section-5/';
                    }
                } else {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.pointerEvents = '';
                    
                    if (res.errors) {
                        // Display backend form errors
                        for (const [field, messages] of Object.entries(res.errors)) {
                            // Map model field back to frontend ID if needed
                            let inputId = field;
                            if (field === 'full_name') inputId = 'fullName';
                            if (field === 'team_size') inputId = 'teamSize';
                            
                            const errorSpan = document.getElementById(`${inputId}-error`);
                            const inputElem = document.getElementById(inputId);
                            if (errorSpan && inputElem) {
                                errorSpan.textContent = messages[0];
                                errorSpan.classList.remove('opacity-0');
                                if (inputId !== 'consent') {
                                    inputElem.classList.add('border-error');
                                    if (inputElem.nextElementSibling && inputElem.nextElementSibling.tagName === 'LABEL') {
                                        inputElem.nextElementSibling.classList.add('text-error');
                                    }
                                }
                            }
                        }
                    } else if (res.error) {
                        alert(res.error);
                    }
                }
            })
            .catch(err => {
                console.error(err);
                submitBtn.innerHTML = originalText;
                submitBtn.style.pointerEvents = '';
                alert("Network error. Please try again.");
            });
        });
    }

    // Back button logic
    const backBtn = document.getElementById('s4-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Smooth exit animation
            if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
                gsap.to(container, {
                    opacity: 0, 
                    y: 10, 
                    duration: 0.3, 
                    ease: 'power2.in',
                    onComplete: () => { window.location.href = '/assessment/section-3/'; }
                });
            } else {
                window.location.href = '/assessment/section-3/';
            }
        });
    }
});
