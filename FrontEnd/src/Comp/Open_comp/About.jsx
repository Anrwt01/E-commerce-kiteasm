import React from 'react';
import { Wind, BookOpen, Quote, Instagram, Youtube, UserPlus, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import kiteasm_logo from "../../assets/images/kiteasm_logo.jpg";

const About = () => {
  const styles = {
    container: { 
      backgroundColor: '#000000', // Pure black for professional theme
      color: '#ffffff', // White text
      minHeight: '100vh', 
      fontFamily: '"Inter", sans-serif', 
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
      color: '#ffffff', // Plain white instead of gradient
      fontSize: 'clamp(3rem, 8vw, 6rem)', 
      fontWeight: '900', 
      letterSpacing: '-0.04em', 
      lineHeight: '1' 
    },
    storyCard: { 
      background: 'rgba(255, 255, 255, 0.03)', // Subtle white overlay
      border: '1px solid rgba(255,255,255,0.05)', 
      borderRadius: '32px', 
      padding: '60px', 
      position: 'relative', 
      overflow: 'hidden' 
    },
    ownerGrid: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
      gap: '32px', 
      marginTop: '40px' 
    },
    ownerCard: { 
      background: 'rgba(255, 255, 255, 0.02)', 
      border: '1px solid rgba(255, 255, 255, 0.08)', 
      borderRadius: '24px', 
      padding: '40px', 
      textAlign: 'center', 
      transition: 'all 0.4s ease',
      backdropFilter: 'blur(10px)'
    },
    socialLink: { 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '8px', 
      color: '#ffffff', // White links
      textDecoration: 'none', 
      margin: '0 12px', 
      fontSize: '14px', 
      fontWeight: '600'
    },
    badge: { 
      color: '#ffffff', // White badge
      fontSize: '12px', 
      letterSpacing: '4px', 
      fontWeight: '800', 
      marginBottom: '20px', 
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    registerBtn: { 
      backgroundColor: '#ffffff', // White button
      color: '#000000', // Black text
      padding: '20px 48px', 
      borderRadius: '16px', 
      fontWeight: '800', 
      border: 'none', 
      cursor: 'pointer', 
      fontSize: '16px', 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '12px', 
      transition: 'all 0.3s',
      boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)' // White shadow
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. HERO SECTION */}
      <section style={styles.hero}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={styles.badge}><Wind size={14} /> ESTABLISHED 2020</span>
          <h1 style={styles.gradientText}>Elevating <br />Kite Flying.</h1>
          <p style={{ color: '#cccccc', fontSize: '20px', maxWidth: '600px', margin: '30px 0', lineHeight: '1.6' }}> {/* Light gray text */}
            At Kiteasm, we craft premium kites, durable manjha (thread), and essential accessories for enthusiasts and professionals alike.
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
              <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '24px', color: 'white' }}>Our Journey.</h2>
              <p style={{ color: '#cccccc', fontSize: '18px', lineHeight: '1.8' }}> {/* Light gray text */}
                Kiteasm started with a passion for the skies and a commitment to quality. We specialize in high-performance kites made from premium materials, strong manjha for competitive flying, and accessories that enhance every kite flying.
                <br /><br />
                Each product is designed with precision, ensuring durability, safety, and an unforgettable experience for kite lovers everywhere.
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
          <h2 style={{ fontSize: '48px', fontWeight: '800', color: 'white' }}>Meet the Team.</h2>
          <div style={{ height: '4px', width: '80px', background: '#ffffff', marginTop: '15px' }}></div> {/* White underline */}
        </div>

        <div style={styles.ownerGrid}>
          {/* Founder */}
          <div style={styles.ownerCard} className="hover-card">
            <div style={{ width: '140px', height: '140px', borderRadius: '40px', backgroundColor: '#111111', margin: '0 auto 24px', border: '2px solid #ffffff', overflow: 'hidden' }}> {/* White border */}
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Founder" style={{ width: '100%' }} />
            </div>
            <h3 style={{ fontSize: '26px', marginBottom: '8px', color: 'white' }}>Udit Sanwal</h3>
            <p style={{ color: '#ffffff', fontWeight: '800', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Founder & CEO</p>
            {/* <p style={{ color: '#cccccc', fontSize: '15px', marginBottom: '30px', lineHeight: '1.6' }}>With over 15 years in the kite industry, Rajesh leads Kiteasm with a vision for innovation and quality.</p> */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a href="https://www.instagram.com/_notrio_/" style={styles.socialLink}><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@RioTheExplorer" style={styles.socialLink}><Youtube size={20} /></a>
            </div>
          </div>

          {/* Designer */}
          <div style={styles.ownerCard} className="hover-card">
            <div style={{ width: '140px', height: '140px', borderRadius: '40px', backgroundColor: '#111111', margin: '0 auto 24px', border: '2px solid #ffffff', overflow: 'hidden' }}> {/* White border */}
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Designer" style={{ width: '100%' }} />
            </div>
            <h3 style={{ fontSize: '26px', marginBottom: '8px', color: 'white' }}>Shubham joshi</h3>
            <p style={{ color: '#ffffff', fontWeight: '800', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Manager & Marketing</p>
            {/* <p style={{ color: '#cccccc', fontSize: '15px', marginBottom: '30px', lineHeight: '1.6' }}>Priya designs our kites and accessories, focusing on aerodynamics and user experience for all skill levels.</p> */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a href="#" style={styles.socialLink}><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@RioTheExplorer" style={styles.socialLink}><Youtube size={20} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section style={{ textAlign: 'center', padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ fontSize: '48px', fontWeight: '900', color: 'white', marginBottom: '20px' }}>Join Our Community.</h2>
        <p style={{ color: '#cccccc', fontSize: '18px', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}> {/* Light gray text */}
          Sign up to explore our latest kites, manjha, and accessories. Get exclusive updates and offers.
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