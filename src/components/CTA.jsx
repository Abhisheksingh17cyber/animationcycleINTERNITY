import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const title = titleRef.current;
        if (!title) return;

        // Character split animation
        const text = title.textContent;
        title.innerHTML = '';

        const words = text.split(' ');
        words.forEach((word, wi) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.overflow = 'hidden';
            wordSpan.style.verticalAlign = 'top';

            word.split('').forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.style.display = 'inline-block';
                charSpan.style.transform = 'translateY(100%)';
                charSpan.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                wordSpan.appendChild(charSpan);
            });

            title.appendChild(wordSpan);

            if (wi < words.length - 1) {
                const space = document.createElement('span');
                space.innerHTML = '&nbsp;';
                space.style.display = 'inline-block';
                title.appendChild(space);
            }
        });

        const chars = title.querySelectorAll('span > span');

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
            onEnter: () => {
                chars.forEach((char, i) => {
                    setTimeout(() => {
                        char.style.transform = 'translateY(0)';
                    }, i * 25);
                });
            },
        });
    }, []);

    return (
        <section id="about-cta" className="section section--dark section--cta" ref={sectionRef}>
            <div className="cross cross--tl">+</div>
            <div className="cross cross--tr">+</div>
            <div className="cross cross--bl">+</div>
            <div className="cross cross--br">+</div>

            <h2 className="cta__title" ref={titleRef}>
                At Internity, we craft more than wheels. We shape icons of performance.
            </h2>

            <motion.a
                href="#"
                className="btn btn--outline-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                About Us
            </motion.a>
        </section>
    );
}
