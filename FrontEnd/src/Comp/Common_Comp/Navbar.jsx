import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import kiteasm_logo from "../../assets/Images/kiteasm_logo.jpg";

const getAuthFromStorage = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  if (!token || !userData) return { token: null, role: null };
  try {
    const parsedUser = JSON.parse(userData);
    return { token, role: parsedUser.role };
  } catch (err) {
    return { token: null, role: null };
  }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(getAuthFromStorage());

  const role = authState.role;
  const isLoggedIn = !!authState.token;

  useEffect(() => {
    const syncAuth = () => setAuthState(getAuthFromStorage());
    window.addEventListener("storage", syncAuth);
    window.addEventListener("authChange", syncAuth);
    syncAuth();
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authChange", syncAuth);
    };
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuthState({ token: null, role: null });
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
    setIsMenuOpen(false);
  };

  const styles = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: scrolled ? '12px 24px' : '22px 24px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #F1F5F9',
      boxShadow: scrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.05)' : 'none',
    },
    container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    logo: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', textDecoration: 'none', color: '#1E293B' },
    // Locate this inside your styles object
    logoImage: {
      height: scrolled ? '40px' : '48px',
      width: scrolled ? '40px' : '48px',
      objectFit: 'cover',
      transition: '0.4s ease',

      // Key changes for the circle:
      borderRadius: '50%', // Makes it a perfect circle
      border: '2px solid #F1F5F9', // Optional: adds a clean ring around the logo
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)', // Optional: makes it pop slightly
    },
    linksContainer: { display: isMobile ? 'none' : 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' },
    link: (path) => ({
      fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.2px',
      textDecoration: 'none', color: location.pathname === path ? '#3B82F6' : '#64748B', transition: 'all 0.2s'
    }),
    authGroup: {
      display: isMobile ? 'none' : 'flex', alignItems: 'center', backgroundColor: '#F8FAFC',
      padding: '4px 4px 4px 18px', borderRadius: '50px', gap: '15px', border: '1px solid #F1F5F9',
    },
    // --- SIDEBAR DRAWER STYLES (Mobile Only) ---
    sidebarOverlay: {
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 2000,
      display: isMenuOpen ? 'block' : 'none',
    },
    sidebarContainer: {
      position: 'fixed', top: 0, right: 0, width: '280px', height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 2001, padding: '40px 24px',
      display: 'flex', flexDirection: 'column',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      borderLeft: '1px solid #F1F5F9'
    },
    sidebarLink: (path) => ({
      fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.2px',
      textDecoration: 'none', color: location.pathname === path ? '#3B82F6' : '#64748B',
      display: 'block', padding: '15px 0', borderBottom: '1px solid #F1F5F9'
    }),
    sidebarAuthBtn: (isActive) => ({
      backgroundColor: isActive ? '#E2E8F0' : '#3B82F6',
      color: isActive ? '#1E293B' : '#ffffff',
      padding: '14px', borderRadius: '50px',
      fontSize: '12px', fontWeight: '900', textAlign: 'center', textDecoration: 'none', marginTop: '10px',
      border: 'none',
      boxShadow: isActive ? 'none' : '0 10px 15px -3px rgba(59, 130, 246, 0.4)'
      
    })
  };

  const renderLinks = (isSidebar = false) => {
    const style = isSidebar ? styles.sidebarLink : styles.link;
    const items = !isLoggedIn
      ? [{ p: '/', n: 'Home' }, { p: '/products', n: 'Products' }, { p: '/contact', n: 'Contact' }, { p: '/about', n: 'About' }]
      : role === "admin"
        ? [{ p: '/admin', n: 'Admin Dashboard' }, { p: '/admin/orders', n: 'Orders' }, { p: '/admin/products', n: 'Product' }]
        : [{ p: '/', n: 'Home' },{ p: '/dashboard', n: 'User Dashboard' }, { p: '/products', n: 'Products' }, { p: '/orders', n: 'Orders' },{ p: '/about', n: 'About' }];

    return items.map(item => (
      <li key={item.p} style={{ listStyle: 'none' }}>
        <Link to={item.p} style={style(item.p)} onClick={() => setIsMenuOpen(false)}>{item.n}</Link>
      </li>
    ));
  };

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.container}>
          {/* Logo */}
         <Link to="/" style={styles.logo}>
        <img src={kiteasm_logo} alt="Kiteasm" style={styles.logoImage} />
        <span style={{ color: '#1E293B' }}>Kiteasm<span style={{ color: '#3B82F6' }}>.</span></span>
      </Link>

          {/* Laptop Navigation Links */}
          <ul style={styles.linksContainer}>
            {renderLinks(false)}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Cart Icon */}
            {(!isLoggedIn || role !== "admin") && (
              <Link to="/cart" style={{ color: '#1E293B' }}>
                <ShoppingBagIcon width={22} strokeWidth={1.5} />
              </Link>
            )}

            {/* Laptop Auth Group */}
            {!isMobile && (
              <div style={styles.authGroup}>
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      style={{
                        fontSize: '10px',
                        fontWeight: '800',
                        textDecoration: 'none',
                        color: location.pathname === '/login' ? '#3B82F6' : '#64748B',
                        transition: '0.3s'
                      }}
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/register"
                      style={{
                        backgroundColor: location.pathname === '/register' ? '#E2E8F0' : '#3B82F6',
                        color: location.pathname === '/register' ? '#1E293B' : '#ffffff',
                        padding: '10px 22px',
                        borderRadius: '50px',
                        fontSize: '10px',
                        fontWeight: '900',
                        textDecoration: 'none',
                        transition: '0.3s',
                        boxShadow: location.pathname === '/register' ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      REGISTER
                    </Link>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingRight: '14px' }}>
                    {role !== "admin" && (
                      <Link to="/profile" style={{ color: location.pathname === '/profile' ? '#3B82F6' : '#64748B' }}><UserIcon width={22} /></Link>
                    )}
                    <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                      <ArrowRightOnRectangleIcon width={22} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            {isMobile && (
              <div onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer', color: '#1E293B' }}>
                <Bars3Icon width={26} strokeWidth={2} />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR DRAWER */}
      <div style={styles.sidebarOverlay} onClick={() => setIsMenuOpen(false)} />
      <div style={styles.sidebarContainer}>
        <div onClick={() => setIsMenuOpen(false)} style={{ alignSelf: 'flex-end', cursor: 'pointer', color: '#1E293B', marginBottom: '20px' }}>
          <XMarkIcon width={30} />
        </div>

        <ul style={{ padding: 0, margin: 0 }}>
          {renderLinks(true)}
        </ul>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {!isLoggedIn ? (
            <>
              {/* Login now styled as a button on mobile */}
              <Link
                to="/login"
                style={styles.sidebarAuthBtn(location.pathname === '/login')}
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                style={styles.sidebarAuthBtn(location.pathname === '/register')}
                onClick={() => setIsMenuOpen(false)}
              >
                REGISTER
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" style={styles.sidebarLink('/profile')} onClick={() => setIsMenuOpen(false)}>My Profile</Link>
              <button onClick={handleLogout} style={{ ...styles.sidebarAuthBtn(false), backgroundColor: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d' }}>LOGOUT</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;