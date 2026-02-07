import React from 'react';
import { Wind, BookOpen, Quote, Instagram, Youtube, UserPlus, Zap, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import kiteasm_logo from "../../assets/Images/kiteasm_logo.jpg";

const About = () => {
  const styles = {
    container: {
      backgroundColor: 'var(--bg-base)',
      color: 'var(--slate-800)',
      minHeight: '100vh',
      fontFamily: 'var(--font-sans)',
      overflowX: 'hidden'
    },
    section: { padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' },
    hero: {
      padding: '160px 24px 100px',
      textAlign: 'left',
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    gradientText: {
      color: 'var(--slate-800)',
      fontSize: 'clamp(3rem, 7vw, 5rem)',
      fontWeight: '800',
      letterSpacing: '-0.04em',
      lineHeight: '1.1'
    },
    storyCard: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-xl)',
      padding: '60px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-floating)'
    },
    ownerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px',
      marginTop: '40px'
    },
    ownerCard: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-xl)',
      padding: '40px',
      textAlign: 'center',
      transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
      boxShadow: 'var(--shadow-floating)'
    },
    socialLink: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '12px',
      backgroundColor: 'var(--bg-base)',
      color: 'var(--accent)',
      textDecoration: 'none',
      transition: '0.3s'
    },
    badge: {
      color: 'var(--accent)',
      fontSize: '11px',
      letterSpacing: '2px',
      fontWeight: '800',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textTransform: 'uppercase'
    },
    registerBtn: {
      backgroundColor: 'var(--accent)',
      color: '#ffffff',
      padding: '20px 48px',
      borderRadius: '20px',
      fontWeight: '800',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @media (max-width: 768px) {
           section { padding: 60px 20px !important; }
           h1 { font-size: 3rem !important; }
           h2 { font-size: 2.5rem !important; }
           .hover-card { padding: 30px !important; }
        }
      `}</style>
      {/* 1. HERO SECTION */}
      <section style={styles.hero}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={styles.badge}><Wind size={14} /> Established 2021</span>
          <h1 style={styles.gradientText}>Elevating <br />Kite Flying Experience <span style={{ color: 'var(--accent)' }}>.</span></h1>
          <p style={{ color: 'var(--slate-600)', fontSize: '20px', maxWidth: '600px', margin: '30px 0', lineHeight: '1.7' }}>
            At Kiteasm, we craft premium, competition-grade products for enthusiasts who demand excellence in every kite fight.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section style={styles.section}>
        <div style={styles.storyCard}>
          <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.03, color: 'white' }}>
            <BookOpen size={300} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '24px', color: 'var(--slate-800)', letterSpacing: '-1px' }}>Our Journey<span style={{ color: 'var(--accent)' }}>.</span></h2>
              <p style={{ color: 'var(--slate-600)', fontSize: '18px', lineHeight: '1.8' }}>
                Kiteasm started with a passion for the skies and a commitment to quality. We specialize in high-performance competition gear made from premium materials, ensuring durability and precision for every flyer.
                <br /><br />
                Each product is an intersection of traditional craftsmanship and modern aerodynamics, designed to give you an unforgettable experience.
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src={kiteasm_logo}
                alt="Kite Flying"
                style={{ width: '100%', borderRadius: '24px', filter: 'grayscale(0.2) brightness(0.8)' }}
              />
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', background: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}> {/* White quote box */}
                <Quote size={30} color="#000000" /> {/* Black quote icon */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OWNERS SECTION */}
      <section style={styles.section}>
        <div style={{ textAlign: 'left', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '800', color: 'var(--slate-800)', letterSpacing: '-1px' }}>Meet the Team<span style={{ color: 'var(--accent)' }}>.</span></h2>
          <div style={{ height: '4px', width: '60px', background: 'var(--accent)', marginTop: '15px', borderRadius: '2px' }}></div>
        </div>

        <div style={styles.ownerGrid}>
          {/* Founder */}
          <div style={styles.ownerCard} className="hover-card">
            <div style={{ width: '140px', height: '140px', borderRadius: '40px', backgroundColor: '#f1f5f9', margin: '0 auto 24px', border: '2px solid var(--accent)', overflow: 'hidden', padding: '10px' }}>
              <img src="../teampictures/udit.jpg" alt="Founder" style={{ width: '100%', borderRadius: '30px' }} />
            </div>
            <h3 style={{ fontSize: '26px', marginBottom: '8px', color: 'var(--slate-800)', fontWeight: '800' }}>Udit Sanwal</h3>
            <p style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Founder & CEO</p>
            {/* <p style={{ color: '#cccccc', fontSize: '15px', marginBottom: '30px', lineHeight: '1.6' }}>With over 15 years in the kite industry, Rajesh leads Kiteasm with a vision for innovation and quality.</p> */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a href="https://www.instagram.com/_notrio_/" style={styles.socialLink}><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@RioTheExplorer" style={styles.socialLink}><Youtube size={20} /></a>
            </div>
          </div>

          {/* Designer */}
          <div style={styles.ownerCard} className="hover-card">
            <div style={{ width: '140px', height: '140px', borderRadius: '40px', backgroundColor: '#f1f5f9', margin: '0 auto 24px', border: '2px solid var(--accent)', overflow: 'hidden', padding: '10px' }}>
              <img src="../teampictures/joshi.jpg" alt="Designer" style={{ width: '100%', borderRadius: '30px' }} />
            </div>
            <h3 style={{ fontSize: '26px', marginBottom: '8px', color: 'var(--slate-800)', fontWeight: '800' }}>Shubham Joshi</h3>
            <p style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Head of Marketing </p>
            {/* <p style={{ color: '#cccccc', fontSize: '15px', marginBottom: '30px', lineHeight: '1.6' }}>Priya designs our kites and accessories, focusing on aerodynamics and user experience for all skill levels.</p> */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a href="https://www.instagram.com/KiteASM" style={styles.socialLink}><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@kiteasm01" style={styles.socialLink}><Youtube size={20} /></a>
            </div>
          </div>

          {/* Developer */}
          <div style={styles.ownerCard} className="hover-card">
            <div style={{ width: '140px', height: '140px', borderRadius: '40px', backgroundColor: '#f1f5f9', margin: '0 auto 24px', border: '2px solid var(--accent)', overflow: 'hidden', padding: '10px' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jack" alt="Developer" style={{ width: '100%', borderRadius: '30px' }} />
            </div>
            <h3 style={{ fontSize: '26px', marginBottom: '8px', color: 'var(--slate-800)', fontWeight: '800' }}>Aditya Pundir</h3>
            <p style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Sales Head </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a href="https://www.instagram.com/KiteASM" style={styles.socialLink}><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@kiteasm01" style={styles.socialLink}><Youtube size={20} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 BECOME A SELLER */}
      <section style={{ ...styles.section, textAlign: 'center', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', margin: '40px auto', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-floating)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
            <Briefcase size={32} color="var(--accent)" />
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '20px', color: 'var(--slate-800)', letterSpacing: '-1px' }}>Become a Seller.</h2>
          <p style={{ color: 'var(--slate-600)', fontSize: '18px', lineHeight: '1.8', marginBottom: '40px' }}>
            Join the fastest growing kite marketplace. Whether you craft artisanal kites or produce high-quality gear, reach thousands of enthusiasts directly.
          </p>
          <button style={{ ...styles.registerBtn, backgroundColor: 'transparent', border: '2px solid var(--accent)', color: 'var(--accent)', boxShadow: 'none' }}>
            START SELLING
          </button>
        </div>
      </section>

      {/* 4. CTA */}
      <section style={{ textAlign: 'center', padding: '120px 24px', borderTop: '1px solid var(--border-soft)' }}>
        <h2 style={{ fontSize: '48px', fontWeight: '900', color: 'var(--slate-800)', marginBottom: '20px', letterSpacing: '-2px' }}>Join the Sky.</h2>
        <p style={{ color: 'var(--slate-600)', fontSize: '18px', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}>
          Explore the premium collection of kites and gear. Elevate your flying experience today.
        </p>

        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button style={styles.registerBtn}>
            <UserPlus size={20} /> CREATE AN ACCOUNT
          </button>
        </Link>
      </section>
    </div>
  );
};

export default About;