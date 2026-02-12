import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Phone, Send } from 'lucide-react';

const Footer = () => {
  const styles = {
    footer: {
      background: "var(--bg-base)", // Light background
      color: "var(--slate-800)", // Dark text
      padding: "80px 40px 40px",
      borderTop: "1px solid var(--border-soft)",
      fontFamily: 'var(--font-sans)'
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      marginBottom: "60px",
    },
    title: {
      fontSize: "11px",
      fontWeight: 900,
      letterSpacing: "2px",
      marginBottom: "25px",
      color: "var(--slate-800)",
      textTransform: "uppercase"
    },
    list: { listStyle: "none", padding: 0, margin: 0 },
    listItem: { marginBottom: "14px" },
    link: {
      color: "var(--slate-600)",
      textDecoration: "none",
      fontSize: "13px",
      transition: "0.3s",
      fontWeight: '600'
    },
    contactText: { marginBottom: "12px", fontSize: "13px", color: "var(--slate-600)", fontWeight: '500' },
    inputGroup: {
      display: "flex",
      gap: "0",
      marginTop: "15px",
      border: "1px solid var(--border-soft)",
      borderRadius: "12px",
      overflow: "hidden",
      background: "var(--bg-card)",
      boxShadow: "var(--shadow-sm)"
    },
    input: {
      flex: 1,
      padding: "12px 15px",
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: "13px",
      color: "var(--slate-800)",
    },
    button: {
      padding: "0 20px",
      background: "var(--slate-800)",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "0.3s"
    },
    socialBar: {
      maxWidth: "1200px",
      margin: "0 auto",
      paddingTop: "40px",
      borderTop: "1px solid var(--border-soft)",
      display: "flex",
      justifyContent: "center",
      gap: "15px",
    },
    socialIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "var(--bg-card)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--slate-600)",
      textDecoration: "none",
      transition: "0.4s cubic-bezier(0.19, 1, 0.22, 1)",
      border: "1px solid var(--border-soft)",
      boxShadow: "var(--shadow-sm)"
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* BRAND */}
        <div>
          <h4 style={styles.title}>BRAND</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <Link to="/about" style={styles.link}>About us</Link>
            </li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h4 style={styles.title}>CUSTOMER CARE</h4>
          <ul style={styles.list}>
            {["FAQ", "Payment", "Shipping", "Returns"].map(item => (
              <li key={item} style={styles.listItem}>
                <Link to="/about" style={styles.link}>{item}</Link>
              </li>
            ))}
            <li style={styles.listItem}>
              <Link to="/contact" style={styles.link}>Contact</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT US */}
        <div>
          <h4 style={styles.title}>CONTACT US</h4>
          <ul style={styles.list}>
            <li style={styles.contactText}>Call: +91 7011001801 (toll free)</li>
            <li style={styles.contactText}>WhatsApp: +91 7011001801</li>
            <li style={styles.contactText}>Email: kiteasm01@gmail.com</li>
            <li style={styles.contactText}>Mon to Sat 11 PM - 7 AM (IST)</li>
            <li style={{ marginTop: "30px" }}>
              <h5 style={styles.title}>MY ACCOUNT</h5>
              <Link to="/login" style={{ ...styles.link, display: "block", marginBottom: "8px" }}>Log in</Link>
              <Link to="/register" style={{ ...styles.link, display: "block" }}>Register</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={styles.title}>NEWSLETTER</h4>
          <p style={{ fontSize: "11px", color: "var(--slate-400)", marginBottom: "5px", letterSpacing: "1px" }}> {/* Subtle subtitle */}
            STAY ON-TREND:
          </p>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Your e-mail address"
              style={styles.input}
            />
            <button style={styles.button}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div style={styles.socialBar}>
        <a href="https://www.youtube.com/@RioTheExplorer" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
          <Youtube size={18} />
        </a>
        <a href="https://www.instagram.com/kiteasm" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
          <Instagram size={18} />
        </a>
        <a href="https://wa.me/917011001801" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
          <Phone size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;