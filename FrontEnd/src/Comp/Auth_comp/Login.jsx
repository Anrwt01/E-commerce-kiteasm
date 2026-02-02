import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, Mail, ShieldCheck } from "lucide-react";


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

        if (res.data.user?.role === 'admin') {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login Failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {

    wrapper: {
      backgroundColor: '#000000',

      // Pure black for professional theme
      minHeight: '100vh',
      paddingTop: '160px',
      paddingBottom: '100px',
      color: 'white',
      fontFamily: '"Roboto", sans-serif'
    },
    container: {
      maxWidth: '450px',
      margin: '0 auto',
      padding: '0 24px'
    },
    title: {
      fontSize: '48px',
      fontWeight: '900',
      marginBottom: '10px',
      letterSpacing: '-1.5px',
      color: '#ffffff' // White title
    },
    subtitle: {
      color: '#cccccc', // Light gray subtitle
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '50px',
      display: 'block'
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '18px 20px 18px 50px',
      background: 'rgba(255, 255, 255, 0.03)', // Subtle white overlay
      border: 'none',
      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      fontSize: '14px',
      outline: 'none',
      borderRadius: '12px',
      color: 'white',
      transition: 'all 0.3s ease'
    },
    inputIcon: {
      position: 'absolute',
      left: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#ffffff' // White icons
    },
    button: {
      width: '100%',
      padding: '18px',
      backgroundColor: '#ffffff', // White button
      color: '#000000', // Black text
      border: 'none',
      borderRadius: '12px',
      fontWeight: '800',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      cursor: loading ? 'not-allowed' : 'pointer',
      boxShadow: '0 10px 20px rgba(255, 255, 255, 0.2)', // White shadow
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
    <div style={styles.wrapper} className="login-wrapper">
      <style>{`
        @media (max-width: 500px) {
          h1 { font-size: 32px !important; }
          .login-wrapper { padding-top: 120px !important; }
        }
      `}</style>
      <div style={styles.container}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={styles.title}>Welcome Back<span style={{ color: '#cccccc' }}>.</span></h1> {/* Light gray dot */}
          <span style={styles.subtitle}></span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <Mail size={18} style={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email Address"
              ref={emailRef}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.boxShadow = 'inset 0 0 0 1px #ffffff'} // White focus border
              onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)'}
            />
          </div>

          <div style={styles.inputContainer}>
            <Lock size={18} style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.boxShadow = 'inset 0 0 0 1px #ffffff'} // White focus border
              onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)'}
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '30px' }}>
            <Link to="/forgot-password" style={{ fontSize: '11px', color: '#cccccc', textDecoration: 'none', fontWeight: '800', letterSpacing: '0.5px' }}> {/* Light gray link */}
              FORGOT ACCESS?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={{ fontSize: '14px', color: '#cccccc' }}> {/* Light gray text */}
            New to the skies? <Link to="/register" style={{ color: '#ffffff', fontWeight: 800, textDecoration: 'none' }}>Register Now.</Link> {/* White link */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;