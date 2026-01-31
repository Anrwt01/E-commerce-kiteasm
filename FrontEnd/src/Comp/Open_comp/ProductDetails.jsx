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
// 
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ShoppingCart, Minus, Plus, Loader2, Star, Zap, ShieldCheck, Truck, RotateCcw } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
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
        
        // Default to main image
        setActiveImage(`../uploads/${data._id}/main.jpg`);

        if (data.category?.toLowerCase() === "manjha") {
          const allRes = await axios.get(`http://localhost:5000/api/user/products`);
          const allProducts = allRes.data.products || [];
          const saddi = allProducts.find(p => 
            p._id !== data._id && 
            (p.category?.toLowerCase() === "saddi" || p.name?.toLowerCase().includes("saddi"))
          );
          if (saddi) setSuggestedProduct(saddi);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(`http://localhost:5000/api/user/cart/add`, { 
        productId: product._id, 
        quantity 
      }, { headers });

      navigate("/cart");
    } catch (err) {
      alert("Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#fff" }}>
      <Loader2 className="animate-spin" size={40} color="#000" />
    </div>
  );

  if (!product) return <div style={{ textAlign: "center", padding: "100px" }}>Product Not Found</div>;

  // We define the 3 secondary images based on your naming convention
  const secondaryImages = [1, 2, 3]; 

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", color: "#000", fontFamily: "Inter, sans-serif" }}>
      
      <style>{`
        @keyframes imageFadeIn {
          from { opacity: 0.5; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .main-view-anim {
          animation: imageFadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div style={{ maxWidth: "1250px", margin: "0 auto", padding: "120px 20px 60px" }}>
        
        <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "8px", color: "#666", fontWeight: "500", cursor: "pointer", marginBottom: "30px" }}>
          <ChevronLeft size={20} /> Back to Collection
        </button>

        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth > 992 ? "1.2fr 1fr" : "1fr", gap: "60px" }}>
          
          {/* LEFT: IMAGE GALLERY */}
          <div style={{ display: "flex", gap: "20px", flexDirection: window.innerWidth > 600 ? "row" : "column-reverse" }}>
            
            {/* Thumbnails */}
            <div style={{ display: "flex", flexDirection: window.innerWidth > 600 ? "column" : "row", gap: "12px" }}>
              
              {/* Main Image Thumbnail */}
              <div 
                onMouseEnter={() => setActiveImage(`../uploads/${product._id}/main.jpg`)}
                style={{ 
                  width: "80px", height: "80px", borderRadius: "10px", overflow: "hidden", cursor: "pointer",
                  border: activeImage === `../uploads/${product._id}/main.jpg` ? "2px solid #000" : "1px solid #eee",
                  transition: "0.3s",
                  transform: activeImage === `../uploads/${product._id}/main.jpg` ? "scale(1.08)" : "scale(1)"
                }}
              >
                <img src={`../uploads/${product._id}/main.jpg`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="main-thumb" />
              </div>

              {/* 3 Secondary Image Thumbnails */}
              {secondaryImages.map((num) => {
                const imgPath = `../uploads/${product._id}/detail-${num}.jpg`;
                return (
                  <div 
                    key={num}
                    onMouseEnter={() => setActiveImage(imgPath)}
                    style={{ 
                      width: "80px", height: "80px", borderRadius: "10px", overflow: "hidden", cursor: "pointer",
                      border: activeImage === imgPath ? "2px solid #000" : "1px solid #eee",
                      transition: "0.3s",
                      transform: activeImage === imgPath ? "scale(1.08)" : "scale(1)"
                    }}
                  >
                    <img src={imgPath} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={`detail-${num}`} />
                  </div>
                );
              })}
            </div>

            {/* Main Preview */}
            <div style={{ flex: 1, background: "#f9f9f9", borderRadius: "16px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", minHeight: "550px" }}>
              <img 
                key={activeImage}
                src={activeImage} 
                alt={product.name} 
                className="main-view-anim"
                style={{ maxWidth: "100%", maxHeight: "500px", objectFit: "contain" }} 
              />
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div>
            <div>
              <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#999", letterSpacing: "1px" }}>{product.category}</span>
              <h1 style={{ fontSize: "36px", fontWeight: "800", margin: "8px 0", letterSpacing: "-1px" }}>{product.name}</h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px", margin: "15px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#ff9f00" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "#ff9f00" : "none"} stroke={i < 4 ? "#ff9f00" : "#ccc"} />)}
              </div>
              <span style={{ color: "#888", fontSize: "14px" }}>(120+ Reviews)</span>
            </div>

            <div style={{ margin: "30px 0" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span style={{ fontSize: "42px", fontWeight: "900" }}>₹{product.price}</span>
                <span style={{ color: product.stock > 0 ? "#388e3c" : "#d32f2f", fontWeight: "600" }}>
                  {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "16px", color: "#444", lineHeight: "1.8", marginBottom: "40px", borderLeft: "3px solid #eee", paddingLeft: "20px" }}>
              {product.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}><ShieldCheck size={20} /> 100% Authentic</div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}><Truck size={20} /> Express Delivery</div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}><RotateCcw size={20} /> 7 Day Returns</div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}><Zap size={20} /> Competition Grade</div>
            </div>

            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", border: "2px solid #000", borderRadius: "10px" }}>
                <button onClick={() => setQuantity(q => Math.max(1, q-1))} style={{ padding: "12px 15px", background: "none", border: "none", cursor: "pointer" }}><Minus size={16}/></button>
                <span style={{ width: "40px", textAlign: "center", fontWeight: "700" }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q+1)} style={{ padding: "12px 15px", background: "none", border: "none", cursor: "pointer" }}><Plus size={16}/></button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={isAdding || product.stock <= 0}
                style={{ 
                  flex: 1, background: product.stock > 0 ? "#000" : "#ccc", color: "#fff", 
                  padding: "15px", borderRadius: "10px", fontWeight: "700", border: "none", 
                  cursor: product.stock > 0 ? "pointer" : "not-allowed" 
                }}
              >
                {isAdding ? "ADDING..." : product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
              </button>
            </div>
          </div>
        </div>

        {/* BUNDLE SECTION */}
        {suggestedProduct && (
          <div style={{ marginTop: "80px", padding: "40px", borderRadius: "20px", background: "#fcfcfc", border: "1px solid #eee" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "30px", display: "flex", alignItems: "center", gap: "10px" }}>
              <Zap size={20} color="#ff9f00" fill="#ff9f00" /> Complete Your Gear
            </h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                <img src={`http://localhost:5000${product.mainImage}`} style={{ height: "100px", opacity: 0.6 }} alt="p1" />
                <Plus size={24} color="#ccc" />
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img src={`http://localhost:5000${suggestedProduct.mainImage}`} style={{ height: "100px" }} alt="p2" />
                  <div>
                    <p style={{ fontWeight: "700", margin: 0 }}>{suggestedProduct.name}</p>
                    <p style={{ color: "#666", fontSize: "14px" }}>+ ₹{suggestedProduct.price}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleAddToCart}
                style={{ background: "#fff", border: "2px solid #000", color: "#000", padding: "12px 30px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
              >
                Get Bundle (₹{product.price + suggestedProduct.price})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;