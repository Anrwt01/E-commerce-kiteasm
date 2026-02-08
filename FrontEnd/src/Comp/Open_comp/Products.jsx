import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Layers, Heart, ShieldCheck } from "lucide-react";
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
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    .header-row { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
    .search-section { width: 100% !important; align-items: flex-start !important; }
    .search-box { max-width: 100% !important; }
    .page-wrapper { padding-top: 120px !important; }
  }

  /* MOBILE 2-COLUMN FIX */
  @media (max-width: 600px) {
    .product-grid {
      display: grid !important;
      /* minmax(0, 1fr) is the secret to breaking the inline 260px restriction */
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important; 
      gap: 12px !important;
      padding: 0 10px !important;
      width: 100% !important;
    }

    .product-card-hover {
      padding: 12px !important;
      border-radius: 16px !important;
    }

    .img-container-mobile { 
      height: 160px !important; 
      width: 100% !important;
    }

    .product-name-text {
      font-size: 14px !important;
      margin-bottom: 8px !important;
    }

    .product-price-text {
      font-size: 1.1rem !important;
    }
    
    .add-btn {
      display: none !important;
    }
  } 

  .out-of-stock-strip {
    position: absolute;
    top: 15px;
    left: -35px;
    background: #FFD700;
    color: black;
    padding: 5px 40px;
    font-size: 9px;
    font-weight: 900;
    text-transform: uppercase;
    transform: rotate(-45deg);
    z-index: 10;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    pointer-events: none;
  }
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const isInitialMount = useRef(true);
  const token = localStorage.getItem("token");

  const fetchWishlist = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/my-wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems(res.data.products?.map(p => p._id) || []);
    } catch (error) {
      console.error("Wishlist fetch failed:", error);
    }
  }, [token]);

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

  const fetchProducts = useCallback(async (isFirstLoad = false) => {
    setLoading(true);
    try {
      // 1. Determine which endpoint to use
      // If no search term and category is "All", use the general "all products" API
      const isSearching = searchTerm.trim() !== "" || activeCategory !== "All";
      const endpoint = isSearching
        ? `${API_BASE_URL}/search/products`
        : `${API_BASE_URL}/user/products`;

      const res = await axios.get(endpoint, {
        params: isSearching ? { category: activeCategory, search: searchTerm } : {}
      });

      // 2. Standardize data access 
      // (Handling cases where one API returns .products and the other returns the array directly)
      const items = res.data.products || res.data || [];

      setProducts(items);
      setLoading(false);

      // 3. Set categories only on the very first load of all products
      if (isFirstLoad && !isSearching) {
        const uniqueCats = ["All", ...new Set(items.map((p) => p.category))];
        setCategories(uniqueCats);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setLoading(false);
    }
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    if (isInitialMount.current) {
      fetchProducts(true);
      fetchWishlist();
      isInitialMount.current = false;
    } else {
      const delayDebounceFn = setTimeout(() => fetchProducts(false), 400);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, activeCategory, fetchProducts, fetchWishlist]);

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
        <div className="product-grid">
          {loading ? (
            <p style={{ color: '#444' }}>Loading Inventory...</p>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product._id}
                className="product-card-anim product-card-hover"
                style={{ ...styles.card, animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <div style={{ ...styles.imgContainer, opacity: product.stock === 0 ? 0.6 : 1, position: 'relative' }} className="img-container-mobile">
                  {product.stock === 0 && <div className="out-of-stock-strip">Out of Stock</div>}

                  {/* Mobile-only badges */}
                  <div className="mobile-badges" style={{ position: 'absolute', top: 0, right: 0, padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', zIndex: 5, pointerEvents: 'none' }}>
                    {product.isExclusive && (
                      <div style={{
                        background: '#3b82f6', color: 'white', padding: '4px 10px', borderRadius: '20px',
                        fontSize: '9px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px',
                        boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)', pointerEvents: 'auto', marginBottom: '4px'
                      }}>
                        <ShieldCheck size={10} strokeWidth={3} /> EXCLUSIVE
                      </div>
                    )}

                    <button style={{
                      width: '32px', height: '32px',
                      borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
                      border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', pointerEvents: 'auto',
                      padding: '0', margin: '0', flex: 'none',
                      overflow: 'hidden', boxSizing: 'border-box'
                    }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product._id);
                      }}>
                      <Heart size={16}
                        color={wishlistItems.includes(product._id) ? "#ef4444" : "#94a3b8"}
                        fill={wishlistItems.includes(product._id) ? "#ef4444" : "none"}
                      />
                    </button>
                  </div>

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
                    <button className="add-btn"
                      disabled={product.stock === 0}
                      style={{
                        background: product.stock === 0 ? "#cbd5e1" : "var(--accent)",
                        color: "#ffffff", border: "none", borderRadius: "12px",
                        width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: '700',
                        boxShadow: product.stock === 0 ? "none" : '0 4px 12px rgba(59, 130, 246, 0.3)',
                        cursor: product.stock === 0 ? "not-allowed" : "pointer"
                      }}>
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#666' }}>No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;