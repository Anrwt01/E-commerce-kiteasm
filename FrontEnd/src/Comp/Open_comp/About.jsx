import React from 'react';
import { Wind, Target, Shield, Award, UserPlus, Instagram, Youtube, BookOpen, Quote } from 'lucide-react';

const About = () => {
  const styles = {
    container: { backgroundColor: '#ffffff', color: '#0f172a', minHeight: '100vh', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' },
    section: { padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' },
    hero: { padding: '140px 24px 100px', textAlign: 'center', position: 'relative', borderBottom: '1px solid #f1f5f9' },
    gradientText: { background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: '1.1' },
    storyCard: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '32px', padding: '48px', position: 'relative', overflow: 'hidden' },
    ownerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', marginTop: '40px' },
    ownerCard: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', textAlign: 'center', transition: 'all 0.3s ease', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' },
    socialLink: { display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', margin: '0 12px', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' },
    badge: { color: '#0ea5e9', fontSize: '12px', letterSpacing: '3px', fontWeight: '800', marginBottom: '24px', display: 'block' },
    registerBtn: { backgroundColor: '#0f172a', color: '#ffffff', padding: '18px 40px', borderRadius: '50px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '18px', display: 'inline-flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s' }
  };

  return (
    <div style={styles.container}>
      {/* 1. LIGHT HERO */}
      <section style={styles.hero}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '400px', background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={styles.badge}>ESTABLISHED 2024</span>
          <h1 style={styles.gradientText}>Engineering <br />The Atmosphere.</h1>
          <p style={{ color: '#475569', fontSize: '20px', maxWidth: '650px', margin: '30px auto', lineHeight: '1.6' }}>
            We don't just build kites; we engineer instruments of freedom that turn the sky into your personal playground.
          </p>
        </div>
      </section>

      {/* 2. BUSINESS STORY SECTION */}
      <section style={styles.section}>
        <div style={styles.storyCard}>
          <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1, color: '#0ea5e9' }}><BookOpen size={200} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>Our Story.</h2>
              <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.8' }}>
                KiteAsm started in a small workshop with one simple mission: to redefine high-performance flight. We found that traditional kites lacked the structural integrity needed for extreme conditions.
                <br /><br />
                Today, we use carbon-fiber technology and fluid dynamic modeling to create kites that are both art and machine.
              </p>
            </div>
            <div style={{ position: 'relative' }}>
               <img 
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070" 
                alt="Workshop" 
                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} 
               />
               <div style={{ position: 'absolute', bottom: '-15px', left: '-15px', background: '#0ea5e9', padding: '15px', borderRadius: '12px' }}>
                  <Quote size={24} color="white" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OWNERS SECTION */}
      <section style={styles.section}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#0f172a' }}>The Visionaries.</h2>
          <p style={{ color: '#64748b', fontSize: '18px' }}>The minds behind the flight dynamics.</p>
        </div>

        <div style={styles.ownerGrid}>
          {/* OWNER 1 */}
          <div style={styles.ownerCard}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 24px', border: '3px solid #0ea5e9', overflow: 'hidden' }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Owner" />
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '4px', color: '#0f172a' }}>Alex Rivera</h3>
            <p style={{ color: '#0ea5e9', fontWeight: '700', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Lead Aero-Designer</p>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>Expert in fluid dynamics and carbon structures with 15 years of aero-engineering experience.</p>
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
              <a href="#" style={styles.socialLink}><Instagram size={18} /> alex_kites</a>
              <a href="#" style={styles.socialLink}><Youtube size={18} /> AlexVlogs</a>
            </div>
          </div>

          {/* OWNER 2 */}
          <div style={styles.ownerCard}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 24px', border: '3px solid #2563eb', overflow: 'hidden' }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Owner" />
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '4px', color: '#0f172a' }}>Sarah Chen</h3>
            <p style={{ color: '#2563eb', fontWeight: '700', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Chief of Operations</p>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>Focused on sustainable manufacturing and scaling the global KiteAsm community.</p>
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
              <a href="#" style={styles.socialLink}><Instagram size={18} /> sarah_asm</a>
              <a href="#" style={styles.socialLink}><Youtube size={18} /> SkyTalks</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA - REGISTER SECTION */}
      <section style={{ textAlign: 'center', padding: '120px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', marginBottom: '16px' }}>Ready to take off?</h2>
        <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '40px' }}>Join the KiteAsm flight squadron today and get exclusive early access.</p>
        
        <button 
          style={styles.registerBtn}
          onMouseOver={(e) => e.target.style.backgroundColor = '#334155'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#0f172a'}
        >
          <UserPlus size={20} /> REGISTER NOW
        </button>
      </section>
    </div>
  );
};

export default About;