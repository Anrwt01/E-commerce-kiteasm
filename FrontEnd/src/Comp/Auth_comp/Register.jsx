import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phone1Ref = useRef(null);
  const phone2Ref = useRef(null);
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
      phone2: phone2Ref.current.value || null,
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
        window.location.href = "/dashboard";
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
    width: '100%', padding: '20px', background: 'var(--gray-light)',
    border: '1px solid transparent', fontSize: '14px', outline: 'none',
    transition: 'border 0.3s'
  };

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 className="serif" style={{ fontSize: '48px' }}>Join the Fleet<span style={{ fontStyle: 'normal' }}>.</span></h1>
        <p className="text-xs text-muted uppercase tracking-widest" style={{ marginTop: '16px' }}>Apply for executive membership</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {/* Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span className="text-xs uppercase tracking-widest" style={{ fontWeight: 900 }}>01. Identity</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--gray-light)' }}></div>
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <input type="text" placeholder="Full Name" ref={nameRef} required style={inputStyle} />
            <input type="email" placeholder="Email Address" ref={emailRef} required style={inputStyle} />
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <input type="text" placeholder="Phone" ref={phone1Ref} required pattern="[0-9]{10}" style={inputStyle} />
            <input type="password" placeholder="Access Password" ref={passwordRef} required minLength={6} style={inputStyle} />
          </div>
        </div>

        {/* Base Coordinates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span className="text-xs uppercase tracking-widest" style={{ fontWeight: 900 }}>02. Coordinates</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--gray-light)' }}></div>
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <input type="text" placeholder="House / Flat No" ref={houseRef} required style={inputStyle} />
            <input type="text" placeholder="Locality" ref={galinoRef} required style={inputStyle} />
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <input type="text" placeholder="City" ref={cityRef} required style={inputStyle} />
            <input type="text" placeholder="State" ref={stateRef} required style={inputStyle} />
            <input type="text" placeholder="Pincode" ref={pincodeRef} required pattern="[0-9]{6}" style={inputStyle} />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn btn-black" style={{ padding: '24px' }}>
          {loading ? 'Transmitting...' : 'Confirm Membership'}
        </button>
      </form>

      <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid var(--gray-light)', paddingTop: '40px' }}>
        <p className="text-xs text-muted">Already a member? <Link to="/login" style={{ color: 'black', fontWeight: 900 }}>Sign In.</Link></p>
      </div>
    </div>
  );
};

export default Register;
