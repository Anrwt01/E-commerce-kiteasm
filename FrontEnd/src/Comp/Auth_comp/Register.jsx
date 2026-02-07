import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Refs for your form fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phone1Ref = useRef(null);
  const passwordRef = useRef(null);
  const houseRef = useRef(null);
  const galinoRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);
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
      const res = await axios.post(`${API_BASE_URL}/auth/register`, payload);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("role", res.data.user.role || "user");
        }
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kite-app-container">
      <style>{`
        :root {
          --manjha-red: #ff4757;
          --kite-blue: #2e86de;
          --sky-white: #f1f2f6;
        }

        .kite-app-container {
          position: relative;
          min-height: 100vh;
          background: var(--sky-white);
          overflow: hidden;
          padding: 60px 20px;
          font-family: 'Inter', sans-serif;
        }

        /* --- ANIMATED BACKGROUND LAYER --- */
        .sky-background {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        /* Floating Kites */
        .floating-kite {
          position: absolute;
          width: 50px;
          height: 50px;
          background: rgba(46, 134, 222, 0.15); /* Faint blue */
          transform: rotate(45deg);
          animation: floatAround 15s infinite ease-in-out;
        }

        .floating-kite::after {
          content: "";
          position: absolute;
          width: 1px;
          height: 200px;
          background: linear-gradient(to bottom, rgba(255, 71, 87, 0.3), transparent);
          transform: rotate(-45deg);
          top: 40px;
          left: 40px;
        }

        @keyframes floatAround {
          0%, 100% { transform: translate(0, 0) rotate(45deg); }
          25% { transform: translate(100px, 150px) rotate(55deg); }
          50% { transform: translate(-50px, 300px) rotate(35deg); }
          75% { transform: translate(150px, 450px) rotate(45deg); }
        }

        /* Winding Manjha Line Animation */
        .manjha-thread {
          position: absolute;
          width: 2px;
          height: 1000px;
          background: rgba(255, 71, 87, 0.05);
          left: 20%;
          transform: rotate(15deg);
          animation: windThread 10s infinite linear;
        }

        @keyframes windThread {
          from { transform: translateY(-200px) rotate(15deg); }
          to { transform: translateY(200px) rotate(15deg); }
        }

        /* --- FORM CONTENT LAYER --- */
        .content-layer {
          position: relative;
          z-index: 10; /* Sits above the kites */
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .glass-section {
          background: rgba(255, 255, 255, 0.6); /* Translucent */
          backdrop-filter: blur(12px); /* Blur makes the kites behind look dreamy */
          border-radius: 30px;
          padding: 40px;
          margin-bottom: 40px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 15px 35px rgba(0,0,0,0.03);
          transition: transform 0.3s ease;
        }

        .glass-section:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.8);
        }

        .section-number {
          background: var(--kite-blue);
          color: white;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-weight: 900;
          margin-bottom: 20px;
          box-shadow: 0 8px 15px rgba(46, 134, 222, 0.2);
        }

        .kite-input {
          width: 100%;
          padding: 16px;
          border-radius: 15px;
          border: 1px solid #dcdde1;
          background: white;
          outline: none;
          font-weight: 500;
          transition: border 0.3s;
        }

        .kite-input:focus {
          border-color: var(--manjha-red);
        }

        .launch-button {
          width: 100%;
          padding: 24px;
          background: #2f3542;
          color: white;
          border-radius: 20px;
          border: none;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .launch-button:hover {
          background: var(--manjha-red);
          box-shadow: 0 15px 30px rgba(255, 71, 87, 0.3);
        }
      `}</style>

      {/* Animated Sky Layer (Visible behind sections) */}
      <div className="sky-background">
        <div className="floating-kite" style={{ top: '10%', left: '10%', animationDelay: '0s' }}></div>
        <div className="floating-kite" style={{ top: '40%', right: '15%', animationDelay: '-5s', width: '30px', height: '30px' }}></div>
        <div className="floating-kite" style={{ bottom: '20%', left: '20%', animationDelay: '-2s', opacity: 0.1 }}></div>
        <div className="manjha-thread" style={{ left: '15%' }}></div>
        <div className="manjha-thread" style={{ right: '20%', left: 'auto', animationDelay: '-4s' }}></div>
      </div>

      {/* Foreground Content Layer */}
      <div className="content-layer">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>Registration</h1>
          {/* <p style={{ color: '#747d8c' }}>Prepare for the next big competition.</p> */}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Identity Section */}
          <div className="glass-section">
            <div className="section-number">01</div>
            <h3 style={{ marginBottom: '25px', letterSpacing: '1px' }}>User Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <input className="kite-input" placeholder="Name" ref={nameRef} required />
              <input className="kite-input" placeholder="Email" ref={emailRef} required />
              <input className="kite-input" placeholder="Password" type="password" ref={passwordRef} required />
              <input className="kite-input" placeholder="Mobile" ref={phone1Ref} required />
            </div>
          </div>

          {/* Location Section */}
          <div className="glass-section">
            <div className="section-number" style={{ background: 'var(--manjha-red)' }}>02</div>
            <h3 style={{ marginBottom: '25px', letterSpacing: '1px' }}>Address Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <input className="kite-input" placeholder="House/Flat No." ref={houseRef} required />
              <input className="kite-input" placeholder="Locality" ref={galinoRef} required />
              <input className="kite-input" placeholder="City" ref={cityRef} required />
              <input className="kite-input" placeholder="Pincode" ref={pincodeRef} required />
            </div>
          </div>

          <button type="submit" className="launch-button">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;