import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { productImages } from "../../utils/productImages";
import { useNavigate } from "react-router-dom";
import { Plus, Zap, Search, X, Layers } from "lucide-react";

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
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.05) !important;
    box-shadow: 0 12px 24px rgba(0,0,0,0.5);
  }
  /* KILL ALL DEFAULT BORDERS */
  input:focus { outline: none !important; border: none !important; }
  button:focus { outline: none !important; }
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
      const res = await axios.get("http://localhost:5000/api/search/products", {
        params: { category: activeCategory, search: searchTerm }
      });
      const items = res.data.products || [];
      setProducts(items);
      setLoading(false);
      if (isFirstLoad || (activeCategory === "All" && searchTerm === "" && categories.length <= 1)) {
        setCategories(["All", ...new Set(items.map((p) => p.category))]);
      }
    } catch (error) {
      console.error("Search fetch failed:", error);
      setLoading(false);
    }
  }, [activeCategory, searchTerm, categories.length]);

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
      backgroundColor: '#000000', // Pure black for professional theme
      minHeight: '100vh',
      color: '#ffffff', // White text
      width: '100%',
      overflowX: 'hidden',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    innerContent: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    headerRow: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      marginBottom: '60px', 
      flexWrap: 'wrap', 
      gap: '30px' 
    },
    searchBox: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      background: 'rgba(255,255,255,0.05)', // Subtle white overlay
      padding: '14px 22px', 
      borderRadius: '16px', 
      border: 'none',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)', // Light inner border
      width: '100%',
      maxWidth: '400px',
      backdropFilter: 'blur(10px)'
    },
    catPill: (isActive) => ({
      padding: "10px 24px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "800",
      cursor: "pointer",
      border: "none",
      transition: "0.3s all",
      backgroundColor: isActive ? "#ffffff" : "rgba(255,255,255,0.05)", // White for active, gray for inactive
      color: isActive ? "#000000" : "#cccccc", // Black text for active, light gray for inactive
      boxShadow: isActive ? '0 4px 12px rgba(255,255,255,0.2)' : 'inset 0 0 0 1px rgba(255,255,255,0.1)'
    }),
    grid: { 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
      gap: "30px" 
    },
    card: { 
      background: "rgba(255,255,255,0.03)", // Subtle white overlay
      borderRadius: "28px", 
      padding: "14px", 
      border: "none",
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)', 
      cursor: "pointer", 
      backdropFilter: 'blur(8px)'
    },
    imgContainer: { 
      height: "300px", 
      borderRadius: "20px", 
      overflow: "hidden", 
      background: '#111111', // Dark gray for image background
      position: 'relative'
    },
    price: { 
      fontSize: '20px', 
      fontWeight: '900', 
      color: '#ffffff', // White price
    },
    addBtn: { 
      background: "#ffffff", // White button
      color: "#000000", // Black icon
      border: "none", 
      borderRadius: "14px", 
      width: "44px", 
      height: "44px", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{animationStyles}</style>
      <div style={styles.innerContent}>
        <div style={styles.headerRow}>
          <header>
            <span style={{ fontSize: "12px", fontWeight: "900", color: "#ffffff", letterSpacing: "3px" }}> {/* White for header accent */}
              <Layers size={14} style={{ marginBottom: '-2px', marginRight: '5px' }} /> AERO FLEET
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "900", margin: "10px 0", letterSpacing: "-1.5px", color: "#ffffff" }}>
              The Collection<span style={{color: '#cccccc'}}>.</span> {/* Light gray dot */}
            </h1>
          </header>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={styles.searchBox}>
              <Search size={18} color="#ffffff" /> {/* White search icon */}
              <input 
                style={{ border: 'none', background: 'transparent', color: '#ffffff', width: '100%', fontSize: '14px' }}
                placeholder="Search inventory..."
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

        <div style={styles.grid}>
          {products.map((product, index) => (
            <div 
              key={product._id} 
              className="product-card-anim product-card-hover"
              style={{ ...styles.card, animationDelay: `${index * 0.05}s` }} 
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <div style={styles.imgContainer}>
                <img src={productImages[product.images?.[0]?.url]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px 10px 10px' }}>
                <span style={{ fontSize: '10px', color: '#cccccc', fontWeight: '800' }}>{product.category}</span> {/* Light gray category */}
                <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '5px 0 15px', color: '#ffffff' }}>{product.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={styles.price}>₹{product.price}</span>
                  <button style={styles.addBtn}><Plus size={20} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;