import React, { useEffect, useState, useCallback, memo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Zap, Plus } from "lucide-react";

/* =========================
   STYLES (OUTSIDE COMPONENT)
========================= */
const styles = {
  container: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    minHeight: "100vh",
    fontFamily: '"Inter", sans-serif'
  },
  section: {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "120px 24px"
  },
  gradientText: {
    background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "900"
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "40px 24px"
  },
  card: {
    cursor: "pointer"
  },
  imageContainer: {
    aspectRatio: "1 / 1",
    backgroundColor: "#f8fafc",
    borderRadius: "20px",
    overflow: "hidden",
    position: "relative",
    border: "1px solid #f1f5f9"
  }
};

/* =========================
   HELPER (OUTSIDE COMPONENT)
========================= */
const getImageUrl = (product) => {
  if (!product.images || product.images.length === 0) {
    return "/images/products/kite.jpg";
  }
  const url = product.images[0].url;
  if (url.startsWith("http")) return url;
  return `http://localhost:5000${url.startsWith("/") ? "" : "/"}${url}`;
};

/* =========================
   PRODUCT CARD (MEMOIZED)
========================= */
const ProductCard = memo(({ product, onClick }) => {
  return (
    <div
      style={styles.card}
      onClick={onClick}
      className="group"
    >
      <div style={styles.imageContainer}>
        <img
          src={getImageUrl(product)}
          alt={product.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease"
          }}
          className="group-hover:scale-105"
        />

        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#fff",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            opacity: 0.85
          }}
        >
          <Plus size={16} color="#0ea5e9" />
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "800",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {product.name}
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "4px"
          }}
        >
          <span style={{ color: "#64748b", fontSize: "13px" }}>
            {product.category || "Aero"}
          </span>
          <span
            style={{
              fontWeight: "900",
              color: "#0ea5e9",
              fontSize: "14px"
            }}
          >
            ₹{product.price}
          </span>
        </div>
      </div>
    </div>
  );
});

/* =========================
   MAIN COMPONENT
========================= */
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/products"
        );
        setProducts(res.data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigate = useCallback(
    (id) => navigate(`/products/${id}`),
    [navigate]
  );

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        {/* HEADER */}
        <div
          style={{
            marginBottom: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#0ea5e9",
                fontWeight: "800",
                fontSize: "11px",
                letterSpacing: "2px",
                marginBottom: "8px"
              }}
            >
              <ShoppingBag size={14} /> CATALOG
            </div>

            <h1
              style={{
                ...styles.gradientText,
                fontSize: "42px",
                letterSpacing: "-0.02em"
              }}
            >
              The Fleet.
            </h1>
          </div>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: "600"
            }}
          >
            {products.length} INSTRUMENTS AVAILABLE
          </p>
        </div>

        {/* GRID */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "100px" }}>
            <Zap size={32} className="animate-pulse" color="#0ea5e9" />
          </div>
        ) : (
          <div style={styles.productGrid}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => handleNavigate(product._id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
