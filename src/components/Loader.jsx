import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
    const loaderRef = useRef(null);
    const fillRef = useRef(null);
    const percentRef = useRef(null);
    const brandRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let current = 0;

        // Animate brand entrance
        gsap.fromTo(brandRef.current,
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );

        const interval = setInterval(() => {
            current += Math.random() * 8 + 2;
            if (current >= 100) {
                current = 100;
                clearInterval(interval);

                setTimeout(() => {
                    // Exit animation
                    const tl = gsap.timeline({
                        onComplete: () => onComplete?.(),
                    });

                    tl.to(brandRef.current, {
                        y: -30, opacity: 0, duration: 0.5, ease: 'power3.in',
                    });
                    tl.to(loaderRef.current, {
                        clipPath: 'inset(0 0 100% 0)',
                        duration: 0.8,
                        ease: 'power4.inOut',
                    }, '-=0.2');
                }, 400);
            }
            setProgress(Math.round(current));
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        if (fillRef.current) {
            fillRef.current.style.width = progress + '%';
        }
    }, [progress]);

    return (
        <div className="loader" ref={loaderRef} style={{ clipPath: 'inset(0 0 0 0)' }}>
            <div className="loader__line loader__line--left" />
            <div className="loader__line loader__line--right" />
            <div className="loader__content" ref={brandRef}>
                <span className="loader__brand">INTERNITY</span>
                <div className="loader__bar-track">
                    <div className="loader__bar-fill" ref={fillRef} />
                </div>
                <span className="loader__percent" ref={percentRef}>{progress}%</span>
            </div>
        </div>
    );
}
