import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { productImages } from "../../utils/productImages";
import { Link } from 'react-router-dom';
import { Wind, ArrowRight } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/products');
        // Slicing to 8 for a cleaner grid (even numbers usually look better)
        setProducts(res.data.products?.slice(0, 8) || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // const getImageUrl = (images) => {
  //   if (!images || images.length === 0) return '/images/products/kite.jpg';
  //   const url = images[0].url;
  //   if (url.startsWith('http')) return url;
  //   return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
  // };

  return (
    <div className="home-wrapper" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="pulse-bg" />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
          <div className="floating-icon">
            <Wind size={70} color="#0ea5e9" />
          </div>

          <h1 className="hero-title">AERO KITES</h1>

          <p className="hero-subtitle">
            Engineering the atmosphere, one flight at a time.
          </p>

          <Link to="/register" className="btn-primary">
            Join the Squadron <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* 2. PRODUCTS SECTION */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Collection</h2>
            <p className="section-tagline">"Precision engineering meets the art of flight"</p>
          </div>

          <div className="products-grid">
            {loading ? (
              // Display 4 skeleton cards while loading
              [...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image" />
                  <div className="skeleton-line" style={{ width: '80%' }} />
                  <div className="skeleton-line" style={{ width: '40%' }} />
                </div>
              ))
            ) : (
              products.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`} className="product-card">
                  <div className="product-img-wrapper">
                    <img
                      src={productImages[product.images?.[0]?.url]}
                      alt={product.name}
                      loading="lazy"
                      className="product-img"
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-cat">{product.category || 'FIGHTER'}</p>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* FOOTER CTA */}
          <div className="footer-cta">
            <p>Ready to start your journey?</p>
            <Link to="/register" className="btn-secondary">
              Create Your Account <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. STYLES (Scoped via a single style tag for performance) */}
      <style>{`
        /* Hero Animations */
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .hero-section {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .pulse-bg {
          position: absolute; top: 50%; left: 50%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
        }
        .floating-icon { animation: float 3s ease-in-out infinite; margin-bottom: 30px; }
        
        .hero-title {
          font-size: clamp(3.5rem, 8vw, 7rem); font-weight: 900; letter-spacing: -0.04em;
          background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }
        .hero-subtitle {
          font-size: 20px; color: #64748b; font-style: italic; margin-bottom: 40px;
        }

        /* Container & Grid */
        .products-section { padding: 80px 24px; backgroundColor: #f8fafc; border-top: 1px solid #e2e8f0; }
        .container { max-width: 1100px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-title { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 10px; }
        .section-tagline { color: #64748b; font-style: italic; font-size: 18px; }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 32px;
        }

        /* Product Card Styles */
        .product-card {
          text-decoration: none; color: inherit; display: block;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .product-card:hover { transform: translateY(-10px); }
        
        .product-img-wrapper {
          background: #fff; border-radius: 12px; border: 1px solid #e2e8f0;
          aspect-ratio: 3/4; overflow: hidden; margin-bottom: 15px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
        }
        .product-img { 
          width: 100%; height: 100%; object-fit: cover; 
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-img { transform: scale(1.08); }

        .product-name { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
        .product-cat { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .product-price { font-size: 15px; font-weight: 600; color: #0ea5e9; }

        /* Skeleton Loading */
        .skeleton-card { display: flex; flex-direction: column; gap: 10px; }
        .skeleton-image { 
          aspect-ratio: 3/4; border-radius: 12px; 
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%; animation: shimmer 1.5s infinite linear;
        }
        .skeleton-line { height: 14px; background: #f1f5f9; border-radius: 4px; }

        /* Buttons */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #0f172a; color: white; padding: 16px 36px;
          border-radius: 50px; font-weight: 700; text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-primary:hover { background: #1e293b; transform: translateY(-2px); }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #0ea5e9; color: white; padding: 14px 30px;
          border-radius: 50px; font-weight: 700; text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-secondary:hover { background: #0284c7; transform: scale(1.05); }

        .footer-cta { text-align: center; margin-top: 80px; padding-top: 40px; border-top: 1px dashed #e2e8f0; }
        .footer-cta p { color: #64748b; margin-bottom: 20px; font-size: 18px; }
      `}</style>
    </div>
  );
};

export default Home;