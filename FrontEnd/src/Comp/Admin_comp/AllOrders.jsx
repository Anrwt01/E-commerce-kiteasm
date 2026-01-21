import React, { useEffect, useState } from "react";
import axios from "axios";
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
            const res = await axios.get("http://localhost:5000/api/admin/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            // Based on your console log, the data is in res.data.data
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
        if (s === "pending") return { color: "#f59e0b", bg: "#fffbeb" };
        if (s === "shipped" || s === "processing") return { color: "#0ea5e9", bg: "#f0f9ff" };
        if (s === "paid" || s === "delivered") return { color: "#10b981", bg: "#ecfdf5" };
        if (s === "cancelled") return { color: "#ef4444", bg: "#fef2f2" };
        return { color: "#64748b", bg: "#f8fafc" };
    };

    const styles = {
        container: { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '120px 24px 80px' },
        wrapper: { maxWidth: '1200px', margin: '0 auto' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
        tableCard: { backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', overflow: 'hidden' },
        th: { padding: '18px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #f1f5f9', textAlign: 'left' },
        td: { padding: '20px 24px', fontSize: '14px', color: '#1e293b', borderBottom: '1px solid #f8fafc' },
        statusBadge: (status) => {
            const style = getStatusStyles(status);
            return {
                padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: '800',
                backgroundColor: style.bg, color: style.color, textTransform: 'uppercase'
            };
        }
    };

    if (loading) return (
        <div style={{ ...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ArrowPathIcon style={{ width: '40px', color: '#0ea5e9' }} className="animate-spin" />
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                {/* --- HEADER --- */}
                <div style={styles.header}>
                    <div>
                        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <ArrowLeftIcon width={16} /> Dashboard
                        </button>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-1px' }}>
                            Order Manifest<span style={{ color: '#0ea5e9' }}>.</span>
                        </h1>
                    </div>
                    <button onClick={fetchOrders} style={{ padding: '12px 24px', borderRadius: '12px', background: '#0f172a', color: 'white', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowPathIcon width={18} /> Refresh Data
                    </button>
                </div>

                {/* --- TABLE --- */}
                <div style={styles.tableCard}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#fcfcfd' }}>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Customer</th>
                                <th style={styles.th}>Date</th>
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
                                            #{order._id.slice(-6).toUpperCase()}
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: '700' }}>{order.customerDetails?.name || "N/A"}</div>
                                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{order.customerDetails?.email}</div>
                                        </td>
                                        <td style={styles.td}>
                                            {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </td>
                                        <td style={{ ...styles.td, fontWeight: '800' }}>
                                            ₹{order.totalAmount?.toLocaleString()}
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.statusBadge(order.orderStatus || order.paymentStatus)}>
                                                {order.orderStatus || order.paymentStatus}
                                            </span>
                                        </td>
                                        <td style={{ ...styles.td, textAlign: 'right' }}>
                                           <button 
                                       onClick={() => navigate(`/admin/OrderDetails/${order._id}`)}
                                        style={{ 
                                            background: '#f1f5f9', 
                                            border: 'none', 
                                            padding: '8px 16px', 
                                            borderRadius: '8px', 
                                            color: '#0f172a', 
                                            fontWeight: '700', 
                                            fontSize: '12px', 
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        DETAILS <ChevronRightIcon width={14} strokeWidth={3} />
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