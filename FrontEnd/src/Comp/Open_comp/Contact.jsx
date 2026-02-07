import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { Mail, Phone, MapPin, Send, Globe, Zap, ShieldCheck } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/contact`, formData);
      alert("Message transmitted successfully!");
      setFormData({ email: "", message: "" });
    } catch (error) {
      console.error("Contact error:", error);
      alert("Transmission failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      backgroundColor: 'var(--bg-base)',
      color: 'var(--slate-800)',
      minHeight: '100vh',
      fontFamily: 'var(--font-sans)',
      overflowX: 'hidden'
    },
    section: { maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' },
    gradientText: {
      color: 'var(--slate-800)',
      fontWeight: '800'
    },
    input: {
      width: '100%',
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-soft)',
      borderRadius: '16px',
      padding: '18px',
      outline: 'none',
      color: 'var(--slate-800)',
      fontSize: '15px',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      boxShadow: 'var(--shadow-sm)'
    },
    infoCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '30px',
      padding: '24px',
      background: 'var(--bg-card)',
      borderRadius: '24px',
      border: '1px solid var(--border-soft)',
      boxShadow: 'var(--shadow-floating)'
    },
    statusCard: {
      position: 'relative',
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-xl)',
      padding: '60px 40px',
      border: '1px solid var(--border-soft)',
      textAlign: 'center',
      boxShadow: 'var(--shadow-floating)'
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. HERO SPLIT SECTION */}
      <section style={{ ...styles.section, paddingTop: '160px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center' }}>

          {/* Left: Contact Info */}
          <div>
            <h1 style={{ ...styles.gradientText, fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: '1.1', marginBottom: '30px', letterSpacing: '-2px' }}>
              Make <br />Contact<span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
            <p style={{ color: 'var(--slate-600)', fontSize: '18px', lineHeight: '1.7', marginBottom: '45px', maxWidth: '500px' }}>
              Have a custom request or project? Our mission-driven team is standing by to assist.
            </p>

            <div>
              <div style={styles.infoCard}>
                <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: 'var(--accent)' }}><Mail size={24} /></div>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '18px', color: 'var(--slate-800)' }}>kiteasm01@gmail.com</p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: 'var(--accent)' }}><Phone size={22} /></div>
                <div>
                  <p style={{ fontSize: '10px', color: 'var(--slate-400)', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Voice Frequency</p>
                  <p style={{ fontWeight: '700', fontSize: '18px', color: 'var(--slate-800)' }}>+91 70111801</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Decorative Status Card */}
          <div style={styles.statusCard}>
            <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 12px #10B981' }} />
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--slate-600)' }}>SYSTEMS ONLINE</span>
            </div>

            <Globe size={60} color="var(--accent)" style={{ marginBottom: '25px', opacity: 0.8 }} />
            <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '15px', color: 'var(--slate-800)' }}>All India Dispatch</h3>
            <p style={{ color: 'var(--slate-600)', lineHeight: '1.6', marginBottom: '35px' }}>
              Operations active across all States <br />
              <span style={{ color: 'var(--accent)', fontWeight: '700' }}>Current Dispatch Speed: Fast-Track</span>
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <div style={{ padding: '24px', background: 'var(--bg-base)', borderRadius: '24px', flex: 1, border: '1px solid var(--border-soft)' }}>
                <p style={{ fontSize: '24px', fontWeight: '900', color: 'var(--slate-800)' }}>5hr</p>
                <p style={{ fontSize: '10px', color: 'var(--slate-400)', fontWeight: '800' }}>RESPONSE</p>
              </div>
              <div style={{ padding: '24px', background: 'var(--bg-base)', borderRadius: '24px', flex: 1, border: '1px solid var(--border-soft)' }}>
                <p style={{ fontSize: '24px', fontWeight: '900', color: 'var(--slate-800)' }}>99%</p>
                <p style={{ fontSize: '10px', color: 'var(--slate-400)', fontWeight: '800' }}>SUCCESS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MESSAGE FORM */}
      <section style={{ background: 'var(--bg-card)', padding: '80px 24px', borderTop: '1px solid var(--border-soft)' }}>
        <div style={{ ...styles.section, maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '900', color: 'var(--slate-800)', marginBottom: '10px', letterSpacing: '-2px' }}>Messaging</h2>
            <p style={{ color: 'var(--slate-600)' }}>Your message will be routed directly to our mission control.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '25px' }}>
            <div style={{ position: 'relative' }}>
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="Identification (Email Address)"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              style={{ ...styles.input, minHeight: '180px', resize: 'none' }}
              name="message"
              placeholder="Detailed Mission Intelligence (Your Message)"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: 'var(--accent)',
                color: '#ffffff',
                padding: '22px',
                borderRadius: '20px',
                fontWeight: '900',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '16px',
                letterSpacing: '1px',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-4px) scale(1.02)')}
              onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0) scale(1)')}
            >
              {loading ? "TRANSMITTING DATA..." : <><Send size={20} /> INITIATE SUBMISSION</>}
            </button>
          </form>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <iframe
          title="Map"
          src="https://www.google.com/maps?q=28.598405643080227, 77.09466689664379&z=13&output=embed"
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            filter: 'grayscale(0.4) contrast(1.1)'
          }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>

        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '50px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          padding: '30px',
          borderRadius: '28px',
          boxShadow: 'var(--shadow-floating)',
          border: '1px solid var(--border-soft)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--slate-800)' }}>
            <MapPin size={24} color="var(--accent)" />
            <h4 style={{ fontWeight: '800', margin: 0, color: 'var(--slate-800)' }}>Kiteasm</h4>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', margin: 0, fontWeight: '500' }}>
            H3XV+8VV, Kailash Puri, Palam, Delhi, 110045
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;