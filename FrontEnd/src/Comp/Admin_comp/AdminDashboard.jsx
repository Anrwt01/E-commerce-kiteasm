import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
                axios.get("http://localhost:5000/api/admin/orders", { headers }),
                axios.get("http://localhost:5000/api/admin/products", { headers })
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
    const handleDownloadExcel =async () => {
        const { startDate, endDate } = dateRange;
        if (!startDate || !endDate) {
            alert("Please select both Start and End dates for the report.");
            return;
        }
        
        // Construct the URL with query params
         const token = localStorage.getItem("token");
               const response = await axios.get("http://localhost:5000/api/admin/download-orders", {
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
    value: `₹${(metrics.monthlyRevenue??0 ).toLocaleString()}`,
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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
            <p style={{ fontWeight: '800', color: '#64748b', letterSpacing: '2px' }}>SYNCING COMMAND CENTER...</p>
        </div>
    );

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '120px 24px 80px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* --- HEADER --- */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', marginBottom: '12px' }}>
                            <ShieldCheckIcon style={{ width: '18px' }} />
                            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Secure Admin Access</span>
                        </div>
                        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-1.5px' }}>Command Center<span style={{ color: '#0ea5e9' }}>.</span></h1>
                    </div>
                </div>

                {/* --- VITAL STATISTICS --- */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                    {stats.map((stat) => (
                        <div key={stat.label} style={{ background: 'white', padding: '28px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ padding: '10px', background: `${stat.color}10`, borderRadius: '12px' }}>
                                    <stat.icon style={{ width: '22px', color: stat.color }} />
                                </div>
                                <span style={{ color: stat.color, fontSize: '11px', fontWeight: '800', background: `${stat.color}10`, padding: '4px 10px', borderRadius: '8px' }}>{stat.trend}</span>
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>{stat.label}</span>
                            <p style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* --- DATA EXPORT TERMINAL (NEW SECTION) --- */}
                <div style={{ background: '#0f172a', borderRadius: '32px', padding: '40px', marginBottom: '48px', color: 'white', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0ea5e9', marginBottom: '8px' }}>
                            <CalendarDaysIcon style={{ width: '24px' }} />
                            <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Logistics Data Export</h2>
                        </div>
                        <p style={{ color: '#94a3b8', margin: 0 }}>Generate encrypted Excel reports for specific flight periods.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Start Date</label>
                            <input 
                                type="date" 
                                value={dateRange.startDate}
                                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                                style={{ background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '10px', borderRadius: '10px', outline: 'none' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>End Date</label>
                            <input 
                                type="date" 
                                value={dateRange.endDate}
                                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                                style={{ background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '10px', borderRadius: '10px', outline: 'none' }}
                            />
                        </div>
                        <button 
                            onClick={handleDownloadExcel}
                            style={{ alignSelf: 'flex-end', background: '#0ea5e9', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s' }}
                            onMouseOver={(e) => e.target.style.opacity = '0.9'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                        >
                            <DocumentArrowDownIcon style={{ width: '20px' }} />
                            Download .xlsx
                        </button>
                    </div>
                </div>

                {/* --- NAVIGATION GRID --- */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                    <Link to="/admin/products" style={cardStyle}>
                        <div style={iconBoxStyle}><CubeIcon style={{ width: '24px' }} /></div>
                        <h3 style={titleStyle}>Inventory Fleet</h3>
                        <p style={descStyle}>Manage aircraft gear, update stock levels, and monitor SKU health.</p>
                        <div style={linkStyle}>Manage Fleet <ArrowUpRightIcon style={{ width: '16px' }} /></div>
                    </Link>

                    <Link to="/admin/add-product" style={cardStyle}>
                        <div style={iconBoxStyle}><PlusIcon style={{ width: '24px' }} /></div>
                        <h3 style={titleStyle}>Deploy Listing</h3>
                        <p style={descStyle}>Launch new products into the global marketplace with high-precision details.</p>
                        <div style={linkStyle}>Start Deployment <ArrowUpRightIcon style={{ width: '16px' }} /></div>
                    </Link>

                    <Link to="/admin/orders" style={cardStyle}>
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
    background: 'white',
    padding: '32px',
    borderRadius: '28px',
    border: '1px solid #f1f5f9',
    transition: 'all 0.3s ease',
    display: 'block'
};

const iconBoxStyle = {
    padding: '14px',
    background: '#0f172a',
    borderRadius: '16px',
    width: 'fit-content',
    color: 'white',
    marginBottom: '24px'
};

const titleStyle = { fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' };
const descStyle = { fontSize: '14px', color: '#64748b', margin: '0 0 24px 0', lineHeight: '1.6' };
const linkStyle = { display: 'flex', alignItems: 'center', gap: '6px', color: '#0ea5e9', fontSize: '13px', fontWeight: '800' };

export default AdminDashboard;