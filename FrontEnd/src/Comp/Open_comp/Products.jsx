import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Layers } from "lucide-react";
import API_BASE_URL from "../../utils/config.js";

// Helper to resolve image paths based on our new ID structure
const getProductImage = (dbPath) => {
  if (!dbPath) return "";
  const cleanPath = dbPath.replace("/uploads/", "");
  try {
    return new URL(`../../assets/products/${cleanPath}`, import.meta.url).href;
  } catch (err) {
    return "https://via.placeholder.com/300";
  }
};

const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .product-card-anim {
    animation: fadeInUp 0.4s ease forwards;
  }
  .product-card-hover {
    transition: all 0.3s ease;
  }
  .product-card-hover:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: var(--accent) !important;
    box-shadow: var(--shadow-hover) !important;
  }
  input:focus { outline: none !important; border: none !important; }
  
  /* Responsive Breakpoints */
  @media (max-width: 768px) {
    .header-row { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
    .search-section { width: 100% !important; align-items: flex-start !important; }
    .search-box { max-width: 100% !important; }
    .page-wrapper { padding-top: 120px !important; }
  }

  @media (max-width: 600px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
    }
    .product-card-hover {
      padding: 8px !important;
      border-radius: 16px !important;
    }
    .product-name-text {
      font-size: 14px !important;
      margin-bottom: 6px !important;
    }
    .product-price-text {
      font-size: 15px !important;
    }
    .add-btn {
      width: 30px !important;
      height: 30px !important;
    }
  }
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  const fetchProducts = useCallback(async (isFirstLoad = false) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/search/products`, {
        params: { category: activeCategory, search: searchTerm }
      });
      const items = res.data.products || [];
      setProducts(items);
      setLoading(false);
      if (isFirstLoad) {
        setCategories(["All", ...new Set(items.map((p) => p.category))]);
      }
    } catch (error) {
      console.error("Search fetch failed:", error);
      setLoading(false);
    }
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    if (isInitialMount.current) {
      fetchProducts(true);
      isInitialMount.current = false;
    } else {
      const delayDebounceFn = setTimeout(() => fetchProducts(false), 400);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, activeCategory, fetchProducts]);

  const styles = {
    pageWrapper: {
      padding: "160px 5% 80px",
      backgroundColor: 'var(--bg-base)',
      minHeight: '100vh',
      color: 'var(--slate-800)',
      width: '100%',
      boxSizing: 'border-box'
    },
    innerContent: { maxWidth: "1400px", margin: "0 auto" },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '60px',
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(10px)',
      padding: '14px 22px',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '400px',
      border: '1px solid var(--border-soft)',
      boxShadow: 'var(--shadow-sm)',
      boxSizing: 'border-box'
    },
    catPill: (isActive) => ({
      padding: "10px 20px",
      borderRadius: "12px",
      fontSize: "11px",
      fontWeight: "800",
      cursor: "pointer",
      border: "none",
      transition: "0.3s all",
      backgroundColor: isActive ? "var(--accent)" : "rgba(255,255,255,0.8)",
      color: isActive ? "#ffffff" : "var(--slate-600)",
      boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'var(--shadow-sm)',
      border: isActive ? 'none' : '1px solid var(--border-soft)',
      textTransform: 'uppercase'
    }),
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "25px"
    },
    card: {
      background: "var(--bg-card)",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--radius-xl)",
      padding: "20px",
      cursor: "pointer",
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--shadow-floating)'
    },
    imgContainer: {
      width: '100%',
      height: '300px',
      borderRadius: '18px',
      overflow: 'hidden',
      backgroundColor: '#f1f5f9',
      transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
    }
  };

  return (
    <div style={styles.pageWrapper} className="page-wrapper">
      <style>{animationStyles}</style>

      <div style={styles.innerContent}>
        {/* Header Section */}
        <div style={styles.headerRow} className="header-row">
          <header>
            <span style={{ fontSize: "11px", fontWeight: "900", color: "#666", letterSpacing: "3px", textTransform: 'uppercase' }}>
              <Layers size={14} style={{ marginBottom: '-2px', marginRight: '5px' }} /> Premium Stock
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "800", margin: "10px 0", letterSpacing: "-2px", color: 'var(--slate-800)' }}>
              The Collection<span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
          </header>

          <div className="search-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div className="search-box" style={styles.searchBox}>
              <Search size={18} color="var(--slate-400)" />
              <input
                style={{ border: 'none', background: 'transparent', color: 'var(--slate-800)', width: '100%', fontSize: '14px', fontWeight: '500' }}
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '15px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={styles.catPill(activeCategory === cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div style={styles.grid} className="product-grid">
          {loading ? (
            <p style={{ color: '#444' }}>Syncing Inventory...</p>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product._id}
                className="product-card-anim product-card-hover"
                style={{ ...styles.card, animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <div style={styles.imgContainer}>
                  <img
                    src={`../uploads/${product._id}/main.jpg`}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => e.target.src = "https://via.placeholder.com/300"}
                  />
                </div>
                <div style={{ padding: '16px 8px 8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '9px', color: '#666', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</span>
                    {product.isExclusive && <span style={{ fontSize: '9px', color: '#0ea5e9', fontWeight: '900' }}>EXCLUSIVE</span>}
                  </div>
                  <h3 className="product-name-text" style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0 0 12px', color: 'var(--slate-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.5px' }}>
                    {product.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="product-price-text" style={{ fontSize: '1.2rem', fontWeight: '800', color: "var(--accent)" }}>₹{product.price}</span>
                    <button className="add-btn" style={{
                      background: "var(--accent)", color: "#ffffff", border: "none", borderRadius: "12px",
                      width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: '700',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}>
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#666' }}>No items found in this flight path.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;