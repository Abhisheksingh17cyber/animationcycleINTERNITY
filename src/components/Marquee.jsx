import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
    'THE EVOLUTION OF PERFORMANCE',
    'PRECISION ENGINEERED',
    'HANDMADE IN GERMANY',
    'ALPHA RIB TECHNOLOGY',
    'MEILENSTEIN ART',
];

export default function Marquee() {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const trigger = ScrollTrigger.create({
            trigger: '.marquee',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                const speed = 1 + Math.abs(self.getVelocity()) / 2000;
                track.style.animationDuration = Math.max(10, 35 / speed) + 's';
            },
        });

        return () => trigger.kill();
    }, []);

    const renderContent = () => (
        <div className="marquee__content">
            {MARQUEE_ITEMS.map((item, i) => (
                <React.Fragment key={i}>
                    <span>{item}</span>
                    <span className="marquee__dot">•</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <section id="marquee" className="marquee">
            <div className="marquee__track" ref={trackRef}>
                {renderContent()}
                {renderContent()}
            </div>
        </section>
    );
}
