/* ==========================================================================
   MARKETPLACE NAVIGATION & SEARCH CONTROLLER
   ========================================================================== */

import { showToast } from './modals.js';

export function initNavigation() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  // Search Form Action
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        showToast(`Searching Bsmart factory catalog for: "${query}"...`);
        // Smooth scroll to promo tiles section
        const promoSection = document.getElementById('promo-grid-section');
        if (promoSection) promoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Scroll To Top Rail Button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active Link Observer
  const navLinks = document.querySelectorAll('.strip-link');
  const sections = document.querySelectorAll('section[id]');
  
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
  }
}
