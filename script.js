// Scroll progress indicator
const scrollProgress = document.querySelector('.scroll-progress-bar');
const scrollProgressContainer = document.querySelector('.scroll-progress');

if (scrollProgress && scrollProgressContainer) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
        scrollProgressContainer.setAttribute('aria-valuenow', Math.round(scrolled));
    });
}

// Hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('.menu-overlay');

function toggleMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    // Close any open dropdowns
    document.querySelectorAll('.has-dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
}

// Close menu when clicking on a link (not dropdown toggle)
const navLinks = document.querySelectorAll('.nav-menu > li:not(.has-dropdown) > a');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu on dropdown link click
const dropdownLinks = document.querySelectorAll('.dropdown a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Dropdown toggle in hamburger menu
const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = toggle.parentElement;
        parent.classList.toggle('active');
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 60; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Enhanced dropdown functionality
const dropdowns = document.querySelectorAll('.has-dropdown');

dropdowns.forEach(dropdown => {
    let timeout;
    
    dropdown.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        dropdown.classList.add('active');
    });
    
    dropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            dropdown.classList.remove('active');
        }, 200);
    });
    
    // Keyboard navigation
    const links = dropdown.querySelectorAll('a');
    if (links.length > 0) {
        links[0].addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Pause marquee on hover
const showcaseTrack = document.querySelector('.showcase-track');
if (showcaseTrack) {
    showcaseTrack.addEventListener('mouseenter', () => {
        showcaseTrack.style.animationPlayState = 'paused';
    });
    showcaseTrack.addEventListener('mouseleave', () => {
        showcaseTrack.style.animationPlayState = 'running';
    });
}

// Lazy loading for images (performance optimization)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// Add smooth reveal animations for elements
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Animate service items, value items, and FAQ items
document.querySelectorAll('.service-visual-item, .value-item, .faq-item, .case-item').forEach(el => {
    el.classList.add('animate-ready');
    animateOnScroll.observe(el);
});

// Interactive hover sound effect (optional - disabled by default)
// Uncomment to enable subtle click sounds on buttons
/*
const buttons = document.querySelectorAll('button, .hero-link, .contact-button');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        // Add subtle haptic feedback
    });
});
*/

// Number counter animation for stats (if any)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Showreel Video Play/Pause Control
const showreelVideo = document.querySelector('.showreel-video');
const playPauseBtn = document.querySelector('.showreel-play-btn');

if (showreelVideo && playPauseBtn) {
    // Toggle play/pause on button click
    playPauseBtn.addEventListener('click', () => {
        if (showreelVideo.paused) {
            showreelVideo.play();
            playPauseBtn.classList.remove('paused');
        } else {
            showreelVideo.pause();
            playPauseBtn.classList.add('paused');
        }
    });

    // Update button state when video ends or pauses
    showreelVideo.addEventListener('pause', () => {
        playPauseBtn.classList.add('paused');
    });

    showreelVideo.addEventListener('play', () => {
        playPauseBtn.classList.remove('paused');
    });

    // Click on video to toggle play/pause
    showreelVideo.addEventListener('click', () => {
        playPauseBtn.click();
    });
}

