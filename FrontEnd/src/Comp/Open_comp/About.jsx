import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Redefining Digital Excellence</h1>
          <p>We build innovative solutions that empower businesses to thrive in the modern digital landscape. Experience the future with KiteAsm.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-section">
        <div className="section-container">
          <div className="story-grid">
            <div className="story-text">
              <h3>Our Story</h3>
              <p>
                Founded in 2024, KiteAsm began with a simple idea: that technology should be accessible, intuitive, and powerful. What started as a small team of passionate developers has grown into a leading digital agency known for its commitment to quality and innovation.
              </p>
              <p>
                We believe in the power of code to solve real-world problems. Our journey is defined by the challenges we've overcome and the success stories of our clients. Every line of code we write is a step towards a smarter, more connected world.
              </p>
            </div>
            <div className="story-img">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Team working together" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="about-section bg-light">
        <div className="section-container">
          <h2 className="section-title">Our Values</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="card-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We stay ahead of the curve, constantly exploring new technologies to deliver cutting-edge solutions.</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">🤝</div>
              <h3>Integrity</h3>
              <p>Trust is the foundation of our business. We are transparent, honest, and committed to doing what's right.</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">💡</div>
              <h3>Excellence</h3>
              <p>Good isn't enough. We strive for perfection in every pixel and every line of code we produce.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section">
        <div className="section-container">
          <h2 className="section-title">Meet the Team</h2>
          <div className="team-grid">
            {/* Team Member 1 */}
            <div className="team-card">
              <div className="team-img">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="CEO" />
              </div>
              <div className="team-info">
                <h4>Alex Morgan</h4>
                <span>CEO & Founder</span>
                <div className="social-links">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="team-card">
              <div className="team-img">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="CTO" />
              </div>
              <div className="team-info">
                <h4>Sarah Jenkins</h4>
                <span>Lead Developer</span>
                <div className="social-links">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-github"></i></a>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="team-card">
              <div className="team-img">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Designer" />
              </div>
              <div className="team-info">
                <h4>Michael Chen</h4>
                <span>UI/UX Designer</span>
                <div className="social-links">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-dribbble"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;