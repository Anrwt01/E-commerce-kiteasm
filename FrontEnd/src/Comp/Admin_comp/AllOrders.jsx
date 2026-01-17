import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllOrders.css";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/admin/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Assuming res.data.orders based on AdminALLorder controller
            setOrders(res.data.orders || res.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "pending": return "status-pending";
            case "processing": return "status-processing";
            case "shipped": return "status-shipped";
            case "delivered": return "status-delivered";
            case "cancelled": return "status-cancelled";
            default: return "";
        }
    };

    if (loading) return <div className="all-orders-container">Loading orders...</div>;

    return (
        <div className="all-orders-container">
            <h1>All Customer Orders</h1>

            <div className="orders-table-wrapper">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user ? order.user.name : "Guest / Unknown"}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/admin/order-details?id=${order._id}`} className="view-btn">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
