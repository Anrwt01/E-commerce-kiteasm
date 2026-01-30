// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { productImages } from "../../utils/productImages";
// import axios from "axios";
// import { ShieldCheck, Truck, ChevronLeft, ShoppingCart, Minus, Plus, AlertCircle, PackageCheck } from "lucide-react";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/user/products/${id}`);
//         setProduct(res.data.product || res.data);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (product.stock <= 0) return;
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return navigate("/login");
//       const res = await axios.post(
//         `http://localhost:5000/api/user/cart/add`,
//         { productId: product._id, quantity: quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.status === 200 || res.status === 201) navigate("/cart");
//     } catch (error) {
//       console.error("Cart Error:", error.response?.data || error.message);
//     }
//   };

//   if (loading) return (
//     <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
//       <div className="animate-pulse" style={{ fontWeight: "900", color: "#0ea5e9", letterSpacing: "4px" }}>LOADING...</div>
//     </div>
//   );

//   if (!product) return <div style={{ paddingTop: "200px", textAlign: "center", color: "#64748b" }}>Product Off-Radar.</div>;

//   const isOutOfStock = product.stock <= 0;

//   return (
//     <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "120px 24px 80px" }}>
//       <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
//         {/* Navigation Breadcrumb */}
//         <button 
//           onClick={() => navigate(-1)} 
//           style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "10px 18px", display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontWeight: "600", cursor: "pointer", transition: "0.2s", marginBottom: "40px" }}
//           onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"}
//           onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
//         >
//           <ChevronLeft size={16} /> Fleet Catalog
//         </button>

//         <div style={{ display: "grid", gridTemplateColumns: window.innerWidth > 992 ? "1.1fr 0.9fr" : "1fr", gap: "60px", alignItems: "start" }}>
          
//           {/* LEFT: Image Section with Shadow Depth */}
//           <div style={{ position: "relative" }}>
//             <div style={{ background: "white", borderRadius: "40px", padding: "40px", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
//               <img 
//                 // src={product.images?.[0]?.url.startsWith("http") ? product.images[0].url : `http://localhost:5000${product.images?.[0]?.url}`} 
//                 src={productImages[product.images?.[0]?.url]}
//                 alt={product.name} 
//                 style={{ width: "100%", height: "auto", maxHeight: "550px", objectFit: "contain", transform: isOutOfStock ? "scale(0.95)" : "scale(1)", opacity: isOutOfStock ? 0.6 : 1, transition: "0.5s ease" }} 
//               />
//               {isOutOfStock && (
//                  <div style={{ position: "absolute", background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(12px)", padding: "12px 24px", borderRadius: "20px", border: "1px solid #fee2e2", color: "#ef4444", fontWeight: "800", fontSize: "14px", letterSpacing: "1px" }}>
//                     DEPLETED FROM INVENTORY
//                  </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT: Sophisticated Details Section */}
//           <div style={{ padding: "10px" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
//                 <span style={{ background: "#e0f2fe", color: "#0ea5e9", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px" }}>PREMIUM GRADE</span>
//                 {isOutOfStock ? (
//                    <span style={{ background: "#fef2f2", color: "#ef4444", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "4px" }}><AlertCircle size={12}/> OUT OF STOCK</span>
//                 ) : (
//                    <span style={{ background: "#f0fdf4", color: "#22c55e", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "4px" }}><PackageCheck size={12}/> IN STOCK</span>
//                 )}
//             </div>

//             <h1 style={{ fontSize: "48px", fontWeight: "900", color: "#0f172a", margin: "0 0 16px 0", letterSpacing: "-1.5px", lineHeight: "1.1" }}>{product.name}</h1>
//             <p style={{ fontSize: "32px", fontWeight: "300", color: isOutOfStock ? "#cbd5e1" : "#0f172a", marginBottom: "32px" }}>₹{product.price.toLocaleString()}</p>
            
//             <div style={{ marginBottom: "40px" }}>
//                 <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>Technical Specs</h4>
//                 <p style={{ color: "#64748b", lineHeight: "1.8", fontSize: "16px", maxWidth: "500px" }}>{product.description || "Designed for ultimate performance and refined aesthetics, using industry-leading materials."}</p>
//             </div>

//             {/* Feature Pills */}
//             <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 20px", background: "white", borderRadius: "16px", border: "1px solid #f1f5f9", fontSize: "13px", fontWeight: "600", color: "#475569" }}><Truck size={16} color="#0ea5e9" /> Priority Shipping</div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 20px", background: "white", borderRadius: "16px", border: "1px solid #f1f5f9", fontSize: "13px", fontWeight: "600", color: "#475569" }}><ShieldCheck size={16} color="#22c55e" /> 2yr Warranty</div>
//             </div>

