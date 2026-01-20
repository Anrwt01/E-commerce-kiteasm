import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Plus, Zap } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/products");
        setProducts(res.data.products || []);
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const getImageUrl = (product) => {
    if (!product.images?.length) return "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?w=500";
    const url = product.images[0].url;
    return url.startsWith("http") ? url : `http://localhost:5000${url}`;
  };

  return (
    <div style={{ padding: "140px 24px 80px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "60px", textAlign: "center" }}>
        <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "3px", color: "#0ea5e9", textTransform: "uppercase" }}>Aero Fleet</span>
        <h1 style={{ fontSize: "48px", fontWeight: "900", color: "#0f172a", margin: "10px 0", letterSpacing: "-2px" }}>The Collection.</h1>
        <p style={{ color: "#64748b", fontSize: "16px" }}>Precision-engineered gear for the modern aviator.</p>
      </header>

      {loading ? (
        <div style={{ textAlign: "center", padding: "100px" }}><Zap className="animate-pulse" color="#0ea5e9" /></div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "30px" }}>
          {products.map((product) => (
            <div 
              key={product._id} 
              onClick={() => navigate(`/products/${product._id}`)}
              style={{ background: "#fff", borderRadius: "24px", padding: "12px", border: "1px solid #e2e8f0", cursor: "pointer", transition: "0.3s" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ height: "280px", borderRadius: "18px", overflow: "hidden", backgroundColor: "#f1f5f9" }}>
                <img src={getImageUrl(product)} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "16px 8px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0" }}>{product.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                  <span style={{ fontWeight: "900", color: "#0ea5e9" }}>₹{product.price}</span>
                  <button style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;