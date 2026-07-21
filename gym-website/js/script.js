/* ==========================================================================
   IRONCLAD FITNESS STUDIO — SCRIPT
   Vanilla JS. No dependencies. Organized by feature.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky Navbar on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Active Nav Link on Scroll (Scrollspy) ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => spyObserver.observe(section));

  /* ---------- Scroll Reveal Animations ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* ---------- Back To Top Button ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.hidden = window.scrollY < 500;
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all others (single-open accordion)
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------- Gallery Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.full;
      lightboxImg.alt = item.querySelector('img').alt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  /* ---------- BMI Calculator ---------- */
  const bmiForm = document.getElementById('bmiForm');
  const bmiUnit = document.getElementById('bmiUnit');
  const bmiHeightLabel = document.getElementById('bmiHeightLabel');
  const bmiWeightLabel = document.getElementById('bmiWeightLabel');
  const bmiHeightInput = document.getElementById('bmiHeight');
  const bmiWeightInput = document.getElementById('bmiWeight');
  const bmiResult = document.getElementById('bmiResult');
  const bmiScore = document.getElementById('bmiScore');
  const bmiCategory = document.getElementById('bmiCategory');

  bmiUnit.addEventListener('change', () => {
    const isMetric = bmiUnit.value === 'metric';
    bmiHeightLabel.textContent = isMetric ? 'Height (cm)' : 'Height (in)';
    bmiWeightLabel.textContent = isMetric ? 'Weight (kg)' : 'Weight (lb)';
    bmiHeightInput.placeholder = isMetric ? 'e.g. 175' : 'e.g. 69';
    bmiWeightInput.placeholder = isMetric ? 'e.g. 72' : 'e.g. 158';
  });

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: '#ffb020' };
    if (bmi < 25) return { label: 'Healthy Weight', color: '#3ddc84' };
    if (bmi < 30) return { label: 'Overweight', color: '#ff8a3d' };
    return { label: 'Obese', color: '#ff3a4a' };
  };

  bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const height = parseFloat(bmiHeightInput.value);
    const weight = parseFloat(bmiWeightInput.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
      bmiResult.hidden = false;
      bmiScore.textContent = '--';
      bmiCategory.textContent = 'Please enter valid height and weight.';
      bmiCategory.style.color = '#ff3a4a';
      return;
    }

    let bmi;
    if (bmiUnit.value === 'metric') {
      const heightM = height / 100;
      bmi = weight / (heightM * heightM);
    } else {
      bmi = (703 * weight) / (height * height);
    }

    const category = getBmiCategory(bmi);
    bmiScore.textContent = bmi.toFixed(1);
    bmiCategory.textContent = category.label;
    bmiCategory.style.color = category.color;
    bmiResult.hidden = false;
  });

  /* ---------- Contact Form (front-end only demo submit) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // NOTE: Wire this up to your backend, form service (e.g. Formspree),
    // or email API. This demo just confirms the message locally.
    formNote.textContent = 'Thanks — your message has been received. We\'ll be in touch shortly.';
    formNote.style.color = '#3ddc84';
    contactForm.reset();
  });

  /* ---------- Privacy Policy Modal ---------- */
  const privacyLink = document.getElementById('privacyLink');
  const privacyModal = document.getElementById('privacyModal');
  const privacyClose = document.getElementById('privacyClose');

  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    privacyModal.hidden = false;
    document.body.style.overflow = 'hidden';
  });

  const closePrivacy = () => {
    privacyModal.hidden = true;
    document.body.style.overflow = '';
  };
  privacyClose.addEventListener('click', closePrivacy);
  privacyModal.addEventListener('click', (e) => {
    if (e.target === privacyModal) closePrivacy();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !privacyModal.hidden) closePrivacy();
  });

  /* ---------- Footer Year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
