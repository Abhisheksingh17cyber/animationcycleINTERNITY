import React, { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Marquee from './components/Marquee';
import Products from './components/Products';
import SocialGrid from './components/SocialGrid';
import CTA from './components/CTA';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        if (!loaded) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        return () => lenis.destroy();
    }, [loaded]);

    const handleLoaderComplete = useCallback(() => setLoaded(true), []);
    const handleThemeChange = useCallback((light) => setIsLight(light), []);

    return (
        <>
            {!loaded && <Loader onComplete={handleLoaderComplete} />}
            <div className="noise" />
            <Navigation isLight={isLight} />

            <main>
                <Hero />
                <Showcase onThemeChange={handleThemeChange} />
                <Marquee />
                <Products />
                <SocialGrid />
                <CTA />
                <Newsletter />
            </main>

            <Footer />
        </>
    );
}
