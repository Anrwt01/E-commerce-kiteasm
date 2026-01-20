import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", payload);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(error);
      alert("Cloud Connection Failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '20px', background: 'var(--gray-light)',
    border: '1px solid transparent', fontSize: '14px', outline: 'none',
    marginBottom: '20px'
  };

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', maxWidth: '500px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="serif" style={{ fontSize: '48px' }}>Welcome Back<span style={{ fontStyle: 'normal' }}>.</span></h1>
        <p className="text-xs text-muted uppercase tracking-widest" style={{ marginTop: '16px' }}>Sign in to access your flight locker</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email Address" ref={emailRef} required style={inputStyle} />
        <input type="password" placeholder="Password" ref={passwordRef} required style={inputStyle} />

        <div style={{ textAlign: 'right', marginBottom: '40px' }}>
          <Link to="#" className="text-xs text-muted uppercase tracking-widest">Forgot Access?</Link>
        </div>

        <button type="submit" disabled={loading} className="btn btn-black" style={{ width: '100%', padding: '24px' }}>
          {loading ? 'Verifying...' : 'Sign In'}
        </button>
      </form>

      <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid var(--gray-light)', paddingTop: '40px' }}>
        <p className="text-xs text-muted">New to the skies? <Link to="/register" style={{ color: 'black', fontWeight: 900 }}>Request Membership.</Link></p>
      </div>

      <p className="text-xs text-muted uppercase tracking-widest" style={{ textAlign: 'center', marginTop: '40px', fontSize: '9px', opacity: 0.5 }}>
        AERO KITES SECURE ACCESS PRO
      </p>
    </div>
  );
};

export default Login;
