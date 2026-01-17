import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

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
            console.log("User Orders:", res.data);
            // Adjust based on typical response structure. Typically controller returns object with list.
            const ordersList = res.data.orders || res.data || [];
            // Sort by date desc
            setOrders(ordersList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            setLoading(false);
        } catch (error) {
            console.error("Fetch orders error:", error);
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="my-orders-container">
            <div className="loading-spinner-wrapper">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        </div>
    );

    return (
        <div className="my-orders-container">
            <h1 className="page-title">Purchase History</h1>

            {orders.length === 0 ? (
                <div className="empty-orders-state">
                    <div className="empty-icon text-6xl mb-6">📦</div>
                    <h2>No orders yet</h2>
                    <p>When you buy kites, they'll show up here!</p>
                    <button onClick={() => navigate('/products')} className="start-shopping-btn">
                        Explore Collection
                    </button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card-premium">
                            <div className="order-header-main">
                                <div className="order-ids">
                                    <span className="order-tag">Order #{order._id.slice(-6).toUpperCase()}</span>
                                    <p className="order-date">Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div className="order-status-group">
                                    <span className={`status-pill ${order.status?.toLowerCase() || order.paymentStatus?.toLowerCase()}`}>
                                        {order.status || order.paymentStatus || "Unknown"}
                                    </span>
                                    <span className="total-price-tag">₹{order.totalAmount}</span>
                                </div>
                            </div>

                            <div className="order-items-grid">
                                {order.items && order.items.map((item, index) => (
                                    <div key={index} className="order-item-compact">
                                        <div className="item-img-box">
                                            <img
                                                src={item.productId?.images?.[0]?.url || "/images/products/kite.jpg"}
                                                alt={item.productName}
                                            />
                                        </div>
                                        <div className="item-info-compact">
                                            <h4>{item.productName || item.productId?.name || "Product Name"}</h4>
                                            <div className="item-meta-compact">
                                                <span>Qty: {item.quantity}</span>
                                                <span className="dot"></span>
                                                <span>₹{item.price} each</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
