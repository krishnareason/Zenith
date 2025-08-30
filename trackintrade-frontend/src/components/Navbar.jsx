// src/components/Navbar.jsx
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a href="/" className="navbar-brand">
                <span>TrackInTrade</span>
            </a>

            <button className="mobile-nav-button" onClick={toggleMobileMenu}>
                ☰
            </button>

            <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <a href="/documentation" className="nav-link">Documentation</a>
                <a href="#features" className="nav-link">Features</a>
                <a href="/login" className="nav-link">Login</a>
                <a href="/register" className="nav-button">Register</a>
            </div>
        </nav>
    );
};

export default Navbar;