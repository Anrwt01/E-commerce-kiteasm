import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "120px",
        background: "#f5f5f5",
        color: "#666",
        padding: "60px 40px 40px",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        {/* BRAND */}
        <div>
          <h4 style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "1px",
            marginBottom: "20px",
            color: "#333",
            textTransform: "uppercase"
          }}>
            BRAND
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "12px" }}>
              <Link to="/about" style={{ color: "#666", textDecoration: "none", fontSize: "13px" }}>
                About us
              </Link>
            </li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h4 style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "1px",
            marginBottom: "20px",
            color: "#333",
            textTransform: "uppercase"
          }}>
            CUSTOMER CARE
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "12px" }}>
              <Link to="#" style={{ color: "#666", textDecoration: "none", fontSize: "13px" }}>
                FAQ
              </Link>
            </li>
            <li style={{ marginBottom: "12px" }}>
              <Link to="#" style={{ color: "#666", textDecoration: "none", fontSize: "13px" }}>
                Payment
              </Link>
            </li>
            <li style={{ marginBottom: "12px" }}>
              <Link to="#" style={{ color: "#666", textDecoration: "none", fontSize: "13px" }}>
                Shipping
              </Link>
            </li>
            <li style={{ marginBottom: "12px" }}>
              <Link to="#" style={{ color: "#666", textDecoration: "none", fontSize: "13px" }}>
                Returns
              </Link>
            </li>
            <li style={{ marginBottom: "12px" }}>
              <Link to="/contact" style={{ color: "#666", textDecoration: "none", fontSize: "13px" }}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT US */}
        <div>
          <h4 style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "1px",
            marginBottom: "20px",
            color: "#333",
            textTransform: "uppercase"
          }}>
            CONTACT US
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "12px", fontSize: "13px", color: "#666" }}>
              Call: +91 93150 14029 (toll free)
            </li>
            <li style={{ marginBottom: "12px", fontSize: "13px", color: "#666" }}>
              WhatsApp: +91 93150 14029
            </li>
            <li style={{ marginBottom: "12px", fontSize: "13px", color: "#666" }}>
              Email: support@kiteasm.com
            </li>
            <li style={{ marginBottom: "20px", fontSize: "13px", color: "#666" }}>
              Mon to Fri 11 PM - 7 AM (PST)
            </li>
            <li style={{ marginTop: "24px" }}>
              <h5 style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                marginBottom: "12px",
                color: "#333",
                textTransform: "uppercase"
              }}>
                MY ACCOUNT
              </h5>
              <Link to="/login" style={{ color: "#666", textDecoration: "none", fontSize: "13px", display: "block", marginBottom: "8px" }}>
                Log in
              </Link>
              <Link to="/register" style={{ color: "#666", textDecoration: "none", fontSize: "13px", display: "block" }}>
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "1px",
            marginBottom: "8px",
            color: "#333",
            textTransform: "uppercase"
          }}>
            SIGN UP TO OUR NEWSLETTER
          </h4>
          <p style={{ fontSize: "11px", color: "#666", marginBottom: "16px", letterSpacing: "0.5px" }}>
            TO STAY ON-TREND:
          </p>
          <div style={{ display: "flex", gap: "0" }}>
            <input
              type="email"
              placeholder="Your e-mail address"
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "13px",
                borderRadius: "0",
              }}
            />
            <button
              style={{
                padding: "10px 20px",
                background: "#333",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "40px",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <a
          href="https://www.youtube.com/@kiteasm"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <Youtube size={16} />
        </a>
        <a
          href="https://www.instagram.com/kiteasm"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <Instagram size={16} />
        </a>
        <a
          href="https://wa.me/919315014029"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <Phone size={16} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
