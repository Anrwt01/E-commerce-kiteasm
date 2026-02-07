import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    ChevronRightIcon,
    ArrowPathIcon,
    ShoppingBagIcon
} from "@heroicons/react/24/outline";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/admin/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const orderData = res.data.data || res.data.orders || [];
            setOrders(orderData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const getStatusStyles = (status) => {
        const s = status?.toLowerCase() || "";
        if (s === "pending") return { color: "#D97706", bg: "#FEF3C7" };
        if (s === "shipped" || s === "processing") return { color: "var(--accent)", bg: "rgba(59, 130, 246, 0.1)" };
        if (s === "paid" || s === "delivered") return { color: "#059669", bg: "#D1FAE5" };
        if (s === "cancelled") return { color: "#DC2626", bg: "#FEE2E2" };
        return { color: "var(--slate-400)", bg: "var(--bg-base)" };
    };

    const styles = {
        container: { backgroundColor: 'var(--bg-base)', minHeight: '100vh', padding: '160px 24px 80px', fontFamily: 'var(--font-sans)' },
        wrapper: { maxWidth: '1400px', margin: '0 auto' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' },
        tableCard: { backgroundColor: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-floating)', overflow: 'hidden' },
        th: { padding: '24px', fontSize: '11px', fontWeight: '900', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid var(--border-soft)', textAlign: 'left' },
        td: { padding: '24px', fontSize: '14px', color: 'var(--slate-800)', borderBottom: '1px solid var(--border-soft)', verticalAlign: 'middle' },
        productName: { fontWeight: '800', color: 'var(--slate-800)', fontSize: '13px', display: 'block', letterSpacing: '-0.2px' },
        productQty: { fontSize: '11px', color: 'var(--slate-400)', fontWeight: '700', textTransform: 'uppercase' },
        statusBadge: (status) => {
            const style = getStatusStyles(status);
            return {
                padding: '6px 14px', borderRadius: '50px', fontSize: '10px', fontWeight: '900',
                backgroundColor: style.bg, color: style.color, textTransform: 'uppercase', letterSpacing: '0.5px'
            };
        }
    };

    if (loading) return (
        <div style={{ ...styles.container, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <ArrowPathIcon style={{ width: '40px', color: 'var(--accent)', opacity: 0.5 }} />
            <p style={{ marginTop: '20px', fontWeight: '800', color: 'var(--slate-400)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px' }}>Syncing Manifest...</p>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                {/* --- HEADER --- */}
                <div style={styles.header}>
                    <div>
                        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer', fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            <ArrowLeftIcon width={16} /> Dashboard
                        </button>
                        <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--slate-800)', margin: 0, letterSpacing: '-1.5px' }}>
                            Order Manifest<span style={{ color: 'var(--accent)' }}>.</span>
                        </h1>
                    </div>
                    <button onClick={fetchOrders} style={{ padding: '14px 28px', borderRadius: '16px', background: 'var(--accent)', color: 'white', border: 'none', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)' }}>
                        <ArrowPathIcon width={18} /> Refresh Log
                    </button>
                </div>

                {/* --- TABLE --- */}
                <div style={styles.tableCard}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#fcfcfd' }}>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Customer</th>
                                <th style={styles.th}>Shipment Contents</th>
                                <th style={styles.th}>Amount</th>
                                <th style={styles.th}>Status</th>
                                <th style={{ ...styles.th, textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} style={{ transition: 'background 0.2s' }}>
                                        <td style={{ ...styles.td, fontFamily: 'monospace', color: '#64748b' }}>
                                            <div style={{ fontSize: '12px' }}>#{order._id.slice(-6).toUpperCase()}</div>
                                            <div style={{ fontSize: '10px', marginTop: '4px' }}>
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: '700' }}>{order.customerDetails?.name || order.name || "N/A"}</div>
                                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{order.customerDetails?.email || order.email}</div>
                                        </td>
                                        <td style={styles.td}>
                                            {order.items?.map((item, idx) => (
                                                <div key={idx} style={{ marginBottom: idx !== order.items.length - 1 ? '8px' : 0 }}>
                                                    <span style={styles.productName}>
                                                        {item.productname || item.productName || item.productId?.name || "Product Unit"}
                                                    </span>
                                                    <span style={styles.productQty}>QTY: {item.quantity}</span>
                                                </div>
                                            ))}
                                        </td>
                                        <td style={{ ...styles.td, fontWeight: '800' }}>
                                            ₹{order.totalAmount?.toLocaleString()}
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.statusBadge(order.orderStatus || order.paymentStatus)}>
                                                {order.orderStatus || order.paymentStatus || 'Processing'}
                                            </span>
                                        </td>
                                        <td style={{ ...styles.td, textAlign: 'right' }}>
                                            <button
                                                onClick={() => navigate(`/admin/OrderDetails/${order._id}`)}
                                                style={{
                                                    background: 'var(--bg-base)', border: '1px solid var(--border-soft)', padding: '10px 18px',
                                                    borderRadius: '12px', color: 'var(--slate-800)', fontWeight: '800',
                                                    fontSize: '11px', cursor: 'pointer', display: 'inline-flex',
                                                    alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.5px',
                                                    transition: '0.3s'
                                                }}
                                            >
                                                Details <ChevronRightIcon width={14} strokeWidth={3} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8' }}>
                                        <ShoppingBagIcon width={40} style={{ margin: '0 auto 10px', opacity: 0.2 }} />
                                        <p>No orders found in the system.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllOrders;