import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productImages } from "../../utils/productImages";
import axios from "axios";
import { ShieldCheck, Truck, ChevronLeft, ShoppingCart, Minus, Plus, AlertCircle, PackageCheck } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/products/${id}`);
        setProduct(res.data.product || res.data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      const res = await axios.post(
        `http://localhost:5000/api/user/cart/add`,
        { productId: product._id, quantity: quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200 || res.status === 201) navigate("/cart");
    } catch (error) {
      console.error("Cart Error:", error.response?.data || error.message);
    }
  };

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      <div className="animate-pulse" style={{ fontWeight: "900", color: "#0ea5e9", letterSpacing: "4px" }}>LOADING...</div>
    </div>
  );

  if (!product) return <div style={{ paddingTop: "200px", textAlign: "center", color: "#64748b" }}>Product Off-Radar.</div>;

  const isOutOfStock = product.stock <= 0;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "10px 18px", display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontWeight: "600", cursor: "pointer", transition: "0.2s", marginBottom: "40px" }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
        >
          <ChevronLeft size={16} /> Fleet Catalog
        </button>

        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth > 992 ? "1.1fr 0.9fr" : "1fr", gap: "60px", alignItems: "start" }}>
          
          {/* LEFT: Image Section with Shadow Depth */}
          <div style={{ position: "relative" }}>
            <div style={{ background: "white", borderRadius: "40px", padding: "40px", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <img 
                // src={product.images?.[0]?.url.startsWith("http") ? product.images[0].url : `http://localhost:5000${product.images?.[0]?.url}`} 
                src={productImages[product.images?.[0]?.url]}
                alt={product.name} 
                style={{ width: "100%", height: "auto", maxHeight: "550px", objectFit: "contain", transform: isOutOfStock ? "scale(0.95)" : "scale(1)", opacity: isOutOfStock ? 0.6 : 1, transition: "0.5s ease" }} 
              />
              {isOutOfStock && (
                 <div style={{ position: "absolute", background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(12px)", padding: "12px 24px", borderRadius: "20px", border: "1px solid #fee2e2", color: "#ef4444", fontWeight: "800", fontSize: "14px", letterSpacing: "1px" }}>
                    DEPLETED FROM INVENTORY
                 </div>
              )}
            </div>
          </div>

          {/* RIGHT: Sophisticated Details Section */}
          <div style={{ padding: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#e0f2fe", color: "#0ea5e9", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px" }}>PREMIUM GRADE</span>
                {isOutOfStock ? (
                   <span style={{ background: "#fef2f2", color: "#ef4444", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "4px" }}><AlertCircle size={12}/> OUT OF STOCK</span>
                ) : (
                   <span style={{ background: "#f0fdf4", color: "#22c55e", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "4px" }}><PackageCheck size={12}/> IN STOCK</span>
                )}
            </div>

            <h1 style={{ fontSize: "48px", fontWeight: "900", color: "#0f172a", margin: "0 0 16px 0", letterSpacing: "-1.5px", lineHeight: "1.1" }}>{product.name}</h1>
            <p style={{ fontSize: "32px", fontWeight: "300", color: isOutOfStock ? "#cbd5e1" : "#0f172a", marginBottom: "32px" }}>₹{product.price.toLocaleString()}</p>
            
            <div style={{ marginBottom: "40px" }}>
                <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>Technical Specs</h4>
                <p style={{ color: "#64748b", lineHeight: "1.8", fontSize: "16px", maxWidth: "500px" }}>{product.description || "Designed for ultimate performance and refined aesthetics, using industry-leading materials."}</p>
            </div>

            {/* Feature Pills */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 20px", background: "white", borderRadius: "16px", border: "1px solid #f1f5f9", fontSize: "13px", fontWeight: "600", color: "#475569" }}><Truck size={16} color="#0ea5e9" /> Priority Shipping</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 20px", background: "white", borderRadius: "16px", border: "1px solid #f1f5f9", fontSize: "13px", fontWeight: "600", color: "#475569" }}><ShieldCheck size={16} color="#22c55e" /> 2yr Warranty</div>
            </div>

            {/* Selection Area */}
            <div style={{ background: "white", padding: "24px", borderRadius: "24px", border: "1px solid #f1f5f9", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.02)" }}>
                <p style={{ fontSize: "11px", fontWeight: "800", color: "#94a3b8", marginBottom: "16px", letterSpacing: "1px" }}>ADJUST QUANTITY</p>
                <div style={{ display: "flex", alignItems: "center", gap: "25px", marginBottom: "24px", opacity: isOutOfStock ? 0.4 : 1 }}>
                    <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", borderRadius: "14px", padding: "6px" }}>
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: "40px", height: "40px", border: "none", background: "white", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}><Minus size={16}/></button>
                        <span style={{ width: "50px", textAlign: "center", fontWeight: "800", fontSize: "18px" }}>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} style={{ width: "40px", height: "40px", border: "none", background: "white", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}><Plus size={16}/></button>
                    </div>
                    {!isOutOfStock && <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}>Subtotal: <b style={{ color: "#0f172a" }}>₹{(product.price * quantity).toLocaleString()}</b></span>}
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  style={{ 
                      width: "100%", padding: "22px", background: isOutOfStock ? "#f1f5f9" : "#0f172a", color: isOutOfStock ? "#cbd5e1" : "white", 
                      border: "none", borderRadius: "18px", fontWeight: "700", fontSize: "16px",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", cursor: isOutOfStock ? "not-allowed" : "pointer",
                      transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: isOutOfStock ? "none" : "0 15px 30px -10px rgba(15, 23, 42, 0.3)"
                  }}
                  onMouseEnter={(e) => !isOutOfStock && (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => !isOutOfStock && (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {isOutOfStock ? "NOT AVAILABLE" : <><ShoppingCart size={18} /> Deploy to Inventory</>}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;