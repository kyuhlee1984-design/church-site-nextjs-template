// ========================================
// MODERN CHURCH WEBSITE - JAVASCRIPT
// ========================================

// === GLOBAL STATE ===
let currentLanguage = 'en';
let pages = {};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Cache page elements
  cachePageElements();
  
  // Setup event listeners
  setupNavigation();
  setupLanguageToggle();
  setupMobileMenu();
  setupScrollAnimations();
  setupSermonSearch();
  
  // Handle initial page load
  handleInitialRoute();
}

// === PAGE CACHING ===
function cachePageElements() {
  const pageElements = document.querySelectorAll('.page');
  pageElements.forEach(page => {
    pages[page.id] = page;
  });
}

// === NAVIGATION ===
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetPage = this.getAttribute('href').substring(1);
      navigateToPage(targetPage);
    });
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('hashchange', handleHashChange);
}

function navigateToPage(pageId) {
  // Hide all pages
  Object.values(pages).forEach(page => {
    page.classList.remove('active');
  });
  
  // Show target page
  if (pages[pageId]) {
    pages[pageId].classList.add('active');
    
    // Update active nav link
    updateActiveNavLink(pageId);
    
    // Update URL hash
    window.location.hash = pageId;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Trigger scroll animations for newly visible page
    triggerScrollAnimations();
    
    // Close mobile menu if open
    closeMobileMenu();
  }
}

function updateActiveNavLink(pageId) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').substring(1);
    if (linkPage === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function handleHashChange() {
  const hash = window.location.hash.substring(1);
  if (hash && pages[hash]) {
    navigateToPage(hash);
  }
}

function handleInitialRoute() {
  const hash = window.location.hash.substring(1);
  if (hash && pages[hash]) {
    navigateToPage(hash);
  } else {
    navigateToPage('home');
  }
}

// === LANGUAGE TOGGLE ===
function setupLanguageToggle() {
  const langButtons = document.querySelectorAll('.lang-btn');
  
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      const newLang = this.getAttribute('data-lang');
      if (newLang !== currentLanguage) {
        switchLanguage(newLang);
      }
    });
  });
}

function switchLanguage(lang) {
  currentLanguage = lang;
  
  // Update button states
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(button => {
    if (button.getAttribute('data-lang') === lang) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Update all translatable elements
  const translatableElements = document.querySelectorAll('[data-en], [data-ko]');
  translatableElements.forEach(element => {
    const translation = element.getAttribute(`data-${lang}`);
    if (translation) {
      element.textContent = translation;
    }
  });
  
  // Update placeholder texts
  const placeholderElements = document.querySelectorAll('[data-en-placeholder], [data-ko-placeholder]');
  placeholderElements.forEach(element => {
    const placeholder = element.getAttribute(`data-${lang}-placeholder`);
    if (placeholder) {
      element.placeholder = placeholder;
    }
  });
  
  // Store language preference
  localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference
function loadLanguagePreference() {
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang && savedLang !== currentLanguage) {
    switchLanguage(savedLang);
  }
}

// === MOBILE MENU ===
function setupMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
}

function closeMobileMenu() {
  const mainNav = document.getElementById('mainNav');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  
  if (mainNav && mainNav.classList.contains('active')) {
    mainNav.classList.remove('active');
    mobileToggle.classList.remove('active');
  }
}

// === SCROLL ANIMATIONS ===
function setupScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(handleIntersection, observerOptions);
  
  const animatedElements = document.querySelectorAll('.scroll-fade');
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve after animation
      // observer.unobserve(entry.target);
    }
  });
}

function triggerScrollAnimations() {
  // Manually trigger scroll animations for elements in view
  const animatedElements = document.querySelectorAll('.scroll-fade');
  animatedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    if (isVisible) {
      element.classList.add('visible');
    }
  });
}

// === SERMON SEARCH ===
function setupSermonSearch() {
  const searchInput = document.getElementById('sermonSearch');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      filterSermons(searchTerm);
    });
  }
}

function filterSermons(searchTerm) {
  const sermonCards = document.querySelectorAll('.sermon-card');
  
  sermonCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const description = card.querySelector('.card-description').textContent.toLowerCase();
    const meta = card.querySelector('.card-meta').textContent.toLowerCase();
    
    const isMatch = title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    meta.includes(searchTerm);
    
    if (isMatch) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// === LAZY LOADING ===
// Modern browsers handle this automatically with loading="lazy" attribute
// This is a fallback for older browsers
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
  // No additional code needed
} else {
  // Fallback for older browsers
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// === YOUTUBE LIVE EMBED ===
function embedYouTubeLive(videoId) {
  const container = document.getElementById('liveStreamContainer');
  
  if (container && videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    // Clear container and add iframe
    container.innerHTML = '';
    container.appendChild(iframe);
  }
}

// Example usage (uncomment and replace with actual video ID when streaming):
// embedYouTubeLive('YOUR_VIDEO_ID_HERE');

// === SMOOTH SCROLL ===
// Enhance smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Only apply to in-page anchors, not navigation
    if (href.length > 1 && !this.classList.contains('nav-link')) {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// === UTILITY FUNCTIONS ===

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Debounce function for performance
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

// === PERFORMANCE OPTIMIZATIONS ===

// Optimize scroll event listeners
let ticking = false;
window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      // Add any scroll-based functionality here
      ticking = false;
    });
    ticking = true;
  }
});

// === ACCESSIBILITY ENHANCEMENTS ===

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
});

// Focus management for mobile menu
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  mainNav.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      const focusableElements = this.querySelectorAll('a, button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      // Trap focus within menu when open
      if (this.classList.contains('active')) {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

// === LOAD PREFERENCES ===
loadLanguagePreference();

// === DEVELOPMENT HELPERS ===
// Console message for developers
console.log('%c✝️ Grace Community Church Website', 'font-size: 16px; font-weight: bold; color: #c17a5f;');
console.log('%cBuilt with love and faith', 'font-size: 12px; color: #8a8177;');
