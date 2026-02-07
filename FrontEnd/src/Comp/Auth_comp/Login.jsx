import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { email: emailRef.current.value, password: passwordRef.current.value };

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, payload);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("role", res.data.user.role || "user");
        }
        navigate(res.data.user?.role === 'admin' ? "/admin" : "/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-sky-container">
      <style>{`
        :root {
          --manjha-thread: #ff4757;
          --kite-accent: #3b82f6;
          --sky-glow: #f8fafc;
        }

        .login-sky-container {
          background: var(--sky-glow);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* --- THE MANJHA THREADS (Background) --- */
        .thread-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .single-thread {
          position: absolute;
          background: linear-gradient(90deg, transparent, var(--manjha-thread), transparent);
          height: 1px;
          width: 200%;
          opacity: 0.1;
          transform: rotate(-15deg);
          animation: threadSlide 10s infinite linear;
        }

        @keyframes threadSlide {
          from { transform: translateX(-50%) rotate(-15deg); }
          to { transform: translateX(0%) rotate(-15deg); }
        }

        /* --- THE SPINNING CHARKHARI (REEL) LOADING --- */
        .charkhari-loader {
          width: 40px;
          height: 40px;
          border: 3px dashed var(--manjha-thread);
          border-radius: 50%;
          display: inline-block;
          animation: spin 2s infinite linear;
          position: relative;
          vertical-align: middle;
          margin-right: 15px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* --- THE FLOATING KITE (Hovering behind card) --- */
        .kite-shadow {
          position: absolute;
          width: 150px;
          height: 150px;
          background: var(--kite-accent);
          opacity: 0.03;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: kiteDrift 12s infinite ease-in-out;
          z-index: 1;
        }

        @keyframes kiteDrift {
          0%, 100% { transform: translate(-100px, -100px) rotate(0deg); }
          50% { transform: translate(100px, 100px) rotate(20deg); }
        }

        /* --- LOGIN CARD --- */
        .login-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          width: 100%;
          max-width: 420px;
          padding: 50px;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.05);
          z-index: 10;
          position: relative;
        }

        .input-box {
          position: relative;
          margin-bottom: 20px;
        }

        .input-field {
          width: 100%;
          padding: 18px 20px 18px 55px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          background: white;
          outline: none;
          transition: all 0.3s;
          font-weight: 600;
        }

        .input-field:focus {
          border-color: var(--kite-accent);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.05);
          transform: translateY(-2px);
        }

        .login-btn {
          width: 100%;
          padding: 20px;
          background: #1e293b;
          color: white;
          border-radius: 20px;
          border: none;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.4s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-btn:hover {
          background: var(--kite-accent);
          box-shadow: 0 15px 30px rgba(59, 130, 246, 0.3);
          transform: translateY(-3px);
        }
      `}</style>

      {/* Background Manjha Threads */}
      <div className="thread-overlay">
        <div className="single-thread" style={{ top: '20%' }}></div>
        <div className="single-thread" style={{ top: '50%', animationDelay: '-2s', opacity: 0.05 }}></div>
        <div className="single-thread" style={{ top: '80%', animationDelay: '-5s' }}></div>
      </div>

      {/* Floating Ghost Kite */}
      <div className="kite-shadow"></div>

      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontWeight: 900, fontSize: '2.5rem', marginBottom: '10px' }}>
            Sign In<span style={{ color: 'var(--manjha-thread)' }}>.</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Pull the strings of your data.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <Mail size={18} style={{ position: 'absolute', left: '22px', top: '50%', transform: 'translateY(-50%)', color: 'var(--kite-accent)' }} />
            <input className="input-field" type="email" placeholder="Email" ref={emailRef} required />
          </div>

          <div className="input-box">
            <Lock size={18} style={{ position: 'absolute', left: '22px', top: '50%', transform: 'translateY(-50%)', color: 'var(--kite-accent)' }} />
            <input className="input-field" type="password" placeholder="Password" ref={passwordRef} required />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '30px' }}>
            <Link to="/forgot" style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textDecoration: 'none' }}>
              Forgot PASSWORD?
            </Link>
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading && <span className="charkhari-loader"></span>}
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '30px' }}>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Not Yet Register? <Link to="/register" style={{ color: 'var(--kite-accent)', fontWeight: 800, textDecoration: 'none' }}>Register.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;