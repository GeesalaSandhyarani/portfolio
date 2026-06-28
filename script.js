/* ==========================================================================
   PORTFOLIO INTERACTION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Project Case Study Data
    const projectData = {
        'plastic-recycle': {
            title: 'Save Environment with Plastic Recycle',
            subtitle: 'AI-Powered Waste Classification Web Platform',
            tags: ['AI', 'Web', 'MySQL'],
            image: 'assets/plastic_recycle_mockup.png',
            role: 'HTML, CSS, JS, Python, Node, MySQL',
            timeline: 'Independent Project (2026)',
            impact: 'Image Scan & Recyclability Lookup',
            problem: 'Improper disposal habits and lack of local recycling clarity lead to vast amounts of recyclable plastic ending up in landfills. Users need an immediate way to scan items and know if and how to recycle them.',
            solution: 'Developed a comprehensive web platform integrating image-based plastic item scanning to automatically classify plastic codes (PET, HDPE, PVC, etc.) and calculate recyclability index.',
            uxFlow: 'Created an intuitive web dashboard where users take a photo of an item, see it processed live in the browser, and review clear, visually color-coded disposal instructions based on local recycling facilities.',
            impactDetails: 'Successfully integrated image identification and designed a sustainable waste management tool to promote environmentally responsible disposal habits in university and local communities.',
            repoUrl: 'https://github.com/GeesalaSandhyarani/plastic-recycle-project'
        },
        'crime-analysis': {
            title: 'Crime Pattern Analysis',
            subtitle: 'Machine Learning Crime Hotspot & Trend Analytics',
            tags: ['Machine Learning', 'Python', 'Analytics'],
            image: 'assets/crime_analysis_mockup.png',
            role: 'Python, Pandas, NumPy, Scikit-learn',
            timeline: 'Academic Project (2025)',
            impact: 'ARIMA, Prophet & K-Means Hotspots',
            problem: 'Municipal law enforcement agencies rely on historical databases but struggle to extract proactive insights or forecast crime frequencies, leading to inefficient patrols and resources allocation.',
            solution: 'Built Python machine learning models utilizing ARIMA, Prophet, and Random Forest regressors to analyze crime trends, predict event frequencies, and identify clusters of high-risk hotspots.',
            uxFlow: 'Engineered a data analytics pipeline converting raw municipal coordinates into cluster visuals. hotspot maps are rendered using K-Means clustering, accompanied by forecast charts visualised with Matplotlib.',
            impactDetails: 'Achieved high accuracy in predictive modeling, generating data-driven crime reports that support municipal planners in optimizing public safety patrol locations and schedule deployment.',
            repoUrl: 'https://github.com/GeesalaSandhyarani/crime-pattern-analysis'
        },
        'gradeiq': {
            title: 'GradeIQ – CGPA Calculator',
            subtitle: 'Academic SGPA & Credit-Weighted CGPA Tool',
            tags: ['Frontend', 'Web Tool', 'Responsive UI'],
            image: 'assets/gradeiq_mockup.png',
            role: 'HTML5, CSS3, JavaScript',
            timeline: 'Frontend Project (2026)',
            impact: 'Fully Responsive Academic Utility',
            problem: 'Students frequently find computing SGPAs and cumulative CGPAs tedious and error-prone due to varying credit weights per course and multiple department schema.',
            solution: 'GradeIQ simplifies academic calculations with a responsive interface where students dynamically add courses, choose grade scales, and instantly compute credit-weighted results.',
            uxFlow: 'Structured using modern glassmorphic input panels, enabling instant row additions, inputs verification, and real-time calculations. Deployed to GitHub Pages for instant student access.',
            impactDetails: 'Widely used by engineering classmates at Sridevi Women\'s Engineering College to calculate credit results with zero computation errors, demonstrating premium utility and responsive client-side JavaScript.',
            repoUrl: 'https://github.com/GeesalaSandhyarani'
        }
    };

    /* ==========================================================================
       CUSTOM CURSOR TRACKING
       ========================================================================== */
    const cursor = document.getElementById('custom-cursor');
    const cursorRing = document.getElementById('custom-cursor-ring');
    
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move core dot instantly
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Dampen the ring movement for slick lagging effect
    function animateCursorRing() {
        const easing = 0.15;
        ringX += (mouseX - ringX) * easing;
        ringY += (mouseY - ringY) * easing;
        
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        
        requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    // Hover interactive state expansion
    const hoverables = document.querySelectorAll('a, button, .project-card, .social-icon, .modal-close');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            cursorRing.classList.add('hovered');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            cursorRing.classList.remove('hovered');
        });
    });

    /* ==========================================================================
       MOBILE RESPONSIVE MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');
    const navLinksList = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navLinksWrapper.classList.toggle('open');
    });

    // Close menu when link is clicked
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navLinksWrapper.classList.remove('open');
        });
    });

    /* ==========================================================================
       SCROLL-REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it is a skill category, trigger the width loading animation
                if (entry.target.classList.contains('skill-category')) {
                    const barFill = entry.target.querySelector('.skill-progress-fill');
                    if (barFill) {
                        // The inline width styles trigger transitions
                        const targetWidth = barFill.style.width;
                        barFill.style.width = '0%';
                        setTimeout(() => {
                            barFill.style.width = targetWidth;
                        }, 50);
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    /* ==========================================================================
       FLOATING NAVBAR CAPSULE (SLIDING INDICATOR)
       ========================================================================== */
    const nav = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.getElementById('nav-indicator');
    const sections = document.querySelectorAll('.section');

    function updateNavIndicator(activeLink) {
        if (!activeLink || window.innerWidth <= 991) {
            navIndicator.style.opacity = '0';
            return;
        }
        navIndicator.style.opacity = '1';
        navIndicator.style.left = `${activeLink.offsetLeft}px`;
        navIndicator.style.width = `${activeLink.offsetWidth}px`;
    }

    // Initialize indicator position
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        setTimeout(() => updateNavIndicator(activeLink), 100);
    }

    // Handle clicks to change active class and animate indicator instantly
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            updateNavIndicator(link);
        });
    });

    // Recalculate indicator position on resize
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-link.active');
        updateNavIndicator(currentActive);
    });

    // Header glass shrink on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       SCROLL SPY active states
       ========================================================================== */
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[data-target="${id}"]`);
                
                if (correspondingLink) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                    updateNavIndicator(correspondingLink);
                }
            }
        });
    }, {
        threshold: 0.35,
        rootMargin: '-10% 0px -40% 0px'
    });

    sections.forEach(section => {
        spyObserver.observe(section);
    });

    /* ==========================================================================
       CASE STUDY MODAL (DYNAMIC POPULATE)
       ========================================================================== */
    const modal = document.getElementById('case-study-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Modal nodes
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalTags = document.getElementById('modal-tags');
    const modalImage = document.getElementById('modal-image');
    const modalRole = document.getElementById('modal-role');
    const modalTimeline = document.getElementById('modal-timeline');
    const modalImpact = document.getElementById('modal-impact');
    const modalProblem = document.getElementById('modal-problem');
    const modalSolution = document.getElementById('modal-solution');
    const modalUxFlow = document.getElementById('modal-ux-flow');
    const modalFinalImpact = document.getElementById('modal-final-impact');
    const modalRepoLink = document.getElementById('modal-repo-link');

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        // Populate Modal Details
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalRole.textContent = data.role;
        modalTimeline.textContent = data.timeline;
        modalImpact.textContent = data.impact;
        modalProblem.textContent = data.problem;
        modalSolution.textContent = data.solution;
        modalUxFlow.textContent = data.uxFlow;
        modalFinalImpact.textContent = data.impactDetails;
        modalImage.src = data.image;
        modalImage.alt = `${data.title} UI Showcase`;
        
        // Populate GitHub Repo Link
        if (modalRepoLink) {
            modalRepoLink.href = data.repoUrl || 'https://github.com/GeesalaSandhyarani';
        }

        // Render Tags
        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
            const tagElem = document.createElement('span');
            tagElem.className = 'tag';
            tagElem.textContent = tag;
            modalTags.appendChild(tagElem);
        });

        // Show Modal with animation
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock background scroll

        // Temporarily reset custom cursor size
        cursor.classList.remove('hovered');
        cursorRing.classList.remove('hovered');
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Re-enable background scroll
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    
    // Close modal by clicking background overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal via Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==========================================================================
       CONTACT FORM VALIDATION & SUCCESS TIMEOUT
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const successState = document.getElementById('form-success');
    const resetFormBtn = document.getElementById('reset-form-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Fields
    const fields = {
        name: {
            input: document.getElementById('name'),
            error: document.getElementById('name-error'),
            validate: (val) => val.trim().length >= 2
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('email-error'),
            validate: (val) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(String(val).toLowerCase());
            }
        },
        message: {
            input: document.getElementById('message'),
            error: document.getElementById('message-error'),
            validate: (val) => val.trim().length >= 10
        }
    };

    function validateField(fieldName) {
        const field = fields[fieldName];
        const isValid = field.validate(field.input.value);
        const formGroup = field.input.closest('.form-group');

        if (!isValid) {
            formGroup.classList.add('invalid');
        } else {
            formGroup.classList.remove('invalid');
        }
        return isValid;
    }

    // Input listeners to clear validation errors in real-time
    Object.keys(fields).forEach(key => {
        fields[key].input.addEventListener('input', () => {
            const formGroup = fields[key].input.closest('.form-group');
            if (formGroup.classList.contains('invalid')) {
                validateField(key);
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        Object.keys(fields).forEach(key => {
            const isValid = validateField(key);
            if (!isValid) isFormValid = false;
        });

        if (isFormValid) {
            // Animate button sending state
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            // Simulate AJAX network call
            setTimeout(() => {
                // Populate custom name in success description
                const clientName = fields.name.input.value.trim();
                const successDesc = successState.querySelector('.success-text');
                successDesc.innerHTML = `Thank you for reaching out, <strong>${clientName}</strong>. I've received your message and will get back to you within 24 hours.`;

                // Show Success State
                successState.classList.add('active');
                
                // Clear inputs
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }, 1200);
        }
    });

    resetFormBtn.addEventListener('click', () => {
        successState.classList.remove('active');
    });
});
