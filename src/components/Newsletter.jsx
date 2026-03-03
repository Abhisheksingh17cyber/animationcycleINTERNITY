import React from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section id="newsletter" className="section section--dark section--newsletter">
            <div className="container">
                <motion.h2
                    className="newsletter__title"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Subscribe to our newsletter
                </motion.h2>
                <motion.p
                    className="newsletter__sub"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    Stay informed with the latest from Internity.
                </motion.p>
                <motion.form
                    className="newsletter__form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <input type="email" placeholder="Your email*" required />
                    <motion.button
                        type="submit"
                        className="btn btn--filled"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ marginTop: 0 }}
                    >
                        Subscribe
                    </motion.button>
                </motion.form>
                <motion.p
                    className="newsletter__privacy"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    I agree to the collection and processing of my personal data as described in the{' '}
                    <a href="#">Privacy Policy</a>.
                </motion.p>
            </div>
        </section>
    );
}
