// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { productImages } from "../../utils/productImages";
// // import axios from "axios";
// // import { ShieldCheck, Truck, ChevronLeft, ShoppingCart, Minus, Plus, AlertCircle, PackageCheck } from "lucide-react";

// // const ProductDetails = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [quantity, setQuantity] = useState(1);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const res = await axios.get(`http://localhost:5000/api/user/products/${id}`);
// //         setProduct(res.data.product || res.data);
// //       } catch (error) {
// //         console.error("Fetch Error:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchProduct();
// //   }, [id]);

// //   const handleAddToCart = async () => {
// //     if (product.stock <= 0) return;
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) return navigate("/login");
// //       const res = await axios.post(
// //         `http://localhost:5000/api/user/cart/add`,
// //         { productId: product._id, quantity: quantity },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       if (res.status === 200 || res.status === 201) navigate("/cart");
// //     } catch (error) {
// //       console.error("Cart Error:", error.response?.data || error.message);
// //     }
// //   };

// //   if (loading) return (
// //     <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
// //       <div className="animate-pulse" style={{ fontWeight: "900", color: "#0ea5e9", letterSpacing: "4px" }}>LOADING...</div>
// //     </div>
// //   );

// //   if (!product) return <div style={{ paddingTop: "200px", textAlign: "center", color: "#64748b" }}>Product Off-Radar.</div>;

// //   const isOutOfStock = product.stock <= 0;

// //   return (
// //     <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "120px 24px 80px" }}>
// //       <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

// //         {/* Navigation Breadcrumb */}
// //         <button 
// //           onClick={() => navigate(-1)} 
// //           style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "10px 18px", display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontWeight: "600", cursor: "pointer", transition: "0.2s", marginBottom: "40px" }}
// //           onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"}
// //           onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
// //         >
// //           <ChevronLeft size={16} /> Fleet Catalog
// //         </button>

// //         <div style={{ display: "grid", gridTemplateColumns: window.innerWidth > 992 ? "1.1fr 0.9fr" : "1fr", gap: "60px", alignItems: "start" }}>

// //           {/* LEFT: Image Section with Shadow Depth */}
// //           <div style={{ position: "relative" }}>
// //             <div style={{ background: "white", borderRadius: "40px", padding: "40px", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
// //               <img 
// //                 // src={product.images?.[0]?.url.startsWith("http") ? product.images[0].url : `http://localhost:5000${product.images?.[0]?.url}`} 
// //                 src={productImages[product.images?.[0]?.url]}
// //                 alt={product.name} 
// //                 style={{ width: "100%", height: "auto", maxHeight: "550px", objectFit: "contain", transform: isOutOfStock ? "scale(0.95)" : "scale(1)", opacity: isOutOfStock ? 0.6 : 1, transition: "0.5s ease" }} 
// //               />
// //               {isOutOfStock && (
// //                  <div style={{ position: "absolute", background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(12px)", padding: "12px 24px", borderRadius: "20px", border: "1px solid #fee2e2", color: "#ef4444", fontWeight: "800", fontSize: "14px", letterSpacing: "1px" }}>
// //                     DEPLETED FROM INVENTORY
// //                  </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* RIGHT: Sophisticated Details Section */}
// //           <div style={{ padding: "10px" }}>
// //             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
// //                 <span style={{ background: "#e0f2fe", color: "#0ea5e9", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px" }}>PREMIUM GRADE</span>
// //                 {isOutOfStock ? (
// //                    <span style={{ background: "#fef2f2", color: "#ef4444", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "4px" }}><AlertCircle size={12}/> OUT OF STOCK</span>
// //                 ) : (
// //                    <span style={{ background: "#f0fdf4", color: "#22c55e", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "4px" }}><PackageCheck size={12}/> IN STOCK</span>
// //                 )}
// //             </div>

// //             <h1 style={{ fontSize: "48px", fontWeight: "900", color: "#0f172a", margin: "0 0 16px 0", letterSpacing: "-1.5px", lineHeight: "1.1" }}>{product.name}</h1>
// //             <p style={{ fontSize: "32px", fontWeight: "300", color: isOutOfStock ? "#cbd5e1" : "#0f172a", marginBottom: "32px" }}>₹{product.price.toLocaleString()}</p>

