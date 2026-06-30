// Dropdown toggle
const dropdown = document.querySelector('.nav-dropdown');
const toggle = document.querySelector('.nav-dropdown__toggle');

if (toggle) {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.classList.contains('nav-dropdown__toggle')) return;
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (dropdown) dropdown.classList.remove('active');
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lightbox
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.querySelector('.lightbox__img');
var lightboxClose = document.querySelector('.lightbox__close');
var lightboxOverlay = document.querySelector('.lightbox__overlay');

document.querySelectorAll('.photo img').forEach(function(img) {
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Scroll animations for cards
var observerOptions = {
    threshold: 0.05,
    rootMargin: '50px 0px 50px 0px'
};

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(function(card) {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});

document.querySelectorAll('.section-header').forEach(function(header) {
    header.classList.add('animate-on-scroll');
    observer.observe(header);
});

// If page loads already scrolled (fast jump) — show everything immediately
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100) {
                el.classList.add('animated');
            }
        });
    }, 100);
});
