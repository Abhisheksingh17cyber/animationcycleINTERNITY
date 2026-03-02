/* ============================
   INTERNITY — Main JS
   GSAP Pin + Scrubbed Timeline
   ============================ */

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

/* ============================
   LOADER
   ============================ */
function initLoader() {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  const percent = document.getElementById('loaderPercent');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      percent.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        initAll();
      }, 500);
      return;
    }
    fill.style.width = progress + '%';
    percent.textContent = Math.round(progress) + '%';
  }, 120);
}

/* ============================
   LENIS SMOOTH SCROLL
   ============================ */
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/* ============================
   SHOWCASE — THE CORE ANIMATION
   Uses GSAP ScrollTrigger pin + scrubbed timeline.
   The #showcase section (100vh) is pinned for 500vh of scroll.
   A GSAP timeline animates every transition:
      slide opacity, wheel position/scale, bg color, sidebar, ring.
   ============================ */
function initShowcase() {
  const showcase = document.getElementById('showcase');
  const bgLight = document.getElementById('bgLight');
  const wheel = document.getElementById('wheel');
  const ring = document.getElementById('ring');
  const scrollCue = document.getElementById('scrollCue');
  const nav = document.getElementById('mainNav');

  const slides = [
    document.getElementById('slide0'),
    document.getElementById('slide1'),
    document.getElementById('slide2'),
    document.getElementById('slide3'),
    document.getElementById('slide4'),
  ];

  const sidebarItems = showcase.querySelectorAll('.sidebar__item');
  const lineFill = showcase.querySelector('.sidebar__line-fill');

  // ---- Build the master timeline ----
  // Total: 5 slides. Each "transition" occupies an equal portion.
  // Between slides: crossfade text, shift wheel, change bg.

  const tl = gsap.timeline();

  // ===== SLIDE 0 → SLIDE 1 =====
  // Fade out welcome text
  tl.to(slides[0], { opacity: 0, duration: 0.3, ease: 'none' }, 0);
  // Fade out scroll cue
  tl.to(scrollCue, { opacity: 0, duration: 0.15, ease: 'none' }, 0);
  // Transition bg from dark to light
  tl.to(bgLight, { opacity: 1, duration: 0.4, ease: 'power2.inOut' }, 0);
  // Move wheel to the left, make it bigger
  tl.to(wheel, {
    left: '30%', top: '50%', scale: 1.2, opacity: 1,
    duration: 0.4, ease: 'power2.inOut',
  }, 0);
  // Show ring
  tl.to(ring, { opacity: 1, duration: 0.3, ease: 'none' }, 0.1);
  // Fade in slide 1
  tl.to(slides[1], { opacity: 1, duration: 0.3, ease: 'none' }, 0.15);
  // Apply light theme
  tl.call(() => {
    showcase.classList.add('is-light');
    nav.classList.add('is-light');
    slides[1].classList.add('is-light');
    updateSidebar(0);
  }, null, 0.2);

  // ===== HOLD SLIDE 1 =====
  tl.to({}, { duration: 0.4 }); // pause

  // ===== SLIDE 1 → SLIDE 2 =====
  const t2Start = tl.duration();
  tl.to(slides[1], { opacity: 0, duration: 0.3, ease: 'none' }, t2Start);
  tl.to(wheel, {
    left: '50%', top: '55%', scale: 0.9,
    duration: 0.4, ease: 'power2.inOut',
  }, t2Start);
  tl.to(slides[2], { opacity: 1, duration: 0.3, ease: 'none' }, t2Start + 0.15);
  tl.call(() => {
    slides[2].classList.add('is-light');
    updateSidebar(1);
  }, null, t2Start + 0.2);

  // ===== HOLD SLIDE 2 =====
  tl.to({}, { duration: 0.4 });

  // ===== SLIDE 2 → SLIDE 3 =====
  const t3Start = tl.duration();
  tl.to(slides[2], { opacity: 0, duration: 0.3, ease: 'none' }, t3Start);
  tl.to(wheel, {
    left: '30%', top: '50%', scale: 1.15,
    duration: 0.4, ease: 'power2.inOut',
  }, t3Start);
  tl.to(slides[3], { opacity: 1, duration: 0.3, ease: 'none' }, t3Start + 0.15);
  tl.call(() => {
    slides[3].classList.add('is-light');
    updateSidebar(2);
  }, null, t3Start + 0.2);

  // ===== HOLD SLIDE 3 =====
  tl.to({}, { duration: 0.4 });

  // ===== SLIDE 3 → SLIDE 4 =====
  const t4Start = tl.duration();
  tl.to(slides[3], { opacity: 0, duration: 0.3, ease: 'none' }, t4Start);
  // Transition bg back to dark for the last slide
  tl.to(bgLight, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, t4Start);
  tl.to(wheel, {
    left: '35%', top: '50%', scale: 1.0,
    duration: 0.4, ease: 'power2.inOut',
  }, t4Start);
  // Hide ring
  tl.to(ring, { opacity: 0, duration: 0.3, ease: 'none' }, t4Start);
  tl.to(slides[4], { opacity: 1, duration: 0.3, ease: 'none' }, t4Start + 0.15);
  tl.call(() => {
    showcase.classList.remove('is-light');
    nav.classList.remove('is-light');
    slides[4].classList.remove('is-light');
    updateSidebar(3);
  }, null, t4Start + 0.2);

  // ===== HOLD SLIDE 4 =====
  tl.to({}, { duration: 0.4 });

  // ---- ATTACH ScrollTrigger to pin + scrub ----
  ScrollTrigger.create({
    trigger: showcase,
    start: 'top top',
    end: '+=500%',   // 5 × viewport height of scroll distance
    pin: true,       // GSAP pins the section
    scrub: 0.8,      // Smooth scrub
    animation: tl,
    onUpdate: (self) => {
      // Progress-based sidebar fill
      if (lineFill) {
        const totalSlides = 4;
        const slideProgress = self.progress * totalSlides;
        const currentSlide = Math.floor(slideProgress);
        const fill = (slideProgress - currentSlide);
        lineFill.style.height = (fill * 100) + '%';
      }
    },
    onLeave: () => {
      // Ensure light classes removed when leaving
      showcase.classList.remove('is-light');
      nav.classList.remove('is-light');
    },
    onEnterBack: () => {
      // Re-apply correct state when entering back
    }
  });

  // ---- Initial state: show slide 0 and fade in wheel ----
  gsap.set(wheel, { left: '50%', top: '50%', scale: 0.85, opacity: 0 });
  gsap.to(wheel, { opacity: 0.45, duration: 1.2, delay: 0.3, ease: 'power2.out' });

  // ---- Sidebar helper ----
  function updateSidebar(activeIndex) {
    sidebarItems.forEach((item, i) => {
      const isActive = i === activeIndex;
      item.classList.toggle('sidebar__item--active', isActive);
    });
  }

  // Initial sidebar
  updateSidebar(0);
}