// //             <div style={{ marginBottom: "40px" }}>
// //                 <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>Technical Specs</h4>
// //                 <p style={{ color: "#64748b", lineHeight: "1.8", fontSize: "16px", maxWidth: "500px" }}>{product.description || "Designed for ultimate performance and refined aesthetics, using industry-leading materials."}</p>
// //             </div>

// //             {/* Feature Pills */}
// //             <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
// //                 <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 20px", background: "white", borderRadius: "16px", border: "1px solid #f1f5f9", fontSize: "13px", fontWeight: "600", color: "#475569" }}><Truck size={16} color="#0ea5e9" /> Priority Shipping</div>
// //                 <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 20px", background: "white", borderRadius: "16px", border: "1px solid #f1f5f9", fontSize: "13px", fontWeight: "600", color: "#475569" }}><ShieldCheck size={16} color="#22c55e" /> 2yr Warranty</div>
// //             </div>

// //             {/* Selection Area */}
// //             <div style={{ background: "white", padding: "24px", borderRadius: "24px", border: "1px solid #f1f5f9", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.02)" }}>
// //                 <p style={{ fontSize: "11px", fontWeight: "800", color: "#94a3b8", marginBottom: "16px", letterSpacing: "1px" }}>ADJUST QUANTITY</p>
// //                 <div style={{ display: "flex", alignItems: "center", gap: "25px", marginBottom: "24px", opacity: isOutOfStock ? 0.4 : 1 }}>
// //                     <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", borderRadius: "14px", padding: "6px" }}>
// //                         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: "40px", height: "40px", border: "none", background: "white", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}><Minus size={16}/></button>
// //                         <span style={{ width: "50px", textAlign: "center", fontWeight: "800", fontSize: "18px" }}>{quantity}</span>
// //                         <button onClick={() => setQuantity(quantity + 1)} style={{ width: "40px", height: "40px", border: "none", background: "white", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}><Plus size={16}/></button>
// //                     </div>
// //                     {!isOutOfStock && <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}>Subtotal: <b style={{ color: "#0f172a" }}>₹{(product.price * quantity).toLocaleString()}</b></span>}
// //                 </div>

// //                 <button 
// //                   onClick={handleAddToCart}
// //                   disabled={isOutOfStock}
// //                   style={{ 
// //                       width: "100%", padding: "22px", background: isOutOfStock ? "#f1f5f9" : "#0f172a", color: isOutOfStock ? "#cbd5e1" : "white", 
// //                       border: "none", borderRadius: "18px", fontWeight: "700", fontSize: "16px",
// //                       display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", cursor: isOutOfStock ? "not-allowed" : "pointer",
// //                       transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
// //                       boxShadow: isOutOfStock ? "none" : "0 15px 30px -10px rgba(15, 23, 42, 0.3)"
// //                   }}
// //                   onMouseEnter={(e) => !isOutOfStock && (e.currentTarget.style.transform = "translateY(-2px)")}
// //                   onMouseLeave={(e) => !isOutOfStock && (e.currentTarget.style.transform = "translateY(0)")}
// //                 >
// //                   {isOutOfStock ? "NOT AVAILABLE" : <><ShoppingCart size={18} /> Deploy to Inventory</>}
// //                 </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // 
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import API_BASE_URL from "../../utils/config.js";
// import { ChevronLeft, ShoppingCart, Minus, Plus, Loader2, Star, Zap, ShieldCheck, Truck, RotateCcw, Heart } from "lucide-react";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [activeImage, setActiveImage] = useState("");
//   const [suggestedProduct, setSuggestedProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdding, setIsAdding] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const token = localStorage.getItem("token");

//   // Debounced resize for better performance
//   useEffect(() => {
//     let timeoutId = null;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => setIsMobile(window.innerWidth < 768), 150);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   const fetchWishlist = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${API_BASE_URL}/my-wishlist`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setWishlistItems(res.data.products?.map(p => p._id) || []);
//     } catch (error) {
//       console.error("Wishlist fetch failed:", error);
//     }
//   };

//   const toggleWishlist = async (productId) => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/toggle-wishlist`,
//         { productId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.status === 200 || res.status === 201) {
//         setWishlistItems(prev =>
//           prev.includes(productId)
//             ? prev.filter(id => id !== productId)
//             : [...prev, productId]
//         );
//       }
//     } catch (error) {
//       console.error("Wishlist toggle failed:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE_URL}/user/products/${id}`);
//         const data = res.data.product || res.data;
//         setProduct(data);
//         setActiveImage(`../uploads/${data._id}/main.jpg`);

