import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, User, Mail, Calendar, ShieldCheck, ExternalLink } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/user/Details", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) setUser(data.user);
      } catch (err) {
        console.error("Auth Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#000', 
      color: '#fff', 
      letterSpacing: '0.5em', 
      fontSize: '10px', 
      fontWeight: 'bold',
      fontFamily: '"Inter", -apple-system, sans-serif'
    }}>
      INITIALIZING IDENTITY...
    </div>
  );

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: '"Inter", -apple-system, sans-serif',
      padding: '0 5vw',
      overflowX: 'hidden',
      position: 'relative'
    },
    nav: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: '1px solid #333'
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.1em',
      transition: 'all 0.3s ease',
      color: '#fff'
    },
    main: {
      maxWidth: '1400px',
      margin: '100px auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: '120px',
      alignItems: 'start'
    },
    nameTitle: {
      fontSize: 'clamp(48px, 8vw, 90px)',
      fontWeight: '200',
      letterSpacing: '-0.06em',
      lineHeight: '0.85',
      margin: '40px 0',
      textTransform: 'lowercase',
      background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    infoBox: {
      padding: '40px 0',
      borderBottom: '1px solid #333',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      transition: 'all 0.4s ease'
    },
    label: {
      fontSize: '9px',
      fontWeight: '900',
      letterSpacing: '0.4em',
      textTransform: 'uppercase',
      color: '#aaa',
      opacity: 0.7
    },
    btnBlack: (isHovered) => ({
      backgroundColor: isHovered ? '#fff' : '#000',
      color: isHovered ? '#000' : '#fff',
      padding: '24px 48px',
      border: '1px solid #fff',
      fontSize: '11px',
      fontWeight: 'bold',
      letterSpacing: '0.2em',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: isHovered ? 'translateY(-2px)' : 'none',
      boxShadow: isHovered ? '0 10px 20px rgba(255,255,255,0.1)' : 'none'
    }),
    btnOutline: (isHovered) => ({
      backgroundColor: isHovered ? '#fff' : 'transparent',
      color: isHovered ? '#000' : '#fff',
      padding: '24px 48px',
      border: '1px solid #fff',
      fontSize: '11px',
      fontWeight: 'bold',
      letterSpacing: '0.2em',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }),
    bgText: {
      position: 'fixed',
      bottom: '-30px',
      left: '-10px',
      fontSize: '200px',
      fontWeight: '900',
      color: '#fff',
      opacity: '0.03',
      pointerEvents: 'none',
      zIndex: 0,
      userSelect: 'none'
    },
    avatar: {
      width: '40px',
      height: '40px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    verifiedLine: {
      width: '30px',
      height: '1px',
      backgroundColor: '#fff'
    },
    verifiedText: {
      fontSize: '10px',
      fontWeight: 'bold',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#fff'
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <button 
          style={styles.backBtn} 
          onClick={() => navigate("/dashboard")}
          onMouseEnter={(e) => e.target.style.opacity = '0.5'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          <ArrowLeft size={16} /> INDEX
        </button>
        <div style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.5em', color: '#fff' }}>
          00 — PROFILE
        </div>
      </nav>

      <main style={styles.main}>
        {/* Left: Branding & Name */}
        <section style={{ position: 'sticky', top: '100px' }}>
          <div style={styles.avatar}>
            <User size={20} color="#000" />
          </div>
          <h1 style={styles.nameTitle}>
            {user?.name?.split(' ')[0]} <br />
            <span style={{ fontWeight: '600', color: '#fff' }}>{user?.name?.split(' ')[1] || 'user'}</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={styles.verifiedLine} />
            <p style={styles.verifiedText}>
              Verified Account
            </p>
          </div>
        </section>

        {/* Right: Detailed Information */}
        <section style={{ zIndex: 1 }}>
          <div style={styles.infoBox}>
            <p style={styles.label}>Electronic Mail</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: '300', letterSpacing: '-0.02em', color: '#fff' }}>{user?.email}</p>
              <Mail size={18} strokeWidth={1} color="#fff" />
            </div>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.label}>Registration Date</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: '300', letterSpacing: '-0.02em', color: '#fff' }}>
                {new Date(user?.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
              <Calendar size={18} strokeWidth={1} color="#fff" />
            </div>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.label}>Security Protocol</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: '300', letterSpacing: '-0.02em', color: '#fff' }}>End-to-End Encrypted</p>
              <ShieldCheck size={18} strokeWidth={1} color="#fff" />
            </div>
          </div>

          <div style={{ marginTop: '80px', display: 'flex', gap: '20px', flexDirection: 'column' }}>
            <button 
              onMouseEnter={() => setHoveredBtn('history')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={styles.btnBlack(hoveredBtn === 'history')} 
              onClick={() => navigate("/orders")}
            >
              VIEW ORDER HISTORY
            </button>
            <button 
              onMouseEnter={() => setHoveredBtn('edit')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={styles.btnOutline(hoveredBtn === 'edit')}
              onClick={() => navigate("/user/update")}
            >
              EDIT ACCOUNT DETAILS
            </button>
          </div>
        </section>
      </main>

      <h2 style={styles.bgText}>KITEASM</h2>
    </div>
  );
};

export default Profile;