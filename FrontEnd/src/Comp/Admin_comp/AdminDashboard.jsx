import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from "../../utils/config.js";
import {
    CubeIcon,
    ClipboardDocumentListIcon,
    PlusIcon,
    PresentationChartBarIcon,
    ArrowUpRightIcon,
    Cog6ToothIcon,
    ShieldCheckIcon,
    DocumentArrowDownIcon, // New Icon
    CalendarDaysIcon       // New Icon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({
        revenue: 0,
        activeOrders: 0,
        totalSkus: 0,
        loading: true
    });

    // --- DATE RANGE STATE FOR EXCEL ---
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const fetchRealTimeData = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };

                const [ordersRes, productsRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/admin/orders`, { headers }),
                    axios.get(`${API_BASE_URL}/admin/products`, { headers })
                ]);

                // Extraction based on your log: ordersRes.data.data
                const allOrders = ordersRes.data.data || [];
                const allProducts = productsRes.data.data || productsRes.data.products || [];

                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

                // 🟢 Filter: Monthly Orders
                const monthlyOrders = allOrders.filter(order => {
                    const created = new Date(order.createdAt || order.date);
                    return !isNaN(created) && created >= startOfMonth && created <= endOfMonth;
                });

                // 💰 Calculate: Monthly Revenue
                const monthlyRevenue = monthlyOrders.reduce(
                    (sum, order) => sum + Number(order.totalAmount || 0), 0
                );

                // 🔄 Count: Processing
                const processingOrders = allOrders.filter(
                    order => order.orderStatus?.toLowerCase() === "processing"
                ).length;

                // 🌍 Calculate: Total Revenue
                const totalRevenue = allOrders.reduce(
                    (sum, order) => sum + Number(order.totalAmount || 0), 0
                );

                setMetrics({
                    revenue: totalRevenue,
                    activeOrders: processingOrders,
                    totalSkus: allProducts.length,
                    monthlyOrders: monthlyOrders.length,
                    monthlyRevenue,
                    loading: false
                });

            } catch (error) {
                console.error("Telemetry Sync Error:", error);
                setMetrics(prev => ({ ...prev, loading: false }));
            }
        };
        fetchRealTimeData();
    }, []);

    // --- DOWNLOAD HANDLER ---
    const handleDownloadExcel = async () => {
        const { startDate, endDate } = dateRange;
        if (!startDate || !endDate) {
            alert("Please select both Start and End dates for the report.");
            return;
        }

        // Construct the URL with query params
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/admin/download-orders`, {
            params: { startDate, endDate },
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob', // CRITICAL: Tells axios to handle binary data
        });
        // Trigger download
        // Create a hidden link and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        // Set the filename
        link.setAttribute('download', `Orders_Report_${startDate}_to_${endDate}.xlsx`);

        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    };
    const stats = [
        {
            label: "Total Revenue",
            value: `₹${(metrics.revenue ?? 0).toLocaleString()}`,
            trend: "All Time",
            icon: PresentationChartBarIcon,
            color: "#0ea5e9"
        },
        {
            label: "Orders This Month",
            value: metrics.monthlyOrders,
            trend: "Monthly",
            icon: CalendarDaysIcon,
            color: "#22c55e"
        },
        {
            label: "Monthly Revenue",
            value: `₹${(metrics.monthlyRevenue ?? 0).toLocaleString()}`,
            trend: "Profit",
            icon: ArrowUpRightIcon,
            color: "#10b981"
        },
        {
            label: "Processing Orders",
            value: metrics.activeOrders,
            trend: "Live",
            icon: ClipboardDocumentListIcon,
            color: "#f59e0b"
        },
        {
            label: "Total SKUs",
            value: metrics.totalSkus,
            trend: "Inventory",
            icon: CubeIcon,
            color: "#6366f1"
        }
    ];




    if (metrics.loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-base)' }}>
            <p style={{ fontWeight: '800', color: 'var(--slate-400)', letterSpacing: '2px', fontFamily: 'var(--font-sans)' }}>SYNCING COMMAND CENTER...</p>
        </div>
    );

    return (
        <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh', padding: '160px 24px 80px', fontFamily: 'var(--font-sans)' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                {/* --- HEADER --- */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '12px' }}>
                            <ShieldCheckIcon style={{ width: '18px' }} />
                            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Secure Admin Environment</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: '900', color: 'var(--slate-800)', margin: 0, letterSpacing: '-2px' }}>Command Center<span style={{ color: 'var(--accent)' }}>.</span></h1>
                    </div>
                </div>

                {/* --- VITAL STATISTICS --- */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {stats.map((stat) => (
                        <div key={stat.label} className="floating-card" style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '14px' }}>
                                    <stat.icon style={{ width: '22px', color: 'var(--accent)' }} />
                                </div>
                                <span style={{ color: 'var(--accent)', fontSize: '10px', fontWeight: '900', background: 'rgba(59, 130, 246, 0.1)', padding: '5px 12px', borderRadius: '50px', letterSpacing: '1px' }}>{stat.trend}</span>
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</span>
                            <p style={{ fontSize: '32px', fontWeight: '900', color: 'var(--slate-800)', margin: '8px 0', letterSpacing: '-1px' }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* --- DATA EXPORT TERMINAL (NEW SECTION) --- */}
                <div className="floating-card" style={{ padding: '40px', marginBottom: '60px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent)', marginBottom: '8px' }}>
                            <CalendarDaysIcon style={{ width: '24px' }} />
                            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: 'var(--slate-800)' }}>Logistics Data Export</h2>
                        </div>
                        <p style={{ color: 'var(--slate-600)', margin: 0, fontSize: '15px' }}>Generate encrypted Excel reports for specific flight periods.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '10px', fontWeight: '900', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '1px' }}>Start Date</label>
                            <input
                                type="date"
                                value={dateRange.startDate}
                                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                                style={{ background: 'var(--bg-base)', border: '1px solid var(--border-soft)', color: 'var(--slate-800)', padding: '12px 16px', borderRadius: '14px', outline: 'none', fontWeight: '600' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '10px', fontWeight: '900', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '1px' }}>End Date</label>
                            <input
                                type="date"
                                value={dateRange.endDate}
                                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                                style={{ background: 'var(--bg-base)', border: '1px solid var(--border-soft)', color: 'var(--slate-800)', padding: '12px 16px', borderRadius: '14px', outline: 'none', fontWeight: '600' }}
                            />
                        </div>
                        <button
                            onClick={handleDownloadExcel}
                            style={{
                                background: 'var(--accent)', color: 'white', border: 'none', padding: '14px 28px',
                                borderRadius: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex',
                                alignItems: 'center', gap: '10px', transition: 'all 0.4s',
                                boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            <DocumentArrowDownIcon style={{ width: '20px' }} />
                            Download .xlsx
                        </button>
                    </div>
                </div>

                {/* --- NAVIGATION GRID --- */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                    <Link to="/admin/products" className="floating-card" style={cardStyle}>
                        <div style={iconBoxStyle}><CubeIcon style={{ width: '24px' }} /></div>
                        <h3 style={titleStyle}>Inventory Fleet</h3>
                        <p style={descStyle}>Manage aircraft gear, update stock levels, and monitor SKU health.</p>
                        <div style={linkStyle}>Manage Fleet <ArrowUpRightIcon style={{ width: '16px' }} /></div>
                    </Link>

                    <Link to="/admin/add-product" className="floating-card" style={cardStyle}>
                        <div style={iconBoxStyle}><PlusIcon style={{ width: '24px' }} /></div>
                        <h3 style={titleStyle}>Deploy Listing</h3>
                        <p style={descStyle}>Launch new products into the global marketplace with high-precision details.</p>
                        <div style={linkStyle}>Start Deployment <ArrowUpRightIcon style={{ width: '16px' }} /></div>
                    </Link>

                    <Link to="/admin/orders" className="floating-card" style={cardStyle}>
                        <div style={iconBoxStyle}><ClipboardDocumentListIcon style={{ width: '24px' }} /></div>
                        <h3 style={titleStyle}>Order Logistics</h3>
                        <p style={descStyle}>Real-time monitoring of global order flow, shipping statuses, and fulfillment.</p>
                        <div style={linkStyle}>Open Logistics <ArrowUpRightIcon style={{ width: '16px' }} /></div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// --- STYLES ---
const cardStyle = {
    textDecoration: 'none',
    padding: '40px',
    borderRadius: 'var(--radius-xl)',
    display: 'block'
};

const iconBoxStyle = {
    padding: '16px',
    background: 'var(--slate-800)',
    borderRadius: '16px',
    width: 'fit-content',
    color: 'white',
    marginBottom: '32px'
};

const titleStyle = { fontSize: '22px', fontWeight: '800', color: 'var(--slate-800)', margin: '0 0 12px 0', letterSpacing: '-0.5px' };
const descStyle = { fontSize: '15px', color: 'var(--slate-600)', margin: '0 0 32px 0', lineHeight: '1.7' };
const linkStyle = { display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' };

export default AdminDashboard;