//         if (data.category?.toLowerCase() === "manjha") {
//           const allRes = await axios.get(`${API_BASE_URL}/user/products`);
//           const allProducts = allRes.data.products || [];
//           const OswalNo3 = allProducts.find(p =>
//             p._id !== data._id && (p.name?.toLowerCase().includes("oswal no3"))
//           );
//           if (OswalNo3) {
//             OswalNo3.imageUrl = `../uploads/${OswalNo3._id}/main.jpg`;
//             setSuggestedProduct(OswalNo3);
//           }
//         }
//       } catch (error) {
//         console.error("Fetch Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//     fetchWishlist();
//   }, [id]);

//   const handleAddToCart = async () => {
//     setIsAdding(true);
//     try {
//       if (!token) return navigate("/login");
//       await axios.post(`${API_BASE_URL}/user/cart/add`, {
//         productId: product._id,
//         quantity
//       }, { headers: { Authorization: `Bearer ${token}` } });
//       navigate("/cart");
//     } catch (err) {
//       alert("Failed to add to cart.");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const handleBundleAddToCart = async () => {
//     setIsAdding(true);
//     try {
//       if (!token) return navigate("/login");
//       const headers = { Authorization: `Bearer ${token}` };
//       await axios.post(`${API_BASE_URL}/user/cart/add`, { productId: product._id, quantity }, { headers });
//       await axios.post(`${API_BASE_URL}/user/cart/add`, { productId: suggestedProduct._id, quantity: 1 }, { headers });
//       navigate("/cart");
//     } catch (err) {
//       alert("Failed to add bundle to cart.");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   if (loading) return (
//     <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: isMobile ? "90px 20px" : "120px 20px" }}>
//       <style>{`
//         @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
//         .skeleton { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 16px; }
//       `}</style>
//       <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
//         <div className="details-grid">
//           <div style={{ display: "flex", gap: "20px" }} className="image-gallery-flex">
//             <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//               {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ width: "75px", height: "75px" }}></div>)}
//             </div>
//             <div className="skeleton" style={{ flex: 1, minHeight: "550px" }}></div>
//           </div>
//           <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//             <div className="skeleton" style={{ width: "100px", height: "20px" }}></div>
//             <div className="skeleton" style={{ width: "80%", height: "45px" }}></div>
//             <div className="skeleton" style={{ width: "60%", height: "30px" }}></div>
//             <div className="skeleton" style={{ width: "100%", height: "150px", marginTop: "20px" }}></div>
//             <div className="skeleton" style={{ width: "100%", height: "60px", marginTop: "20px" }}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (!product) return <div style={{ textAlign: "center", padding: "100px" }}>Product Not Found</div>;

//   const secondaryImages = [1, 2, 3];

//   return (
//     <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", color: "#000", fontFamily: "Roboto, sans-serif" }}>

//       <style>{`
//         @keyframes imageFadeIn {
//           from { opacity: 0.5; transform: translateY(5px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .main-view-anim {
//           animation: imageFadeIn 0.3s ease-out forwards;
//         }

//         .details-grid {
//            display: grid;
//            grid-template-columns: 1.2fr 1fr;
//            gap: 60px;
//         }

//         @media (max-width: 1024px) {
//            .details-grid { gap: 30px; grid-template-columns: 1fr 1fr; }
//         }

//         @media (max-width: 768px) {
//            .details-grid { grid-template-columns: 1fr; gap: 30px; }
//            .image-gallery-flex { flex-direction: column-reverse !important; gap: 15px !important; }
//            .thumbs-flex { 
//               flex-direction: row !important; 
//               justify-content: center; 
//               overflow-x: auto; 
//               padding-bottom: 5px; 
//            }
//            .main-preview-box { min-height: 350px !important; padding: 10px !important; }

//            /* CENTERED ACTION BUTTONS ON MOBILE */
//            .action-buttons-container { 
//               flex-direction: column !important; 
//               align-items: center !important; 
//               text-align: center;
//               gap: 20px !important; 
//            }
//            .quantity-selector { width: 150px !important; }
//            .primary-add-btn { width: 100% !important; max-width: 350px; }
//            .product-info-text { text-align: center; }
//            .rating-container { justify-content: center; }
//            .price-container { justify-content: center; }
//            .trust-badges { justify-items: center; text-align: center; }
//         }

