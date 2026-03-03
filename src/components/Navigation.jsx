import React, { useState, useEffect, useRef } from 'react';

export default function Navigation({ isLight }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const links = [
        { label: 'Wheels', href: '#products' },
        { label: 'HPC Cockpit', href: '#about-cta' },
        { label: 'About Us', href: '#about-cta' },
        { label: 'Dealer', href: '#footer' },
        { label: 'Service', href: '#footer' },
    ];

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav className={`nav${isLight ? ' is-light' : ''}`} ref={navRef}>
                <div className="nav__inner">
                    <a href="#" className="nav__logo"><em>Internity</em></a>

                    <div className="nav__links">
                        {links.map((link) => (
                            <a key={link.label} href={link.href}>{link.label}</a>
                        ))}
                    </div>

                    <button className="nav__search" aria-label="Search">
                        <span>Search</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>

                    <button
                        className={`nav__hamburger${menuOpen ? ' active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        <span /><span />
                    </button>
                </div>
            </nav>

            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                {links.map((link) => (
                    <a key={link.label} href={link.href} onClick={handleLinkClick}>
                        {link.label}
                    </a>
                ))}
            </div>
        </>
    );
}
