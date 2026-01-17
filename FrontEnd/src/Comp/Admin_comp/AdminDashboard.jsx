import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Manage your store efficiently</p>
            </div>

            <div className="dashboard-grid">
                {/* ... existing cards ... */}
            </div>

            {/* Quick Inventory Summary */}
            <div className="admin-inventory-preview mt-20 max-w-[1200px] mx-auto">
                <div className="flex justify-between items-center mb-8 px-4">
                    <h2 className="text-2xl font-bold text-white">Inventory Overview</h2>
                    <Link to="/admin/all-products" className="text-red-500 hover:text-red-400 font-semibold text-sm">Manage All &rarr;</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="inventory-stat-card glass p-8 rounded-3xl text-center border border-white/10">
                        <span className="text-4xl block mb-4">🚀</span>
                        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Top Performing</h4>
                        <p className="text-2xl font-bold text-white mt-2">Signature Kite</p>
                    </div>
                    <div className="inventory-stat-card glass p-8 rounded-3xl text-center border border-white/10">
                        <span className="text-4xl block mb-4">⚠️</span>
                        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Low Stock</h4>
                        <p className="text-2xl font-bold text-red-500 mt-2">4 Items</p>
                    </div>
                    <div className="inventory-stat-card glass p-8 rounded-3xl text-center border border-white/10">
                        <span className="text-4xl block mb-4">⭐</span>
                        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Products</h4>
                        <p className="text-2xl font-bold text-white mt-2">24 SKUs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