//         .bundle-flex { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
//         @media (max-width: 768px) {
//             .bundle-flex { flex-direction: column; text-align: center; }
//             .bundle-item-group { justify-content: center; flex-wrap: wrap; }
//             .bundle-action-area { width: 100%; border-top: 1px solid #eee; pt: 20px; text-align: center !important; }
//         }
//       `}</style>

//       <div style={{ maxWidth: "1250px", margin: "0 auto", padding: isMobile ? "90px 20px 40px" : "120px 20px 60px" }}>

//         <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "8px", color: "#666", fontWeight: "500", cursor: "pointer", marginBottom: "30px" }}>
//           <ChevronLeft size={20} /> Back to Collection
//         </button>

//         <div className="details-grid">

//           {/* LEFT: IMAGE GALLERY */}
//           <div className="image-gallery-flex" style={{ display: "flex", gap: "20px" }}>
//             <div className="thumbs-flex" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//               <div
//                 onMouseEnter={() => setActiveImage(`../uploads/${product._id}/main.jpg`)}
//                 style={{
//                   width: "75px", height: "75px", borderRadius: "10px", overflow: "hidden", cursor: "pointer",
//                   border: activeImage === `../uploads/${product._id}/main.jpg` ? "2px solid #000" : "1px solid #eee",
//                   transition: "0.3s", flexShrink: 0, background: "#f9f9f9"
//                 }}
//               >
//                 <img src={`../uploads/${product._id}/main.jpg`} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="main-thumb" />
//               </div>

//               {secondaryImages.map((num) => {
//                 const imgPath = `../uploads/${product._id}/detail-${num}.jpg`;
//                 return (
//                   <div key={num} onMouseEnter={() => setActiveImage(imgPath)}
//                     style={{
//                       width: "75px", height: "75px", borderRadius: "10px", overflow: "hidden", cursor: "pointer",
//                       border: activeImage === imgPath ? "2px solid #000" : "1px solid #eee",
//                       transition: "0.3s", flexShrink: 0, background: "#f9f9f9"
//                     }}
//                   >
//                     <img src={imgPath} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={`detail-${num}`} onError={(e) => e.target.parentElement.style.display = 'none'} />
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="main-preview-box" style={{ flex: 1, background: "#f9f9f9", borderRadius: "16px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", minHeight: "550px" }}>
//               <img
//                 key={activeImage}
//                 src={activeImage}
//                 alt={product.name}
//                 className="main-view-anim"
//                 decoding="async"
//                 style={{ maxWidth: "100%", maxHeight: "500px", objectFit: "contain", transition: "opacity 0.4s ease", opacity: 0 }}
//                 onLoad={(e) => e.target.style.opacity = 1}
//               />
//             </div>
//           </div>

//           {/* RIGHT: PRODUCT INFO */}
//           <div className="product-info-text">
//             <div>
//               <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#999", letterSpacing: "1px" }}>{product.category}</span>
//               <h1 style={{ fontSize: isMobile ? "28px" : "36px", fontWeight: "800", margin: "8px 0", letterSpacing: "-1px" }}>{product.name}</h1>
//             </div>

//             <div className="rating-container" style={{ display: "flex", alignItems: "center", gap: "15px", margin: "15px 0" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#ff9f00" }}>
//                 {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "#ff9f00" : "none"} stroke={i < 4 ? "#ff9f00" : "#ccc"} />)}
//               </div>
//               <span style={{ color: "#888", fontSize: "14px" }}>(120+ Reviews)</span>
//             </div>

//             <div className="price-container" style={{ margin: "30px 0", display: "flex", alignItems: "baseline", gap: "12px" }}>
//               <span style={{ fontSize: "42px", fontWeight: "900" }}>₹{product.price}</span>
//               <span style={{ color: product.stock > 0 ? "#388e3c" : "#d32f2f", fontWeight: "600" }}>
//                 {product.stock > 0 ? `In Stock` : "Out of Stock"}
//               </span>
//             </div>

//             <p style={{ fontSize: "16px", color: "#444", lineHeight: "1.8", marginBottom: "40px", borderLeft: isMobile ? "none" : "3px solid #eee", paddingLeft: isMobile ? "0" : "20px" }}>
//               {product.description}
//             </p>

//             <div className="trust-badges" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}><ShieldCheck size={20} /> 100% Authentic</div>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}><Truck size={20} /> Express Delivery</div>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}><RotateCcw size={20} /> 7 Day Returns</div>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}><Zap size={20} /> Competition Grade</div>
//             </div>

