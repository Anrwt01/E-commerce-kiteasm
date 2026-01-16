import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token) {
            navigate("/login");
        } else {
            if (userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (e) {
                    console.error("Failed to parse user data", e);
                }
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Logged out successfully");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h1 className="dashboard-title">Welcome, {user.name?.split(" ")[0]}!</h1>
                <p className="dashboard-subtitle">What would you like to do today?</p>

                <div className="dashboard-grid">
                    {/* Update Profile */}
                    <Link to="/user/update" className="dashboard-option">
                        <div className="option-icon">👤</div>
                        <div className="option-title">My Profile</div>
                        <div className="option-desc">Update address & details</div>
                    </Link>

                    {/* Shop Products */}
                    <Link to="/products" className="dashboard-option">
                        <div className="option-icon">🪁</div>
                        <div className="option-title">Shop Kites</div>
                        <div className="option-desc">Browse our collection</div>
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className="dashboard-option">
                        <div className="option-icon">🛒</div>
                        <div className="option-title">My Cart</div>
                        <div className="option-desc">View your items</div>
                    </Link>

                    {/* Orders (Future Feature) */}
                    <div className="dashboard-option" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                        <div className="option-icon">📦</div>
                        <div className="option-title">My Orders</div>
                        <div className="option-desc">Coming Soon</div>
                    </div>

                    {/* Logout Option */}
                    <div onClick={handleLogout} className="dashboard-option">
                        <div className="option-icon">🚪</div>
                        <div className="option-title">Log Out</div>
                        <div className="option-desc">Exit your account</div>
                    </div>
                </div>

                <button onClick={handleLogout} className="logout-btn">
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
