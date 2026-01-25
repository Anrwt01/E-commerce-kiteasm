import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
            const res = await axios.get(`http://localhost:5000/api/admin/getSingleOrder/${orderId}`, {
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
                `http://localhost:5000/api/admin/orderupdate/status/${orderId}`,
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
        container: { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '140px 24px 80px' },
        card: { background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9', marginBottom: '24px' },
        sectionTitle: { fontSize: '13px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' },
        label: { fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' },
        value: { fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' },
        toast: {
            position: 'fixed', top: '40px', right: '40px', backgroundColor: '#0f172a', color: 'white', padding: '16px 24px', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1000, transition: 'all 0.4s ease', transform: showToast ? 'translateX(0)' : 'translateX(200%)', opacity: showToast ? 1 : 0,
        }
    };

    if (loading) return <div style={{...styles.container, textAlign: 'center'}}>Syncing with Hangar...</div>;
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                    <div>
                        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <ArrowLeftIcon width={16} /> Back to Fleet
                        </button>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Manifest #{order._id.slice(-8).toUpperCase()}</h1>
                        <p style={{ color: '#64748b', fontWeight: '600', marginTop: '4px' }}>Created: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', background: 'white', padding: '12px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <select 
                            value={newStatus} 
                            onChange={(e) => setNewStatus(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', background: '#f8fafc', fontWeight: '700' }}
                        >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        <button onClick={() => handleStatusUpdate(order._id, newStatus)} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                            SET STATUS
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
                    {/* ITEMS LIST */}
                    <div style={styles.card}>
                        <h3 style={styles.sectionTitle}><CheckBadgeIcon width={18}/> Ordered Equipment</h3>
                        {(order.items || []).map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '20px', padding: '16px 0', borderBottom: idx !== (order.items.length - 1) ? '1px solid #f8fafc' : 'none', alignItems: 'center' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    {item.productId?.image ? (
                                        <img src={item.productId.image} alt="item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <CheckBadgeIcon width={24} color="#cbd5e1" />
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, fontSize: '15px', color: '#0f172a' }}>{item.productId?.name || "Product Unnamed"}</h4>
                                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Price: ₹{item.price} × {item.quantity}</p>
                                </div>
                                <span style={{ fontWeight: '800', color: '#1e293b' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                        
                        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#64748b', fontWeight: '600' }}>Payment Mode</span>
                                <span style={{ fontWeight: '700' }}>{order.customerDetails?.paymentMethod || "COD"}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>Total Valuation</span>
                                <span style={{ fontSize: '24px', fontWeight: '900', color: '#0ea5e9' }}>₹{order.totalAmount?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* CUSTOMER CARD */}
                        <div style={styles.card}>
                            <h3 style={styles.sectionTitle}><UserIcon width={18}/> Customer Intel</h3>
                            <p style={styles.label}>Identity</p>
                            <p style={styles.value}>{order.customerDetails?.name || "Guest Pilot"}</p>
                            
                            <p style={styles.label}>Communication</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <EnvelopeIcon width={14} color="#64748b" />
                                <span style={{ fontSize: '14px', fontWeight: '600' }}>{order.customerDetails?.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <PhoneIcon width={14} color="#64748b" />
                                <span style={{ fontSize: '14px', fontWeight: '600' }}>+91 {order.customerDetails?.phone}</span>
                            </div>
                        </div>

                        {/* ADDRESS CARD */}
                        <div style={styles.card}>
                            <h3 style={styles.sectionTitle}><MapPinIcon width={18}/> Destination</h3>
                            <p style={styles.label}>Shipping Coordinates</p>
                            <p style={{ ...styles.value, lineHeight: '1.6', color: '#475569', marginBottom: 0 }}>
                                {order.customerDetails?.address || "No Address Provided"}
                            </p>
                            <div style={{ marginTop: '16px', padding: '12px', borderRadius: '12px', backgroundColor: order.paymentStatus === 'paid' ? '#f0fdf4' : '#fff7ed', border: '1px solid', borderColor: order.paymentStatus === 'paid' ? '#bbf7d0' : '#ffedd5' }}>
                                <span style={{ fontSize: '11px', fontWeight: '900', color: order.paymentStatus === 'paid' ? '#16a34a' : '#ea580c' }}>
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