import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Twitter, Globe, ArrowUpRight } from "lucide-react";

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
      alert("Message sent successfully!");
      setFormData({ email: "", message: "" });
    } catch (error) {
      console.error("Contact error:", error);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: { backgroundColor: '#ffffff', color: '#0f172a', minHeight: '100vh', fontFamily: '"Inter", sans-serif' },
    section: { maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' },
    gradientText: { background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900' },
    input: { width: '100%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', outline: 'none', transition: 'all 0.3s' },
    footer: { backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '60px 24px 30px' }
  };

  return (
    <div style={styles.container}>
      {/* 1. HERO SPLIT SECTION */}
      <section style={{ ...styles.section, paddingTop: '140px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
          {/* Left: Contact Info */}
          <div>
            <span style={{ color: '#0ea5e9', fontSize: '12px', fontWeight: '800', letterSpacing: '3px', marginBottom: '20px', display: 'block' }}>GET IN TOUCH</span>
            <h1 style={{ ...styles.gradientText, fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1', marginBottom: '30px' }}>Let's Talk <br />Flight.</h1>
            <p style={{ color: '#64748b', fontSize: '18px', lineHeight: '1.6', marginBottom: '40px' }}>
              Whether you're a professional pilot or a first-time flyer, our technicians are ready to assist with your mission.
            </p>
            
            <div style={{ spaceY: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '12px', background: '#f0f9ff', borderRadius: '12px', color: '#0ea5e9' }}><Mail size={24}/></div>
                <div><p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold' }}>EMAIL US</p><p style={{ fontWeight: '600' }}>support@kiteasm.com</p></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '12px', background: '#f0f9ff', borderRadius: '12px', color: '#0ea5e9' }}><Phone size={24}/></div>
                <div><p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold' }}>CALL CENTER</p><p style={{ fontWeight: '600' }}>+91 93150 14029</p></div>
              </div>
            </div>
          </div>

          {/* Right: Decorative Status Card */}
          <div style={{ position: 'relative', background: '#f8fafc', borderRadius: '40px', padding: '40px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#22c55e', width: '12px', height: '12px', borderRadius: '50%', boxShadow: '0 0 15px #22c55e' }} />
            <Globe size={80} color="#0ea5e9" style={{ marginBottom: '20px', opacity: 0.8 }} />
            <h3 style={{ fontSize: '24px', fontWeight: '800' }}>Global Reach</h3>
            <p style={{ color: '#64748b', marginTop: '10px' }}>Shipping to over 40 countries. <br />Current Dispatch Status: <b>Normal</b></p>
            <div style={{ marginTop: '30px', padding: '15px', background: '#ffffff', borderRadius: '20px', display: 'flex', justifyContent: 'space-around', border: '1px solid #e2e8f0' }}>
               <div><p style={{ fontSize: '20px', fontWeight: '800' }}>2hr</p><p style={{ fontSize: '10px', color: '#94a3b8' }}>AVG RESPONSE</p></div>
               <div style={{ width: '1px', background: '#e2e8f0' }} />
               <div><p style={{ fontSize: '20px', fontWeight: '800' }}>99%</p><p style={{ fontSize: '10px', color: '#94a3b8' }}>SATISFACTION</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MESSAGE FORM */}
      <section style={{ background: '#f8fafc', padding: '100px 24px' }}>
        <div style={{ ...styles.section, maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '900' }}>Send a Message</h2>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
            <input 
              style={styles.input} 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <textarea 
              style={{ ...styles.input, minHeight: '150px', resize: 'none' }} 
              name="message" 
              placeholder="How can we help your next flight?"
              value={formData.message}
              onChange={handleChange}
              required 
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: '#0f172a', color: '#fff', padding: '20px', borderRadius: '16px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              {loading ? "TRANSMITTING..." : <><Send size={20} /> SUBMIT MISSION</>}
            </button>
          </form>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section style={{ height: '500px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.0688975472!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b34766285%3A0x51461645a178e2c5!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
          style={{ border: 0, width: '100%', height: '100%', filter: 'grayscale(1) contrast(1.2) opacity(0.6)' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        <div style={{ position: 'absolute', top: '40px', left: '40px', background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
           <MapPin size={24} color="#0ea5e9" />
           <h4 style={{ marginTop: '10px', fontWeight: '800' }}>HQ Base</h4>
           <p style={{ fontSize: '14px', color: '#64748b' }}>New Delhi, India</p>
        </div>
      </section>

     
     
    </div>
  );
};

export default Contact;