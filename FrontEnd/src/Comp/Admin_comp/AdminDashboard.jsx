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
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
    // --- REAL-TIME DATA STATE ---
    const [metrics, setMetrics] = useState({
        revenue: 0,
        activeOrders: 0,
        totalSkus: 0,
        loading: true
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

                // --- SAFE DATA EXTRACTION ---
                // This checks if data is in .orders or .products, otherwise defaults to an empty array
                const allOrders = Array.isArray(ordersRes.data) 
                    ? ordersRes.data 
                    : (ordersRes.data.orders || []);
                
                const allProducts = Array.isArray(productsRes.data) 
                    ? productsRes.data 
                    : (productsRes.data.products || []);

                // Now .reduce and .filter will work because allOrders is definitely an array
                const totalRevenue = allOrders.reduce((acc, order) => acc + (Number(order.totalAmount) || 0), 0);
                
                const activeCount = allOrders.filter(o => 
                    o.orderStatus === 'processing' || o.orderStatus === 'shipped'
                ).length;

                setMetrics({
                    revenue: totalRevenue,
                    activeOrders: activeCount,
                    totalSkus: allProducts.length,
                    loading: false
                });
            } catch (error) {
                console.error("Telemetry Sync Error:", error);
                setMetrics(prev => ({ ...prev, loading: false }));
            }
        };

        fetchRealTimeData();
    }, []);

    // Updated stats using the dynamic state
    const stats = [
        { label: 'Revenue', value: `₹${metrics.revenue.toLocaleString()}`, trend: 'Live', icon: PresentationChartBarIcon, color: '#0ea5e9' },
        { label: 'Active Orders', value: metrics.activeOrders, trend: 'In-Flight', icon: ClipboardDocumentListIcon, color: '#22c55e' },
        { label: 'Total SKUs', value: metrics.totalSkus, trend: 'Global', icon: CubeIcon, color: '#6366f1' },
    ];

    // Your requested three operational options
    const operations = [
        { 
            title: 'Inventory Fleet', 
            desc: 'View and manage all aircraft gear', 
            icon: CubeIcon, 
            path: '/admin/products', 
            tag: 'Management' 
        },
        { 
            title: 'Deploy Product', 
            desc: 'Launch new equipment listings', 
            icon: PlusIcon, 
            path: '/admin/add-product', 
            tag: 'Operations' 
        },
        { 
            title: 'Order Logistics', 
            desc: 'Monitor and process global orders', 
            icon: ClipboardDocumentListIcon, 
            path: '/admin/orders', 
            tag: 'Real-time' 
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
                        <p style={{ color: '#64748b', marginTop: '8px', fontSize: '15px' }}>Welcome back, Chief Controller. Systems are live.</p>
                    </div>
                    
                    <button style={{ padding: '12px 20px', borderRadius: '12px', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#475569' }}>
                        <Cog6ToothIcon style={{ width: '18px' }} />
                        System Prefs
                    </button>
                </div>

                {/* --- VITAL STATISTICS (Live Data) --- */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                    {stats.map((stat) => (
                        <div key={stat.label} style={{ background: 'white', padding: '28px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
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

                {/* --- OPERATIONAL GRID (Your 3 Options) --- */}
                <h2 style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>Flight Operations</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {operations.map((op) => (
                        <Link 
                            key={op.title} 
                            to={op.path} 
                            style={{ textDecoration: 'none', background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', transition: 'all 0.3s ease' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.borderColor = '#0ea5e9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = '#f1f5f9';
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ padding: '12px', background: '#0f172a', borderRadius: '14px' }}>
                                    <op.icon style={{ width: '20px', color: 'white' }} />
                                </div>
                                <span style={{ fontSize: '9px', fontWeight: '900', color: '#0ea5e9', background: '#e0f2fe', padding: '3px 8px', borderRadius: '6px' }}>{op.tag}</span>
                            </div>
                            
                            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>{op.title}</h3>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5' }}>{op.desc}</p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0ea5e9', fontSize: '12px', fontWeight: '700' }}>
                                Access Module <ArrowUpRightIcon style={{ width: '14px' }} />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* --- FOOTER STATUS --- */}
                <div style={{ marginTop: '60px', padding: '24px', background: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%' }} />
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Telemetry Link: Active</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>All systems operational</span>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;