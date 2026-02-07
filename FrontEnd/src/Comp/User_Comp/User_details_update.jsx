import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, MapPin, Save, Loader2 } from "lucide-react";

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
    maxWidth: 800,
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
  mainTitle: {
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    fontWeight: 900,
    marginTop: 10,
    letterSpacing: '-2px',
    color: 'var(--slate-800)'
  },
  subtitle: {
    color: 'var(--slate-600)',
    marginTop: 8,
    fontSize: 16
  },
  sectionCard: {
    background: 'var(--bg-card)',
    padding: '48px',
    borderRadius: 40,
    border: '1px solid var(--border-soft)',
    boxShadow: 'var(--shadow-floating)',
    marginBottom: 40
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px'
  },
  label: {
    fontSize: '10px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  input: {
    padding: '20px 24px',
    borderRadius: '20px',
    border: '1px solid var(--border-soft)',
    outline: 'none',
    fontSize: '15px',
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
    fontWeight: '600',
    transition: '0.3s',
    color: 'var(--slate-800)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  btnPrimary: {
    backgroundColor: 'var(--accent)',
    color: '#fff',
    padding: '22px',
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
    width: '100%',
    marginTop: '20px'
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
};

const User_details_update = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const nameRef = useRef(null);
  const phone2Ref = useRef(null);
  const houseRef = useRef(null);
  const galinoRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchCurrentDetails();
    }
  }, [navigate]);

  const fetchCurrentDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/user/details`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const user = res.data.user;
        const addr = user.address?.[0] || {};

        if (nameRef.current) nameRef.current.value = user.name || "";
        if (phone2Ref.current) phone2Ref.current.value = user.phone2 || "";
        if (houseRef.current) houseRef.current.value = addr.house || "";
        if (galinoRef.current) galinoRef.current.value = addr.galino || addr.Galino || "";
        if (cityRef.current) cityRef.current.value = addr.city || "";
        if (stateRef.current) stateRef.current.value = addr.state || "";
        if (pincodeRef.current) pincodeRef.current.value = addr.pincode || "";
      }
    } catch (error) {
      console.error("Error fetching prefill data:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: nameRef.current.value,
      phone2: phone2Ref.current.value || null,
      address: [{
        house: houseRef.current.value,
        galino: galinoRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        pincode: pincodeRef.current.value
      }]
    };

    try {
      await axios.put(`${API_BASE_URL}/user/profile/update`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: 'var(--accent)' }}>RETRIEVING PILOT PROFILE...</div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/profile")}
        >
          <ArrowLeft size={16} /> Back to Identity
        </button>

        <header style={{ marginBottom: 60 }}>
          <h1 style={styles.mainTitle}>User Profile<span style={{ color: 'var(--accent)' }}>.</span></h1>
          <p style={styles.subtitle}>Update your data and contact.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div style={styles.sectionCard}>
            <div style={styles.inputGroup}>
              <span style={styles.label}><User size={12} /> Identity </span>
              <div style={styles.grid}>
                <input type="text" placeholder="Full Name" ref={nameRef} required style={styles.input} />
                <input type="text" placeholder="Backup Phone Node" ref={phone2Ref} pattern="[0-9]{10}" style={styles.input} />
              </div>
            </div>

            <div style={{ ...styles.inputGroup, marginBottom: '40px' }}>
              <span style={styles.label}><MapPin size={12} /> Deployment </span>
              <div style={{ ...styles.grid, marginBottom: '24px' }}>
                <input type="text" placeholder="House / Flat No" ref={houseRef} required style={styles.input} />
                <input type="text" placeholder="Gali / Locality" ref={galinoRef} required style={styles.input} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                <input type="text" placeholder="City" ref={cityRef} required style={styles.input} />
                <input type="text" placeholder="State" ref={stateRef} required style={styles.input} />
                <input type="text" placeholder="Pincode" ref={pincodeRef} required style={styles.input} />
              </div>
            </div>

            <button type="submit" disabled={loading} style={styles.btnPrimary}>
              {loading ? <Loader2 size={20} className="animate-spin" /> : <><Save size={18} /> SAVE CHANGES</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User_details_update;