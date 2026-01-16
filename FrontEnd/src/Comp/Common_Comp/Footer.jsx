import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section">
          <h2 className="footer-logo">KiteAsm</h2>
          <p className="footer-text">
            Elevating your shopping experience with premium quality, speed, and trust.
            The future of e-commerce is here.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {/* Added shop placeholder if route doesn't exist yet */}
            <li><Link to="/shop">Shop Collection</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns & Exchange</Link></li>
            <li><Link to="/faq">Help Center</Link></li>
          </ul>
        </div>

        {/* Contact Status */}
        <div className="footer-section">
          <h3>Get in Touch</h3>
          <p>📍 New Delhi, India</p>
          <p>📞 +91 93150 14029</p>
          <p>✉️ support@kiteasm.com</p>

          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">🌐</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} KiteAsm. All rights reserved. Designed with ❤️.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
