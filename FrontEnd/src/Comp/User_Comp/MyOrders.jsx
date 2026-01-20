import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CubeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

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

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="serif italic">Syncing mission logs...</div>
        </div>
    );

    return (
        <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', maxWidth: '1000px' }}>
            <div style={{ marginBottom: '80px' }}>
                <span className="text-xs uppercase tracking-widest text-muted">Order History</span>
                <h1 className="serif" style={{ fontSize: '48px', marginTop: '16px' }}>Your Missions<span style={{ fontStyle: 'normal' }}>.</span></h1>
                <p className="text-muted serif italic" style={{ fontSize: '18px', marginTop: '10px' }}>Details for all your Aero Kite deployments.</p>
            </div>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '100px 0', background: 'var(--gray-light)' }}>
                    <CubeIcon style={{ width: 48, margin: '0 auto', color: 'var(--gray-mid)', opacity: 0.3 }} />
                    <p className="serif italic text-muted" style={{ marginTop: '20px', fontSize: '20px' }}>No deployments recorded.</p>
                    <button onClick={() => navigate('/products')} className="btn btn-black" style={{ marginTop: '40px' }}>Launch First Mission</button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {orders.map((order) => (
                        <div key={order._id} style={{ border: '1px solid var(--gray-light)', padding: '40px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid var(--gray-light)' }}>
                                <div>
                                    <span className="text-xs uppercase tracking-widest" style={{ fontWeight: 900 }}>MSN-{order._id.slice(-6).toUpperCase()}</span>
                                    <p className="text-xs text-muted font-serif italic" style={{ marginTop: '8px' }}>
                                        Established: {new Date(order.createdAt).toLocaleDateString().toUpperCase()}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '24px', fontWeight: 900 }}>₹{order.totalAmount}</p>
                                    <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--accent)', fontWeight: 900 }}>{order.status || order.paymentStatus || 'Mission Active'}</span>
                                </div>
                            </div>

                            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                {order.items && order.items.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <div style={{ width: '60px', height: '60px', background: 'var(--gray-light)', padding: '5px' }}>
                                            <img src={item.productId?.images?.[0]?.url || "/images/products/kite.jpg"} alt="Gear" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 className="text-xs" style={{ fontWeight: 900, textTransform: 'uppercase' }}>{item.productName || item.productId?.name}</h4>
                                            <p className="text-xs text-muted">QTY: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--gray-light)', display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
                                <button className="text-xs uppercase tracking-widest text-muted" style={{ fontWeight: 900 }}>Manifest</button>
                                <button className="text-xs uppercase tracking-widest" style={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Track Delivery <ArrowRightIcon style={{ width: 14 }} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
