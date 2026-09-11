/* =====================================================
   SUNRISE INTERIOR STUDIO
   PREMIUM JS ENHANCEMENTS — premium.js
   ===================================================== */

(function () {
    'use strict';


    /* ===================================================
       1. CUSTOM CURSOR GLOW
    =================================================== */

    function initCursorGlow() {
        // Only on non-touch desktop
        if ('ontouchstart' in window || window.innerWidth < 768) return;

        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;
        let raf;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Smooth lerp following
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            glow.style.left = glowX + 'px';
            glow.style.top  = glowY + 'px';
            raf = requestAnimationFrame(animateCursor);
        }

        animateCursor();

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            glow.style.opacity = '1';
        });
    }


    /* ===================================================
       2. GLASSMORPHISM NAVBAR ON SCROLL
    =================================================== */

    function initScrolledNav() {
        const header = document.querySelector('.header');
        if (!header) return;

        let ticking = false;

        function updateNav() {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNav);
                ticking = true;
            }
        }, { passive: true });
    }


    /* ===================================================
       3. SCROLL REVEAL — IntersectionObserver
    =================================================== */

    function initScrollReveal() {
        // Individual elements
        const revealEls = document.querySelectorAll('[data-reveal]');
        const staggerEls = document.querySelectorAll('[data-reveal-stagger]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealEls.forEach(el => observer.observe(el));
        staggerEls.forEach(el => observer.observe(el));
    }


    /* ===================================================
       4. ANIMATED STAT COUNTERS
    =================================================== */

    function initCounters() {
        const statBoxes = document.querySelectorAll('.stat-box strong');
        if (!statBoxes.length) return;

        function parseValue(str) {
            const trimmed = str.trim();
            if (trimmed.endsWith('%')) {
                return { value: parseFloat(trimmed), suffix: '%', prefix: '' };
            }
            if (trimmed.endsWith('+')) {
                return { value: parseFloat(trimmed), suffix: '+', prefix: '' };
            }
            // "Custom" or non-numeric
            return null;
        }

        function animateCounter(el, from, to, suffix, duration) {
            const start = performance.now();
            function step(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(from + (to - from) * eased);
                el.textContent = current + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const parsed = parseValue(el.textContent);
                    if (parsed) {
                        animateCounter(el, 0, parsed.value, parsed.suffix, 1600);
                    }
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statBoxes.forEach(el => counterObserver.observe(el));
    }


    /* ===================================================
       5. HERO PARALLAX (background on scroll)
    =================================================== */

    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Skip on mobile (background-attachment:fixed disabled)
        if (window.innerWidth < 768) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const heroHeight = hero.offsetHeight;
                    if (scrolled < heroHeight) {
                        const offset = scrolled * 0.4;
                        hero.style.backgroundPositionY = `calc(50% + ${offset}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }


    /* ===================================================
       6. UPGRADE PROJECT GRID (wrap imgs in .project-item)
    =================================================== */

    function upgradeProjectGrid() {
        const grid = document.querySelector('.project-grid');
        if (!grid) return;

        const images = grid.querySelectorAll('img');
        images.forEach(img => {
            if (img.parentElement.classList.contains('project-item')) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'project-item';
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
        });
    }


    /* ===================================================
       7. UPGRADE SERVICE CARDS (wrap content in .service-card-body)
    =================================================== */

    function upgradeServiceCards() {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            if (card.querySelector('.service-card-body')) return;
            const img = card.querySelector('img');
            const children = Array.from(card.children).filter(c => c !== img);
            if (!children.length) return;

            const body = document.createElement('div');
            body.className = 'service-card-body';
            children.forEach(c => body.appendChild(c));
            card.appendChild(body);
        });
    }


    /* ===================================================
       8. HERO SCROLL HINT
    =================================================== */

    function addScrollHint() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const hint = document.createElement('div');
        hint.className = 'hero-scroll-hint';
        hint.innerHTML = `
            <span>Scroll</span>
            <svg viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"/>
            </svg>
        `;
        hero.appendChild(hint);

        // Hide on scroll
        const onScroll = () => {
            if (window.scrollY > 60) {
                hint.style.opacity = '0';
                window.removeEventListener('scroll', onScroll);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
    }


    /* ===================================================
       9. HERO DIVIDER (gold line below tagline)
    =================================================== */

    function addHeroDivider() {
        const smallTitle = document.querySelector('.hero-small-title');
        if (!smallTitle) return;

        // Insert divider before h1
        const h1 = document.querySelector('.hero h1');
        if (!h1) return;

        const divider = document.createElement('div');
        divider.className = 'hero-divider';
        h1.parentNode.insertBefore(divider, h1);
    }


    /* ===================================================
       10. INJECT PREMIUM FOOTER
    =================================================== */

    function injectPremiumFooter() {
        const footer = document.querySelector('footer');
        if (!footer || footer.classList.contains('premium-footer')) return;
        footer.classList.add('premium-footer');

        const premiumHTML = `
            <div class="footer-premium">
                <div class="footer-brand">
                    <div class="footer-logo-text">
                        <h2>SUNRISE</h2>
                        <span>Interior Studio</span>
                    </div>
                    <p>Creating beautiful, functional spaces that reflect your personality and lifestyle since 2014.</p>
                    <div class="footer-socials">
                        <a href="#" class="footer-social-link" title="Instagram">&#x1F4F7;</a>
                        <a href="#" class="footer-social-link" title="Facebook">&#x1F464;</a>
                        <a href="#" class="footer-social-link" title="Pinterest">&#x1F4CC;</a>
                        <a href="#" class="footer-social-link" title="YouTube">&#x1F3A5;</a>
                    </div>
                </div>

                <div class="footer-col">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="service-details.html?service=modular-kitchen">Modular Kitchen</a></li>
                        <li><a href="service-details.html?service=wardrobes">Wardrobes</a></li>
                        <li><a href="service-details.html?service=tv-units">TV Units</a></li>
                        <li><a href="service-details.html?service=interior-design">Interior Design</a></li>
                        <li><a href="service-details.html?service=furniture">Furniture</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="projects.html">Our Projects</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="consultation.html">Book Consultation</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Contact</h4>
                    <div class="footer-contact-item">
                        <span class="fc-icon">📍</span>
                        <span>Sunrise Interior Studio,<br>Your City, India</span>
                    </div>
                    <div class="footer-contact-item">
                        <span class="fc-icon">📞</span>
                        <span>+91 98765 43210</span>
                    </div>
                    <div class="footer-contact-item">
                        <span class="fc-icon">✉️</span>
                        <span>hello@sunriseinterior.in</span>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <span>© 2026 Sunrise Interior Studio. All Rights Reserved.</span>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms &amp; Conditions</a>
                    <a href="#">Sitemap</a>
                </div>
            </div>
        `;

        footer.insertAdjacentHTML('afterbegin', premiumHTML);
    }


    /* ===================================================
       11. ADD LOGO SUN TO HEADER (if missing)
    =================================================== */

    function ensureLogoSun() {
        const logoText = document.querySelector('.logo-text');
        if (!logoText) return;
        const logo = logoText.parentElement;
        if (logo && !logo.classList.contains('logo')) return;
        if (logo && logo.querySelector('.logo-sun')) return;

        const sun = document.createElement('div');
        sun.className = 'logo-sun';
        sun.textContent = '☼';
        logo.insertBefore(sun, logoText);
    }


    /* ===================================================
       12. BUTTON RIPPLE EFFECT
    =================================================== */

    function initRipple() {
        const buttons = document.querySelectorAll('.primary-btn, .dark-btn, .outline-btn, .quote-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position:absolute;
                    width:4px;height:4px;
                    background:rgba(255,255,255,0.35);
                    border-radius:50%;
                    left:${x}px;top:${y}px;
                    transform:translate(-50%,-50%) scale(0);
                    animation:rippleAnim 0.55s ease-out forwards;
                    pointer-events:none;
                `;

                if (!document.getElementById('ripple-style')) {
                    const style = document.createElement('style');
                    style.id = 'ripple-style';
                    style.textContent = `
                        @keyframes rippleAnim {
                            to { transform: translate(-50%,-50%) scale(80); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }

                const position = getComputedStyle(btn).position;
                if (position === 'static') btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }


    /* ===================================================
       13. PAGE ENTRANCE ANIMATION
    =================================================== */

    function initPageEntrance() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease';
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
        // Fallback
        setTimeout(() => { document.body.style.opacity = '1'; }, 500);
    }


    /* ===================================================
       INIT — Run all enhancements
    =================================================== */

    function init() {
        initPageEntrance();
        initCursorGlow();
        initScrolledNav();
        upgradeServiceCards();
        upgradeProjectGrid();
        addHeroDivider();
        addScrollHint();
        injectPremiumFooter();
        ensureLogoSun();

        // Defer scroll-based features
        if ('IntersectionObserver' in window) {
            initScrollReveal();
            initCounters();
        }

        initParallax();
        initRipple();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
