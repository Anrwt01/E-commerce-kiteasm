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
        container: { backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" },
        content: { maxWidth: "1000px", margin: "0 auto", padding: "140px 24px 80px" },
        header: { marginBottom: "40px" },
        backBtn: { background: "none", border: "none", display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontWeight: "700", cursor: "pointer", fontSize: "14px", padding: 0 },
        title: { fontSize: "32px", fontWeight: "900", color: "#0f172a", marginTop: "16px", letterSpacing: "-1px" },
        grid: { display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px" },
        itemCard: { background: "#fff", borderRadius: "24px", padding: "20px", display: "flex", alignItems: "center", gap: "20px", border: "1px solid #e2e8f0", marginBottom: "16px" },
        imgBox: { width: "80px", height: "80px", borderRadius: "16px", backgroundColor: "#f1f5f9", overflow: "hidden" },
        summary: { background: "#fff", borderRadius: "32px", padding: "30px", border: "1px solid #e2e8f0", height: "fit-content", position: "sticky", top: "120px" },
        checkoutBtn: { width: "100%", padding: "18px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "16px", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "24px" },
        emptyBox: { textAlign: "center", paddingTop: "60px" }
    };

    if (loading) return (
        <div style={{ ...styles.container, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loader2 className="animate-spin" color="#0ea5e9" size={40} />
        </div>
    );

    return (
        <div style={styles.container}>
            <main style={styles.content}>
                <header style={styles.header}>
                    <button onClick={() => navigate("/products")} style={styles.backBtn}>
                        <ChevronLeft size={18} /> Back to Catalog
                    </button>
                    <h1 style={styles.title}>Your Inventory.</h1>
                </header>

                {cart.length > 0 ? (
                    <div style={styles.grid}>
                        <div>
                            {cart.map((item) => (
                                <div key={item.productId?._id} style={styles.itemCard}>
                                    <div style={styles.imgBox}>
                                        <img 
                                            src={productImages[item.productId?.images?.[0]?.url] || item.productId?.images?.[0]?.url}
                                            alt="product" 
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>{item.productId?.name}</h3>
                                        <p style={{ color: "#0ea5e9", fontWeight: "900", margin: "4px 0" }}>₹{item.productId?.price}</p>
                                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                            <span style={{ fontSize: "12px", color: "#94a3b8" }}>QTY: {item.quantity}</span>
                                            <span style={{ fontSize: "12px", color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px" }}>
                                                Logistics: ₹{item.quantity * 100}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeItem(item.productId?._id)} 
                                        disabled={deletingId === item.productId?._id}
                                        style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
                                    >
                                        {deletingId === item.productId?._id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <aside style={styles.summary}>
                            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "900" }}>Order Summary</h3>
                            <div style={{ marginTop: "24px", borderBottom: "1px solid #f1f5f9", paddingBottom: "16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                                    <span style={{ color: "#64748b" }}>Subtotal</span>
                                    <span style={{ fontWeight: "700" }}>₹{subtotal}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "#64748b" }}>Logistics (₹100/item)</span>
                                    <span style={{ color: "#0f172a", fontWeight: "700" }}>₹{logistics}</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                <span style={{ fontWeight: "900" }}>Total</span>
                                <span style={{ fontWeight: "900", fontSize: "20px", color: "#0ea5e9" }}>₹{subtotal + logistics}</span>
                            </div>
                            <button onClick={() => navigate("/checkout")} style={styles.checkoutBtn}>
                                Proceed to Checkout <ArrowRight size={18} />
                            </button>
                        </aside>
                    </div>
                ) : (
                    <div style={styles.emptyBox}>
                        <ShoppingBag size={64} color="#e2e8f0" style={{ marginBottom: "20px" }} />
                        <h2 style={{ fontWeight: "900" }}>Hangar is Empty</h2>
                        <Link to="/products" style={{ display: "inline-block", marginTop: "24px", color: "#0ea5e9", fontWeight: "800", textDecoration: "none" }}>
                            Browse the Fleet
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;