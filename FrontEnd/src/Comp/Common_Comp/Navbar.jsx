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

 const getAuthFromStorage = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  // 1. If no user data exists, return null values early
  if (!userData) return { token: null, role: null };

  try {
    // 2. You MUST parse the whole string first
    const parsedUser = JSON.parse(userData);
    
    // 3. Now you can access the role property
    const role = parsedUser.role; 
    
    return { token, role };
  } catch (err) {
    console.error("Error parsing user from storage:", err);
    return { token, role: null };
  }
};

   
  // 2. Auth State
  const [authState, setAuthState] = useState(getAuthFromStorage());

  // Derived variables (automatic)
  const isLoggedIn = !!authState.token;
  const role = authState.role;
  console.log(authState)

  // 3. EFFECT: This is the "Automatic Sync" 
  useEffect(() => {
    const handleAuthChange = () => {
      console.log("Auth changed! Updating Navbar...");
      setAuthState(getAuthFromStorage()); // This triggers the re-render
    };

    window.addEventListener('storage', handleAuthChange); // Updates if changed in another tab
    window.addEventListener('authChange', handleAuthChange); // Updates if changed in this tab

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuthState({ token: null, role: null });
    window.dispatchEvent(new Event("authChange")); // Notify the app
    navigate("/login");
  };

  const styles = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: scrolled ? '15px 24px' : '25px 24px',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
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
      display: 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center'
    },
    link: (path) => ({ 
      fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', 
      textDecoration: 'none', color: location.pathname === path ? '#0ea5e9' : '#64748b',
      transition: 'color 0.2s', whiteSpace: 'nowrap'
    }),
    authGroup: {
      display: 'flex', alignItems: 'center', backgroundColor: '#0f172a',
      padding: '4px 4px 4px 18px', borderRadius: '50px', gap: '15px'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          AERO KITES<span style={{ color: '#0ea5e9' }}>.</span>
        </Link>

        {/* --- CONDITIONAL LINKS START --- */}
        <ul style={styles.linksContainer}>
          {!isLoggedIn ? (
            <>
              <li><Link to="/" style={styles.link('/')}>Home</Link></li>
              <li><Link to="/products" style={styles.link('/products')}>Products</Link></li>
              <li><Link to="/contact" style={styles.link('/contact')}>Contact</Link></li>
              <li><Link to="/about" style={styles.link('/about')}>About</Link></li>
            </>
          ) : role === "admin"  ? (
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
        {/* --- CONDITIONAL LINKS END --- */}

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {(!isLoggedIn || role !== "admin") && (
            <Link to="/cart" style={{ color: '#0f172a', display: 'flex' }}>
              <ShoppingBagIcon width={22} strokeWidth={2} />
            </Link>
          )}

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {role !== "admin" && (
                <Link to="/profile" style={{ color: '#0f172a', display: 'flex' }}>
                  <UserIcon width={22} strokeWidth={2} />
                </Link>
              )}
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                <ArrowRightOnRectangleIcon width={22} strokeWidth={2} />
              </button>
            </div>
          ) : (
            <div style={styles.authGroup}>
              <Link to="/login" style={{ fontSize: '10px', fontWeight: '800', textDecoration: 'none', color: 'white' }}>LOGIN</Link>
              <Link to="/register" style={{ backgroundColor: 'white', color: '#0f172a', padding: '10px 22px', borderRadius: '50px', fontSize: '10px', fontWeight: '900', textDecoration: 'none' }}>REGISTER</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;