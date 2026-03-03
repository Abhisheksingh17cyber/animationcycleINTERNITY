import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
    {
        id: 1, type: 'right',
        label: 'PHILOSOPHY',
        title: ['PERFORMANCE', 'ENGINEERED'],
        text: 'Performance is more than speed. It\'s control in every turn, perfect balance, and confidence in how the wheel responds across any terrain.',
    },
    {
        id: 2, type: 'center',
        title: ['HANDMADE IN', 'GERMANY'],
        text: 'Our wheels are made from Internity Custom Composite using aerospace engineering and cycling expertise. Each is built from carbon using our Rim-to-Rim monocoque design.',
    },
    {
        id: 3, type: 'right',
        label: 'INNOVATION',
        title: ['ALPHA RIB', 'TECHNOLOGY'],
        text: 'ART is Internity\'s latest innovation, engineered to strengthen the rim from the inside out. The internal rib structure boosts lateral stiffness without adding weight.',
    },
    {
        id: 4, type: 'right',
        label: 'EVOLUTION',
        title: ['MEILENSTEIN', 'ART'],
        text: 'The all-new MEILENSTEIN ART is a completely re-engineered all-round road wheel built for greater aerodynamics, stiffness, and control.',
        cta: { label: 'Explore Collection', href: '#products' },
    },
];

const SIDEBAR = [
    { num: '01', label: 'PHILOSOPHY' },
    { num: '02', label: 'CRAFT' },
    { num: '03', label: 'INNOVATION' },
    { num: '04', label: 'EVOLUTION' },
];

