// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Scroll Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .stat-card').forEach((el) => {
    observer.observe(el);
  });

  // Product Carousel
  let currentSlide = 0;
  const slides = document.querySelectorAll('.product-card');
  const totalSlides = slides.length;

  function moveSlide(direction) {
    // Only enable carousel functionality in mobile view
    if (window.innerWidth <= 768) {
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      const offset = -currentSlide * 100;
      document.querySelector('.products-grid').style.transform = `translateX(${offset}%)`;
    }
  }

  // Enable carousel view only in responsive (mobile) view
  function checkScreenSize() {
const carousel = document.querySelector('.products-carousel');
const carouselButtons = document.querySelectorAll('.carousel-btn');

if (window.innerWidth <= 768) {
  carousel.classList.add('carousel-active');
  carouselButtons.forEach(button => button.style.display = 'block');
} else {
  carousel.classList.remove('carousel-active');
  carouselButtons.forEach(button => button.style.display = 'none');
  document.querySelector('.products-grid').style.transform = 'translateX(0)';
  currentSlide = 0;
}
}

// Initialize carousel on page load and window resize
  window.addEventListener('load', checkScreenSize);
  window.addEventListener('resize', checkScreenSize);