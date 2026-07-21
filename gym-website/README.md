# IRONCLAD Fitness Studio — Gym Business Website

A premium, responsive, single-page business website for a local gym, built with
plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step.

This is a **marketing website**, not a gym management system, admin dashboard,
or booking application. Its only job is to give a local gym a professional
online presence: tell people what the gym offers, show them the space and
coaches, let them compare membership plans, and get them to call, message, or
walk in.

## Folder Structure

```
gym-website/
│
├── index.html          All page sections (single page, anchor navigation)
├── css/
│   └── style.css        Design tokens, layout, components, responsive rules
├── js/
│   └── script.js         Nav, scroll reveal, counters, BMI calc, FAQ, lightbox, forms
├── assets/
│   ├── images/           Put real gym photography here (see "Replacing images")
│   ├── icons/
│   │   └── favicon.svg    Brand favicon (edit or replace)
│   └── videos/           Optional: hero/background video if you add one
└── README.md
```

## Getting Started

No build tools, package manager, or server required.

1. Download/clone the `gym-website` folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the
   most accurate results (recommended, since some browsers restrict local
   file access for things like `fetch`):
   ```bash
   cd gym-website
   python3 -m http.server 8080
   # then visit http://localhost:8080
   ```
3. Edit content directly in `index.html` — every section is clearly commented.

## Replacing the Placeholder Content

This template ships with **placeholder photography** from picsum.photos so
every section renders correctly out of the box. Before going live:

- Replace every `https://picsum.photos/...` URL in `index.html` with real,
  licensed photos of the actual gym, trainers, and equipment. Save them into
  `assets/images/` and update the `src` attributes (e.g.
  `assets/images/hero.jpg`).
- Replace `assets/images/og-cover.jpg` reference with a real 1200×630 social
  preview image for Open Graph/Twitter cards.
- Update all placeholder business details: gym name/brand ("IRONCLAD"),
  phone number, email, address, working hours, and the `ld+json` structured
  data block at the top of `index.html`.
- Replace the Google Maps `iframe` `src` in the Contact section with your
  actual location — get an embed URL from Google Maps → Share → Embed a map.
- Update the "View More Reviews on Google" link in the Reviews section to
  your real Google Business Profile URL.
- Replace `wa.me/15550102030` (WhatsApp float button) and `tel:` links with
  the gym's real WhatsApp-enabled number.
- Swap in real trainer names, bios, and specializations.
- Wire the contact form (`#contactForm` in `script.js`) up to a real backend,
  form service (Formspree, Netlify Forms, etc.), or email API — currently it
  only confirms submission locally in the browser as a placeholder.

## Features Implemented

- Fully responsive, mobile-first layout (single-column → multi-column grids)
- Dark theme with red accent, glassmorphism cards, subtle scroll-triggered
  reveal animations
- Sticky navbar with scroll-aware background + active-section highlighting
  (scrollspy)
- Mobile hamburger navigation with slide-in panel
- Smooth scrolling to in-page anchors
- Animated statistic counters (Intersection Observer, no libraries)
- Services, Membership, Trainers, Gallery, Reviews, FAQ, Contact sections
- Working front-end BMI calculator (metric & imperial units)
- FAQ accordion (single-open, accessible with `aria-expanded`)
- Gallery grid with hover states and a custom lightbox (keyboard + click to
  close, `Esc` supported)
- Floating WhatsApp button, floating Call button (auto-shown on mobile), and
  a Back-to-Top button
- Privacy Policy shown in an accessible modal dialog, linked from the footer
- SEO: descriptive `<title>`, meta description/keywords, canonical tag, Open
  Graph + Twitter card tags, and `ExerciseGym` structured data (JSON-LD)
- Accessibility: skip-to-content link, semantic landmarks (`header`, `main`,
  `footer`, `nav`), visible focus states, `aria-label`/`aria-expanded` on
  interactive controls, `prefers-reduced-motion` respected
- Performance: lazy-loaded below-the-fold images, `fetchpriority="high"` on
  the hero image, no external JS frameworks, system + Google fonts only

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses standard CSS
Grid, `backdrop-filter`, and `IntersectionObserver` — all broadly supported.
`backdrop-filter` gracefully degrades to a solid-ish translucent background on
very old browsers without blur.

## Customization Notes

- All colors, fonts, radii, and spacing live as CSS custom properties at the
  top of `css/style.css` (`:root { ... }`) — change the palette or type scale
  in one place.
- The diagonal red "STRENGTH • DISCIPLINE • RESULTS" marquee band is a pure
  CSS/JS component (`.stripe-band`) — edit the words directly in `index.html`
  or restyle the stripe angle/colors in `style.css`.
- Pricing, service, and trainer cards are simple repeated markup blocks —
  duplicate or remove `<article>`/`<div>` blocks to add or remove entries.

## License / Usage

This template was generated for a specific gym business use case. Replace all
placeholder content, imagery, and business details before publishing.
