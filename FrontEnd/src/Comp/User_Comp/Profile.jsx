import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { ArrowLeft, User, Mail, Calendar, ShieldCheck, ChevronRight } from "lucide-react";

// Define styles object with Anti-Gravity aesthetic
const styles = {
  page: {
    background: "var(--bg-base)",
    minHeight: "100vh",
    padding: "140px 16px 80px",
    color: "var(--slate-800)",
    fontFamily: "var(--font-sans)"
  },
  container: {
    maxWidth: 1000,
    margin: "0 auto"
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    border: 'none',
    background: 'none',
    fontSize: 11,
    fontWeight: 900,
    color: 'var(--slate-400)',
    cursor: 'pointer',
    marginBottom: 24,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: '0.3s'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: 80,
    alignItems: 'start'
  },
  mainTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
    fontWeight: 900,
    marginTop: 10,
    letterSpacing: '-3px',
    color: 'var(--slate-800)',
    lineHeight: '1',
    marginBottom: '40px'
  },
  subtitle: {
    color: 'var(--slate-600)',
    marginTop: 8,
    fontSize: 16,
    lineHeight: '1.6'
  },
  sectionCard: {
    background: 'var(--bg-card)',
    padding: '48px',
    borderRadius: 40,
    border: '1px solid var(--border-soft)',
    boxShadow: 'var(--shadow-floating)',
  },
  infoBox: {
    padding: '32px 0',
    borderBottom: '1px solid var(--border-soft)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  label: {
    fontSize: '10px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--slate-400)',
  },
  valText: {
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    color: 'var(--slate-800)',
  },
  btnPrimary: {
    backgroundColor: 'var(--accent)',
    color: '#fff',
    padding: '22px 32px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
    transition: '0.4s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%'
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: 'var(--slate-600)',
    padding: '20px 32px',
    borderRadius: '20px',
    border: '1px solid var(--border-soft)',
    fontSize: '11px',
    fontWeight: '900',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: '0.3s',
    width: '100%'
  },
  avatar: {
    width: '64px',
    height: '64px',
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px'
  }
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE_URL}/user/Details`, {
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
    <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: 'var(--accent)' }}>INITIALIZING IDENTITY...</div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <main style={styles.layout}>
          {/* Left Section */}
          <section>
            <div style={styles.avatar}>
              <User size={32} color="var(--accent)" />
            </div>
            <h1 style={styles.mainTitle}>
              {user?.name?.split(' ')[0]} <br />
              <span style={{ color: 'var(--accent)' }}>{user?.name?.split(' ')[1] || 'Pilot'}</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--border-soft)' }} />
              <p style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--slate-400)' }}>
                CERTIFIED PILOT STATUS
              </p>
            </div>
          </section>

          {/* Right Section */}
          <section>
            <div style={styles.sectionCard}>
              <div style={styles.infoBox}>
                <p style={styles.label}>Electronic Mail</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={styles.valText}>{user?.email}</p>
                  <Mail size={18} color="var(--slate-200)" />
                </div>
              </div>

              <div style={styles.infoBox}>
                <p style={styles.label}>Registration Log</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={styles.valText}>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '---'}
                  </p>
                  <Calendar size={18} color="var(--slate-200)" />
                </div>
              </div>

              <div style={{ ...styles.infoBox, borderBottom: 'none', marginBottom: '40px' }}>
                <p style={styles.label}>Access Protocol</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={styles.valText}>Secure Transmission</p>
                  <ShieldCheck size={18} color="var(--slate-200)" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                  style={styles.btnPrimary}
                  onClick={() => navigate("/orders")}
                >
                  VIEW SHIPMENT HISTORY <ChevronRight size={16} />
                </button>
                <button
                  style={styles.btnSecondary}
                  onClick={() => navigate("/user/update")}
                >
                  UPDATE PILOT PROFILE
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;