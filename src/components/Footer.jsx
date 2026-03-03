import React from 'react';
import { motion } from 'framer-motion';

const FOOTER_COLS = [
    {
        title: 'Wheels',
        links: ['MEILENSTEIN ART', 'OBERMAYER EVO', 'FERNWEG EVO PRO', 'PFADFINDER EVO'],
    },
    {
        title: 'About Us',
        links: ['About Us', 'Technology', 'Athletes', 'Partners'],
    },
    {
        title: 'Additional',
        links: ['Dealers', 'Service', 'Jobs'],
    },
    {
        title: 'Documents',
        links: ['Privacy Policy', 'Terms & Conditions', 'Imprint', 'Cookie settings'],
    },
];

const colVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.08,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function Footer() {
    return (
        <footer id="footer" className="footer">
            <div className="footer__inner">
                <motion.div
                    className="footer__col footer__brand"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="footer__logo"><em>Internity</em></span>
                    <p>Performance elevated.</p>
                </motion.div>

                {FOOTER_COLS.map((col, i) => (
                    <motion.div
                        key={col.title}
                        className="footer__col"
                        custom={i + 1}
                        variants={colVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h4>{col.title}</h4>
                        {col.links.map((link) => (
                            <a key={link} href="#">{link}</a>
                        ))}
                    </motion.div>
                ))}
            </div>
            <div className="footer__bottom">
                <span>© 2025 Internity. All rights reserved.</span>
                <span style={{ display: 'flex', gap: '20px' }}>
                    <a href="#" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--dim)' }}>Instagram</a>
                    <a href="#" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--dim)' }}>LinkedIn</a>
                    <a href="#" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--dim)' }}>YouTube</a>
                </span>
            </div>
        </footer>
    );
}
