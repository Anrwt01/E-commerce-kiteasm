import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    CubeIcon,
    CalendarIcon,
    HashtagIcon,
    ArrowLeftIcon,
    ChevronRightIcon
} from "@heroicons/react/24/outline";

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
            backgroundColor: '#F8FAFC', // Very light grey/white background
            minHeight: '100vh',
            color: '#1E293B',
            paddingTop: '100px',
            paddingBottom: '100px',
            fontFamily: "'Roboto', sans-serif",
        },
        container: { maxWidth: '1000px', margin: '0 auto', padding: '0 20px' },
        headerSection: {
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px'
        },
        card: {
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            marginBottom: '16px'
        },
        statusBadge: (status) => ({
            backgroundColor: status?.toLowerCase() === 'delivered' ? '#DCFCE7' : '#F1F5F9',
            color: status?.toLowerCase() === 'delivered' ? '#166534' : '#475569',
            padding: '6px 14px',
            borderRadius: '50px',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            display: 'inline-block'
        })
    };

    if (loading) return (
        <div style={{ ...styles.wrapper, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <div className="loader">SYNCING LOGS...</div>
        </div>
    );

    return (
        <div style={styles.wrapper}>
            <style>{`
                .order-table { width: 100%; border-collapse: collapse; }
                .order-table th { 
                    text-align: left; padding: 16px 24px; font-size: 11px; 
                    text-transform: uppercase; color: #64748B; letter-spacing: 1px;
                }
                .order-table td { padding: 24px; border-top: 1px solid #F1F5F9; }

                /* RESPONSIVE LOGIC */
                @media (max-width: 768px) {
                    .desktop-table { display: none; }
                    .mobile-card-list { display: block; }
                    .header-title { text-align: center; width: 100%; }
                }
                @media (min-width: 769px) {
                    .mobile-card-list { display: none; }
                }

                .back-btn:hover { color: #000 !important; }
            `}</style>

            <div style={styles.container}>
                {/* BACK BUTTON */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="back-btn"
                    style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, fontSize: '14px', marginBottom: '20px' }}
                >
                    <ArrowLeftIcon width={16} /> Dashboard
                </button>

                <div style={styles.headerSection}>
                    <div className="header-title">
                        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Order History</h1>
                        <p style={{ color: '#64748B', fontSize: '15px', marginTop: '5px' }}>Track and manage your previous gear deployments.</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div style={{ ...styles.card, textAlign: 'center', padding: '80px 20px' }}>
                        <CubeIcon style={{ width: 48, margin: '0 auto', color: '#CBD5E1' }} />
                        <p style={{ marginTop: '20px', color: '#64748B', fontWeight: 500 }}>No orders found in your manifest.</p>
                        <button onClick={() => navigate('/products')} style={{ marginTop: '24px', backgroundColor: '#000', color: 'white', padding: '14px 28px', borderRadius: '12px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>START SHOPPING</button>
                    </div>
                ) : (
                    <>
                        {/* DESKTOP TABLE */}
                        <div className="desktop-table" style={styles.card}>
                            <table className="order-table">
                                <thead style={{ backgroundColor: '#F8FAFC' }}>
                                    <tr>
                                        <th>Deployment Info</th>
                                        <th>Inventory</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                                                    <CalendarIcon width={16} color="#64748B" />
                                                    {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px', fontFamily: 'monospace' }}>
                                                    ID: {order._id.toUpperCase()}
                                                </div>
                                            </td>
                                            <td>
                                                {order.items?.map((item, i) => (
                                                    <div key={i} style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>
                                                        {item.productName || "Kiteasm Gear"} <span style={{ color: '#94A3B8' }}>× {item.quantity}</span>
                                                    </div>
                                                ))}
                                            </td>
                                            <td style={{ fontWeight: 800, fontSize: '15px' }}>₹{order.totalAmount}</td>
                                            <td>
                                                <span style={styles.statusBadge(order.orderStatus)}>
                                                    {order.orderStatus || 'Processing'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* MOBILE CARD LIST */}
                        <div className="mobile-card-list">
                            {orders.map((order) => (
                                <div key={order._id} style={styles.card}>
                                    <div style={{ padding: '20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                                            <div style={{ fontWeight: 800, fontSize: '14px' }}>Order #{order._id.slice(-6).toUpperCase()}</div>
                                        </div>
                                        <span style={styles.statusBadge(order.orderStatus)}>{order.orderStatus || 'Pending'}</span>
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        {order.items?.map((item, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                                                <span>{item.productName} <small style={{ color: '#94A3B8' }}>x{item.quantity}</small></span>
                                                <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 700 }}>Total Paid</span>
                                            <span style={{ fontWeight: 900, fontSize: '18px', color: '#000' }}>₹{order.totalAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyOrders;