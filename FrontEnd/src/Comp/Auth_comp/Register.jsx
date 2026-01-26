import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phone1Ref = useRef(null);
  const passwordRef = useRef(null);
  const houseRef = useRef(null);
  const galinoRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone1: phone1Ref.current.value,
      password: passwordRef.current.value,
      address: [
        {
          house: houseRef.current.value,
          galino: galinoRef.current.value,
          city: cityRef.current.value,
          state: stateRef.current.value,
          pincode: pincodeRef.current.value
        }
      ]
    };

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", payload);
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Membership application failed.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    wrapper: {
      backgroundColor: '#000000', // Pure black for professional theme
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '100px',
      color: '#ffffff', // White text
      fontFamily: 'sans-serif' // Changed to normal font
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 20px',
    },
    title: {
      fontSize: 'clamp(32px, 5vw, 48px)',
      fontWeight: '900',
      letterSpacing: '-0.03em',
      marginBottom: '10px',
      color: '#ffffff' // White title
    },
    sectionLabel: {
      fontSize: '12px',
      fontWeight: 900,
      textTransform: 'uppercase',
      color: '#ffffff', // White section labels instead of blue
      letterSpacing: '2px'
    },
    divider: {
      flex: 1,
      height: '1px',
      background: 'rgba(255,255,255,0.08)'
    },
    inputStyle: {
      width: '100%',
      padding: '18px',
      background: 'rgba(255, 255, 255, 0.03)', // Subtle white overlay
      border: 'none',
      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      fontSize: '14px',
      outline: 'none',
      borderRadius: '12px',
      color: '#ffffff', // White text
      transition: 'all 0.3s ease'
    },
    submitBtn: {
      padding: '24px',
      backgroundColor: '#ffffff', // White button
      color: '#000000', // Black text
      border: 'none',
      borderRadius: '16px',
      fontWeight: '800',
      fontSize: '16px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      cursor: loading ? 'not-allowed' : 'pointer',
      boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)', // White shadow
      transition: 'all 0.3s ease'
    },
    footer: {
      marginTop: '60px',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      paddingTop: '40px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={styles.title}>Register<span style={{color: '#cccccc'}}>.</span></h1> {/* Light gray dot */}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          
          {/* Section 01: Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={styles.sectionLabel}>01. Identity</span>
              <div style={styles.divider}></div>
            </div>
            <div className="form-grid">
              <input type="text" placeholder="Full Name" ref={nameRef} required style={styles.inputStyle} />
              <input type="email" placeholder="Email Address" ref={emailRef} required style={styles.inputStyle} />
            </div>
            <div className="form-grid">
              <input type="text" placeholder="Phone" ref={phone1Ref} required pattern="[0-9]{10}" style={styles.inputStyle} />
              <input type="password" placeholder="Password" ref={passwordRef} required minLength={6} style={styles.inputStyle} />
            </div>
          </div>

          {/* Section 02: Coordinates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={styles.sectionLabel}>02. Coordinates</span>
              <div style={styles.divider}></div>
            </div>
            <div className="form-grid">
              <input type="text" placeholder="House / Flat No" ref={houseRef} required style={styles.inputStyle} />
              <input type="text" placeholder="Locality / Area" ref={galinoRef} required style={styles.inputStyle} />
            </div>
            <div className="form-grid-three">
              <input type="text" placeholder="City" ref={cityRef} required style={styles.inputStyle} />
              <input type="text" placeholder="State" ref={stateRef} required style={styles.inputStyle} />
              <input type="text" placeholder="Pincode" ref={pincodeRef} required pattern="[0-9]{6}" style={styles.inputStyle} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={styles.submitBtn}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
          >
            {loading ? 'Transmitting Data...' : 'Confirm Membership'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={{ fontSize: '14px', color: '#cccccc' }}> {/* Light gray text */}
            Already a member? <Link to="/login" style={{ color: '#ffffff', fontWeight: 900, textDecoration: 'none' }}>Sign In.</Link> {/* White link */}
          </p>
        </div>
      </div>

      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-grid-three {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .form-grid, .form-grid-three {
            grid-template-columns: 1fr;
          }
        }
        input:focus {
          box-shadow: inset 0 0 0 1px #ffffff !important; /* White focus border */
          background: rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
    </div>
  );
};

export default Register;