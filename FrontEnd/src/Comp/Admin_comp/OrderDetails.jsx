import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  ArrowLeftIcon, MapPinIcon, UserIcon, 
  CreditCardIcon, CheckBadgeIcon, CheckCircleIcon 
} from "@heroicons/react/24/outline";

const OrderDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newStatus, setNewStatus] = useState("");
    
    // --- POPUP STATE ---
    const [showToast, setShowToast] = useState(false);

    const fetchOrderDetails = async (orderId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/api/admin/getSingleOrder/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data.order || res.data.data || res.data;
            setOrder(data);
            setNewStatus(data.orderStatus || data.status);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchOrderDetails(id);
        else navigate("/admin/orders");
    }, [id]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                `http://localhost:5000/api/admin/orderupdate/status/${orderId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setOrder(res.data.order);
            
            // --- TRIGGER POPUP ---
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds

        } catch (error) {
            alert(error.response?.data?.message || "Update failed");
        }
    };

    const styles = {
        container: { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '140px 24px 80px' },
        card: { background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9', marginBottom: '24px' },
        sectionTitle: { fontSize: '13px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' },
        label: { fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' },
        value: { fontSize: '15px', fontWeight: '700', color: '#1e293b' },
        
        // --- TOAST STYLES ---
        toast: {
            position: 'fixed',
            top: '40px',
            right: '40px',
            backgroundColor: '#0f172a',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 1000,
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: showToast ? 'translateX(0)' : 'translateX(200%)',
            opacity: showToast ? 1 : 0,
        }
    };

    if (loading) return <div style={{...styles.container, textAlign: 'center'}}>Deciphering...</div>;
    if (!order) return <div style={styles.container}>Not Found.</div>;

    return (
        <div style={styles.container}>
            
            {/* --- SUCCESS POPUP --- */}
            <div style={styles.toast}>
                <CheckCircleIcon width={24} color="#22c55e" strokeWidth={2.5} />
                <div>
                    <p style={{ margin: 0, fontWeight: '800', fontSize: '14px' }}>Logistics Updated</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Status set to {newStatus.toUpperCase()}</p>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                    <div>
                        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <ArrowLeftIcon width={16} /> Back
                        </button>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Manifest #{order._id.slice(-8).toUpperCase()}</h1>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', background: 'white', padding: '12px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <select 
                            value={newStatus} 
                            onChange={(e) => setNewStatus(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', background: '#f8fafc', fontWeight: '700' }}
                        >
                            <option value="processing">processing</option>
                            <option value="shipped">shipped</option>
                            <option value="delivered">delivered</option>
                        </select>
                        <button onClick={() => handleStatusUpdate(order._id, newStatus)} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                            UPDATE STATUS
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
                    <div style={styles.card}>
                        <h3 style={styles.sectionTitle}><CheckBadgeIcon width={18}/> Fleet Items</h3>
                        {(order.orderItems || []).map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '20px', padding: '16px 0', borderBottom: idx !== (order.orderItems?.length - 1) ? '1px solid #f8fafc' : 'none', alignItems: 'center' }}>
                                <img src={item.image} style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, fontSize: '15px' }}>{item.name}</h4>
                                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Qty: {item.qty}</p>
                                </div>
                                <span style={{ fontWeight: '800' }}>₹{(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '18px', fontWeight: '900' }}>Total Valuation</span>
                            <span style={{ fontSize: '24px', fontWeight: '900', color: '#0ea5e9' }}>₹{(order.totalPrice || order.totalAmount)?.toLocaleString()}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={styles.card}>
                            <h3 style={styles.sectionTitle}><UserIcon width={18}/> Customer</h3>
                            <p style={styles.label}>Identity</p>
                            <p style={styles.value}>{order.user?.name || order.customerDetails?.name || "Guest"}</p>
                            <p style={{...styles.label, marginTop: '16px'}}>Contact</p>
                            <p style={styles.value}>{order.user?.email || order.customerDetails?.email || "N/A"}</p>
                        </div>

                        <div style={styles.card}>
                            <h3 style={styles.sectionTitle}><MapPinIcon width={18}/> Destination</h3>
                            {order.shippingAddress ? (
                                <p style={{ ...styles.value, lineHeight: '1.6', color: '#475569' }}>
                                    {order.shippingAddress.address}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                </p>
                            ) : <p style={styles.value}>Digital Pickup</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;