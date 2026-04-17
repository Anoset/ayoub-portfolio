/* ============================================
   AYOUB SETERRAHMANE — Cookie Consent (RGPD)
   Conforme CNIL : 13 mois max, accepter/refuser
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'cookie_consent';
  const CONSENT_DURATION_MS = 13 * 30 * 24 * 60 * 60 * 1000; // 13 mois

  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  // Récupère le consentement stocké
  const getConsent = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Vérifie l'expiration
      if (!data.expires || Date.now() > data.expires) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  };

  // Sauvegarde le consentement
  const saveConsent = (status) => {
    const data = {
      status: status, // 'accepted' | 'rejected'
      timestamp: Date.now(),
      expires: Date.now() + CONSENT_DURATION_MS,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Impossible de sauvegarder le consentement cookie.');
    }
    applyConsent(status);
  };

  // Applique le consentement (charge ou non les scripts tiers)
  const applyConsent = (status) => {
    if (status === 'accepted') {
      loadAnalytics();
    }
    // Si refus : aucun script tiers chargé
  };

  // Charge Google Analytics (GA4) si consentement
  const loadAnalytics = () => {
    // ⚠️ Remplacer G-XXXXXXXXXX par votre ID GA4 réel
    const GA_ID = 'G-XXXXXXXXXX';

    // N'active pas si ID placeholder
    if (GA_ID === 'G-XXXXXXXXXX') return;

    // Évite double chargement
    if (window.gtag) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  };

  // Affiche/masque la bannière
  const showBanner = () => {
    requestAnimationFrame(() => banner.classList.add('show'));
  };
  const hideBanner = () => {
    banner.classList.remove('show');
  };

  // Handlers boutons
  banner.querySelectorAll('[data-cookie]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-cookie');
      saveConsent(action === 'accept' ? 'accepted' : 'rejected');
      hideBanner();
    });
  });

  // Lien "Paramétrer les cookies" dans le footer/pages légales
  const openTriggers = document.querySelectorAll('#openCookies');
  openTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem(STORAGE_KEY);
      showBanner();
    });
  });

  // Init : affiche la bannière si pas de consentement valide
  const existing = getConsent();
  if (!existing) {
    // Petit délai pour ne pas être intrusif au chargement
    setTimeout(showBanner, 700);
  } else {
    applyConsent(existing.status);
  }
})();
