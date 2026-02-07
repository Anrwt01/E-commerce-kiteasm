import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { useNavigate } from "react-router-dom";
import {
    CubeIcon,
    CalendarIcon,
    HashtagIcon,
    ArrowLeftIcon,
    ChevronRightIcon
} from "@heroicons/react/24/outline";
import { Heart } from "lucide-react";

// Define styles object with Anti-Gravity aesthetic
const styles = {
    page: {
        background: "var(--bg-base)",
        minHeight: "100vh",
        padding: "140px 16px 80px",
        color: "var(--slate-800)",
        fontFamily: "var(--font-sans)"
    },
    container: {
        maxWidth: 1000,
        margin: "0 auto"
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: 'none',
        background: 'none',
        fontSize: 11,
        fontWeight: 900,
        color: 'var(--slate-400)',
        cursor: 'pointer',
        marginBottom: 24,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: '0.3s'
    },
    mainTitle: {
        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
        fontWeight: 900,
        marginTop: 10,
        letterSpacing: '-2px',
        color: 'var(--slate-800)'
    },
    subtitle: {
        color: 'var(--slate-600)',
        marginTop: 8,
        fontSize: 16
    },
    sectionCard: {
        background: 'var(--bg-card)',
        padding: '0',
        borderRadius: 32,
        border: '1px solid var(--border-soft)',
        boxShadow: 'var(--shadow-floating)',
        marginBottom: 32,
        overflow: 'hidden'
    },
    tableHeader: {
        background: 'var(--bg-base)',
        padding: '20px 32px',
        borderBottom: '1px solid var(--border-soft)',
    },
    headerLabel: {
        fontSize: '11px',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--slate-400)',
    },
    orderRow: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 2fr 1fr 1fr',
        gap: '24px',
        padding: '32px',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-soft)',
        transition: '0.3s',
    },
    statusBadge: (status) => {
        const isDelivered = status?.toLowerCase() === 'delivered';
        return {
            backgroundColor: isDelivered ? '#DCFCE7' : 'var(--bg-base)',
            color: isDelivered ? '#166534' : 'var(--slate-600)',
            padding: '8px 16px',
            borderRadius: '14px',
            fontSize: '11px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'inline-block',
            textAlign: 'center'
        };
    },
    emptyCard: {
        textAlign: 'center',
        padding: '100px 40px',
        background: 'var(--bg-card)',
        borderRadius: 32,
        border: '1px solid var(--border-soft)',
        boxShadow: 'var(--shadow-floating)'
    }
};

const MyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlistItems, setWishlistItems] = useState([]);

    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/user/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const ordersList = res.data.orders || res.data || [];
            if (Array.isArray(ordersList)) {
                setOrders(ordersList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            }
        } catch (error) {
            console.error("Fetch orders error:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWishlist = async () => {
        if (!token) return;
        try {
            const res = await axios.get(`${API_BASE_URL}/my-wishlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlistItems(res.data.products?.map(p => p._id) || []);
        } catch (error) {
            console.error("Wishlist fetch failed:", error);
        }
    };

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

    useEffect(() => {
        fetchOrders();
        fetchWishlist();
    }, []);

    if (loading) return (
        <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: 'var(--accent)' }}>SYNCING LOGS...</div>
        </div>
    );

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <button
                    onClick={() => navigate('/dashboard')}
                    style={styles.backBtn}
                >
                    <ArrowLeftIcon width={14} /> Back to Dashboard
                </button>

                <header style={{ marginBottom: 60 }}>
                    <h1 style={styles.mainTitle}>Orders<span style={{ color: 'var(--accent)' }}>.</span></h1>
                    <p style={styles.subtitle}>Track and manage your kite & Products.</p>
                </header>

                {orders.length === 0 ? (
                    <div style={styles.emptyCard}>
                        <CubeIcon style={{ width: 64, margin: '0 auto', color: 'var(--slate-200)' }} />
                        <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--slate-800)', marginTop: '24px' }}>No orders</h2>
                        <p style={{ color: 'var(--slate-400)', marginTop: '12px' }}>No gear deployments found in your manifest.</p>
                        <button
                            onClick={() => navigate('/products')}
                            style={{
                                marginTop: '40px',
                                backgroundColor: 'var(--accent)',
                                color: 'white',
                                padding: '18px 32px',
                                borderRadius: '18px',
                                border: 'none',
                                fontWeight: 900,
                                fontSize: '12px',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            ACQUIRE GEAR
                        </button>
                    </div>
                ) : (
                    <div style={styles.sectionCard}>
                        <div style={{ ...styles.orderRow, background: 'var(--bg-base)', borderBottom: '1px solid var(--border-soft)', padding: '16px 32px' }}>
                            <span style={styles.headerLabel}>DEPLOYMENT INFO</span>
                            <span style={styles.headerLabel}>INVENTORY</span>
                            <span style={styles.headerLabel}>ALLOCATION</span>
                            <span style={styles.headerLabel}>STATUS</span>
                        </div>
                        {orders.map((order) => (
                            <div key={order._id} style={styles.orderRow}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '15px' }}>
                                        <CalendarIcon width={16} color="var(--slate-400)" />
                                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                    </div>
                                    <div style={{ fontSize: '10px', color: 'var(--slate-400)', marginTop: '6px', fontWeight: '800' }}>
                                        #{order._id.toUpperCase()}
                                    </div>
                                </div>
                                <div>
                                    {order.items?.map((item, i) => (
                                        <div key={i} style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button
                                                onClick={() => toggleWishlist(item.productId)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                    color: wishlistItems.includes(item.productId) ? 'var(--accent)' : 'var(--slate-300)',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Heart size={14} fill={wishlistItems.includes(item.productId) ? "var(--accent)" : "none"} />
                                            </button>
                                            {item.productName || item.productname || "Kiteasm Gear"}
                                            <span style={{ color: 'var(--slate-400)', marginLeft: 'auto', fontWeight: '900', fontSize: '11px' }}>× {item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ fontWeight: 900, fontSize: '18px', color: 'var(--accent)' }}>₹{order.totalAmount}</div>
                                <div>
                                    <span style={styles.statusBadge(order.orderStatus)}>
                                        {order.orderStatus || 'In Transit'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;