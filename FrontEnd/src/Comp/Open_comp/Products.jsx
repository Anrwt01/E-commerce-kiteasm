// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { productImages } from "../../utils/productImages";
// import { useNavigate } from "react-router-dom";
// import { ShoppingBag, Plus, Zap, Filter } from "lucide-react";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const navigate = useNavigate();

//   // Get unique categories from products
//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/user/products");
//         const items = res.data.products || [];
//         setProducts(items);
//         setFilteredProducts(items);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Filter logic
//   useEffect(() => {
//     if (activeCategory === "All") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter((p) => p.category === activeCategory));
//     }
//   }, [activeCategory, products]);

//   return (
//     <div style={{ padding: "140px 24px 80px", maxWidth: "1200px", margin: "0 auto" }}>
//       {/* HEADER SECTION */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px" }}>
//         <header style={{ textAlign: "left" }}>
//           <span style={styles.brandBadge}>Aero Fleet</span>
//           <h1 style={styles.mainTitle}>The Collection.</h1>
//           <p style={styles.subtitle}>Precision-engineered gear for the modern aviator.</p>
//         </header>

//         {/* CATEGORY SECTION (TOP RIGHT) */}
//         <div style={styles.categoryContainer}>
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               style={{
//                 ...styles.categoryPill,
//                 backgroundColor: activeCategory === cat ? "#0f172a" : "transparent",
//                 color: activeCategory === cat ? "#fff" : "#64748b",
//                 borderColor: activeCategory === cat ? "#0f172a" : "#e2e8f0",
//               }}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {loading ? (
//         <div style={{ textAlign: "center", padding: "100px" }}>
//           <Zap className="animate-pulse" color="#0ea5e9" />
//         </div>
//       ) : (
//         <div style={styles.productGrid}>
//           {filteredProducts.map((product) => (
//             <div
//               key={product._id}
//               onClick={() => navigate(`/products/${product._id}`)}
//               style={styles.productCard}
//               onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
//               onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//             >
//               <div style={styles.imageContainer}>
//                 <img
//                   src={productImages[product.images?.[0]?.url]}
//                   alt={product.name}
//                   style={styles.image}
//                 />
//               </div>
//               <div style={{ padding: "16px 8px" }}>
//                 <span style={styles.categoryLabel}>{product.category}</span>
//                 <h3 style={styles.productName}>{product.name}</h3>
//                 <div style={styles.priceRow}>
//                   <span style={styles.price}>₹{product.price}</span>
//                   <button style={styles.addButton}>
//                     <Plus size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   brandBadge: { fontSize: "10px", fontWeight: "800", letterSpacing: "3px", color: "#0ea5e9", textTransform: "uppercase" },
//   mainTitle: { fontSize: "48px", fontWeight: "900", color: "#0f172a", margin: "10px 0", letterSpacing: "-2px" },
//   subtitle: { color: "#64748b", fontSize: "16px", margin: 0 },
//   categoryContainer: { display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "500px" },
//   categoryPill: {
//     padding: "8px 20px",
//     borderRadius: "100px",
//     fontSize: "12px",
//     fontWeight: "700",
//     cursor: "pointer",
//     border: "1px solid",
//     transition: "all 0.2s ease",
//     textTransform: "capitalize"
//   },
//   productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "30px" },
//   productCard: { background: "#fff", borderRadius: "24px", padding: "12px", border: "1px solid #e2e8f0", cursor: "pointer", transition: "0.3s" },
//   imageContainer: { height: "280px", borderRadius: "18px", overflow: "hidden", backgroundColor: "#f1f5f9" },
//   image: { width: "100%", height: "100%", objectFit: "cover" },
//   categoryLabel: { fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase" },
//   productName: { fontSize: "16px", fontWeight: "800", margin: "4px 0" },
//   priceRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" },
//   price: { fontWeight: "900", color: "#0ea5e9" },
//   addButton: { background: "#0f172a", color: "#fff", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }
// };


import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { productImages } from "../../utils/productImages";
import { useNavigate } from "react-router-dom";
import { Plus, Zap, Search, X } from "lucide-react";

const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .product-card-anim {
    animation: fadeInUp 0.4s ease forwards;
  }
  .loader-fade {
    transition: opacity 0.3s ease;
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
    // We keep the current products in state so the screen doesn't go blank
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/search/products", {
        params: {
          category: activeCategory,
          search: searchTerm
        }
      });
      
      const items = res.data.products || [];
      
      // Batch these updates to prevent multiple renders
      setProducts(items);
      setLoading(false);

      if (isFirstLoad || (activeCategory === "All" && searchTerm === "" && categories.length <= 1)) {
        const uniqueCats = ["All", ...new Set(items.map((p) => p.category))];
        setCategories(uniqueCats);
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
      const delayDebounceFn = setTimeout(() => {
        fetchProducts(false);
      }, 400);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, activeCategory, fetchProducts]);

  return (
    <div style={styles.pageWrapper}>
      <style>{animationStyles}</style>

      <div style={styles.headerRow}>
        <header>
          <span style={styles.brandBadge}>Aero Fleet Systems</span>
          <h1 style={styles.mainTitle}>The Collection<span style={{color: '#0ea5e9'}}>.</span></h1>
        </header>

        <div style={styles.controls}>
          <div style={styles.searchBox}>
            <Search size={18} color="#94a3b8" />
            <input 
              style={styles.input}
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <X size={16} onClick={() => setSearchTerm("")} style={{cursor:'pointer'}} />}
          </div>

          <div style={styles.categoryBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...styles.catPill,
                  backgroundColor: activeCategory === cat ? "#0f172a" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#64748b",
                  borderColor: activeCategory === cat ? "#0f172a" : "#e2e8f0",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', minHeight: '400px' }}>
        {/* OVERLAY LOADER: Only shows as a small indicator if we already have products */}
        {loading && (
          <div style={products.length > 0 ? styles.refreshOverlay : styles.fullLoader}>
            <Zap className="animate-pulse" color="#0ea5e9" size={products.length > 0 ? 30 : 50} />
            <p style={styles.loaderText}>{products.length > 0 ? "REFRESHING..." : "SCANNING INVENTORY..."}</p>
          </div>
        )}

        {/* PRODUCT GRID: Opacity changes instead of disappearing */}
        {!loading && products.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No products match your criteria.</p>
            <button onClick={() => {setSearchTerm(""); setActiveCategory("All")}} style={styles.resetBtn}>Clear Filters</button>
          </div>
        ) : (
          <div style={{ ...styles.grid, opacity: loading && products.length > 0 ? 0.4 : 1, transition: '0.3s' }}>
            {products.map((product, index) => (
              <div 
                key={product._id} 
                className="product-card-anim"
                style={{ ...styles.card, animationDelay: `${index * 0.03}s` }} 
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <div style={styles.imgContainer}>
                  <img src={productImages[product.images?.[0]?.url]} alt={product.name} style={styles.img} />
                </div>
                <div style={styles.details}>
                  <span style={styles.catLabel}>{product.category}</span>
                  <h3 style={styles.name}>{product.name}</h3>
                  <div style={styles.footer}>
                    <span style={styles.price}>₹{product.price}</span>
                    <button style={styles.addBtn}><Plus size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { padding: "140px 40px 80px", maxWidth: "1300px", margin: "0 auto", backgroundColor: '#f8fafc', minHeight: '100vh' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '60px', flexWrap: 'wrap', gap: '30px' },
  brandBadge: { fontSize: "10px", fontWeight: "900", letterSpacing: "3px", color: "#0ea5e9", textTransform: "uppercase" },
  mainTitle: { fontSize: "52px", fontWeight: "900", color: "#0f172a", margin: "10px 0", letterSpacing: "-2px" },
  controls: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' },
  searchBox: { display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '12px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', width: '350px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  input: { border: 'none', outline: 'none', width: '100%', fontSize: '14px', fontWeight: '500' },
  categoryBar: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  catPill: { padding: "8px 22px", borderRadius: "100px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "1px solid", transition: "0.2s" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "35px" },
  card: { background: "#fff", borderRadius: "32px", padding: "15px", border: "1px solid #e2e8f0", cursor: "pointer", transition: "0.3s" },
  imgContainer: { height: "300px", borderRadius: "24px", overflow: "hidden", background: '#f1f5f9' },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  details: { padding: '20px 10px 10px' },
  catLabel: { fontSize: "10px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase" },
  name: { fontSize: "18px", fontWeight: "800", margin: "5px 0 15px", color: '#1e293b' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: '20px', fontWeight: '900', color: '#0ea5e9' },
  addBtn: { background: "#0f172a", color: "#fff", border: "none", borderRadius: "14px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" },
  
  // Loading states
  fullLoader: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px' },
  refreshOverlay: { position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center', pointerEvents: 'none' },
  loaderText: { marginTop: '10px', color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' },
  
  emptyState: { textAlign: 'center', padding: '100px', color: '#64748b' },
  resetBtn: { marginTop: '15px', padding: '10px 20px', borderRadius: '12px', background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '700' }
};

export default Products;