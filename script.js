// ============================================
// PORTFOLIO JAVASCRIPT
// ============================================

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();


// DARK MODE TOGGLE

function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  
  if (isDark) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

// Initialize theme from localStorage 
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Initialize theme on page load
initializeTheme();

// MOBILE MENU TOGGLE

function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  
  mobileMenu.classList.toggle('active');
  
  if (mobileMenu.classList.contains('active')) {
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  } else {
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  }
}

// Close mobile menu when a link is clicked
function scrollToSection(sectionId) {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.remove('active');
  
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  menuIcon.style.display = 'block';
  closeIcon.style.display = 'none';
  
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}


// SCROLL TO TOP


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// SMOOTH SCROLL FOR ANCHOR LINKS

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// INTERSECTION OBSERVER FOR ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe project cards and experience items
document.querySelectorAll('.project-card, .experience-item').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// HEADER SCROLL EFFECT

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add subtle background effect when scrolled
  if (scrollTop > 40) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// KEYBOARD NAVIGATION

document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape key
  if (e.key === 'Escape') {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('active')) {
      toggleMenu();
    }
  }
});

// UTILITY FUNCTIONS

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ACCESSIBILITY ENHANCEMENTS

// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// PERFORMANCE OPTIMIZATIONS

// Lazy load images if supported
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// INITIALIZATION

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Any additional initialization code here
  console.log('Portfolio loaded successfully');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden
  } else {
    // Page is visible
  }
});
