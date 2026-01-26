import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { productImages } from "../../utils/productImages";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import kiteasm_logo from "../../assets/Photo/kiteasm_logo.jpg";
import kite_Pattern from "../../assets/Photo/kiteasm_pattern.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/products');
        setProducts(res.data.products?.slice(0, 8) || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-wrapper">
      <style>{`
        .home-wrapper {
          background-color: #000000; /* Pure black for a professional, monochromatic theme */
          min-height: 100vh;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #ffffff; /* White text as default */
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
          opacity: 0.05; /* Very subtle for black/white theme */
          z-index: 0;
          animation: backgroundScroll 150s linear infinite; /* Slower for professionalism */
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
          animation: fadeIn 1.2s ease-out; /* Subtle fade-in, no upward motion for professionalism */
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* LOGO: Clean and minimal */
        .main-hero-logo {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          border: 1px solid #ffffff; /* White border for contrast */
          margin-bottom: 30px;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1); /* Subtle white shadow */
          transition: box-shadow 0.3s ease;
        }

        .main-hero-logo:hover {
          box-shadow: 0 6px 18px rgba(255, 255, 255, 0.2);
        }

        /* TITLE: Clean white text */
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -1px;
          line-height: 1.1;
        }

        .hero-tagline {
          color: #cccccc; /* Light gray for subtlety */
          margin: 20px 0 40px;
          font-size: 1.2rem;
          font-weight: 400;
          border-left: 2px solid #ffffff; /* White accent */
          padding-left: 20px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* BUTTON: Minimalist white on black */
        .hero-btn {
          background-color: #ffffff;
          color: #000000;
          padding: 14px 30px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .hero-btn:hover {
          background-color: #cccccc; /* Light gray on hover */
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(255, 255, 255, 0.2);
        }

        /* PRODUCTS SECTION */
        .products-section {
          background-color: #000000; /* Consistent black */
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
          background-color: #ffffff; /* White underline */
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background-color: #111111; /* Dark gray for cards */
          border-radius: 16px;
          padding: 16px;
          border: 1px solid #333333; /* Subtle gray border */
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
          border-color: #666666; /* Lighter gray on hover */
        }

        .product-image {
          width: 100%;
          height: 240px;
          border-radius: 12px;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-image {
          opacity: 0.9; /* Subtle dim on hover */
        }

        .product-info {
          padding: 16px 8px 8px;
        }

        .product-name {
          color: #ffffff;
          font-size: 1.15rem;
          font-weight: 500;
          margin: 0 0 8px;
        }

        .product-price {
          color: #cccccc; /* Light gray for price */
          font-weight: 600;
          font-size: 1.1rem;
          margin: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-section {
            height: 60vh;
            padding: 0 5%;
          }
          .hero-content {
            max-width: 100%;
          }
          .hero-title {
            font-size: clamp(2rem, 8vw, 3rem);
          }
          .hero-tagline {
            font-size: 1rem;
            padding-left: 15px;
          }
          .products-section {
            padding: 60px 5%;
          }
          .section-title {
            font-size: 1.8rem;
          }
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
        }
      `}</style>

      <div className="nav-buffer"></div>

      <section className="hero-section">
        <div className="animated-pattern-bg"></div>
        
        <div className="hero-content">
          <img src={kiteasm_logo} alt="Kiteasm Logo" className="main-hero-logo" />
          <h1 className="hero-title">Kiteasm</h1>
          <p className="hero-tagline">
            Giving You the Finest Quality of Kites and Thread
          </p>
          
          <Link to="/products" className="hero-btn">
            View All Kites <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">Latest Releases</h2>
        <div className="products-grid">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
              <div className="product-card">
                <img 
                  src={productImages[product.images?.[0]?.url]} 
                  alt={product.name} 
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₹{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;