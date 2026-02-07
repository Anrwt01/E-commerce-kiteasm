import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../../utils/config.js";


import kite_Pattern from "../../assets/Photo/kiteasm_pattern.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Derive the server root (e.g., http://localhost:5000) from the API URL


  const fetchWishlist = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/my-wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems(res.data.products?.map(p => p._id) || []);
    } catch (error) {
      console.error("Wishlist fetch failed:", error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/toggle-wishlist`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200 || res.status === 201) {
        setWishlistItems(prev =>
          prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
        );
      }
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/user/products`);
        const allProducts = res.data.products || [];
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
    fetchWishlist();
  }, []);

  return (
    <div className="home-wrapper">
      <style>{`
        .home-wrapper {
          background-color: var(--bg-base);
          min-height: 100vh;
          font-family: var(--font-sans);
          color: var(--slate-800);
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
          background-size: 350px;
          opacity: 0.12; /* Increased for better visibility */
          z-index: 0;
          animation: backgroundScroll 240s linear infinite;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 85%);
          filter: grayscale(100%) brightness(1.1);
        }

        @keyframes backgroundScroll {
          from { background-position: 0 0; }
          to { background-position: 2400px 1200px; } /* Diagonally for more dynamic feel */
        }

        .hero-content {
          position: relative;
          z-index: 5;
          max-width: 700px;
          text-align: center;
          animation: fadeIn 1.2s ease-out, floatHero 6s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatHero {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }



        .hero-title {
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 500;
          color: var(--slate-800);
          margin: 0;
          letter-spacing: -4px;
          line-height: 0.95;
          text-transform: uppercase;
          text-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        
        .hero-tagline {
          color: var(--slate-500);
          margin: 24px 0 48px;
          font-size: 1.15rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .hero-btn {
          background-color: var(--accent);
          color: #ffffff;
          padding: 18px 40px;
          border-radius: 16px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px -5px rgba(59, 130, 246, 0.4);
        }
        
        .hero-btn:hover {
          background-color: #2563EB;
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.5);
        }

        /* --- PRODUCTS SECTION --- */
        .products-section {
          background-color: var(--bg-base);
          padding: 120px 5%;
        }

        .section-title {
          color: var(--slate-800);
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 60px;
          text-align: center;
          letter-spacing: -1px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          padding: 16px;
          border: 1px solid var(--border-soft);
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-floating);
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
          transform: translateY(-12px) scale(1.02);
          box-shadow: var(--shadow-hover);
          border-color: var(--accent);
        }

        .exclusive-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--accent);
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 1px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .product-image {
          width: 100%;
          height: 300px;
          border-radius: 18px;
          object-fit: cover;
          background-color: #f1f5f9;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
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
          color: var(--slate-800);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 8px;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .product-price {
          color: var(--accent);
          font-weight: 800;
          font-size: 1.2rem;
          margin: 0;
          display: flex;
          align-items: center;
        }
        
        .product-price::before {
          content: '₹';
          font-size: 0.9rem;
          margin-right: 2px;
          color: var(--accent);
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .hero-title { font-size: 3rem; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }

        @media (max-width: 600px) {
          .hero-section { height: 60vh; }
          .hero-title { font-size: 2.5rem; }
          .hero-tagline { font-size: 1rem; padding: 0 10px; }
          .products-section { padding: 60px 5%; }
          .section-title { font-size: 1.8rem; }
          /* 2-column grid for mobile as requested */
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px; } 
          .product-image { height: auto; aspect-ratio: 1/1; }
        }

        .home-wishlist-btn {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s all ease;
          z-index: 20;
          color: var(--slate-400);
          border: 1px solid var(--border-soft);
        }
        .home-wishlist-btn.active {
          color: var(--accent);
        }
      `}</style>

      <div className="nav-buffer"></div>

      {/* HERO */}
      <section className="hero-section">
        <div className="animated-pattern-bg"></div>
        <div className="hero-content">

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
          <p style={{ textAlign: 'center', color: '#666' }}>Curating collection...</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" onClick={() => navigate(`/products/${product._id}`)}>
                {/* Badge for exclusivity */}
                <div className="exclusive-badge">
                  <ShieldCheck size={12} /> Exclusive
                </div>

                <button
                  className={`home-wishlist-btn ${wishlistItems.includes(product._id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product._id);
                  }}
                >
                  <Heart size={18} fill={wishlistItems.includes(product._id) ? "var(--accent)" : "none"} />
                </button>

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
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <p style={{ textAlign: 'center', color: '#444', marginTop: '40px' }}>
            Check back soon for our limited edition drops.
          </p>
        )}
      </section>

      <footer style={{
        padding: "80px 20px",
        textAlign: "center",
        color: "var(--slate-400)",
        fontSize: "13px",
        fontWeight: "600",
        letterSpacing: "1px",
        borderTop: "1px solid var(--border-soft)",
        backgroundColor: "var(--bg-card)"
      }}>
        © 2026 KITEASM • AUTHENTIC KITE CULTURE
      </footer>
    </div>
  );
};

export default Home;