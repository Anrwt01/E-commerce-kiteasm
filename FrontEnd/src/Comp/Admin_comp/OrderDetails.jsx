import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeftIcon, 
  MapPinIcon, 
  UserIcon, 
  CreditCardIcon, 
  ClockIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";

const OrderDetails = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("id");
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newStatus, setNewStatus] = useState("");

    const fetchOrderDetails = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/api/admin/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data.order || res.data;
            setOrder(data);
            setNewStatus(data.status);
            setLoading(false);
        } catch (error) {
            console.error("Fetch order details error:", error);
            navigate("/admin/orders");
        }
    };

    useEffect(() => {
        if (orderId) fetchOrderDetails(orderId);
        else navigate("/admin/orders");
    }, [orderId]);

    const handleStatusUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Fleet Manifest Updated.");
            fetchOrderDetails(orderId);
        } catch (error) {
            alert("Status update failed.");
        }
    };

    const styles = {
        container: { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '140px 24px 80px' },
        card: { background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9', marginBottom: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' },
        label: { fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' },
        value: { fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 },
        sectionTitle: { fontSize: '13px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }
    };

    if (loading) return <div style={styles.container}>Processing Manifest...</div>;

    return (
        <div style={styles.container}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                
                {/* --- HEADER --- */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                    <div>
                        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <ArrowLeftIcon width={16} /> Back to Logistics
                        </button>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Manifest #{order._id.slice(-8).toUpperCase()}</h1>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', background: 'white', padding: '12px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <select 
                            value={newStatus} 
                            onChange={(e) => setNewStatus(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', background: '#f8fafc', fontWeight: '700', fontSize: '13px', outline: 'none' }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <button onClick={handleStatusUpdate} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}>
                            UPDATE STATUS
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
                    
                    {/* LEFT COLUMN: ITEMS & TOTALS */}
                    <div>
                        <div style={styles.card}>
                            <h3 style={styles.sectionTitle}><CheckBadgeIcon width={18}/> Fleet Items</h3>
                            {order.orderItems.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '20px', padding: '16px 0', borderBottom: idx !== order.orderItems.length - 1 ? '1px solid #f8fafc' : 'none', alignItems: 'center' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', background: '#f8fafc' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: 0, fontSize: '15px', color: '#0f172a' }}>{item.name}</h4>
                                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Quantity: {item.qty}</p>
                                    </div>
                                    <span style={{ fontWeight: '800', color: '#1e293b' }}>₹{(item.price * item.qty).toLocaleString()}</span>
                                </div>
                            ))}
                            
                            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>Total Valuation</span>
                                <span style={{ fontSize: '24px', fontWeight: '900', color: '#0ea5e9' }}>₹{order.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: LOGISTICS INFO */}
                    <div>
                        <div style={styles.card}>
                            <h3 style={styles.sectionTitle}><UserIcon width={18}/> Customer</h3>
                            <div style={{ marginBottom: '20px' }}>
                                <p style={styles.label}>Identity</p>
                                <p style={styles.value}>{order.user?.name || "Guest Checkout"}</p>
                            </div>
                            <div>
                                <p style={styles.label}>Contact</p>
                                <p style={styles.value}>{order.user?.email || "N/A"}</p>
                            </div>
                        </div>

                        <div style={styles.card}>
                            <h3 style={styles.sectionTitle}><MapPinIcon width={18}/> Destination</h3>
                            {order.shippingAddress ? (
                                <p style={{ ...styles.value, lineHeight: '1.6', color: '#475569' }}>
                                    {order.shippingAddress.address}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                    {order.shippingAddress.country}
                                </p>
                            ) : <p style={styles.value}>Digital Pickup</p>}
                        </div>

                        <div style={styles.card}>
                            <h3 style={styles.sectionTitle}><CreditCardIcon width={18}/> Payment</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={styles.label}>Method</span>
                                <span style={{ ...styles.value, fontSize: '12px' }}>{order.paymentMethod?.toUpperCase()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={styles.label}>Status</span>
                                <span style={{ 
                                    fontSize: '11px', 
                                    fontWeight: '900', 
                                    color: order.paymentResult?.status === 'paid' ? '#22c55e' : '#f59e0b',
                                    background: order.paymentResult?.status === 'paid' ? '#f0fdf4' : '#fffbeb',
                                    padding: '4px 10px',
                                    borderRadius: '6px'
                                }}>
                                    {(order.paymentResult?.status || 'PENDING').toUpperCase()}
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