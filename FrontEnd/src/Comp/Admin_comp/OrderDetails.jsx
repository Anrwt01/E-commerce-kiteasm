import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./OrderDetails.css";

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
            // Use the ENDPOINT WE JUST ADDED
            const res = await axios.get(`http://localhost:5000/api/admin/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setOrder(res.data.order || res.data);
            setNewStatus(res.data.order ? res.data.order.status : res.data.status);
            setLoading(false);
        } catch (error) {
            console.error("Fetch order details error:", error);
            alert("Failed to fetch order details.");
            navigate("/admin/orders");
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId);
        } else {
            alert("No Order ID provided");
            navigate("/admin/orders");
        }
    }, [orderId]);

   

    const handleStatusUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Order status updated successfully!");
            fetchOrderDetails(orderId); // Refresh data
        } catch (error) {
            console.error("Update status error:", error);
            alert("Failed to update status.");
        }
    };

    if (loading) return <div className="order-details-container">Loading details...</div>;
    if (!order) return <div className="order-details-container">Order not found.</div>;

    return (
        <div className="order-details-container">
            <h1>Order Details</h1>

            {/* Order Info */}
            <div className="order-info-card">
                <h3 className="section-title">Order Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Order ID</label>
                        <p>{order._id}</p>
                    </div>
                    <div className="info-item">
                        <label>Date</label>
                        <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="info-item">
                        <label>Total Amount</label>
                        <p>${order.totalPrice}</p>
                    </div>
                    <div className="info-item">
                        <label>Payment Method</label>
                        <p>{order.paymentMethod || "N/A"}</p>
                    </div>
                    <div className="info-item">
                        <label>Payment Status</label>
                        <p>{order.paymentResult ? order.paymentResult.status : "Pending"}</p>
                    </div>
                </div>

                <div className="update-status-section">
                    <label><strong>Order Status:</strong></label>
                    <select
                        className="status-select"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <button onClick={handleStatusUpdate} className="update-btn">Update Status</button>
                </div>
            </div>

            {/* Customer Info */}
            {/* 
         Note: Order model might populate 'user'. 
         If not populated, we might only see user ID.
         Ideally backend should populate user.
         Assuming populated for now based on 'AdminALLorder' usually populating it.
      */}
            <div className="order-info-card">
                <h3 className="section-title">Customer Details</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Name</label>
                        <p>{order.user?.name || "Guest"}</p>
                    </div>
                    <div className="info-item">
                        <label>Email</label>
                        <p>{order.user?.email || "N/A"}</p>
                    </div>
                    {/* If shipping address is part of order model */}
                    {order.shippingAddress && (
                        <div className="info-item" style={{ gridColumn: 'span 2' }}>
                            <label>Shipping Address</label>
                            <p>
                                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Items */}
            <div className="order-info-card">
                <h3 className="section-title">Order Items</h3>
                <ul className="order-items-list">
                    {order.orderItems && order.orderItems.map((item, index) => (
                        <li key={index} className="order-item">
                            <img
                                src={item.image || "https://via.placeholder.com/60"}
                                alt={item.name}
                                className="item-image"
                            />
                            <div className="item-details">
                                <h4>{item.name}</h4>
                                <p>Qty: {item.qty}</p>
                            </div>
                            <div className="item-price">
                                ${item.price * item.qty}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default OrderDetails;
