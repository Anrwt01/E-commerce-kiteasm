import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(false);
        navigate('/login');
    };

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Check token on mount and update user state
        const token = localStorage.getItem('token');
        setUser(!!token);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled, localStorage.getItem('token')]); // Re-run if token changes (though React doesn't auto-sense LS changes, this helps on re-renders)

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">Kiteasm</Link>
                </div>

                <div className="navbar-links">
                    {!user ? (
                        <>
                            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                        </>
                    ) : (
                        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
                    )}
                    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                    {user && (
                        <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
                    )}
                </div>

                <div className="navbar-auth">
                    {user ? (
                        <>
                            <Link to="/cart" className="nav-btn login-nav" style={{ marginRight: '10px' }}>Cart</Link>
                            <Link to="/orders" className="nav-btn login-nav" style={{ marginRight: '10px' }}>Orders</Link>
                            <button onClick={handleLogout} className="nav-btn register-nav" style={{ cursor: 'pointer' }}>Logout</button>
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