//             {/* UPDATED: ACTION BUTTONS CONTAINER */}
//             <div className="action-buttons-container" style={{ display: "flex", gap: "20px", alignItems: "center" }}>

//               {/* Quantity Selector */}
//               <div className="quantity-selector" style={{ display: "flex", alignItems: "center", border: "2px solid #000", borderRadius: "10px", background: "#fff" }}>
//                 <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ padding: "12px 15px", background: "none", border: "none", cursor: "pointer" }}><Minus size={16} /></button>
//                 <span style={{ width: "40px", textAlign: "center", fontWeight: "700" }}>{quantity}</span>
//                 <button
//                   onClick={() => quantity < product.stock && setQuantity(q => q + 1)}
//                   style={{ padding: "12px 15px", background: "none", border: "none", cursor: quantity >= product.stock ? "not-allowed" : "pointer", opacity: quantity >= product.stock ? 0.3 : 1 }}
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>

//               {/* Add to Cart */}
//               <button
//                 onClick={handleAddToCart}
//                 className="primary-add-btn"
//                 disabled={isAdding || product.stock <= 0}
//                 style={{
//                   flex: 1, background: product.stock > 0 ? "#000" : "#ccc", color: "#fff",
//                   padding: "15px", borderRadius: "10px", fontWeight: "700", border: "none",
//                   cursor: product.stock > 0 ? "pointer" : "not-allowed",
//                   display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
//                 }}
//               >
//                 <ShoppingCart size={20} />
//                 {isAdding ? "ADDING..." : product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
//               </button>

//               {/* Wishlist Button */}
//               <button
//                 onClick={() => toggleWishlist(product._id)}
//                 style={{
//                   padding: "15px", borderRadius: "10px", border: "2px solid #000",
//                   background: wishlistItems.includes(product._id) ? "#000" : "transparent",
//                   cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
//                   transition: "0.3s", color: wishlistItems.includes(product._id) ? "#fff" : "#000"
//                 }}
//               >
//                 <Heart size={24} fill={wishlistItems.includes(product._id) ? "currentColor" : "none"} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* BUNDLE SECTION */}
//         {suggestedProduct && (
//           <div style={{ marginTop: "80px", padding: isMobile ? "25px" : "40px", borderRadius: "24px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px -15px rgba(0,0,0,0.05)" }}>
//             <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "30px", display: "flex", alignItems: "center", gap: "10px", justifyContent: isMobile ? "center" : "flex-start" }}>
//               <Zap size={20} color="#ff9f00" fill="#ff9f00" /> Complete Your Gear
//             </h3>