export default function Showcase({ onThemeChange }) {
    const wrapRef = useRef(null);
    const bgLightRef = useRef(null);
    const wheelRef = useRef(null);
    const ringRef = useRef(null);
    const slideRefs = useRef([]);
    const sidebarRefs = useRef([]);
    const lineRef = useRef(null);

    const addSlide = useCallback((el, i) => { slideRefs.current[i] = el; }, []);
    const addSidebar = useCallback((el, i) => { sidebarRefs.current[i] = el; }, []);

    useEffect(() => {
        const wrap = wrapRef.current;
        const bgLight = bgLightRef.current;
        const wheel = wheelRef.current;
        const ring = ringRef.current;
        const slides = slideRefs.current;
        if (!wrap || !bgLight || !wheel || !ring) return;

        // --- Initial state ---
        gsap.set(wheel, { xPercent: -50, yPercent: -50, left: '35%', top: '50%', scale: 0.75, opacity: 0 });
        gsap.set(bgLight, { opacity: 0 });
        gsap.set(ring, { opacity: 0 });
        slides.forEach(s => s && gsap.set(s, { opacity: 0, y: 20 }));

        // Show first slide immediately
        gsap.set(slides[0], { opacity: 1, y: 0 });

        const setTheme = (light) => {
            wrap.classList.toggle('is-light', light);
            onThemeChange?.(light);
        };

        const setActiveSidebar = (idx) => {
            sidebarRefs.current.forEach((el, i) => {
                if (el) el.classList.toggle('sidebar__item--active', i === idx);
            });
        };

        // =================== MASTER TIMELINE ===================
        const tl = gsap.timeline();

        // --- INTRO (enter showcase): fade in wheel + light bg ---
        tl.to(bgLight, { opacity: 1, duration: 0.4, ease: 'power2.inOut' }, 0);
        tl.to(wheel, { opacity: 0.55, duration: 0.5, ease: 'power2.out' }, 0);
        tl.to(ring, { opacity: 0.5, duration: 0.3 }, 0.1);
        tl.call(() => { setTheme(true); setActiveSidebar(0); slides[0]?.classList.add('is-light'); }, null, 0.2);

        // --- HOLD slide 0 ---
        tl.to({}, { duration: 0.6 });

        // --- SLIDE 0 → 1 ---
        let t = tl.duration();
        tl.to(slides[0], { opacity: 0, y: -25, duration: 0.25, ease: 'power2.in' }, t);
        tl.to(wheel, { left: '50%', top: '60%', scale: 0.4, opacity: 0.08, duration: 0.4, ease: 'power2.inOut' }, t);
        tl.to(slides[1], { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, t + 0.15);
        tl.call(() => { setActiveSidebar(1); slides[1]?.classList.add('is-light'); }, null, t + 0.2);

        // --- HOLD slide 1 ---
        tl.to({}, { duration: 0.6 });

        // --- SLIDE 1 → 2 ---
        t = tl.duration();
        tl.to(slides[1], { opacity: 0, y: -25, duration: 0.25, ease: 'power2.in' }, t);
        tl.to(wheel, { left: '28%', top: '50%', scale: 0.7, opacity: 0.45, duration: 0.4, ease: 'power2.inOut' }, t);
        tl.to(slides[2], { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, t + 0.15);
        tl.call(() => { setActiveSidebar(2); slides[2]?.classList.add('is-light'); }, null, t + 0.2);

        // --- HOLD slide 2 ---
        tl.to({}, { duration: 0.6 });

        // --- SLIDE 2 → 3 (transition back to DARK) ---
        t = tl.duration();
        tl.to(slides[2], { opacity: 0, y: -25, duration: 0.25, ease: 'power2.in' }, t);
        tl.to(bgLight, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, t);
        tl.to(ring, { opacity: 0, duration: 0.25 }, t);
        tl.to(wheel, { left: '30%', top: '50%', scale: 0.65, opacity: 0.3, duration: 0.4, ease: 'power2.inOut' }, t);
        tl.to(slides[3], { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, t + 0.15);
        tl.call(() => {
            setTheme(false);
            setActiveSidebar(3);
            slides[3]?.classList.remove('is-light');
        }, null, t + 0.2);

        // --- HOLD slide 3 ---
        tl.to({}, { duration: 0.6 });

        // =================== SCROLL TRIGGER ===================
        const st = ScrollTrigger.create({
            trigger: wrap,
            start: 'top top',
            end: '+=400%',
            pin: true,
            scrub: 0.5,
            animation: tl,
            onUpdate: (self) => {
                if (lineRef.current) {
                    lineRef.current.style.height = `${self.progress * 100}%`;
                }
            },
            onLeave: () => {
                setTheme(false);
                gsap.to(wheel, { opacity: 0, duration: 0.2 });
            },
            onEnterBack: () => {
                gsap.to(wheel, { opacity: 0.4, duration: 0.2 });
            },
        });

        setActiveSidebar(0);

        return () => { st.kill(); tl.kill(); };
    }, [onThemeChange]);

    return (
        <section id="showcase" className="showcase" ref={wrapRef}>
            {/* BG layers */}
            <div className="showcase__bg showcase__bg--dark" />
            <div className="showcase__bg showcase__bg--light" ref={bgLightRef} />

            {/* Grid decoration */}
            <div className="showcase__grid-line showcase__grid-line--v" />
            <div className="showcase__grid-line showcase__grid-line--v" />
            <div className="showcase__grid-line showcase__grid-line--v" />

            {/* Sidebar */}
            <div className="showcase__sidebar">
                {SIDEBAR.map((item, i) => (
                    <React.Fragment key={item.num}>
                        <div
                            className={`sidebar__item${i === 0 ? ' sidebar__item--active' : ''}`}
                            ref={(el) => addSidebar(el, i)}
                        >
                            <span className="sidebar__num">{item.num}</span>
                            <span className="sidebar__label">{item.label}</span>
                        </div>
                        {i === 0 && (
                            <div className="sidebar__line">
                                <div className="sidebar__line-fill" ref={lineRef} />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Wheel — z-index 1, behind everything */}
            <div className="showcase__wheel" ref={wheelRef}>
                <img src="/images/hero-wheel.png" alt="" />
            </div>

            {/* Decorative ring */}
            <div className="showcase__ring" ref={ringRef} />

            {/* === SLIDES === */}
            {SLIDES.map((slide, i) => {
                if (slide.type === 'center') {
                    return (
                        <div key={slide.id} className="slide slide--center" ref={(el) => addSlide(el, i)}>
                            <div className="slide__center-panel">
                                <h2 className="slide__big-title">{slide.title[0]}<br />{slide.title[1]}</h2>
                                <p className="slide__center-text">{slide.text}</p>
                            </div>
                        </div>
                    );
                }
                return (
                    <div key={slide.id} className="slide slide--right" ref={(el) => addSlide(el, i)}>
                        <div className="slide__content">
                            {slide.label && <span className="slide__label">{slide.label}</span>}
                            <h2 className="slide__title">{slide.title[0]}<br />{slide.title[1]}</h2>
                            <p className="slide__text">{slide.text}</p>
                            {slide.cta && (
                                <a href={slide.cta.href} className="btn btn--outline-dark">
                                    {slide.cta.label}
                                </a>
                            )}
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
