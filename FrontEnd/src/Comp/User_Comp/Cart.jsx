import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { productImages } from "../../utils/productImages";
import axios from "axios";
import { Trash2, ChevronLeft, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const [logistics, setLogistics] = useState(0);
    const [deletingId, setDeletingId] = useState(null);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return navigate("/login");

            const res = await axios.get("http://localhost:5000/api/user/cart", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const items = res.data.cart?.items || res.data.items || [];
            setCart(items);
            calculateTotals(items);
        } catch (err) {
            console.error("Cart fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Updated Calculation: ₹100 per product quantity
    const calculateTotals = (items) => {
        const itemTotal = items.reduce((acc, item) => {
            const price = item.productId?.price || 0;
            return acc + (price * item.quantity);
        }, 0);

        const shipTotal = items.reduce((acc, item) => {
            return acc + (item.quantity * 100); // ₹100 per item
        }, 0);

        setSubtotal(itemTotal);
        setLogistics(shipTotal);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItem = async (productId) => {
        if (!productId) return;
        setDeletingId(productId);
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/user/cart/remove/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedCart = cart.filter(item => item.productId?._id !== productId);
            setCart(updatedCart);
            calculateTotals(updatedCart);
        } catch (err) {
            console.error("Remove item error:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const styles = {
        container: { 
            backgroundColor: "#000000", // Pure black for professional theme
            minHeight: "100vh", 
            fontFamily: "sans-serif", // Normal font
            color: "#ffffff" // White text
        },
        content: { maxWidth: "1000px", margin: "0 auto", padding: "140px 24px 80px" },
        header: { marginBottom: "40px" },
        backBtn: { 
            background: "none", 
            border: "none", 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            color: "#cccccc", // Light gray
            fontWeight: "700", 
            cursor: "pointer", 
            fontSize: "14px", 
            padding: 0,
            transition: "color 0.3s"
        },
        backBtnHover: { color: "#ffffff" }, // White on hover
        title: { 
            fontSize: "32px", 
            fontWeight: "900", 
            color: "#ffffff", // White
            marginTop: "16px", 
            letterSpacing: "-1px" 
        },
        grid: { display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px" },
        itemCard: { 
            background: "rgba(255, 255, 255, 0.03)", // Subtle white overlay
            borderRadius: "24px", 
            padding: "20px", 
            display: "flex", 
            alignItems: "center", 
            gap: "20px", 
            border: "1px solid rgba(255, 255, 255, 0.1)", // White border
            marginBottom: "16px",
            transition: "all 0.3s ease"
        },
        itemCardHover: { 
            transform: "translateY(-2px)", 
            boxShadow: "0 8px 16px rgba(255, 255, 255, 0.2)" // White shadow
        },
        imgBox: { 
            width: "80px", 
            height: "80px", 
            borderRadius: "16px", 
            backgroundColor: "rgba(255, 255, 255, 0.05)", // Subtle overlay
            overflow: "hidden" 
        },
        summary: { 
            background: "rgba(255, 255, 255, 0.03)", // Subtle overlay
            borderRadius: "32px", 
            padding: "30px", 
            border: "1px solid rgba(255, 255, 255, 0.1)", // White border
            height: "fit-content", 
            position: "sticky", 
            top: "120px",
            boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)" // Subtle shadow
        },
        checkoutBtn: { 
            width: "100%", 
            padding: "18px", 
            background: "#ffffff", // White button
            color: "#000000", // Black text
            border: "none", 
            borderRadius: "16px", 
            fontWeight: "800", 
            cursor: "pointer", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: "10px", 
            marginTop: "24px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)" // White shadow
        },
        checkoutBtnHover: { 
            transform: "translateY(-2px)", 
            boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)" // Enhanced shadow
        },
        emptyBox: { textAlign: "center", paddingTop: "60px" }
    };

    if (loading) return (
        <div style={{ ...styles.container, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loader2 className="animate-spin" color="#ffffff" size={40} /> {/* White loader */}
        </div>
    );

    return (
        <div style={styles.container}>
            <main style={styles.content}>
                <header style={styles.header}>
                    <button 
                        onClick={() => navigate("/products")} 
                        style={styles.backBtn}
                        onMouseOver={(e) => e.target.style.color = styles.backBtnHover.color}
                        onMouseOut={(e) => e.target.style.color = styles.backBtn.color}
                    >
                        <ChevronLeft size={18} /> Back to Catalog
                    </button>
                    <h1 style={styles.title}>Your Cart.</h1>
                </header>

                {cart.length > 0 ? (
                    <div style={styles.grid}>
                        <div>
                            {cart.map((item) => (
                                <div 
                                    key={item.productId?._id} 
                                    style={styles.itemCard}
                                    onMouseOver={(e) => Object.assign(e.target.style, styles.itemCardHover)}
                                    onMouseOut={(e) => Object.assign(e.target.style, styles.itemCard)}
                                >
                                    <div style={styles.imgBox}>
                                        <img 
                                            src={productImages[item.productId?.images?.[0]?.url] || item.productId?.images?.[0]?.url}
                                            alt="product" 
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800", color: "#ffffff" }}>{item.productId?.name}</h3>
                                        <p style={{ color: "#ffffff", fontWeight: "900", margin: "4px 0" }}>₹{item.productId?.price}</p> {/* White price */}
                                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                            <span style={{ fontSize: "12px", color: "#cccccc" }}>QTY: {item.quantity}</span> {/* Light gray */}
                                            <span style={{ fontSize: "12px", color: "#cccccc", background: "rgba(255, 255, 255, 0.05)", padding: "2px 8px", borderRadius: "4px" }}>
                                                Logistics: ₹{item.quantity * 100}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeItem(item.productId?._id)} 
                                        disabled={deletingId === item.productId?._id}
                                        style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", transition: "color 0.3s" }} // White icon
                                        onMouseOver={(e) => e.target.style.color = "#cccccc"} // Light gray on hover
                                        onMouseOut={(e) => e.target.style.color = "#ffffff"}
                                    >
                                        {deletingId === item.productId?._id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <aside style={styles.summary}>
                            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "900", color: "#ffffff" }}>Order Summary</h3>
                            <div style={{ marginTop: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                                    <span style={{ color: "#cccccc" }}>Subtotal</span> {/* Light gray */}
                                    <span style={{ fontWeight: "700", color: "#ffffff" }}>₹{subtotal}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "#cccccc" }}>Logistics (₹100/item)</span> {/* Light gray */}
                                    <span style={{ color: "#ffffff", fontWeight: "700" }}>₹{logistics}</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                <span style={{ fontWeight: "900", color: "#ffffff" }}>Total</span>
                                <span style={{ fontWeight: "900", fontSize: "20px", color: "#ffffff" }}>₹{subtotal + logistics}</span> {/* White total */}
                            </div>
                            <button 
                                onClick={() => navigate("/checkout")} 
                                style={styles.checkoutBtn}
                                onMouseOver={(e) => Object.assign(e.target.style, styles.checkoutBtnHover)}
                                onMouseOut={(e) => Object.assign(e.target.style, styles.checkoutBtn)}
                            >
                                Proceed to Checkout <ArrowRight size={18} />
                            </button>
                        </aside>
                    </div>
                ) : (
                    <div style={styles.emptyBox}>
                        <ShoppingBag size={64} color="#cccccc" style={{ marginBottom: "20px" }} /> {/* Light gray icon */}
                        <h2 style={{ fontWeight: "900", color: "#ffffff" }}>Hangar is Empty</h2>
                        <Link to="/products" style={{ display: "inline-block", marginTop: "24px", color: "#ffffff", fontWeight: "800", textDecoration: "none" }}>
                            Browse the Fleet
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;