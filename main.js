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

});
// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});