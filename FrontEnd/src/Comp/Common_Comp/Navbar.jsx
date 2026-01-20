import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const styles = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: scrolled ? '15px 24px' : '25px 24px',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #f1f5f9' : '1px solid transparent',
    },
    container: {
      maxWidth: '1300px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      fontSize: '20px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      textDecoration: 'none',
      color: '#0f172a'
    },
    linksContainer: {
      display: 'flex',
      gap: '30px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    link: {
      fontSize: '12px', // Smaller, aesthetic size
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      textDecoration: 'none',
      color: '#64748b',
      transition: 'color 0.2s',
    },
    authGroup: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#0f172a', // Black capsule
      padding: '5px 5px 5px 15px',
      borderRadius: '50px',
      gap: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    loginText: {
      color: '#ffffff',
      fontSize: '11px',
      fontWeight: '800',
      textDecoration: 'none',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    registerBtn: {
      backgroundColor: '#ffffff',
      color: '#0f172a',
      padding: '8px 18px',
      borderRadius: '50px',
      fontSize: '11px',
      fontWeight: '900',
      textDecoration: 'none',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        
        {/* Brand */}
        <Link to="/" style={styles.logo}>
          AERO KITES<span style={{ color: '#0ea5e9' }}>.</span>
        </Link>

        {/* Links - Scaled down for aesthetic */}
        <ul style={styles.linksContainer} className="nav-links-mobile-hide">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                style={styles.link}
                onMouseOver={(e) => e.target.style.color = '#0ea5e9'}
                onMouseOut={(e) => e.target.style.color = '#64748b'}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Cart Icon */}
          <Link to="/cart" style={{ color: '#0f172a', display: 'flex' }}>
            <ShoppingBagIcon width={20} strokeWidth={2} />
          </Link>

          {isLoggedIn ? (
            <Link to="/dashboard" style={{ color: '#0f172a', display: 'flex', border: '2px solid #0f172a', padding: '4px', borderRadius: '50%' }}>
              <UserIcon width={18} strokeWidth={2} />
            </Link>
          ) : (
            /* Black Auth Capsule */
            <div style={styles.authGroup}>
              <Link to="/login" style={styles.loginText}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>
                Register <ChevronRightIcon width={12} strokeWidth={3} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;