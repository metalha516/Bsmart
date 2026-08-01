/* ==========================================================================
   MODAL DIALOGS, QR SCAN & TOAST CONTROLLER (LIGHT THEME)
   ========================================================================== */

export function initModals() {
  const quoteModal = document.getElementById('quote-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
  const quoteTriggers = document.querySelectorAll('[data-open-quote]');
  const quoteForm = document.getElementById('modal-quote-form');
  const heroForm = document.getElementById('hero-quick-form');
  const contactForm = document.getElementById('main-contact-form');
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  const tabPanes = document.querySelectorAll('.modal-tab-pane');

  // Modal Tab Switcher (QR Scan vs RFP Form)
  modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalTabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const targetPane = document.getElementById(btn.dataset.targetTab);
      if (targetPane) targetPane.style.display = 'block';
    });
  });

  // Open Quote Modal
  function openQuoteModal(serviceName = '', estimatedSystem = '', monthlySavings = '') {
    if (!quoteModal) return;

    const serviceSelect = quoteModal.querySelector('#modal-service');
    const projectNotes = quoteModal.querySelector('#modal-notes');

    if (serviceSelect && serviceName) {
      serviceSelect.value = serviceName;
    }

    if (projectNotes && (estimatedSystem || monthlySavings)) {
      projectNotes.value = `Calculated Estimate: ${estimatedSystem} Solar System capacity (${monthlySavings} savings/month).`;
    }

    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  quoteTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.dataset.service || '';
      const system = btn.dataset.system || '';
      const savings = btn.dataset.savings || '';
      openQuoteModal(service, system, savings);
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Form Submissions
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = heroForm.querySelector('input[type="text"]')?.value || 'Partner';
      showToast(`Factory inquiry submitted for ${name}! China sourcing team assigned.`);
      heroForm.reset();
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Quote RFP received! Bsmart specialist will dispatch direct pricing within 2 hours.');
      quoteForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Formal inquiry submitted! A confirmation copy has been sent to your email.');
      contactForm.reset();
    });
  }
}

// Toast System (Light Theme)
export function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-light';
  toast.innerHTML = `
    <div class="toast-icon-orange">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}
