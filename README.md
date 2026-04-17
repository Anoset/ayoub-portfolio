# Ayoub Seterrahmane — Portfolio Freelance

Site vitrine personnel · Dark premium theme · HTML/CSS/JS vanilla

## Structure

```
ayoub-portfolio/
├── index.html                      Accueil (hero, process, portfolio, tarifs, pourquoi, CTA)
├── contact.html                    Contact (brief en ligne + coordonnées directes)
├── mentions-legales.html           Obligations légales auto-entrepreneur
├── politique-confidentialite.html  RGPD complet
├── css/style.css                   Design system complet
├── js/
│   ├── main.js                     Nav mobile, scroll, reveal, a11y
│   └── cookies.js                  Bandeau RGPD (13 mois CNIL)
├── assets/images/
│   ├── favicon.svg                 Favicon logo "A"
│   ├── og-image.svg                OG image source (1200x630)
│   └── og-image.png                OG image PNG (réseaux sociaux)
├── robots.txt
├── sitemap.xml
├── manifest.json                   PWA-ready
└── .htaccess                       Cache, compression, sécurité, HTTPS
```

## Test local

```bash
cd /srv/partage/freelance/ayoub-portfolio
python3 -m http.server 8080
# → http://localhost:8080
```

Ou ouvre directement `index.html` dans le navigateur.

## Déploiement

Le site est 100% statique. Compatible avec :
- **Cloudflare Pages** (recommandé — gratuit, rapide, SSL auto)
- **Netlify** / **Vercel**
- **OVH** / hébergement mutualisé classique (Apache : .htaccess déjà configuré)
- **GitHub Pages**

---

## ✅ À FAIRE MANUELLEMENT AVANT MISE EN LIGNE

### Obligatoire

1. **Auto-entrepreneur** — Immatriculation sur autoentrepreneur.urssaf.fr, puis :
   - Ajouter le **SIRET** dans `mentions-legales.html` (section 1, ligne `SIRET : [À compléter...]`)

2. **Hébergeur** — Remplir dans `mentions-legales.html` (section 3) :
   - Nom de l'hébergeur
   - Adresse
   - Site web

3. **Nom de domaine** — J'ai utilisé `ayoub-seterrahmane.fr` comme placeholder dans :
   - Toutes les URLs canoniques / OG
   - `sitemap.xml`
   - `robots.txt`
   - JSON-LD schema.org

   Si tu choisis un autre domaine, fais un **Search & Replace** de `ayoub-seterrahmane.fr` dans tous les fichiers `.html` + `sitemap.xml` + `robots.txt`.

4. **SSL/HTTPS** — Active le certificat chez ton hébergeur (auto sur Cloudflare Pages / Netlify / Vercel)

5. **Google Analytics (optionnel)** — Dans `js/cookies.js`, remplace `G-XXXXXXXXXX` par ton ID GA4 réel. Si tu laisses le placeholder, aucun script ne sera chargé (comportement voulu).

### Recommandé

6. **Favicon PNG** — Le favicon SVG est déjà généré. Si tu veux des formats legacy (pour vieux navigateurs), convertis `assets/images/favicon.svg` en :
   - `favicon-32.png` (32×32)
   - `icon-192.png` (192×192, PWA)
   - `icon-512.png` (512×512, PWA)

7. **Google Search Console** — Ajoute le site, soumets `sitemap.xml`
8. **Google My Business** — Si tu veux apparaître en local (optionnel pour un freelance)
9. **Test Lighthouse** — Chrome DevTools → Lighthouse → vise > 90 partout (performance, SEO, a11y, best practices)

---

## Contenu utilisé

- **Nom** : Ayoub Seterrahmane
- **Email** : ayoub.seterrahmane@gmail.com
- **Téléphone** : 07 68 85 49 30
- **Formulaire client** : https://formulaireprestation.pages.dev/
- **Réalisations** : Presta Sweet (prestasweet.fr) + Le Petit Bistrot (démo)
- **Tarifs** : 600€ / 1 200€ / 2 500€ / 3 000€ (Vitrine Soigné mis en avant)

## Palette

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--bg` | `#0b0b0f` | Fond page |
| `--surface` | `#13131a` | Zones sombres secondaires |
| `--card` | `#1c1c28` | Cards |
| `--border` | `#2a2a3d` | Bordures fines |
| `--accent` | `#6366f1` | Indigo principal |
| `--accent-light` | `#818cf8` | Hover, glows |

## Stack technique

- HTML5 sémantique
- CSS vanilla (variables + clamp fluid typography)
- JavaScript vanilla (IntersectionObserver, pas de framework)
- Google Fonts : Inter + JetBrains Mono
- Mobile-first 375px → 1920px
- Score Lighthouse cible : > 90 (performance, SEO, a11y, best practices)

## Accessibilité

- Skip link (`<a class="skip-link">`)
- Navigation clavier complète (Tab, Escape)
- Focus visible personnalisé
- ARIA labels sur nav, boutons, dialog cookies
- Contrastes AA (texte sur fond sombre)
- `prefers-reduced-motion` respecté
- Heading hierarchy propre (un `h1` par page)

## SEO

- Meta title + description uniques par page
- Open Graph + Twitter Card
- JSON-LD : Person + ProfessionalService + Offer + ContactPage
- Sitemap XML
- robots.txt
- Canonical URLs
- OG image 1200×630 PNG + SVG source éditable

## RGPD

- Bandeau cookies conforme CNIL (accepter / refuser équivalents, 13 mois de conservation)
- Politique de confidentialité complète (droits, durées, contact CNIL)
- Aucun tracker chargé sans consentement
- Analytics anonymisé si accepté

---

**Version** : 1.0 · **Généré** : 17 avril 2026
