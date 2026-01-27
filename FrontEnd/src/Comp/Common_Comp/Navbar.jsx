import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import kiteasm_logo from "../../assets/Photo/kiteasm_logo.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  // const [authState, setAuthState] = useState(getAuthFromStorage());
  const location = useLocation();
  const navigate = useNavigate();
   const [authState, setAuthState] = useState(getAuthFromStorage());
  // const isLoggedIn = !!authState.token;

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

  // const [authState, setAuthState] = useState(getAuthFromStorage());
  // const isLoggedIn = !!authState.token;
  const role = authState.role;
   const isLoggedIn = !!authState.token;

 useEffect(() => {
    // 2. This function re-checks the storage
    const syncAuth = () => {
      setAuthState(getAuthFromStorage());
    };

   
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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuthState({ token: null, role: null });
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const styles = {
    nav: {
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: scrolled ? '12px 24px' : '22px 24px',
      backgroundColor: scrolled ? '#000000' : '#000000', // Pure black for both states
      backdropFilter: 'blur(16px)', 
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
    },
    container: { 
      maxWidth: '1200px', margin: '0 auto', 
      display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
    },
    logo: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', 
      textDecoration: 'none', color: 'white', letterSpacing: '-0.5px'
    },
    logoImage: {
      height: scrolled ? '38px' : '46px', 
      width: scrolled ? '38px' : '46px',
      borderRadius: '50%', 
      objectFit: 'cover', 
      border: '2px solid #ffffff', // White border instead of blue
      transition: 'all 0.4s ease',
    },
    linksContainer: { 
      display: 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center'
    },
    link: (path) => ({ 
      fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.2px', 
      textDecoration: 'none', 
      color: location.pathname === path ? '#ffffff' : '#cccccc', // White for active, light gray for inactive
      transition: 'all 0.2s', whiteSpace: 'nowrap'
    }),
    authGroup: {
      display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', // Subtle white overlay
      padding: '4px 4px 4px 18px', borderRadius: '50px', gap: '15px',
      border: '1px solid rgba(255,255,255,0.1)'
    },
    iconStyle: {
      color: '#ffffff', // White icons
      display: 'flex',
      transition: 'color 0.2s'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <img src={kiteasm_logo} alt="Kiteasm" style={styles.logoImage} />
          <span style={{ color: '#cccccc' }}> {/* Light gray for logo text */}
            Kiteasm<span style={{ color: '#cccccc' }}>.</span>
          </span>
        </Link>

        <ul style={styles.linksContainer}>
          {!isLoggedIn ? (
            <>
              <li><Link to="/" style={styles.link('/')}>Home</Link></li>
              <li><Link to="/products" style={styles.link('/products')}>Products</Link></li>
              <li><Link to="/contact" style={styles.link('/contact')}>Contact</Link></li>
              <li><Link to="/about" style={styles.link('/about')}>About</Link></li>
            </>
          ) : role === "admin" ? (
            <>
              <li><Link to="/admin" style={styles.link('/admin')}>Admin Dashboard</Link></li>
              <li><Link to="/admin/orders" style={styles.link('/admin/orders')}>Orders</Link></li>
              <li><Link to="/admin/products" style={styles.link('/admin/products')}>Product</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard" style={styles.link('/dashboard')}>User Dashboard</Link></li>
              <li><Link to="/products" style={styles.link('/products')}>Products</Link></li>
              <li><Link to="/orders" style={styles.link('/orders')}>Orders</Link></li>
            </>
          )}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {(!isLoggedIn || role !== "admin") && (
            <Link to="/cart" style={styles.iconStyle}>
              <ShoppingBagIcon width={22} strokeWidth={2} />
            </Link>
          )}

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {role !== "admin" && (
                <Link to="/profile" style={styles.iconStyle}>
                  <UserIcon width={22} strokeWidth={2} />
                </Link>
              )}
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff' }}> {/* White logout icon */}
                <ArrowRightOnRectangleIcon width={22} strokeWidth={2} />
              </button>
            </div>
          ) : (
            <div style={styles.authGroup}>
              <Link to="/login" style={{ fontSize: '10px', fontWeight: '800', textDecoration: 'none', color: '#ffffff' }}>LOGIN</Link> {/* White text */}
              <Link to="/register" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '10px 22px', borderRadius: '50px', fontSize: '10px', fontWeight: '900', textDecoration: 'none' }}>REGISTER</Link> {/* White button with black text */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;