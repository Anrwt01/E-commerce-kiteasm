import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import {
    ArrowLeftIcon, MapPinIcon, UserIcon,
    CheckBadgeIcon, CheckCircleIcon, PhoneIcon, EnvelopeIcon
} from "@heroicons/react/24/outline";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newStatus, setNewStatus] = useState("");
    const [showToast, setShowToast] = useState(false);

    const fetchOrderDetails = async (orderId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/admin/getSingleOrder/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Normalize data based on your specific backend object structure
            const data = res.data.order || res.data;
            setOrder(data);
            setNewStatus(data.orderStatus || "processing");
            setLoading(false);
        } catch (error) {
            console.error("Fetch Error:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchOrderDetails(id);
        else navigate("/admin/orders");
    }, [id]);

    const handleStatusUpdate = async (orderId, status) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                `${API_BASE_URL}/admin/orderupdate/status/${orderId}`,
                { status: status },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setOrder(res.data.order || res.data);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            alert(error.response?.data?.message || "Update failed");
        }
    };

    const styles = {
        container: { backgroundColor: 'var(--bg-base)', minHeight: '100vh', padding: '160px 24px 80px', fontFamily: 'var(--font-sans)' },
        card: { padding: '32px' },
        sectionTitle: { fontSize: '12px', fontWeight: '900', color: 'var(--slate-800)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' },
        label: { fontSize: '10px', fontWeight: '900', color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '1px' },
        value: { fontSize: '15px', fontWeight: '800', color: 'var(--slate-800)', marginBottom: '16px' },
        toast: {
            position: 'fixed', top: '40px', right: '40px', backgroundColor: 'var(--slate-800)', color: 'white', padding: '16px 24px', borderRadius: '18px', boxShadow: 'var(--shadow-xl)', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1000, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', transform: showToast ? 'translateX(0)' : 'translateX(200%)', opacity: showToast ? 1 : 0, border: '1px solid var(--border-soft)'
        }
    };

    if (loading) return (
        <div style={{ ...styles.container, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CheckBadgeIcon style={{ width: '40px', color: 'var(--accent)', opacity: 0.5 }} />
            <p style={{ marginTop: '20px', fontWeight: '800', color: 'var(--slate-400)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px' }}>Accessing Archives...</p>
        </div>
    );
    if (!order) return <div style={styles.container}>Manifest not found.</div>;

    return (
        <div style={styles.container}>
            {/* TOAST POPUP */}
            <div style={styles.toast}>
                <CheckCircleIcon width={24} color="#22c55e" strokeWidth={2.5} />
                <div>
                    <p style={{ margin: 0, fontWeight: '800', fontSize: '14px' }}>Logistics Updated</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Status: {newStatus.toUpperCase()}</p>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* HEADER */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
                    <div>
                        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '11px' }}>
                            <ArrowLeftIcon width={16} /> Return to Log
                        </button>
                        <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--slate-800)', margin: 0, letterSpacing: '-1.5px' }}>Manifest #{order._id.slice(-8).toUpperCase()}<span style={{ color: 'var(--accent)' }}>.</span></h1>
                        <p style={{ color: 'var(--slate-600)', fontWeight: '700', marginTop: '8px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>Created: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', background: 'white', padding: '12px', borderRadius: '20px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-floating)' }}>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--border-soft)', background: 'var(--bg-base)', fontWeight: '800', outline: 'none', color: 'var(--slate-800)', textTransform: 'uppercase', fontSize: '12px' }}
                        >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        <button onClick={() => handleStatusUpdate(order._id, newStatus)} style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', transition: '0.3s', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.2)' }}>
                            UPDATE UNIT
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
                    {/* ITEMS LIST */}
                    <div className="floating-card" style={styles.card}>
                        <h3 style={styles.sectionTitle}><CheckBadgeIcon width={18} style={{ color: 'var(--accent)' }} /> Ordered Equipment</h3>
                        {(order.items || []).map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '24px', padding: '20px 0', borderBottom: idx !== (order.items.length - 1) ? '1px solid var(--border-soft)' : 'none', alignItems: 'center' }}>
                                <div style={{ width: '70px', height: '70px', borderRadius: '16px', backgroundColor: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border-soft)' }}>
                                    {item.productId?.mainImage || item.productId?.image ? (
                                        <img src={item.productId?.mainImage || item.productId?.image} alt="item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <CheckBadgeIcon width={24} color="var(--slate-400)" />
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--slate-800)', fontWeight: '900', letterSpacing: '-0.3px' }}>{item.productId?.name || "Product Unnamed"}</h4>
                                    <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--slate-400)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price: ₹{item.price} × {item.quantity}</p>
                                </div>
                                <span style={{ fontWeight: '900', color: 'var(--slate-800)', fontSize: '18px' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}

                        <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '2px solid var(--border-soft)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: 'var(--slate-400)', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Payment Mode</span>
                                <span style={{ fontWeight: '800', color: 'var(--slate-800)' }}>{order.customerDetails?.paymentMethod || "COD"}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--slate-800)', letterSpacing: '-1px' }}>Total Valuation</span>
                                <span style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent)' }}>₹{order.totalAmount?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* CUSTOMER CARD */}
                        <div className="floating-card" style={styles.card}>
                            <h3 style={styles.sectionTitle}><UserIcon width={18} style={{ color: 'var(--accent)' }} /> Customer Intel</h3>
                            <p style={styles.label}>Identity</p>
                            <p style={styles.value}>{order.customerDetails?.name || "Guest Pilot"}</p>

                            <p style={styles.label}>Communication</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <EnvelopeIcon width={14} color="var(--accent)" />
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-800)' }}>{order.customerDetails?.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: order.customerDetails?.phone2 ? '12px' : '0' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <PhoneIcon width={14} color="var(--accent)" />
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-800)' }}>+91 {order.customerDetails?.phone1}</span>
                            </div>
                            {order.customerDetails?.phone2 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <PhoneIcon width={14} color="var(--accent)" />
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-800)' }}>+91 {order.customerDetails?.phone2}</span>
                                </div>
                            )}
                        </div>

                        {/* ADDRESS CARD */}
                        <div className="floating-card" style={styles.card}>
                            <h3 style={styles.sectionTitle}><MapPinIcon width={18} style={{ color: 'var(--accent)' }} /> Destination</h3>
                            <p style={styles.label}>Shipping Coordinates</p>
                            <p style={{ ...styles.value, lineHeight: '1.7', color: 'var(--slate-600)', marginBottom: 0, fontWeight: '700' }}>
                                {order.customerDetails?.address || "No Address Provided"}
                            </p>
                            <div style={{ marginTop: '24px', padding: '14px', borderRadius: '14px', backgroundColor: order.paymentStatus === 'paid' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)', border: '1px solid', borderColor: order.paymentStatus === 'paid' ? 'rgba(34, 197,  green 0.2)' : 'rgba(245, 158, 11, 0.2)', textAlign: 'center' }}>
                                <span style={{ fontSize: '10px', fontWeight: '900', color: order.paymentStatus === 'paid' ? '#16a34a' : '#ea580c', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    PAYMENT: {order.paymentStatus.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;