/* ============================
   SCROLL REVEAL
   ============================ */
function initScrollReveal() {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => el.classList.add('revealed'),
    });
  });
}

/* ============================
   PRODUCT CARDS
   ============================ */
function initProductCards() {
  const cards = document.querySelectorAll('.product-card');
  if (!cards.length) return;
  gsap.from(cards, {
    opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.products', start: 'top 80%' },
  });
}

/* ============================
   SOCIAL CARDS
   ============================ */
function initSocialCards() {
  const cards = document.querySelectorAll('.social-card');
  if (!cards.length) return;
  gsap.from(cards, {
    opacity: 0, y: 40, scale: 0.95, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.social-grid', start: 'top 80%' },
  });
}

/* ============================
   CTA
   ============================ */
function initCTA() {
  const title = document.querySelector('.cta__title');
  if (!title) return;
  gsap.from(title, {
    opacity: 0, y: 50, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '#about-cta', start: 'top 70%' },
  });
}

/* ============================
   FOOTER
   ============================ */
function initFooter() {
  gsap.from('.footer__col', {
    opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '#footer', start: 'top 85%' },
  });
}

/* ============================
   MARQUEE — speed reacts to scroll
   ============================ */
function initMarquee() {
  const track = document.querySelector('.marquee__track');
  if (!track) return;
  ScrollTrigger.create({
    trigger: '.marquee',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const speed = 1 + Math.abs(self.getVelocity()) / 2000;
      track.style.animationDuration = Math.max(8, 30 / speed) + 's';
    },
  });
}

/* ============================
   MOBILE MENU
   ============================ */
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });
}

/* ============================
   INIT ALL
   ============================ */
function initAll() {
  initLenis();
  initShowcase();
  initScrollReveal();
  initProductCards();
  initSocialCards();
  initCTA();
  initFooter();
  initMarquee();
  initMobileMenu();
}

document.addEventListener('DOMContentLoaded', initLoader);
