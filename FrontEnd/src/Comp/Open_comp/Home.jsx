import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/products"
        );

        if (response.data?.products) {
          // show only 4 featured products
          setProducts(response.data.products.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Static image fallback
  const getImageUrl = (product) => {
    if (product.images && product.images.length > 0) {
      const img = product.images[0];
      const url = img.url || img;
      if (typeof url === "string") {
        if (url.startsWith("http") || url.startsWith("/")) return url;
        return `/images/products/${url}`;
      }
    }
    return "/images/products/kite.jpg";
  };

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Fly Higher with KiteAsm</h1>
          <p>
            Premium stick kites, manjha, and accessories crafted for pro flyers.
          </p>

          {/* ✅ GO TO PRODUCTS PAGE */}
          <button
            className="cta-button"
            onClick={() => navigate("/products")}
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="product-section">
        <h2 className="section-title">Featured Kites</h2>

        {loading ? (
          <div className="loading-text">Loading Inventory...</div>
        ) : (
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="product-card"
                  onClick={() =>
                    navigate(`/products/${product._id}`)
                  }
                >
                  <div className="product-image-container">
                    <img
                      src={getImageUrl(product)}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/products/kite.jpg";
                      }}
                    />
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">₹{product.price}</p>

                    {product.stock === 0 && (
                      <span className="out-stock">Out of Stock</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="loading-text">No products available</p>
            )}
          </div>
        )}

        {/* ✅ VIEW ALL PRODUCTS */}
        <div className="view-all-wrapper">
          <Link to="/products" className="view-all-btn">
            View All Products →
          </Link>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="auth-callout">
        <h2>Join the KiteAsm Community</h2>
        <p>
          Get early access to limited-edition kites, manjha, and tournament gear.
        </p>

        {/* Auth handled via navbar, this is just a push */}
        <Link to="/register" className="cta-button">
          Start Flying
        </Link>
      </section>
    </div>
  );
};

export default Home;
