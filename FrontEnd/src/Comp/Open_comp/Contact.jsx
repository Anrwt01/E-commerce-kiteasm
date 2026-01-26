import React, { useState } from "react";
import axios from "axios";
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
      await axios.post("http://localhost:5000/api/contact", formData);
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
      backgroundColor: '#000000', // Pure black for professional theme
      color: '#ffffff', // White text
      minHeight: '100vh', 
      fontFamily: '"Inter", sans-serif',
      overflowX: 'hidden'
    },
    section: { maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' },
    gradientText: { 
      color: '#ffffff', // Plain white instead of gradient
      fontWeight: '900' 
    },
    input: { 
      width: '100%', 
      backgroundColor: 'rgba(255, 255, 255, 0.03)', // Subtle white overlay
      border: '1px solid rgba(255, 255, 255, 0.1)', 
      borderRadius: '16px', 
      padding: '18px', 
      outline: 'none', 
      color: 'white',
      fontSize: '15px',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box'
    },
    infoCard: {
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px', 
      marginBottom: '30px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.02)', // Subtle overlay
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    statusCard: { 
      position: 'relative', 
      background: 'rgba(255, 255, 255, 0.03)', // Subtle white overlay
      borderRadius: '40px', 
      padding: '50px 40px', 
      border: '1px solid rgba(255, 255, 255, 0.1)', // White border
      textAlign: 'center',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. HERO SPLIT SECTION */}
      <section style={{ ...styles.section, paddingTop: '160px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center' }}>
          
          {/* Left: Contact Info */}
          <div>
            <h1 style={{ ...styles.gradientText, fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1.1', marginBottom: '30px' }}>
              Make <br />Contact.
            </h1>
            <p style={{ color: '#cccccc', fontSize: '18px', lineHeight: '1.7', marginBottom: '45px', maxWidth: '500px' }}> {/* Light gray text */}
              Have a custom request or query? Our Team are standing by to assist your query.
            </p>
            
            <div>
              <div style={styles.infoCard}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ffffff' }}><Mail size={24}/></div> {/* White icon */}
                <div>
                  <p style={{ fontWeight: '600', fontSize: '18px', color: '#ffffff' }}>kiteasm01@gamil.com</p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ffffff' }}><Phone size={17}/></div> {/* White icon */}
                <div>
                  <p style={{ fontSize: '11px', color: '#cccccc', fontWeight: '800', letterSpacing: '1px' }}>VOICE FREQUENCY</p> {/* Light gray label */}
                  <p style={{ fontWeight: '600', fontSize: '18px', color: '#ffffff' }}>+91 70111801</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Decorative Status Card */}
          <div style={styles.statusCard}>
            <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', background: '#ffffff', borderRadius: '50%', boxShadow: '0 0 12px #ffffff' }} /> {/* White dot */}
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#ffffff' }}>SYSTEMS ONLINE</span> {/* White text */}
            </div>
            
            <Globe size={60} color="#ffffff" style={{ marginBottom: '25px', filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))' }} /> {/* White globe */}
            <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '15px', color: '#ffffff' }}>ALL india Dispatch</h3>
            <p style={{ color: '#cccccc', lineHeight: '1.6', marginBottom: '35px' }}> {/* Light gray text */}
               Operations active across all States <br />
              <span style={{ color: '#ffffff' }}>Current Dispatch Speed: <b>Fast-Track</b></span>
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
               <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', flex: 1, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>5hr</p> {/* White numbers */}
                  <p style={{ fontSize: '9px', color: '#cccccc', fontWeight: '800' }}>RESPONSE</p> {/* Light gray label */}
               </div>
               <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', flex: 1, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>99%</p> {/* White numbers */}
                  <p style={{ fontSize: '9px', color: '#cccccc', fontWeight: '800' }}>SUCCESS</p> {/* Light gray label */}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MESSAGE FORM */}
      <section style={{ background: '#111111', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}> {/* Dark gray background */}
        <div style={{ ...styles.section, maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#ffffff', marginBottom: '10px' }}>Messaging</h2>
            <p style={{ color: '#cccccc' }}>Your message will be routed directly to our team.</p> {/* Light gray text */}
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
                backgroundColor: '#ffffff', // White button
                color: '#000000', // Black text
                padding: '22px', 
                borderRadius: '16px', 
                fontWeight: '900', 
                border: 'none', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px',
                fontSize: '16px',
                letterSpacing: '1px',
                boxShadow: '0 15px 30px rgba(255, 255, 255, 0.2)', // White shadow
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
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
            filter: 'invert(90%) hue-rotate(180deg) brightness(0.7) contrast(1.2)' // Keeps map in dark mode
          }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        
        <div style={{ 
          position: 'absolute', 
          bottom: '50px', 
          left: '50px', 
          background: '#111111', // Dark gray overlay
          padding: '30px', 
          borderRadius: '28px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)', 
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}> {/* White icon */}
              <MapPin size={24} />
              <h4 style={{ fontWeight: '800', margin: 0, color: '#ffffff' }}>Kiteasm</h4>
           </div>
           <p style={{ fontSize: '14px', color: '#cccccc', margin: 0 }}> {/* Light gray text */}
              H3XV+8VV, Kailash Puri, Palam, Delhi, 110045
           </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;