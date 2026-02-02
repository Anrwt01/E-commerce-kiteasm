import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, User, Mail, Calendar, ShieldCheck } from "lucide-react";

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
      fontFamily: '"Roboto", sans-serif'
    }}>
      INITIALIZING IDENTITY...
    </div>
  );

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: '"Roboto", sans-serif',
      padding: '0 5vw',
      overflowX: 'hidden',
      position: 'relative'
    },
    nav: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '30px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      color: '#fff'
    },
    main: {
      maxWidth: '1400px',
      margin: '60px auto 100px auto',
      display: 'grid',
      gap: '60px',
      alignItems: 'start'
    },
    nameTitle: {
      fontSize: 'clamp(40px, 12vw, 90px)',
      fontWeight: '200',
      letterSpacing: '-0.06em',
      lineHeight: '0.9',
      margin: '24px 0',
      textTransform: 'lowercase',
      background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    infoBox: {
      padding: '30px 0',
      borderBottom: '1px solid #222',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '9px',
      fontWeight: '900',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: '#666',
    },
    valText: {
      fontSize: 'clamp(18px, 4vw, 24px)',
      fontWeight: '300',
      letterSpacing: '-0.02em',
      color: '#fff',
      wordBreak: 'break-all'
    },
    btnBlack: (isHovered) => ({
      backgroundColor: isHovered ? '#fff' : '#000',
      color: isHovered ? '#000' : '#fff',
      padding: '20px 32px',
      border: '1px solid #fff',
      fontSize: '11px',
      fontWeight: 'bold',
      letterSpacing: '0.2em',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    }),
    btnOutline: (isHovered) => ({
      backgroundColor: isHovered ? '#fff' : 'transparent',
      color: isHovered ? '#000' : '#fff',
      padding: '20px 32px',
      border: '1px solid #444',
      fontSize: '11px',
      fontWeight: 'bold',
      letterSpacing: '0.2em',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }),
    bgText: {
      position: 'fixed',
      bottom: '-10px',
      left: '-10px',
      fontSize: 'clamp(60px, 20vw, 200px)',
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
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        /* Responsive Desktop */
        @media (min-width: 992px) {
            .profile-grid {
                grid-template-columns: 1fr 1.2fr !important;
                gap: 120px !important;
            }
            .sticky-left {
                position: sticky !important;
                top: 100px;
            }
        }
        /* Mobile Spacing */
        @media (max-width: 600px) {
            .nav-id { display: none !important; }
            .action-buttons { margin-top: 40px !important; }
        }
      `}</style>

      <nav style={styles.nav}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={16} /> INDEX
        </button>
        <div className="nav-id" style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.5em', color: '#fff' }}>
          00 — PROFILE
        </div>
      </nav>

      <main className="profile-grid" style={styles.main}>
        {/* Left Section */}
        <section className="sticky-left">
          <div style={styles.avatar}>
            <User size={20} color="#000" />
          </div>
          <h1 style={styles.nameTitle}>
            {user?.name?.split(' ')[0]} <br />
            <span style={{ fontWeight: '600', color: '#fff' }}>{user?.name?.split(' ')[1] || 'user'}</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '30px', height: '1px', backgroundColor: '#444' }} />
            <p style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666' }}>
              Verified Account
            </p>
          </div>
        </section>

        {/* Right Section */}
        <section style={{ zIndex: 1 }}>
          <div style={styles.infoBox}>
            <p style={styles.label}>Electronic Mail</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <p style={styles.valText}>{user?.email}</p>
              <Mail size={18} strokeWidth={1} color="#666" />
            </div>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.label}>Registration Date</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={styles.valText}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '---'}
              </p>
              <Calendar size={18} strokeWidth={1} color="#666" />
            </div>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.label}>Security Protocol</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={styles.valText}>End-to-End Encrypted</p>
              <ShieldCheck size={18} strokeWidth={1} color="#666" />
            </div>
          </div>

          <div className="action-buttons" style={{ marginTop: '60px', display: 'flex', gap: '16px', flexDirection: 'column' }}>
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