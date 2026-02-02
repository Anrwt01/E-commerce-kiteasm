import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Layers } from "lucide-react";

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
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.05) !important;
    box-shadow: 0 12px 24px rgba(0,0,0,0.5);
  }
  input:focus { outline: none !important; border: none !important; }
  
  /* Responsive Breakpoints */
  @media (max-width: 768px) {
    .header-row { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
    .search-section { width: 100% !important; align-items: flex-start !important; }
    .search-box { max-width: 100% !important; }
    .page-wrapper { padding-top: 120px !important; }
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
      const res = await axios.get("http://localhost:5000/api/search/products", {
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
      backgroundColor: '#fff4f4',
      minHeight: '100vh',
      color: '#000000',
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
      background: 'rgba(255,255,255,0.05)', 
      padding: '14px 22px', 
      borderRadius: '16px', 
      width: '100%',
      maxWidth: '400px',
      backdropFilter: 'blur(10px)',
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
      backgroundColor: isActive ? "#ffffff" : "rgba(255,255,255,0.05)",
      color: isActive ? "#000000" : "#cccccc",
      textTransform: 'uppercase'
    }),
    grid: { 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
      gap: "25px" 
    },
    card: { 
      background: "rgba(255,255,255,0.03)", 
      borderRadius: "24px", 
      padding: "12px", 
      cursor: "pointer", 
      backdropFilter: 'blur(8px)',
      boxSizing: 'border-box'
    },
    imgContainer: { 
      aspectRatio: '1/1',
      borderRadius: "18px", 
      overflow: "hidden", 
      background: '#111111',
      width: '100%'
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
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "900", margin: "10px 0", letterSpacing: "-2px" }}>
              The Collection<span style={{color: '#444'}}>.</span>
            </h1>
          </header>

          <div className="search-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div className="search-box" style={styles.searchBox}>
              <Search size={18} color="#666" />
              <input 
                style={{ border: 'none', background: 'transparent', color: '#ffffff', width: '100%', fontSize: '14px' }}
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
        <div style={styles.grid}>
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
                  <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '0 0 12px', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: '900' }}>₹{product.price}</span>
                    <button style={{ 
                        background: "#ffffff", color: "#000", border: "none", borderRadius: "10px", 
                        width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <Plus size={18} />
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