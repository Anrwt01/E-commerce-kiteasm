import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Phone, Send } from 'lucide-react';

const Footer = () => {
  const styles = {
    footer: {
      background: "#000000", // Pure black for consistency
      color: "#ffffff", // White text
      padding: "80px 40px 40px",
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      fontFamily: '"Inter", sans-serif'
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
      fontWeight: 800,
      letterSpacing: "2px",
      marginBottom: "25px",
      color: "#ffffff", // White title
      textTransform: "uppercase"
    },
    list: { listStyle: "none", padding: 0, margin: 0 },
    listItem: { marginBottom: "14px" },
    link: { 
      color: "#cccccc", // Light gray links
      textDecoration: "none", 
      fontSize: "13px",
      transition: "0.3s",
    },
    contactText: { marginBottom: "12px", fontSize: "13px", color: "#cccccc" }, // Light gray contact text
    inputGroup: { 
      display: "flex", 
      gap: "0", 
      marginTop: "15px",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "4px",
      overflow: "hidden"
    },
    input: {
      flex: 1,
      padding: "12px 15px",
      background: "rgba(255,255,255,0.03)", // Subtle overlay
      border: "none",
      outline: "none",
      fontSize: "13px",
      color: "#ffffff", // White text
    },
    button: {
      padding: "0 20px",
      background: "#ffffff", // White button
      color: "#000000", // Black text
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
      borderTop: "1px solid rgba(255,255,255,0.05)",
      display: "flex",
      justifyContent: "center",
      gap: "15px",
    },
    socialIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.05)", // Subtle overlay
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff", // White icons
      textDecoration: "none",
      transition: "0.3s",
      border: "1px solid rgba(255,255,255,0.1)"
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
                <Link to="#" style={styles.link}>{item}</Link>
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
            <li style={styles.contactText}>Mon to Fri 11 PM - 7 AM (IST)</li>
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
          <p style={{ fontSize: "11px", color: "#cccccc", marginBottom: "5px", letterSpacing: "1px" }}> {/* Light gray subtitle */}
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
        <a href="https://wa.me/9170111801" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
          <Phone size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;