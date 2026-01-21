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
          localStorage.setItem("role", JSON.stringify(res.data.user.role));
        }
        // Smooth redirect to dashboard
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

  const inputStyle = {
    width: '100%', 
    padding: '18px', 
    background: '#f8fafc',
    border: '1px solid #e2e8f0', 
    fontSize: '14px', 
    outline: 'none',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  };

  return (
    <div className="register-wrapper" style={{ paddingTop: '100px', paddingBottom: '100px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', letterSpacing: '-0.02em' }}>
          Join the Fleet<span>.</span>
        </h1>
        <p style={{ marginTop: '16px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Apply for executive membership
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        
        {/* Section 01: Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#0f172a' }}>01. Identity</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          </div>
          <div className="form-grid">
            <input type="text" placeholder="Full Name" ref={nameRef} required style={inputStyle} />
            <input type="email" placeholder="Email Address" ref={emailRef} required style={inputStyle} />
          </div>
          <div className="form-grid">
            <input type="text" placeholder="Phone" ref={phone1Ref} required pattern="[0-9]{10}" style={inputStyle} />
            <input type="password" placeholder="Access Password" ref={passwordRef} required minLength={6} style={inputStyle} />
          </div>
        </div>

        {/* Section 02: Coordinates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#0f172a' }}>02. Coordinates</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          </div>
          <div className="form-grid">
            <input type="text" placeholder="House / Flat No" ref={houseRef} required style={inputStyle} />
            <input type="text" placeholder="Locality / Area" ref={galinoRef} required style={inputStyle} />
          </div>
          <div className="form-grid-three">
            <input type="text" placeholder="City" ref={cityRef} required style={inputStyle} />
            <input type="text" placeholder="State" ref={stateRef} required style={inputStyle} />
            <input type="text" placeholder="Pincode" ref={pincodeRef} required pattern="[0-9]{6}" style={inputStyle} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ 
            padding: '24px', 
            backgroundColor: '#0f172a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            fontWeight: '700', 
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s'
          }}
        >
          {loading ? 'Transmitting...' : 'Confirm Membership'}
        </button>
      </form>

      <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
        <p style={{ fontSize: '14px', color: '#64748b' }}>
          Already a member? <Link to="/login" style={{ color: 'black', fontWeight: 900, textDecoration: 'none' }}>Sign In.</Link>
        </p>
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
          border-color: #0ea5e9 !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Register;