//             <div className="bundle-flex">
//               <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1, justifyContent: isMobile ? "center" : "flex-start" }}>
//                 <div style={{ width: "80px", height: "80px", background: "#f8fafc", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
//                   <img src={activeImage} decoding="async" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", opacity: 0.6 }} alt="Current" />
//                 </div>
//                 <Plus size={20} color="#cbd5e1" strokeWidth={3} />
//                 <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px", background: "#f8fafc", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
//                   <img src={suggestedProduct.imageUrl} decoding="async" style={{ width: "60px", height: "60px", objectFit: "contain" }} alt={suggestedProduct.name} onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Kite"; }} />
//                   <div>
//                     <p style={{ fontWeight: "800", fontSize: "14px", margin: "0", color: "#0f172a" }}>{suggestedProduct.name}</p>
//                     <p style={{ color: "#0ea5e9", fontWeight: "700", fontSize: "16px", margin: 0 }}>+ ₹{suggestedProduct.price}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bundle-action-area" style={{ textAlign: isMobile ? "center" : "right", marginTop: isMobile ? "20px" : "0" }}>
//                 <p style={{ fontSize: "13px", color: "#64748b", fontWeight: "600", marginBottom: "8px" }}>Combined Total</p>
//                 <button
//                   onClick={handleBundleAddToCart}
//                   disabled={isAdding}
//                   style={{
//                     background: "#0f172a", color: "#fff", padding: "16px 32px", borderRadius: "14px", fontWeight: "800", border: "none", cursor: "pointer", fontSize: "16px", width: isMobile ? "100%" : "auto"
//                   }}
//                 >
//                   {isAdding ? "ADDING..." : `Get Bundle (₹${(product.price + suggestedProduct.price).toLocaleString()})`}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import {
  ChevronLeft, ShoppingCart, Minus, Plus,
  ShieldCheck, Truck, RotateCcw, Heart, Zap, AlertCircle, X
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [suggestedProduct, setSuggestedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [alertState, setAlertState] = useState({ show: false, message: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchWishlist = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/my-wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems(res.data.products?.map(p => p._id) || []);
    } catch (err) { console.error("Wishlist Error:", err); }
  };

  useEffect(() => {
    const fetchData = async () => {
      // 1. Try instant load from general cache
      const cachedList = localStorage.getItem("kiteasm_products_cache");
      if (cachedList) {
        try {
          const products = JSON.parse(cachedList);
          const found = products.find(p => p._id === id);
          if (found) {
            setProduct(found);
            setActiveImage(`../uploads/${found._id}/main.jpg`);
            setLoading(false); // Immediate show
          }
        } catch (e) { console.error("Cache search error", e); }
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/user/products/${id}`);
        const data = res.data.product || res.data;
        setProduct(data);
        setActiveImage(`../uploads/${data._id}/main.jpg`);

        if (data.category?.toLowerCase() === "manjha") {
          const allRes = await axios.get(`${API_BASE_URL}/user/products`);
          const allProducts = allRes.data.products || [];
          const oswal = allProducts.find(p =>
            p._id !== data._id &&
            p.name?.toLowerCase().includes("oswal no3") &&
            p.stock > 0
          );
          if (oswal) {
            oswal.imageUrl = `../uploads/${oswal._id}/main.jpg`;
            setSuggestedProduct(oswal);
          }
        }
      } catch (err) { console.error("Fetch error:", err); }
      finally { setLoading(false); }
    };
    fetchData();
    fetchWishlist();
  }, [id]);

  const toggleWishlist = async (productId) => {
    if (!token) return navigate("/login");
    try {
      const res = await axios.post(`${API_BASE_URL}/toggle-wishlist`, { productId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status <= 201) {
        setWishlistItems(prev => prev.includes(productId) ? prev.filter(i => i !== productId) : [...prev, productId]);
      }
    } catch (err) { console.error(err); }
  };

  const handleAddToCart = async (pId = product._id, q = quantity, redirect = true) => {
    if (!token) return navigate("/login");
    setIsAdding(true);
    try {
      await axios.post(`${API_BASE_URL}/user/cart/add`, { productId: pId, quantity: q }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (redirect) navigate("/cart");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add to cart.";
      setAlertState({ show: true, message: msg });
    }
    finally { setIsAdding(false); }
  };

  const handleBundleAdd = async () => {
    setIsAdding(true);
    try {
      if (!token) return navigate("/login");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${API_BASE_URL}/user/cart/add`, { productId: product._id, quantity }, { headers });
      await axios.post(`${API_BASE_URL}/user/cart/add`, { productId: suggestedProduct._id, quantity: 1 }, { headers });
      navigate("/cart");
    } catch (err) {
      const msg = err.response?.data?.message || "Bundle failed. Check stock availability.";
      setAlertState({ show: true, message: msg });
    }
    finally { setIsAdding(false); }
  };

  if (loading) return <LoadingSkeleton isMobile={isMobile} />;
  if (!product) return <div style={{ textAlign: "center", padding: "100px" }}>Product Not Found</div>;

  const mainImage = `../uploads/${product._id}/main.jpg`;

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", color: "#000", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes imageFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalEnter { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .main-view-anim { animation: imageFadeIn 0.4s ease-out forwards; }
        .modal-anim { animation: modalEnter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .details-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; }
        
        @media (max-width: 768px) {
          .details-grid { grid-template-columns: 1fr; gap: 30px; }
          .image-gallery-flex { flex-direction: column-reverse !important; gap: 15px !important; }
          .thumbs-flex { flex-direction: row !important; overflow-x: auto; justify-content: center; width: 100%; }
          .action-buttons-container { flex-direction: column !important; gap: 12px !important; }
          .mobile-action-row-1 { display: flex !important; gap: 12px !important; width: 100%; }
          .primary-add-btn { width: 100% !important; height: 55px !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1250px", margin: "0 auto", padding: isMobile ? "90px 20px 40px" : "120px 20px 60px" }}>

        <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "8px", color: "#666", fontWeight: "600", cursor: "pointer", marginBottom: "30px" }}>
          <ChevronLeft size={20} /> Back to Collection
        </button>

        <div className="details-grid">
          {/* LEFT: GALLERY */}
          <div className="image-gallery-flex" style={{ display: "flex", gap: "20px" }}>
            <div className="thumbs-flex" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[mainImage, 1, 2, 3].map((item, idx) => {
                const imgPath = idx === 0 ? item : `../uploads/${product._id}/detail-${item}.jpg`;
                return (
                  <div key={idx} onMouseEnter={() => setActiveImage(imgPath)} style={{
                    width: "75px", height: "75px", borderRadius: "10px", overflow: "hidden", cursor: "pointer",
                    border: activeImage === imgPath ? "2px solid #000" : "1px solid #eee",
                    transition: "0.2s", flexShrink: 0, background: "#f9f9f9"
                  }}>
                    <img src={imgPath} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="thumb" onError={(e) => (e.target.parentElement.style.display = 'none')} />
                  </div>
                );
              })}
            </div>

            <div style={{
              flex: 1, background: "#f9f9f9", borderRadius: "24px",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "20px", minHeight: isMobile ? "350px" : "550px",
              position: "relative"
            }}>
              <img
                key={activeImage} src={activeImage} alt={product.name}
                className="main-view-anim"
                style={{
                  maxWidth: "100%", maxHeight: "500px", objectFit: "contain",
                  opacity: product.stock === 0 ? 0.4 : 1
                }}
              />
              {product.stock === 0 && (
                <div style={{
                  position: "absolute", background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)", padding: "12px 24px",
                  borderRadius: "20px", border: "1px solid #fee2e2",
                  color: "#ef4444", fontWeight: "900", fontSize: "14px",
                  letterSpacing: "1px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                }}>
                  OUT OF STOCK
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <span style={{ fontSize: "12px", fontWeight: "800", color: "#999", letterSpacing: "1.5px" }}>{product.category?.toUpperCase()}</span>
            <h1 style={{ fontSize: isMobile ? "32px" : "48px", fontWeight: "900", margin: "10px 0", letterSpacing: "-1.5px", lineHeight: 1.1 }}>{product.name}</h1>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0", justifyContent: isMobile ? "center" : "flex-start" }}>
              <span style={{ fontSize: "36px", fontWeight: "900", opacity: product.stock === 0 ? 0.5 : 1 }}>₹{product.price.toLocaleString()}</span>
              {product.stock <= 5 && product.stock > 0 && <span style={{ color: "#ef4444", fontSize: "14px", fontWeight: "700" }}>Only {product.stock} left!</span>}
              {product.stock === 0 && <span style={{ color: "#ef4444", fontSize: "16px", fontWeight: "900", letterSpacing: "1px" }}>[ OUT OF STOCK ]</span>}
            </div>

            {/* DESCRIPTION: Centered on mobile */}
            <p style={{ color: "#555", lineHeight: "1.8", marginBottom: "30px", fontSize: "16px", textAlign: isMobile ? "center" : "left" }}>
              {product.description}
            </p>

            {/* FEATURES GRID: Parallel Columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "10px" : "20px", marginBottom: "40px", textAlign: "left" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Badge icon={<ShieldCheck size={18} strokeWidth={2.5} />} text="Authentic" />
                <Badge icon={<Truck size={18} strokeWidth={2.5} />} text="Express Delivery" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Badge icon={<RotateCcw size={18} strokeWidth={2.5} />} text="7 Day Return" />
                <Badge icon={<Zap size={18} strokeWidth={2.5} />} text="Competitive" />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="action-buttons-container" style={{ display: "flex", gap: "15px" }}>
              <div className="mobile-action-row-1" style={{ display: "flex", gap: "12px", flex: 1 }}>
                {/* Quantity */}
                <div className="quantity-selector" style={{ display: "flex", alignItems: "center", border: "1.5px solid #e2e8f0", borderRadius: "12px", padding: "4px", flex: 1, justifyContent: "space-between", background: "#f8fafc" }}>
                  <QtyBtn icon={<Minus size={16} />} onClick={() => setQuantity(q => Math.max(1, q - 1))} />
                  <span style={{ fontWeight: "800" }}>{quantity}</span>
                  <QtyBtn icon={<Plus size={16} />} onClick={() => setQuantity(q => q < product.stock ? q + 1 : q)} disabled={quantity >= product.stock} />
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product._id)}
                  style={{ width: "55px", height: "55px", borderRadius: "12px", border: "1.5px solid #e2e8f0", background: wishlistItems.includes(product._id) ? "#000" : "#fff", color: wishlistItems.includes(product._id) ? "#fff" : "#000", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  <Heart size={22} fill={wishlistItems.includes(product._id) ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart()}
                disabled={isAdding || product.stock <= 0}
                className="primary-add-btn"
                style={{ flex: 2, background: "#000", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "55px" }}
              >
                <ShoppingCart size={20} /> {isAdding ? "ADDING..." : "ADD TO CART"}
              </button>
            </div>
          </div>
        </div>

        {/* BUNDLE SECTION */}
        {suggestedProduct && (
          <div style={{ marginTop: "80px", padding: isMobile ? "25px" : "40px", borderRadius: "24px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px -15px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "30px", display: "flex", alignItems: "center", gap: "10px", justifyContent: isMobile ? "center" : "flex-start" }}>
              <Zap size={20} color="#ff9f00" fill="#ff9f00" /> Complete Your Gear
            </h3>
            <div className="bundle-flex" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1, justifyContent: isMobile ? "center" : "flex-start" }}>
                <div style={{ width: "80px", height: "80px", background: "#f8fafc", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
                  <img src={mainImage} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", opacity: 0.6 }} alt="Current" />
                </div>
                <Plus size={20} color="#cbd5e1" strokeWidth={3} />
                <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px", background: "#f8fafc", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
                  <img src={suggestedProduct.imageUrl} style={{ width: "60px", height: "60px", objectFit: "contain" }} alt={suggestedProduct.name} />
                  <div>
                    <p style={{ fontWeight: "800", fontSize: "14px", margin: "0", color: "#0f172a" }}>{suggestedProduct.name}</p>
                    <p style={{ color: "#0ea5e9", fontWeight: "700", fontSize: "16px", margin: 0 }}>+ ₹{suggestedProduct.price}</p>
                  </div>
                </div>
              </div>
              <div style={{ width: isMobile ? "100%" : "auto" }}>
                <button
                  onClick={handleBundleAdd}
                  disabled={isAdding}
                  style={{ background: "#0f172a", color: "#fff", padding: "16px 32px", borderRadius: "14px", fontWeight: "800", border: "none", cursor: "pointer", fontSize: "16px", width: "100%" }}
                >
                  {isAdding ? "ADDING..." : `Get Bundle (₹${(product.price + suggestedProduct.price).toLocaleString()})`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STOCK ALERT POPUP */}
      {alertState.show && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, padding: "20px"
        }} onClick={() => setAlertState({ show: false, message: "" })}>
          <div
            className="modal-anim"
            style={{
              background: "#fff", maxWidth: "400px", width: "100%",
              borderRadius: "28px", padding: "40px 30px", textAlign: "center",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)", position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setAlertState({ show: false, message: "" })}
              style={{ position: "absolute", top: "20px", right: "20px", background: "#f8fafc", border: "none", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}
            >
              <X size={18} />
            </button>

            <div style={{ width: "70px", height: "70px", background: "#fef2f2", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "#ef4444" }}>
              <AlertCircle size={36} />
            </div>

            <h3 style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a", marginBottom: "12px", letterSpacing: "-0.5px" }}>Availability Issue</h3>
            <p style={{ color: "#64748b", lineHeight: "1.6", fontSize: "15px", fontWeight: "500", marginBottom: "32px" }}>
              {alertState.message}
            </p>

            <button
              onClick={() => setAlertState({ show: false, message: "" })}
              style={{ width: "100%", padding: "16px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "16px", fontWeight: "800", cursor: "pointer", fontSize: "15px", transition: "0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Badge = ({ icon, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "600", color: "#444" }}>{icon} {text}</div>
);

const QtyBtn = ({ icon, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.2 : 1 }}>{icon}</button>
);

const LoadingSkeleton = ({ isMobile }) => (
  <div style={{ padding: isMobile ? "90px 20px" : "120px 20px", maxWidth: "1250px", margin: "0 auto" }}>
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: "40px" }}>
      <div style={{ height: "500px", background: "#f1f5f9", borderRadius: "24px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ height: "40px", width: "70%", background: "#f1f5f9" }} />
        <div style={{ height: "150px", background: "#f1f5f9" }} />
      </div>
    </div>
  </div>
);

export default ProductDetails;