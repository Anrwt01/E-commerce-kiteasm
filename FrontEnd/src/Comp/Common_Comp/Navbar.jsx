import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize state from localStorage
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });

  const isLoggedIn = !!authState.token;
  const role = authState.role;

  // Listen for storage changes to update auth state
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthState({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
      });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuthState({ token: null, role: null });
    navigate("/login");
  };

  const styles = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: scrolled ? '15px 24px' : '25px 24px',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #f1f5f9' : '1px solid transparent',
    },
    container: { 
      maxWidth: '1200px', margin: '0 auto', 
      display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
    },
    logo: { 
      fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', 
      textDecoration: 'none', color: '#0f172a', letterSpacing: '-1px'
    },
    linksContainer: { 
      display: 'flex', 
      gap: '30px', 
      listStyle: 'none', 
      margin: 0, 
      padding: 0,
      alignItems: 'center'
    },
    link: (path) => ({ 
      fontSize: '11px', 
      fontWeight: '800', 
      textTransform: 'uppercase', 
      letterSpacing: '1.5px', 
      textDecoration: 'none', 
      color: location.pathname === path ? '#0ea5e9' : '#64748b',
      transition: 'color 0.2s',
      whiteSpace: 'nowrap'
    }),
    authGroup: {
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#0f172a',
      padding: '4px 4px 4px 18px', 
      borderRadius: '50px', 
      gap: '15px'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* LOGO */}
        <Link to="/" style={styles.logo}>
          AERO KITES<span style={{ color: '#0ea5e9' }}>.</span>
        </Link>

        {/* CENTER LINKS */}
        <ul style={styles.linksContainer}>
          {/* GUEST VIEW (Not logged in) */}
          {!isLoggedIn && (
            <>
              <li><Link to="/" style={styles.link('/')}>Home</Link></li>
              <li><Link to="/products" style={styles.link('/products')}>Products</Link></li>
              <li><Link to="/contact" style={styles.link('/contact')}>Contact</Link></li>
              <li><Link to="/about" style={styles.link('/about')}>About</Link></li>
            </>
          )}

          {/* USER VIEW */}
          {isLoggedIn && role === "user" && (
            <>
              <li><Link to="/dashboard" style={styles.link('/dashboard')}>Hangar</Link></li>
              <li><Link to="/products" style={styles.link('/products')}>Fleet</Link></li>
              <li><Link to="/orders" style={styles.link('/orders')}>Logbook</Link></li>
            </>
          )}

          {/* ADMIN VIEW */}
          {isLoggedIn && role === "admin" && (
            <>
              <li><Link to="/admin/dashboard" style={styles.link('/admin/dashboard')}>Dashboard</Link></li>
              <li><Link to="/admin/orders" style={styles.link('/admin/orders')}>Orders</Link></li>
              <li><Link to="/admin/products" style={styles.link('/admin/products')}>Products</Link></li>
              <li><Link to="/admin/users" style={styles.link('/admin/users')}>Users</Link></li>
            </>
          )}
        </ul>

        {/* RIGHT ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Cart - Hidden for admin */}
          {isLoggedIn && role !== "admin" && (
            <Link to="/cart" style={{ color: '#0f172a', display: 'flex', textDecoration: 'none' }}>
              <ShoppingBagIcon width={22} strokeWidth={2} />
            </Link>
          )}

          {!isLoggedIn && (
            <Link to="/cart" style={{ color: '#0f172a', display: 'flex', textDecoration: 'none' }}>
              <ShoppingBagIcon width={22} strokeWidth={2} />
            </Link>
          )}

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {/* User Icon - Hidden for admin */}
              {role !== "admin" && (
                <Link to="/profile" style={{ color: '#0f172a', display: 'flex', textDecoration: 'none' }}>
                  <UserIcon width={22} strokeWidth={2} />
                </Link>
              )}
              
              <button 
                onClick={handleLogout} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#ef4444', 
                  display: 'flex',
                  padding: 0
                }}
                aria-label="Logout"
              >
                <ArrowRightOnRectangleIcon width={22} strokeWidth={2} />
              </button>
            </div>
          ) : (
            /* GUEST AUTH PILL */
            <div style={styles.authGroup}>
              <Link 
                to="/login" 
                style={{ 
                  fontSize: '10px', 
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  textDecoration: 'none', 
                  color: 'white',
                  whiteSpace: 'nowrap'
                }}
              >
                LOGIN
              </Link>
              <Link 
                to="/register" 
                style={{ 
                  backgroundColor: 'white', 
                  color: '#0f172a', 
                  padding: '10px 22px', 
                  borderRadius: '50px', 
                  fontSize: '10px', 
                  fontWeight: '900', 
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                REGISTER
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;