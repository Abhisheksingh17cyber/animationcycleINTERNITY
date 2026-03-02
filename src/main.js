/* ============================
   INTERNITY — Main JS
   Scroll-Jacking Showcase Engine
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
        initAll();
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
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

// ============================
// SHOWCASE SCROLL-JACKING
// ============================
function initShowcase() {
  const showcase = document.getElementById('showcase');
  const bg = document.getElementById('showcaseBg');
  const wheel = document.getElementById('showcaseWheel');
  const sidebar = document.getElementById('showcaseSidebar');
  const panels = document.querySelectorAll('.showcase-panel');
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const crosshairs = showcase.querySelectorAll('.crosshair');
  const wheelCrosshairs = showcase.querySelectorAll('.wheel-crosshair');
  const wheelRing = showcase.querySelector('.wheel-ring');
  const sidebarProgress = document.getElementById('sidebarProgress');
  const progressBar = document.querySelector('.sidebar-progress');
  const nav = document.getElementById('mainNav');

  const totalPanels = panels.length; // 5 panels (0-4)
  let currentPanel = -1;

  // Helper to interpolate colors
  function lerpColor(a, b, t) {
    const ar = parseInt(a.slice(1, 3), 16);
    const ag = parseInt(a.slice(3, 5), 16);
    const ab = parseInt(a.slice(5, 7), 16);
    const br = parseInt(b.slice(1, 3), 16);
    const bg2 = parseInt(b.slice(3, 5), 16);
    const bb = parseInt(b.slice(5, 7), 16);
    const rr = Math.round(ar + (br - ar) * t);
    const gg = Math.round(ag + (bg2 - ag) * t);
    const bbb = Math.round(ab + (bb - ab) * t);
    return `rgb(${rr}, ${gg}, ${bbb})`;
  }

  // Panel: which panels are dark vs light
  // Panel 0: dark (hero)
  // Panel 1-4: light background
  const panelBgColors = ['#000000', '#e8e5e0', '#e8e5e0', '#e8e5e0', '#e8e5e0'];
  const panelIsDark = [true, false, false, false, false];

  // Wheel positions for each panel:
  // Panel 0: centered, large, behind text
  // Panel 1: left side, large, behind content on right
  // Panel 2: centered, medium, top portion visible
  // Panel 3: left side again
  // Panel 4: left side, slightly down
  const wheelStates = [
    { x: '50%', y: '55%', scale: 0.9, opacity: 0.45 },   // Panel 0: centered
    { x: '30%', y: '50%', scale: 1.1, opacity: 1 },      // Panel 1: left, big
    { x: '50%', y: '65%', scale: 0.85, opacity: 0.9 },    // Panel 2: centered, top
    { x: '30%', y: '50%', scale: 1.05, opacity: 1 },      // Panel 3: left
    { x: '35%', y: '50%', scale: 1.0, opacity: 0.9 },     // Panel 4: left
  ];

  function updatePanel(index) {
    if (index === currentPanel) return;
    currentPanel = index;

    // Update background color
    bg.style.background = panelBgColors[index];

    // Update panel visibility with animation
    panels.forEach((panel, i) => {
      if (i === index) {
        panel.classList.add('active');
        // Animate panel content in
        const children = panel.querySelectorAll('.panel-overline, .panel-hero-title, .panel-title, .panel-title-large, .panel-text, .panel-text-center, .btn');
        gsap.fromTo(children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', overwrite: true }
        );
      } else {
        panel.classList.remove('active');
      }
    });

    // Update light/dark classes
    const isLight = !panelIsDark[index];

    panels.forEach(p => p.classList.toggle('is-light', isLight));
    crosshairs.forEach(c => c.classList.toggle('is-light', isLight));
    wheelCrosshairs.forEach(c => c.classList.toggle('is-light', isLight));
    if (wheelRing) wheelRing.classList.toggle('is-light', isLight);
    sidebarItems.forEach(s => s.classList.toggle('is-light', isLight));
    if (progressBar) progressBar.classList.toggle('is-light', isLight);

    // Nav color
    if (isLight) {
      nav.classList.add('nav--light');
    } else {
      nav.classList.remove('nav--light');
    }

    // Update sidebar active
    const sidebarIndex = Math.max(0, Math.min(index, 3));
    sidebarItems.forEach((item, i) => {
      item.classList.toggle('active', i === sidebarIndex);
    });

    // Animate wheel position
    const ws = wheelStates[index];
    gsap.to(wheel, {
      left: ws.x,
      top: ws.y,
      scale: ws.scale,
      opacity: ws.opacity,
      duration: 1.2,
      ease: 'power2.inOut',
      overwrite: true,
    });
  }

  // Show initial elements
  gsap.to(wheel, { opacity: wheelStates[0].opacity, duration: 1, delay: 0.3 });
  gsap.to(sidebar, { opacity: 1, duration: 0.8, delay: 0.5 });

  // Set first panel
  updatePanel(0);

  // Main ScrollTrigger for the entire showcase
  ScrollTrigger.create({
    trigger: showcase,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.1,
    onUpdate: (self) => {
      const progress = self.progress;
      const panelIndex = Math.min(
        Math.floor(progress * totalPanels),
        totalPanels - 1
      );
      updatePanel(panelIndex);

      // Update sidebar progress
      const panelProgress = (progress * totalPanels) % 1;
      if (sidebarProgress) {
        sidebarProgress.style.height = (panelProgress * 100) + '%';
      }

      // Smooth background color transition between panels
      const exactPanel = progress * totalPanels;
      const fromPanel = Math.floor(exactPanel);
      const toPanel = Math.min(fromPanel + 1, totalPanels - 1);
      const t = exactPanel - fromPanel;
      const color = lerpColor(panelBgColors[fromPanel], panelBgColors[toPanel], t);
      bg.style.background = color;

      // Smooth wheel position interpolation
      if (fromPanel < totalPanels && toPanel < totalPanels) {
        const fromWS = wheelStates[fromPanel];
        const toWS = wheelStates[toPanel];
        // Interpolate x, y percent values
        const fromX = parseFloat(fromWS.x);
        const toX = parseFloat(toWS.x);
        const fromY = parseFloat(fromWS.y);
        const toY = parseFloat(toWS.y);
        const fromScale = fromWS.scale;
        const toScale = toWS.scale;
        const fromOpacity = fromWS.opacity;
        const toOpacity = toWS.opacity;

        const interpX = fromX + (toX - fromX) * t;
        const interpY = fromY + (toY - fromY) * t;
        const interpScale = fromScale + (toScale - fromScale) * t;
        const interpOpacity = fromOpacity + (toOpacity - fromOpacity) * t;

        gsap.set(wheel, {
          left: interpX + '%',
          top: interpY + '%',
          scale: interpScale,
          opacity: interpOpacity,
        });
      }
    },
    onLeave: () => {
      // Hide fixed elements when leaving showcase
      gsap.to(wheel, { opacity: 0, duration: 0.5 });
      gsap.to(sidebar, { opacity: 0, duration: 0.5 });
      panels.forEach(p => p.classList.remove('active'));
      nav.classList.remove('nav--light');
    },
    onEnterBack: () => {
      // Show fixed elements when coming back
      gsap.to(sidebar, { opacity: 1, duration: 0.5 });
      updatePanel(totalPanels - 1);
    },
    onLeaveBack: () => {
      // Coming back to top
    },
  });
}

// ============================
// SCROLL REVEAL
// ============================
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

// ============================
// PRODUCT CARDS
// ============================
function initProductCards() {
  gsap.from('.product-card', {
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
  gsap.from('.social-card', {
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
// CTA
// ============================
function initCTA() {
  const ctaTitle = document.querySelector('.cta-title');
  if (!ctaTitle) return;
  gsap.from(ctaTitle, {
    opacity: 0, y: 50, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '#about-cta', start: 'top 70%' },
  });
}

// ============================
// FOOTER
// ============================
function initFooter() {
  gsap.from('.footer-col', {
    opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '#footer', start: 'top 85%' },
  });
}

// ============================
// MARQUEE SPEED
// ============================
function initMarquee() {
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

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });
}

// ============================
// INIT ALL
// ============================
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
