document.addEventListener('DOMContentLoaded', function() {
    // ===== INITIAL SETUP =====
    const header = document.getElementById('header');
    let lastScroll = 0;
    let isScrolling = false;
    
    // Set header height variable
    function updateHeaderHeight() {
        if (!header) return;
        document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    }
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight, { passive: true });
    window.addEventListener('load', updateHeaderHeight);

    // Console message
    console.log('%c💡 Mandiri Jaya Lighting', 'font-size: 20px; font-weight: bold; color: #3F72E8; background: linear-gradient(90deg, #3F72E8, #6a9cff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%c✨ Website dengan efek visual premium', 'font-size: 12px; color: #6b6b6b;');

    // ===== ENHANCED SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerEl = document.getElementById('header');
                const headerOffset = headerEl ? headerEl.offsetHeight : 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset + 20; // +20px padding
                
                // Enhanced smooth scroll with easing
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link with animation
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    link.style.transform = 'translateY(0)';
                });
                
                this.classList.add('active');
                this.style.transform = 'translateY(-2px)';
                
                // Add ripple effect to button clicks
                if (this.classList.contains('btn')) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size/2;
                    const y = e.clientY - rect.top - size/2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.4);
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        pointer-events: none;
                    `;
                    
                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                }
            }
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===== ENHANCED HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Header hide/show on scroll
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
        
        // Update active section based on scroll position
        updateActiveSection();
    });

    // Function to update active section
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                const id = section.getAttribute('id');
                const navLink = document.querySelector(`nav a[href="#${id}"]`);
                if (navLink) {
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                        link.style.transform = 'translateY(0)';
                    });
                    navLink.classList.add('active');
                    navLink.style.transform = 'translateY(-2px)';
                }
            }
        });
    }

    // ===== ENHANCED INTERSECTION OBSERVER =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                // Add floating effect to portfolio items
                if (entry.target.classList.contains('portfolio-item')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.05}s`;
                    entry.target.style.animation = `floatUp 0.6s ease-out ${index * 0.05}s forwards`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Add floatUp animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes floatElement {
            0%, 100% { 
                transform: translateY(0) rotate(0deg); 
            }
            50% { 
                transform: translateY(-20px) rotate(5deg); 
            }
        }
        
        @keyframes glow {
            0%, 100% { 
                opacity: 0.3;
                transform: scale(1);
            }
            50% { 
                opacity: 0.5;
                transform: scale(1.05);
            }
        }
        
        @keyframes sparkle {
            0% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
            100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
    `;
    document.head.appendChild(floatStyle);

    // ===== ENHANCED FORM HANDLING =====
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';
    const contactForm = document.getElementById('contactForm');
    const formMessageEl = document.getElementById('formMessage');

    function showFormMessage(text, type = 'success') {
        if (!formMessageEl) return;
        formMessageEl.textContent = text;
        formMessageEl.className = `form-message ${type}`;
        formMessageEl.style.animation = 'none';
        setTimeout(() => {
            formMessageEl.style.animation = 'slideIn 0.3s ease-out';
        }, 10);
        formMessageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add confetti for success message
        if (type === 'success') {
            createConfetti();
        }
    }

    function clearFormMessage() {
        if (!formMessageEl) return;
        formMessageEl.textContent = '';
        formMessageEl.className = 'form-message';
        formMessageEl.style.display = 'none';
    }

    function setFieldError(fieldId, message) {
        const el = document.getElementById('error-' + fieldId);
        if (el) {
            el.textContent = message || '';
            if (message) {
                el.style.animation = 'shake 0.3s ease-in-out';
                setTimeout(() => el.style.animation = '', 300);
            }
        }
    }

    function clearFieldErrors() {
        ['name','email','phone','event','message'].forEach(id => setFieldError(id, ''));
    }

    function validateForm() {
        clearFieldErrors();
        let valid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const ev = document.getElementById('event').value.trim();
        const msg = document.getElementById('message').value.trim();

        if (!name) { setFieldError('name', 'Nama wajib diisi.'); valid = false; }
        if (!email) { setFieldError('email', 'Email wajib diisi.'); valid = false; }
        else if (!/\S+@\S+\.\S+/.test(email)) { setFieldError('email', 'Masukkan alamat email yang valid.'); valid = false; }
        if (!phone) { setFieldError('phone', 'Nomor telepon wajib diisi.'); valid = false; }
        if (!ev) { setFieldError('event', 'Jenis acara wajib diisi.'); valid = false; }
        if (!msg) { setFieldError('message', 'Tuliskan sedikit tentang acara Anda.'); valid = false; }

        if (!valid) {
            showFormMessage('Periksa kolom yang berwarna merah dan coba lagi.', 'error');
            // Add shake animation to form
            contactForm.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => contactForm.style.animation = '', 500);
        } else {
            clearFormMessage();
        }

        return valid;
    }

    // Add form field focus effects
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add character counter for textarea
        if (field.tagName === 'TEXTAREA') {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.textContent = '0/500';
            field.parentElement.appendChild(counter);
            
            field.addEventListener('input', function() {
                const count = this.value.length;
                counter.textContent = `${count}/500`;
                counter.style.color = count > 450 ? '#d64545' : '#6b6b6b';
            });
        }
    });

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Honeypot check
        const gotcha = document.getElementById('_gotcha');
        if (gotcha && gotcha.value) return;

        if (!validateForm()) return;

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalLabel = submitBtn ? submitBtn.textContent : '';
        const originalHTML = submitBtn ? submitBtn.innerHTML : '';
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Mengirim...';
            
            // Add loading animation
            const spinner = document.createElement('style');
            spinner.textContent = `
                .spinner {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                    margin-right: 8px;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinner);
        }

        // Formspree fallback
        if (FORMSPREE_ENDPOINT.includes('YOUR_FORMSPREE_ID')) {
            console.warn('Formspree endpoint not configured. Replace YOUR_FORMSPREE_ID with your form ID.');
            showFormMessage('Form belum dikonfigurasi — data tampil di console untuk pengujian.', 'error');
            if (submitBtn) { 
                submitBtn.disabled = false; 
                submitBtn.textContent = originalLabel;
                submitBtn.innerHTML = originalHTML;
            }
            return;
        }

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            });

            if (response.ok) {
                showFormMessage('🎉 Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.', 'success');
                contactForm.reset();
                // Reset character counters
                document.querySelectorAll('.char-counter').forEach(counter => {
                    counter.textContent = '0/500';
                    counter.style.color = '#6b6b6b';
                });
            } else {
                showFormMessage('😔 Terjadi kesalahan saat mengirim. Silakan coba lagi atau hubungi kami langsung.', 'error');
            }
        } catch (err) {
            console.error('Network error:', err);
            showFormMessage('📡 Gagal mengirim pesan. Periksa koneksi internet Anda.', 'error');
        } finally {
            if (submitBtn) { 
                submitBtn.disabled = false; 
                submitBtn.textContent = originalLabel;
                submitBtn.innerHTML = originalHTML;
            }
        }
    });

    // ===== ENHANCED MOBILE MENU =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const headerEl = document.getElementById('header');

    function openMobileMenu() {
        headerEl.classList.add('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.innerHTML = '✕';
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscClose);
        
        // Animate menu items
        const menuItems = document.querySelectorAll('#main-nav li');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }

    function closeMobileMenu() {
        headerEl.classList.remove('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '☰';
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscClose);
    }

    function handleEscClose(e) {
        if (e.key === 'Escape') closeMobileMenu();
    }

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = headerEl.classList.contains('nav-open');
        if (isOpen) closeMobileMenu(); else openMobileMenu();
    });

    // Close mobile menu on link click
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024 && headerEl.classList.contains('nav-open')) {
                closeMobileMenu();
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && headerEl.classList.contains('nav-open')) {
            if (!e.target.closest('#header')) {
                closeMobileMenu();
            }
        }
    });

    // ===== ENHANCED LIGHTBOX =====
    (function initLightbox() {
        const thumbs = document.querySelectorAll('.portfolio-thumb');
        const overlay = document.getElementById('lightbox');
        const img = document.getElementById('lightboxImage');
        const closeBtn = document.getElementById('lightboxClose');
        if (!thumbs.length || !overlay) return;

        function openLightbox(src, alt) {
            img.src = src;
            img.alt = alt || '';
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Add loading animation
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            }, 10);
        }

        function closeLightbox() {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Reset image
            setTimeout(() => {
                img.src = '';
                img.style.opacity = '0';
            }, 300);
        }

        thumbs.forEach(t => {
            t.addEventListener('click', () => {
                const full = t.getAttribute('data-full') || t.src;
                openLightbox(full, t.alt);
            });
            
            // Add hover zoom effect
            t.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            t.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => { 
            if (e.target === overlay) closeLightbox(); 
        });
        document.addEventListener('keydown', (e) => { 
            if (e.key === 'Escape') closeLightbox(); 
        });
        
        // Add keyboard navigation for lightbox
        document.addEventListener('keydown', (e) => {
            if (overlay.classList.contains('active')) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    navigateLightbox(e.key === 'ArrowRight' ? 1 : -1);
                }
            }
        });
        
        function navigateLightbox(direction) {
            const currentImg = img.src;
            const allThumbs = Array.from(thumbs);
            const currentIndex = allThumbs.findIndex(t => 
                (t.getAttribute('data-full') || t.src) === currentImg
            );
            
            if (currentIndex !== -1) {
                const newIndex = (currentIndex + direction + allThumbs.length) % allThumbs.length;
                const newThumb = allThumbs[newIndex];
                const newSrc = newThumb.getAttribute('data-full') || newThumb.src;
                const newAlt = newThumb.alt;
                
                // Crossfade animation
                img.style.opacity = '0';
                setTimeout(() => {
                    img.src = newSrc;
                    img.alt = newAlt;
                    img.style.opacity = '1';
                }, 200);
            }
        }
    })();

    // ===== ENHANCED PARALLAX EFFECT =====
    (function initParallax() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image');
        const floatingElements = document.querySelectorAll('.floating-element');
        const serviceCards = document.querySelectorAll('.service-card');
        const testimonials = document.querySelectorAll('.testimonial-card');

        function onScroll() {
            const scrolled = window.scrollY;
            const vh = window.innerHeight;
            
            // Hero image parallax
            if (heroImage) {
                const imgOffset = Math.min(40, scrolled * 0.06);
                heroImage.style.transform = `translateY(${imgOffset}px) scale(1.03)`;
            }
            
            // Floating elements parallax
            floatingElements.forEach((el, i) => {
                const factor = 1 + (i * 0.02);
                el.style.transform = `
                    translateY(${Math.sin((scrolled + i * 100) / 200) * (8 * factor)}px) 
                    rotate(${Math.sin((scrolled + i * 50) / 150) * 5}deg)
                    scale(${1 + Math.sin(scrolled / 300) * 0.05})
                `;
            });
            
            // Service cards parallax
            serviceCards.forEach((card, i) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.top + cardRect.height / 2;
                const distanceFromCenter = (cardCenter - vh / 2) / vh;
                card.style.transform = `translateY(${distanceFromCenter * 20}px)`;
            });
            
            // Testimonials parallax
            testimonials.forEach((card, i) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.top + cardRect.height / 2;
                const distanceFromCenter = (cardCenter - vh / 2) / vh;
                card.style.transform = `translateY(${distanceFromCenter * 15}px) 
                                       rotate(${distanceFromCenter * 0.5}deg)`;
            });
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        onScroll();
    })();

    // ===== ENHANCED FLOATING ELEMENTS ANIMATION =====
    (function initFloatingElements() {
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach((el, i) => {
            el.style.animation = `floatElement ${6 + i * 2}s ease-in-out infinite`;
            el.style.animationDelay = `${i * 0.5}s`;
            
            // Add random glow animation
            el.style.animation += `, glow ${4 + i * 1}s ease-in-out infinite`;
        });
        
        // Add sparkle effects to hero
        const hero = document.querySelector('.hero');
        if (hero) {
            for (let i = 0; i < 15; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.cssText = `
                    position: absolute;
                    width: ${2 + Math.random() * 4}px;
                    height: ${2 + Math.random() * 4}px;
                    background: ${Math.random() > 0.5 ? 'rgba(63, 114, 232, 0.8)' : 'rgba(255, 209, 102, 0.8)'};
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: sparkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s;
                    pointer-events: none;
                    z-index: 1;
                `;
                hero.appendChild(sparkle);
            }
        }
    })();

    // ===== HOVER EFFECTS ENHANCEMENTS =====
    document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.style.boxShadow = '0 25px 50px rgba(63, 114, 232, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            this.style.boxShadow = '';
        });
    });
    
    // Add magnetic button effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `translate(${deltaX * 5}px, ${deltaY * 5}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // ===== ENHANCED LAZY LOADING =====
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            // Add blur effect while loading
            img.style.filter = 'blur(5px)';
            img.style.transition = 'filter 0.3s ease';
            
            img.onload = function() {
                this.style.filter = 'blur(0)';
            };
            
            // Force load
            img.src = img.src;
        });
    }

    // ===== PAGE LOAD ANIMATION =====
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Add loading animation
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading...</div>
            </div>
        `;
        document.body.appendChild(loader);
        
        // Style the loader
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
            #page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-lighter);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(63, 114, 232, 0.1);
                border-radius: 50%;
                border-top-color: var(--primary-blue);
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            
            .loader-text {
                color: var(--text-gray);
                font-size: 0.9rem;
                font-weight: 500;
            }
        `;
        document.head.appendChild(loaderStyle);
        
        // Remove loader after page load
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });

    // ===== ADDITIONAL ANIMATIONS =====
    const additionalAnimations = document.createElement('style');
    additionalAnimations.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .form-group.focused label {
            color: var(--primary-blue);
            transform: translateY(-5px);
            font-size: 0.85rem;
        }
        
        .form-group.focused input,
        .form-group.focused textarea {
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 3px rgba(63, 114, 232, 0.1);
        }
        
        .char-counter {
            text-align: right;
            font-size: 0.8rem;
            margin-top: 4px;
            color: var(--text-gray);
        }
        
        /* Enhanced button hover effects */
        .btn-primary:hover {
            background: linear-gradient(135deg, var(--dark-blue) 0%, var(--primary-blue) 100%);
            transform: translateY(-3px) scale(1.02);
        }
        
        /* Portfolio item enhanced hover */
        .portfolio-item:hover {
            transform: translateY(-8px) scale(1.02);
        }
        
        /* Service card enhanced hover */
        .service-card:hover .service-icon {
            transform: scale(1.1) rotate(5deg);
            background: rgba(63, 114, 232, 0.15);
        }
        
        .service-card:hover .service-number {
            background-color: rgba(63, 114, 232, 0.1);
            transform: translateX(5px);
        }
    `;
    document.head.appendChild(additionalAnimations);

    // ===== CONFETTI EFFECT =====
    function createConfetti() {
        const confettiCount = 100;
        const colors = ['#3F72E8', '#6a9cff', '#FFD166', '#FFB347', '#ffffff'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: ${5 + Math.random() * 10}px;
                height: ${5 + Math.random() * 10}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -20px;
                left: ${Math.random() * 100}vw;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 9999;
                pointer-events: none;
                animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 3000);
        }
        
        // Add confetti animation
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);
    }

    // ===== SCROLL PROGRESS INDICATOR =====
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-blue), var(--light-blue));
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Kembali ke atas');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-blue);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-blue);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(20px)';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    // ===== CURSOR EFFECT (OPTIONAL) =====
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, background 0.2s;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        
        const follower = document.createElement('div');
        follower.id = 'cursor-follower';
        follower.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--primary-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s;
        `;
        document.body.appendChild(follower);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Add hover effects for cursor
        document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.borderColor = 'var(--accent-gold)';
                follower.style.background = 'var(--accent-gold)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.borderColor = 'var(--primary-blue)';
                follower.style.background = 'var(--primary-blue)';
            });
        });
    }
});