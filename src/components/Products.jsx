import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
    { name: 'MEILENSTEIN ART', category: 'All-round road', img: '/images/hero-wheel.png' },
    { name: 'OBERMAYER EVO', category: 'Climbing specialist', img: '/images/wheel.png' },
    { name: 'FERNWEG EVO PRO', category: 'Aero performance', img: '/images/hero-wheel.png' },
    { name: 'PFADFINDER EVO', category: 'Gravel & adventure', img: '/images/wheel.png' },
];

const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.12,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

function ProductCard({ product, index }) {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    };

    return (
        <motion.div
            className="product-card"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.3s ease' }}
        >
            <div className="product-card__img">
                <img src={product.img} alt={product.name} />
            </div>
            <div className="product-card__info">
                <div>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                </div>
                <div className="product-card__arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}

export default function Products() {
    const sectionRef = useRef(null);

    return (
        <section id="products" className="section section--dark" ref={sectionRef}>
            <div className="container">
                <motion.span
                    className="section__label"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    WHEELS
                </motion.span>
                <motion.h2
                    className="section__title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                    OUR COLLECTION
                </motion.h2>
                <div className="products">
                    {PRODUCTS.map((product, i) => (
                        <ProductCard key={product.name} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
