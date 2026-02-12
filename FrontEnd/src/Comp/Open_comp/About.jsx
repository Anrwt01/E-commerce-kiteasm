import React from 'react';
import { Wind, BookOpen, Quote, Instagram, Youtube, UserPlus, Zap, Briefcase, HelpCircle, CreditCard, Truck, RotateCcw, MessageSquare } from 'lucide-react';
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
      border: '1px solid',
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
        @media (max-width: 1024px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .owner-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important; }
        }
        @media (max-width: 768px) {
          section { padding: 60px 20px !important; }
          .hero { padding: 120px 20px 60px !important; }
          h1 { font-size: 3rem !important; }
          h2 { font-size: 2.5rem !important; }
          .story-card { padding: 40px 20px !important; }
          .hover-card { padding: 30px !important; }
          .owner-card img { width: 120px !important; height: 120px !important; }
          .owner-card h3 { font-size: 22px !important; }
          .badge { font-size: 10px !important; }
          .register-btn { padding: 16px 32px !important; font-size: 14px !important; }
        }
        @media (max-width: 480px) {
          .hero { padding: 100px 16px 50px !important; }
          h1 { font-size: 2.5rem !important; line-height: 1.2 !important; }
          h2 { font-size: 2rem !important; }
          .story-card { padding: 30px 16px !important; }
          .hover-card { padding: 20px !important; }
          .owner-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .owner-card img { width: 100px !important; height: 100px !important; }
          .owner-card h3 { font-size: 20px !important; }
          .social-link { width: 36px !important; height: 36px !important; }
          .register-btn { padding: 14px 24px !important; font-size: 13px !important; }
          .become-seller { padding: 40px 20px !important; }
          .cta { padding: 60px 20px !important; }
        }
      `}</style>
      {/* 1. HERO SECTION */}
      <section style={styles.hero} className="hero">
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
        <div style={styles.storyCard} className="story-card">
          <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.03, color: 'white' }}>
            <BookOpen size={300} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }} className="story-grid">
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

        <div style={styles.ownerGrid} className="owner-grid">
          {/* Founder */}
          <div style={styles.ownerCard} className="hover-card">
            <div style={{ width: '140px', height: '140px', borderRadius: '40px', backgroundColor: '#f1f5f9', margin: '0 auto 24px', border: '2px solid var(--accent)', overflow: 'hidden', padding: '10px' }}>
              <img src="../teampictures/udit.jpg" alt="Founder" style={{
                width: '100%',
                height: '100%',     // Crucial for the cover property to work
                objectFit: 'cover',  // This ensures the photo fills the area without distortion
                borderRadius: '30px',
                display: 'block'     // Removes inline spacing
              }} />
            </div>
            <h3 style={{ fontSize: '26px', marginBottom: '8px', color: 'var(--slate-800)', fontWeight: '800' }}>Udit Sanwal</h3>
            <p style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Founder & CEO</p>
            {/* <p style={{ color: '#cccccc', fontSize: '15px', marginBottom: '30px', lineHeight: '1.6' }}>With over 15 years in the kite industry, Rajesh leads Kiteasm with a vision for innovation and quality.</p> */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a href="https://www.instagram.com/_notrio_/" style={styles.socialLink} className="social-link"><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@RioTheExplorer" style={styles.socialLink} className="social-link"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Designer */}
          <div style={styles.ownerCard} className="hover-card">
            <div style={{ width: '140px', height: '140px', borderRadius: '40px', backgroundColor: '#f1f5f9', margin: '0 auto 24px', border: '2px solid var(--accent)', overflow: 'hidden', padding: '10px' }}>
              <img src="../teampictures/joshi.jpg" alt="Designer" style={{
                width: '100%',
                height: '100%',     // Crucial for the cover property to work
                objectFit: 'cover',  // This ensures the photo fills the area without distortion
                borderRadius: '30px',
                display: 'block'     // Removes inline spacing
              }} />
            </div>
            <h3 style={{ fontSize: '26px', marginBottom: '8px', color: 'var(--slate-800)', fontWeight: '800' }}>Shubham Joshi</h3>
            <p style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Head of Marketing </p>
            {/* <p style={{ color: '#cccccc', fontSize: '15px', marginBottom: '30px', lineHeight: '1.6' }}>Priya designs our kites and accessories, focusing on aerodynamics and user experience for all skill levels.</p> */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a href="https://www.instagram.com/KiteASM" style={styles.socialLink} className="social-link"><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@kiteasm01" style={styles.socialLink} className="social-link"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Developer */}
          <div style={styles.ownerCard} className="hover-card">
            <div style={{ width: '140px', height: '140px', borderRadius: '40px', backgroundColor: '#f1f5f9', margin: '0 auto 24px', border: '2px solid var(--accent)', overflow: 'hidden', padding: '10px' }}>
              <img src="../teampictures/aditya.jpg" alt="Developer" style={{
                width: '100%',
                height: '100%',     // Crucial for the cover property to work
                objectFit: 'cover',  // This ensures the photo fills the area without distortion
                borderRadius: '30px',
                display: 'block'     // Removes inline spacing
              }} />
            </div>
            <h3 style={{ fontSize: '26px', marginBottom: '8px', color: 'var(--slate-800)', fontWeight: '800' }}>Aditya Pundir</h3>
            <p style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Sales Head </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a href="https://www.instagram.com/KiteASM" style={styles.socialLink} className="social-link"><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@kiteasm01" style={styles.socialLink} className="social-link"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 BECOME A SELLER */}
      <section style={{ ...styles.section, textAlign: 'center', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', margin: '40px auto', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-floating)' }} className="become-seller">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
            <Briefcase size={32} color="var(--accent)" />
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '20px', color: 'var(--slate-800)', letterSpacing: '-1px' }}>Become a Seller.</h2>
          <p style={{ color: 'var(--slate-600)', fontSize: '18px', lineHeight: '1.8', marginBottom: '40px' }}>
            Join the fastest growing kite marketplace. Whether you craft artisanal kites or produce high-quality gear, reach thousands of enthusiasts directly.
          </p>
          <button style={{ ...styles.registerBtn, backgroundColor: 'transparent', border: '2px solid var(--accent)', color: 'var(--accent)', boxShadow: 'none' }} className="register-btn">
            Contact Us on WhatsApp/Phone
          </button>
        </div>
      </section>

      {/* 3.6 CUSTOMER CARE SECTION */}
      <section style={styles.section}>
        <div style={{ textAlign: 'left', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '800', color: 'var(--slate-800)', letterSpacing: '-1px' }}>Customer Care<span style={{ color: 'var(--accent)' }}>.</span></h2>
          <p style={{ color: 'var(--slate-600)', fontSize: '18px', marginTop: '10px' }}>Call us Anytime Our Working Hours are 9 AM to 6 PM for any queries.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* FAQ */}
          <div style={{ padding: '32px', background: 'white', borderRadius: '24px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-floating)' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <HelpCircle size={24} color="var(--accent)" />
            </div>
            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: 'var(--slate-800)' }}>General FAQ</h4>
            <p style={{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: '1.6' }}>Find quick answers about our premium kites, string quality on WhatsApp.</p>
          </div>

          {/* Payment */}
          <div style={{ padding: '32px', background: 'white', borderRadius: '24px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-floating)' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <CreditCard size={24} color="#10B981" />
            </div>
            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: 'var(--slate-800)' }}>Secure Payment</h4>
            <p style={{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: '1.6' }}>We Support UPI, Credit Cards through Razorpay as a secured payment method.</p>
          </div>

          {/* Shipping */}
          <div style={{ padding: '32px', background: 'white', borderRadius: '24px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-floating)' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Truck size={24} color="#F59E0B" />
            </div>
            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: 'var(--slate-800)' }}>Shipping</h4>
            <p style={{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: '1.6' }}>Pan-India dispatch within 48 hours. Track your orders from dispatch id we send on your registered phone.</p>
          </div>

          {/* Returns */}
          <div style={{ padding: '32px', background: 'white', borderRadius: '24px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-floating)' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <RotateCcw size={24} color="#EF4444" />
            </div>
            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: 'var(--slate-800)' }}>Policy & Returns</h4>
            <p style={{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: '1.6' }}>Damaged during Shipping? Our 7-day swap policy ensures you're never grounded for long.</p>
          </div>
        </div>

        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          <p style={{ color: 'var(--slate-500)', fontSize: '15px' }}>Still have questions? Our mission control is ready.</p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: '800', textDecoration: 'none', marginTop: '10px', fontSize: '14px', letterSpacing: '1px' }}>
            <MessageSquare size={16} /> CONTACT SUPPORT
          </Link>
        </div>
      </section>

      {/* 4. CTA */}
      <section style={{ textAlign: 'center', padding: '70px ', borderTop: '1px solid var(--border-soft)' }} className="cta">
        <h2 style={{ fontSize: '48px', fontWeight: '900', color: 'var(--slate-800)', marginBottom: '20px', letterSpacing: '-2px' }}>Join the Kiteasm.</h2>
        <p style={{ color: 'var(--slate-600)', fontSize: '18px', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}>
          Explore the premium collection of kites and Manjha. Elevate your flying experience today.
        </p>

        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button style={styles.registerBtn} className="register-btn">
            <UserPlus size={20} /> CREATE AN ACCOUNT
          </button>
        </Link>
      </section>
    </div>
  );
};

export default About;