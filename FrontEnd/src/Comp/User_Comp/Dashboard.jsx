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
            <div className="dashboard-header">
                <h1 className="dashboard-title">Welcome, {user.name?.split(" ")[0]}!</h1>
                <p className="dashboard-subtitle">Your personal kite flying portal.</p>
            </div>

            <div className="dashboard-content">
                {/* Brand Story Section */}
                <section className="dashboard-about-section glass">
                    <h3>The Kiteasm Spirit</h3>
                    <p>At Kiteasm, we don't just sell kites; we sell the freedom of the sky. From premium stick kites to pro-grade manjha, every piece in our collection is crafted for balance, durability, and pro-level performance.</p>
                    <div className="dashboard-stats">
                        <div className="stat-pill">Premium Gear</div>
                        <div className="stat-pill">Pro Quality</div>
                        <div className="stat-pill">Fast Delivery</div>
                    </div>
                </section>

                <div className="dashboard-grid">
                    {/* Shop Products */}
                    <Link to="/products" className="dashboard-option card-hover">
                        <div className="option-icon">🪁</div>
                        <div className="option-title">Explore Store</div>
                        <div className="option-desc">Browser latest collection</div>
                    </Link>

                    {/* My Orders */}
                    <Link to="/orders" className="dashboard-option card-hover">
                        <div className="option-icon">📦</div>
                        <div className="option-title">My Orders</div>
                        <div className="option-desc">Track your flyers</div>
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className="dashboard-option card-hover">
                        <div className="option-icon">🛒</div>
                        <div className="option-title">View Cart</div>
                        <div className="option-desc">Ready to launch?</div>
                    </Link>

                    {/* Update Profile */}
                    <Link to="/user/update" className="dashboard-option card-hover">
                        <div className="option-icon">⚙️</div>
                        <div className="option-title">Settings</div>
                        <div className="option-desc">Manage your profile</div>
                    </Link>
                </div>

                {/* Featured Products Mini-Grid */}
                <section className="dashboard-featured-section mt-12">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold text-white">Latest Arrivals</h3>
                        <Link to="/products" className="text-red-500 hover:text-red-400 font-semibold text-sm">View All &rarr;</Link>
                    </div>
                    {/* Placeholder for real dynamic data or showing a few curated items */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="featured-item-mini glass group cursor-pointer" onClick={() => navigate('/products')}>
                            <div className="aspect-square rounded-xl bg-white/5 overflow-hidden mb-3">
                                <img src="/images/products/kite.jpg" alt="Featured" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="text-xs text-gray-400 font-medium">Pro Collection</h4>
                            <p className="text-sm text-white font-bold">Signature Fighter</p>
                        </div>
                        {/* More placeholders can go here or I can fetch them if I update the dashboard to use state */}
                    </div>
                </section>

                <div className="dashboard-actions">
                    <button onClick={handleLogout} className="logout-btn">
                        Securely Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
