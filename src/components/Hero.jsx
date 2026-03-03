import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1, scale: 1,
        transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    },
};

export default function Hero() {
    const scrollCueRef = useRef(null);

    useEffect(() => {
        // Pulse animation on scroll cue
        if (scrollCueRef.current) {
            gsap.to(scrollCueRef.current, {
                y: 6,
                duration: 1.4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }
    }, []);

    return (
        <section className="hero">
            {/* Background wheel image — purely decorative, subtle */}
            <motion.div
                className="hero__wheel-bg"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
            >
                <img src="/images/hero-wheel.png" alt="" aria-hidden="true" />
            </motion.div>

            {/* Gold ring accent */}
            <div className="hero__ring" />

            {/* Content */}
            <motion.div
                className="hero__content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.span className="hero__overline" variants={fadeUp}>
                    <span className="hero__overline-line" />
                    WELCOME
                    <span className="hero__overline-line" />
                </motion.span>

                <motion.h1 className="hero__title" variants={fadeUp}>
                    THE EVOLUTION OF<br />PERFORMANCE
                </motion.h1>

                <motion.p className="hero__subtitle" variants={fadeUp}>
                    Precision-engineered carbon wheels, handmade in Germany.
                </motion.p>

                <motion.a
                    href="#showcase"
                    className="btn btn--outline-light"
                    variants={fadeUp}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(196, 163, 90, 0.5)' }}
                    whileTap={{ scale: 0.97 }}
                >
                    DISCOVER
                </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <div className="hero__scroll" ref={scrollCueRef}>
                <span>SCROLL TO EXPLORE</span>
                <div className="hero__scroll-line" />
            </div>

            {/* Corner marks */}
            <div className="cross cross--tl">+</div>
            <div className="cross cross--tr">+</div>
            <div className="cross cross--bl">+</div>
            <div className="cross cross--br">+</div>
        </section>
    );
}
