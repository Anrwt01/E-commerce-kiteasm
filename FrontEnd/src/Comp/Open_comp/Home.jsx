import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
// import { API_BASE_URL } from "../../utils/config";

import kiteasm_logo from "../../assets/Photo/kiteasm_logo.jpg";
import kite_Pattern from "../../assets/Photo/kiteasm_pattern.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Derive the server root (e.g., http://localhost:5000) from the API URL
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/user/products`);
        const allProducts = res.data.products || [];
        console.log(res)
        // Filter to show ONLY exclusive products
        const exclusiveOnly = allProducts.filter(product => product.isExclusive === true);
        
        setProducts(exclusiveOnly.slice(0, 8));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-wrapper">
      <style>{`
        .home-wrapper {
          background-color: #000000;
          min-height: 100vh;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #ffffff;
        }

        .nav-buffer { height: 80px; }

        /* --- HERO SECTION --- */
        .hero-section {
          height: 75vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 0 5%;
        }

        .animated-pattern-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url(${kite_Pattern});
          background-size: 300px;
          opacity: 0.05;
          z-index: 0;
          animation: backgroundScroll 150s linear infinite;
          mask-image: radial-gradient(ellipse at center, black 50%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 50%, transparent 100%);
        }

        @keyframes backgroundScroll {
          from { background-position: 0 0; }
          to { background-position: 1200px 0; }
        }

        .hero-content {
          position: relative;
          z-index: 5;
          max-width: 700px;
          text-align: center;
          animation: fadeIn 1.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .main-hero-logo {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          border: 1px solid #ffffff;
          margin-bottom: 30px;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -1px;
        }

        .hero-tagline {
          color: #cccccc;
          margin: 20px 0 40px;
          font-size: 1.2rem;
          border-left: 2px solid #ffffff;
          padding-left: 20px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-btn {
          background-color: #ffffff;
          color: #000000;
          padding: 14px 30px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .hero-btn:hover {
          background-color: #cccccc;
          transform: translateY(-2px);
        }

        /* --- PRODUCTS SECTION --- */
        .products-section {
          background-color: #000000;
          padding: 100px 5%;
        }

        .section-title {
          color: #ffffff;
          font-size: 2.2rem;
          font-weight: 600;
          margin-bottom: 50px;
          text-align: center;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background-color: #ffffff;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background: linear-gradient(135deg, #111111 0%, #1a1a1a 100%);
          border-radius: 20px;
          padding: 20px;
          border: 1px solid #333333;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .product-card:hover::before {
          left: 100%;
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: #ffffff;
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.1);
        }

        .exclusive-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
          color: #000;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .product-image {
          width: 100%;
          height: 280px;
          border-radius: 16px;
          object-fit: cover;
          background-color: #0a0a0a;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-info {
          padding: 24px 0 0;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-name {
          color: #ffffff;
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 12px;
          line-height: 1.3;
          letter-spacing: -0.5px;
        }

        .product-price {
          color: #cccccc;
          font-weight: 600;
          font-size: 1.2rem;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .product-price::before {
          content: '₹';
          font-size: 1rem;
          margin-right: 4px;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .hero-section { height: 60vh; }
          .products-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
          .product-image { height: 220px; }
          .product-card { padding: 16px; }
        }
      `}</style>

      <div className="nav-buffer"></div>

      {/* HERO */}
      <section className="hero-section">
        <div className="animated-pattern-bg"></div>
        <div className="hero-content">
          <img src={kiteasm_logo} alt="Logo" className="main-hero-logo" />
          <h1 className="hero-title">Kiteasm</h1>
          <p className="hero-tagline">
            Exclusively Curation of Premium Competition-Grade Gear
          </p>
          <Link to="/products" className="hero-btn">
            Explore All <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* EXCLUSIVE RELEASES */}
      <section className="products-section">
        <h2 className="section-title">Exclusive Releases</h2>
        
        {loading ? (
          <p style={{textAlign: 'center', color: '#666'}}>Curating collection...</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <Link 
                key={product._id} 
                to={`/products/${product._id}`} 
                style={{ textDecoration: 'none' }}
              >
                <div className="product-card">
                  {/* Badge for exclusivity */}
                  <div className="exclusive-badge">
                    <ShieldCheck size={12} /> Exclusive
                  </div>

                  <img 
                    src={`../uploads/${product._id}/main.jpg`} 
                    alt={product.name} 
                    className="product-image"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Kiteasm+Premium"; }}
                  />

                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <p style={{textAlign: 'center', color: '#444', marginTop: '40px'}}>
            Check back soon for our limited edition drops.
          </p>
        )}
      </section>

      <footer style={{ 
        padding: "60px 20px", 
        textAlign: "center", 
        color: "#444", 
        fontSize: "12px", 
        letterSpacing: "1px",
        borderTop: "1px solid #111" 
      }}>
        © 2026 KITEASM • AUTHENTIC KITE CULTURE
      </footer>
    </div>
  );
};

export default Home;