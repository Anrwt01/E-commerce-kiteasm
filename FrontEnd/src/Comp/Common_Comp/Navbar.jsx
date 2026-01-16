import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        const token = localStorage.getItem('token');
        if (token) {
            setUser(true);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">Kiteasm</Link>
                </div>

                <div className="navbar-links">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                </div>

                <div className="navbar-auth">
                    {user ? (
                        <>
                            <Link to="/cart" className="nav-btn login-nav" style={{ marginRight: '10px' }}>Cart</Link>
                            <Link to="/dashboard" className="nav-btn login-nav">Dashboard</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-btn login-nav">Login</Link>
                            <Link to="/register" className="nav-btn register-nav">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
