document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Elements
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-active');
  });

  // Close Menu on Link Click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-active');
        console.log('Mobile menu closed via link click');
      }
    });
  });

  // Enhanced Smooth Scroll with Menu Close
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      // Close menu if mobile
      if (window.innerWidth <= 992) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-active');
      }

      // Scroll after menu animation completes
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    });
  });

  // Close Menu on Resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      navLinks.classList.remove('active');
      body.classList.remove('menu-active');
      console.log('Menu closed via resize');
    }
  });

  // Close Menu When Clicking Outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      body.classList.remove('menu-active');
      console.log('Menu closed via outside click');
    }
  });

  // Product Carousel Functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll('.product-card');
  const totalSlides = slides.length;
  const productsGrid = document.querySelector('.products-grid');
  const prevButton = document.querySelector('.carousel-btn.prev');
  const nextButton = document.querySelector('.carousel-btn.next');

  function moveSlide(direction) {
    if (window.innerWidth <= 768) {
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      const offset = -currentSlide * 100;
      productsGrid.style.transform = `translateX(${offset}%)`;
      console.log(`Current slide: ${currentSlide + 1}/${totalSlides}`);
    }
  }

  // Add event listeners to buttons
  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => moveSlide(-1));
    nextButton.addEventListener('click', () => moveSlide(1));
  }

  // Carousel Responsive Check
  function checkScreenSize() {
    const carousel = document.querySelector('.products-carousel');
    if (window.innerWidth <= 768) {
      carousel.classList.add('carousel-active');
      productsGrid.style.transform = `translateX(-${currentSlide * 100}%)`;
    } else {
      carousel.classList.remove('carousel-active');
      productsGrid.style.transform = 'translateX(0)';
      currentSlide = 0;
    }
  }

  // Initialize Carousel
  window.addEventListener('load', checkScreenSize);
  window.addEventListener('resize', checkScreenSize);

  // Intersection Observer for Animations
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
});
