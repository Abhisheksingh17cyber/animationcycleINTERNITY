/* ============================
   INTERNITY — Main JS
   Animations & Interactions
   ============================ */

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

// ============================
// LOADER
// ============================
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
        initAnimations();
      }, 500);
      return;
    }
    fill.style.width = progress + '%';
    percent.textContent = Math.round(progress) + '%';
  }, 120);
}

// ============================
// LENIS SMOOTH SCROLL
// ============================
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

// ============================
// HERO ANIMATIONS
// ============================
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
  })
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .to('.hero-scroll-indicator', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.3');

  // Hero parallax on scroll
  gsap.to('.hero-bg-img', {
    yPercent: 20,
    scale: 1.1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
    },
  });

  // Fade hero content on scroll
  gsap.to('.hero-content', {
    opacity: 0,
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: '30% top',
      end: 'bottom top',
      scrub: 0.3,
    },
  });

  gsap.to('.hero-scroll-indicator', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: '20% top',
      end: '40% top',
      scrub: true,
    },
  });
}

// ============================
// NARRATIVE SCROLL SECTIONS
// ============================
function initNarrativeScroll() {
  const panels = document.querySelectorAll('.narrative-panel');
  const navItems = document.querySelectorAll('.narrative-nav-item');
  const narrativeSection = document.getElementById('narrative');

  if (!panels.length) return;

  // Make first panel active
  panels[0].classList.add('active');

  const totalPanels = panels.length;

  ScrollTrigger.create({
    trigger: narrativeSection,
    start: 'top top',
    end: `+=${totalPanels * 100}%`,
    pin: false,
    scrub: 0.3,
    onUpdate: (self) => {
      const progress = self.progress;
      const activeIndex = Math.min(
        Math.floor(progress * totalPanels),
        totalPanels - 1
      );

      panels.forEach((panel, i) => {
        if (i === activeIndex) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      navItems.forEach((item, i) => {
        if (i === activeIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    },
  });
}

// ============================
// CRAFT SECTION ANIMATIONS
// ============================
function initCraftAnimations() {
  const craftSection = document.getElementById('craft');
  if (!craftSection) return;

  gsap.from('.craft-label', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: craftSection,
      start: 'top 75%',
    },
  });

  gsap.from('.craft-title', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: craftSection,
      start: 'top 70%',
    },
  });

  gsap.from('.craft-text', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: craftSection,
      start: 'top 65%',
    },
  });

  gsap.from('.craft-image', {
    opacity: 0,
    x: 60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: craftSection,
      start: 'top 70%',
    },
  });
}

// ============================
// NAV COLOR CHANGE
// ============================
function initNavColorChange() {
  const nav = document.getElementById('mainNav');
  const lightSections = document.querySelectorAll('.section--light');

  lightSections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      onEnter: () => nav.classList.add('nav--light'),
      onLeave: () => nav.classList.remove('nav--light'),
      onEnterBack: () => nav.classList.add('nav--light'),
      onLeaveBack: () => nav.classList.remove('nav--light'),
    });
  });
}

// ============================
// SCROLL REVEAL
// ============================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  revealElements.forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: (i % 3) * 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => el.classList.add('revealed'),
      },
    });
  });
}

// ============================
// PRODUCT CARDS STAGGER
// ============================
function initProductCards() {
  const cards = document.querySelectorAll('.product-card');

  gsap.from(cards, {
    opacity: 0,
    y: 60,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.products-grid',
      start: 'top 80%',
    },
  });
}

// ============================
// SOCIAL CARDS
// ============================
function initSocialCards() {
  const cards = document.querySelectorAll('.social-card');

  gsap.from(cards, {
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.social-grid',
      start: 'top 80%',
    },
  });
}

// ============================
// CTA SECTION
// ============================
function initCTAAnimation() {
  const ctaTitle = document.querySelector('.cta-title');
  if (!ctaTitle) return;

  gsap.from(ctaTitle, {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about-cta',
      start: 'top 70%',
    },
  });
}

// ============================
// MOBILE MENU
// ============================
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });
}

// ============================
// CROSSHAIR ANIMATIONS
// ============================
function initCrosshairAnimations() {
  const crosshairs = document.querySelectorAll('.crosshair');

  crosshairs.forEach((ch) => {
    gsap.from(ch, {
      opacity: 0,
      scale: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: ch.closest('.section') || ch.parentElement,
        start: 'top 80%',
      },
    });
  });
}

// ============================
// FOOTER REVEAL
// ============================
function initFooterReveal() {
  const footerCols = document.querySelectorAll('.footer-col');

  gsap.from(footerCols, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#footer',
      start: 'top 85%',
    },
  });
}

// ============================
// MARQUEE SPEED CHANGE ON SCROLL
// ============================
function initMarqueeScrollEffect() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  ScrollTrigger.create({
    trigger: '.section--marquee',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const speed = 1 + Math.abs(self.getVelocity()) / 2000;
      track.style.animationDuration = Math.max(8, 30 / speed) + 's';
    },
  });
}

// ============================
// INIT ALL ANIMATIONS
// ============================
function initAnimations() {
  initLenis();
  initHeroAnimations();
  initNarrativeScroll();
  initCraftAnimations();
  initNavColorChange();
  initScrollReveal();
  initProductCards();
  initSocialCards();
  initCTAAnimation();
  initCrosshairAnimations();
  initFooterReveal();
  initMarqueeScrollEffect();
  initMobileMenu();
}

// ============================
// START
// ============================
document.addEventListener('DOMContentLoaded', initLoader);
