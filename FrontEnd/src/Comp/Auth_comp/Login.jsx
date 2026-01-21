import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for smooth redirection

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
        // 1. Store Auth Data
        console.log(res)
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("role", JSON.stringify(res.data.user.role));
        }

        // 2. Redirect based on Role (Optional but recommended)
        // If your user object has a role, you can send admins to a different page
        if (res.data.user?.role === 'admin') {
          navigate("/admin");
        } else {
          navigate("/dashboard"); // Smooth redirect without page reload
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login Failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '20px', background: '#f8fafc',
    border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none',
    marginBottom: '20px', borderRadius: '8px'
  };

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="serif" style={{ fontSize: '48px', fontWeight: '900' }}>Welcome Back<span>.</span></h1>
        <p style={{ marginTop: '16px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Sign in to access your flight locker
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email Address" ref={emailRef} required style={inputStyle} />
        <input type="password" placeholder="Password" ref={passwordRef} required style={inputStyle} />

        <div style={{ textAlign: 'right', marginBottom: '40px' }}>
          <Link to="#" style={{ fontSize: '12px', color: '#64748b', textDecoration: 'none', textTransform: 'uppercase' }}>Forgot Access?</Link>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ 
            width: '100%', padding: '20px', backgroundColor: 'black', color: 'white', 
            border: 'none', borderRadius: '8px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Verifying...' : 'Sign In'}
        </button>
      </form>

      <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
        <p style={{ fontSize: '14px', color: '#64748b' }}>
          New to the skies? <Link to="/register" style={{ color: 'black', fontWeight: 900, textDecoration: 'none' }}>Request Membership.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;