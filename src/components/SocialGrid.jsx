import React from 'react';
import { motion } from 'framer-motion';

const SOCIAL_ITEMS = [
    { img: '/images/cycling1.png', text: 'Performance elevated. Every ride is a statement.' },
    { img: '/images/wheel.png', text: 'Precision-built for those who demand excellence.' },
    { img: '/images/cycling2.png', text: 'The more you ride, the stronger you get.' },
];

const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 40 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function SocialGrid() {
    return (
        <section id="social" className="section section--dark">
            <div className="container">
                <motion.h2
                    className="section__title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    #rideINTERNITY
                </motion.h2>
                <div className="social-grid">
                    {SOCIAL_ITEMS.map((item, i) => (
                        <motion.a
                            key={i}
                            href="#"
                            className="social-card"
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                        >
                            <img src={item.img} alt="" />
                            <div className="social-card__overlay">
                                <p>{item.text}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
