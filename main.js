document.addEventListener('DOMContentLoaded', () => {

    // ===== CAROUSEL =====
    let currentSlide = 0;
    const totalSlides = 10;

    function updateCarousel() {
        const track = document.getElementById('carouselTrack');
        const slides = track.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');

        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
            if (i === currentSlide) slide.classList.add('active');
            else if (i === currentSlide - 1) slide.classList.add('prev');
            else if (i === currentSlide + 1) slide.classList.add('next');
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        const slideWidth = 300;
        const offset = currentSlide * slideWidth - (window.innerWidth / 2) + (slideWidth / 2);
        track.style.transform = `translateX(${-offset}px)`;
    }

    window.nextSlide = () => {
        currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
        updateCarousel();
    }

    window.prevSlide = () => {
        currentSlide = Math.max(currentSlide - 1, 0);
        updateCarousel();
    }

    window.goToSlide = (index) => {
        currentSlide = index;
        updateCarousel();
    }

    function initCarousel() {
        const dotsContainer = document.getElementById('carouselDots');
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        }
        updateCarousel();
    }

    initCarousel();

    // ===== SCROLL ANIMATIONS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.slide-left, .slide-right, .slide-up, .pourquoi-card').forEach(el => {
        observer.observe(el);
    });

    // ===== HAMBURGER =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ===== CARD FLIP =====
    document.querySelectorAll('.card-flip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.card');
            card.classList.toggle('flipped');
        });
    });

    // ===== LIGHTBOX =====
    const lightboxImages = [
        'galerie1.jpg',
        'galerie2.jpg',
        'galerie3.jpg',
        'galerie4.jpg',
        'galerie5.jpg',
        'galerie6.jpg',
        'galerie7.jpg',
        'galerie8.jpg',
        'galerie9.jpg',
        'galerie10.jpg'
    ];

    let lightboxIndex = 0;

    window.openLightbox = (index) => {
        lightboxIndex = index;
        document.getElementById('lightbox-img').src = lightboxImages[index];
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeLightbox = () => {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    }

    window.lightboxNext = () => {
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        document.getElementById('lightbox-img').src = lightboxImages[lightboxIndex];
    }

    window.lightboxPrev = () => {
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        document.getElementById('lightbox-img').src = lightboxImages[lightboxIndex];
    }

    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('lightbox').classList.contains('active')) return;
        if (e.key === 'ArrowRight') lightboxNext();
        if (e.key === 'ArrowLeft') lightboxPrev();
        if (e.key === 'Escape') closeLightbox();
    });

});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});