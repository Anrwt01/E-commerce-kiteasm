import React from 'react';
import { Link } from 'react-router-dom'; // Add this line
import { 
  CubeIcon, 
  ClipboardDocumentListIcon, 
  PlusIcon, 
  PresentationChartBarIcon, 
  SparklesIcon,
  ArrowUpRightIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
    const stats = [
        { label: 'Revenue', value: '₹1.2M', trend: '+14%', icon: PresentationChartBarIcon, color: '#0ea5e9' },
        { label: 'Active Orders', value: '48', trend: '8 new', icon: ClipboardDocumentListIcon, color: '#22c55e' },
        { label: 'Total SKUs', value: '24', trend: '2 low', icon: CubeIcon, color: '#6366f1' },
    ];

    // Consolidated all your routes into logical operational groups
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
        },
        // { 
        //     title: 'Manifest Details', 
        //     desc: 'Deep dive into specific order data', 
        //     icon: DocumentMagnifyingGlassIcon, 
        //     path: '/admin/OrderDetails', 
        //     tag: 'Data' 
        // },
    ];

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '120px 24px 80px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* --- HEADER SECTION --- */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', marginBottom: '12px' }}>
                            <ShieldCheckIcon style={{ width: '18px' }} />
                            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Secure Admin Access</span>
                        </div>
                        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-1.5px' }}>Command Center<span style={{ color: '#0ea5e9' }}>.</span></h1>
                        <p style={{ color: '#64748b', marginTop: '8px', fontSize: '15px' }}>Welcome back, Chief Controller. Systems are primed.</p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ padding: '12px 20px', borderRadius: '12px', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#475569' }}>
                            <Cog6ToothIcon style={{ width: '18px' }} />
                            System Prefs
                        </button>
                    </div>
                </div>

                {/* --- VITAL STATISTICS --- */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                    {stats.map((stat) => (
                        <div key={stat.label} style={{ background: 'white', padding: '28px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ padding: '10px', background: `${stat.color}10`, borderRadius: '12px' }}>
                                    <stat.icon style={{ width: '22px', color: stat.color }} />
                                </div>
                                <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: '800', background: '#f0fdf4', padding: '4px 10px', borderRadius: '8px', height: 'fit-content' }}>{stat.trend}</span>
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</span>
                            <p style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* --- OPERATIONAL GRID --- */}
                <h2 style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>Flight Operations</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {operations.map((op) => (
                        <Link 
                            key={op.title} 
                            to={op.path} 
                            style={{ textDecoration: 'none', background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.borderColor = '#0ea5e9';
                                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = '#f1f5f9';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ padding: '12px', background: '#0f172a', borderRadius: '14px' }}>
                                    <op.icon style={{ width: '20px', color: 'white' }} />
                                </div>
                                <span style={{ fontSize: '9px', fontWeight: '900', color: '#0ea5e9', background: '#e0f2fe', padding: '3px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>{op.tag}</span>
                            </div>
                            
                            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>{op.title}</h3>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5' }}>{op.desc}</p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0ea5e9', fontSize: '12px', fontWeight: '700' }}>
                                Access Module <ArrowUpRightIcon style={{ width: '14px' }} />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* --- SYSTEM LOGBOOK (Footer) --- */}
                <div style={{ 
                    marginTop: '60px', 
                    padding: '24px', 
                    background: 'white', 
                    borderRadius: '24px', 
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.1)' }} />
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Server Cluster Alpha: Stable</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Last Backup: Today, 14:20 PM</span>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;