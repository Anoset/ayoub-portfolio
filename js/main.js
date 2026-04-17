/* ============================================
   AYOUB SETERRAHMANE — Main JS
   Navigation · Scroll · Animations · A11y
   ============================================ */

(function () {
  'use strict';

  // ==================== Navigation mobile ====================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const nav = document.getElementById('nav');

  if (navToggle && navMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
      navMenu.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    navToggle.addEventListener('click', () => toggleMenu());

    // Fermeture au clic sur un lien
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Fermeture au clic hors menu (desktop → resize)
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

    // Fermeture à la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    // Reset au resize (évite état bloqué mobile→desktop)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 860) {
          toggleMenu(false);
        }
      }, 150);
    });
  }

  // ==================== Nav sticky avec shadow au scroll ====================
  if (nav) {
    const updateNavState = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
  }

  // ==================== Smooth scroll pour ancres internes ====================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 0;
        const offset = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
        window.scrollTo({ top: offset, behavior: 'smooth' });
        // Focus accessibilité
        target.setAttribute('tabindex', '-1');
        setTimeout(() => target.focus({ preventScroll: true }), 500);
      }
    });
  });

  // ==================== Scroll Reveal (IntersectionObserver) ====================
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback : affichage immédiat
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // ==================== Année dynamique dans le footer ====================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==================== Marqueur section active dans la nav ====================
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .nav-menu a[href*="index.html#"]');

  if (sections.length > 0 && navLinks.length > 0 && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const href = link.getAttribute('href') || '';
              const matches = href === `#${id}` || href.endsWith(`#${id}`);
              if (matches) {
                link.setAttribute('aria-current', 'location');
              } else if (link.getAttribute('aria-current') === 'location') {
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      },
      { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ==================== Amélioration focus visible au clavier uniquement ====================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
})();
