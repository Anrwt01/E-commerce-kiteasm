import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CubeIcon, CalendarIcon, HashtagIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";

const MyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/user/orders", {
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

    const styles = {
        wrapper: {
            backgroundColor: '#000000',
            minHeight: '100vh',
            color: 'white',
            paddingTop: '100px',
            paddingBottom: '100px',
        },
        container: { maxWidth: '1000px', margin: '0 auto', padding: '0 20px' },
        headerSection: { marginBottom: '40px' },
        tableContainer: {
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            overflow: 'hidden',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
        },
        th: {
            padding: '20px 24px',
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#94a3b8',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
        td: {
            padding: '24px',
            fontSize: '14px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
            verticalAlign: 'top',
        },
        statusBadge: {
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            color: '#0ea5e9',
            padding: '6px 14px',
            borderRadius: '50px',
            fontSize: '10px',
            fontWeight: '900',
            textTransform: 'uppercase',
            border: '1px solid rgba(14, 165, 233, 0.2)',
            display: 'inline-block'
        },
        productTag: {
            display: 'block',
            marginBottom: '4px',
            fontWeight: '700',
            color: '#f1f5f9'
        }
    };

    if (loading) return (
        <div style={{ ...styles.wrapper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#0ea5e9', letterSpacing: '2px', fontWeight: 800 }}>SYNCING LOGS...</div>
        </div>
    );

    return (
        <div style={styles.wrapper}>
            <style>{`
                @media (max-width: 768px) {
                    .order-table thead { display: none; }
                    .order-table, .order-table tbody, .order-table tr, .order-table td { 
                        display: block; 
                        width: 100%; 
                    }
                    .order-table tr {
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        padding: 20px 0;
                    }
                    .order-table td {
                        padding: 10px 24px;
                        border: none;
                    }
                    .mobile-label {
                        display: block;
                        font-size: 10px;
                        font-weight: 800;
                        color: #64748b;
                        text-transform: uppercase;
                        margin-bottom: 4px;
                    }
                }
                @media (min-width: 769px) {
                    .mobile-label { display: none; }
                }
            `}</style>

            <div style={styles.container}>
                <div style={styles.headerSection}>
                    <h1 style={{ fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 900, margin: '0 0 8px 0' }}>Order History</h1>
                    <p style={{ color: '#94a3b8', fontSize: '15px' }}>Detailed breakdown of your deployments.</p>
                </div>

                {orders.length === 0 ? (
                    <div style={{ ...styles.tableContainer, textAlign: 'center', padding: '80px 20px' }}>
                        <CubeIcon style={{ width: 40, margin: '0 auto', color: '#334155' }} />
                        <p style={{ marginTop: '20px', color: '#94a3b8' }}>No records found.</p>
                        <button onClick={() => navigate('/products')} style={{ marginTop: '24px', backgroundColor: '#0ea5e9', color: 'white', padding: '12px 24px', borderRadius: '50px', border: 'none', fontWeight: 900, cursor: 'pointer' }}>BROWSE STORE</button>
                    </div>
                ) : (
                    <div style={styles.tableContainer}>
                        <table className="order-table" style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Date & ID</th>
                                    <th style={styles.th}>Products</th>
                                    <th style={styles.th}>Total</th>
                                    <th style={styles.th}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td style={styles.td}>
                                            <span className="mobile-label">Deployment Info</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: 600, marginBottom: '4px' }}>
                                                <CalendarIcon width={14} color="#0ea5e9" />
                                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <HashtagIcon width={12} /> {order._id.slice(-8).toUpperCase()}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <span className="mobile-label">Inventory</span>
                                            {order.items?.map((item, index) => (
                                                <div key={index} style={{ marginBottom: index === order.items.length - 1 ? 0 : '12px' }}>
                                                    <span style={styles.productTag}>
                                                        {item.productname || item.productName || item.productId?.name || "Kiteasm Gear"}
                                                    </span>
                                                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                                                        QTY: {item.quantity} × ₹{item.price}
                                                    </span>
                                                </div>
                                            ))}
                                        </td>
                                        <td style={styles.td}>
                                            <span className="mobile-label">Payment</span>
                                            <span style={{ fontWeight: 900, color: '#fff', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                ₹{order.totalAmount}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <span className="mobile-label">Current Status</span>
                                            <span style={styles.statusBadge}>
                                                {order.orderStatus || 'Active'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;