//             {/* Selection Area */}
//             <div style={{ background: "white", padding: "24px", borderRadius: "24px", border: "1px solid #f1f5f9", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.02)" }}>
//                 <p style={{ fontSize: "11px", fontWeight: "800", color: "#94a3b8", marginBottom: "16px", letterSpacing: "1px" }}>ADJUST QUANTITY</p>
//                 <div style={{ display: "flex", alignItems: "center", gap: "25px", marginBottom: "24px", opacity: isOutOfStock ? 0.4 : 1 }}>
//                     <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", borderRadius: "14px", padding: "6px" }}>
//                         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: "40px", height: "40px", border: "none", background: "white", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}><Minus size={16}/></button>
//                         <span style={{ width: "50px", textAlign: "center", fontWeight: "800", fontSize: "18px" }}>{quantity}</span>
//                         <button onClick={() => setQuantity(quantity + 1)} style={{ width: "40px", height: "40px", border: "none", background: "white", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}><Plus size={16}/></button>
//                     </div>
//                     {!isOutOfStock && <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}>Subtotal: <b style={{ color: "#0f172a" }}>₹{(product.price * quantity).toLocaleString()}</b></span>}
//                 </div>

//                 <button 
//                   onClick={handleAddToCart}
//                   disabled={isOutOfStock}
//                   style={{ 
//                       width: "100%", padding: "22px", background: isOutOfStock ? "#f1f5f9" : "#0f172a", color: isOutOfStock ? "#cbd5e1" : "white", 
//                       border: "none", borderRadius: "18px", fontWeight: "700", fontSize: "16px",
//                       display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", cursor: isOutOfStock ? "not-allowed" : "pointer",
//                       transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                       boxShadow: isOutOfStock ? "none" : "0 15px 30px -10px rgba(15, 23, 42, 0.3)"
//                   }}
//                   onMouseEnter={(e) => !isOutOfStock && (e.currentTarget.style.transform = "translateY(-2px)")}
//                   onMouseLeave={(e) => !isOutOfStock && (e.currentTarget.style.transform = "translateY(0)")}
//                 >
//                   {isOutOfStock ? "NOT AVAILABLE" : <><ShoppingCart size={18} /> Deploy to Inventory</>}
//                 </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productImages } from "../../utils/productImages";
import axios from "axios";
import { ChevronLeft, ShoppingCart, Minus, Plus, Loader2, Star, Zap } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [suggestedProduct, setSuggestedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/user/products/${id}`);
        const data = res.data.product || res.data;
        setProduct(data);

        // Logic: Only seek suggested bundle if product is a 'manjha'
        if (data.category?.toLowerCase() === "manjha") {
          const allRes = await axios.get(`http://localhost:5000/api/user/products`);
          const allProducts = allRes.data.products || [];
          
          const saddi = allProducts.find(p => 
            p.category?.toLowerCase() === "saddi" || 
            p.name?.toLowerCase().includes("saddi") ||
            p.name?.toLowerCase().includes("oswal")
          );
          
          if (saddi) setSuggestedProduct(saddi);
        } else {
          setSuggestedProduct(null);
        }
      } catch (error) {
        console.error("Initialization Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleBundleAddToCart = async () => {
    setIsAdding(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      const headers = { Authorization: `Bearer ${token}` };

      // Add Main Product with chosen quantity
      await axios.post(`http://localhost:5000/api/user/cart/add`, 
        { productId: product._id, quantity }, { headers });

      // If a suggested bundle product exists, add 1 of it
      if (suggestedProduct) {
        await axios.post(`http://localhost:5000/api/user/cart/add`, 
          { productId: suggestedProduct._id, quantity: 1 }, { headers });
      }
      navigate("/cart");
    } catch (err) {
      console.error("Cart Error:", err);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Loader2 className="animate-spin" size={40} color="#2874f0" />
    </div>
  );

  if (!product) return <div style={{ textAlign: "center", padding: "50px" }}>Product Not Found</div>;

  return (
    <div style={{ 
      backgroundColor: "#f7f9fa", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column" 
    }}>
      
      {/* Content Wrapper */}
      <div style={{ flex: "1 0 auto", padding: "120px 20px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* 1. BACK BUTTON */}
          <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "5px", color: "#2874f0", fontWeight: "600", cursor: "pointer", marginBottom: "20px" }}>
            <ChevronLeft size={18} /> Back to Shop
          </button>

          {/* 2. MAIN PRODUCT SECTION */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: window.innerWidth > 992 ? "1fr 1.2fr" : "1fr", 
            gap: "50px", 
            background: "#fff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            marginBottom: "40px"
          }}>
            {/* Image Box */}
            <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", background: "#fcfcfc", borderRadius: "12px", padding: "20px" }}>
              <img 
                src={productImages[product.images?.[0]?.url]} 
                alt={product.name} 
                style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} 
              />
            </div>

            {/* Product Details info */}
            <div>
              <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#1a1a1b", marginBottom: "10px", letterSpacing: "-0.5px" }}>{product.name}</h1>
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ background: "#388e3c", color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
                  4.4 <Star size={14} fill="white" />
                </div>
                <span style={{ color: "#878787", fontWeight: "500" }}>6,119 Ratings</span>
              </div>
              
              <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <span style={{ fontSize: "36px", fontWeight: "800", color: "#000" }}>₹{product.price}</span>
                  <span style={{ color: "#388e3c", fontSize: "18px", fontWeight: "600" }}>Special Price</span>
                </div>
              </div>

              <p style={{ color: "#4a4a4a", lineHeight: "1.7", fontSize: "16px", marginBottom: "30px" }}>{product.description}</p>
              
              {/* QUANTITY SELECTOR */}
              <div style={{ marginBottom: "25px", display: "flex", alignItems: "center", gap: "20px" }}>
                <span style={{ fontWeight: "600", color: "#878787", fontSize: "14px" }}>QUANTITY</span>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: "8px", overflow: "hidden" }}>
                  <button 
                    onClick={decrementQty}
                    style={{ padding: "10px", background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    <Minus size={16} />
                  </button>
                  <div style={{ width: "40px", textAlign: "center", fontWeight: "700", fontSize: "16px" }}>
                    {quantity}
                  </div>
                  <button 
                    onClick={incrementQty}
                    style={{ padding: "10px", background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", gap: "15px" }}>
                <button 
                  onClick={handleBundleAddToCart} 
                  disabled={isAdding}
                  style={{ flex: 1, background: "#ff9f00", color: "white", padding: "20px", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
                >
                  {isAdding ? <Loader2 className="animate-spin" /> : <><ShoppingCart size={20} /> ADD TO CART</>}
                </button>
                {/* <button style={{ flex: 1, background: "#fb641b", color: "white", padding: "20px", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "16px", cursor: "pointer" }}>
                  BUY NOW
                </button> */}
              </div>
            </div>
          </div>

          {/* 3. BUNDLE SECTION */}
          {suggestedProduct && (
            <div style={{ 
              background: "#fff", 
              borderRadius: "16px", 
              padding: "30px", 
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              border: "2px solid #e3f2fd",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, height: "4px", width: "100%", background: "linear-gradient(90deg, #2874f0, #00d2ff)" }} />
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <Zap size={20} fill="#ff9f00" color="#ff9f00" />
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a1b", margin: 0 }}>Frequently Bought Together</h2>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
                
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{ width: "120px", textAlign: "center" }}>
                    <img src={productImages[product.images?.[0]?.url]} style={{ width: "100%", height: "100px", objectFit: "contain" }} alt="main-prod" />
                    <p style={{ fontSize: "12px", color: "#878787", marginTop: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</p>
                  </div>
                  <Plus size={24} color="#bdbdbd" />
                  <div style={{ width: "120px", textAlign: "center" }}>
                    <img src={productImages[suggestedProduct.images?.[0]?.url]} style={{ width: "100%", height: "100px", objectFit: "contain" }} alt="bundle-prod" />
                    <p style={{ fontSize: "12px", color: "#878787", marginTop: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{suggestedProduct.name}</p>
                  </div>
                </div>

                <div style={{ width: "1px", height: "80px", background: "#f0f0f0", display: window.innerWidth > 768 ? "block" : "none" }} />

                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "30px" }}>
                  <div>
                    <span style={{ color: "#878787", fontSize: "14px", display: "block" }}>Bundle Total Price</span>
                    <span style={{ fontSize: "24px", fontWeight: "800", color: "#000" }}>₹{product.price + suggestedProduct.price}</span>
                  </div>
                  <button 
                    onClick={handleBundleAddToCart}
                    disabled={isAdding}
                    style={{ background: "#2874f0", color: "#fff", padding: "15px 35px", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 14px rgba(40, 116, 240, 0.3)" }}
                  >
                    {isAdding ? <Loader2 className="animate-spin" /> : "ADD BUNDLE TO CART"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 4. FOOTER */}
      <footer style={{ 
        flexShrink: 0, 
        borderTop: "1px solid #e0e0e0", 
        padding: "30px 20px", 
        textAlign: "center", 
        color: "#999", 
        fontSize: "14px",
        background: "#fff" 
      }}>
        © 2026 Kiteasm Inventory • High Performance Flying Gear
      </footer>
    </div>
  );
};

export default ProductDetails;