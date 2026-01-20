import React from 'react';
import { Link } from 'react-router-dom';
import { CubeIcon, ClipboardDocumentListIcon, PlusIcon, PresentationChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
    const stats = [
        { label: 'Revenue', value: '₹1.2M', trend: '+14%', icon: PresentationChartBarIcon },
        { label: 'Active Orders', value: '48', trend: '8 new', icon: ClipboardDocumentListIcon },
        { label: 'Total SKUs', value: '24', trend: '2 low', icon: CubeIcon },
    ];

    const actions = [
        { title: 'Add Product', desc: 'Create new gear listing', icon: PlusIcon, path: '/admin/add-product' },
        { title: 'Manage All', desc: 'Edit or remove products', icon: CubeIcon, path: '/admin/all-products' },
        { title: 'Order Flow', desc: 'Process pending orders', icon: ClipboardDocumentListIcon, path: '/admin/orders' },
    ];

    return (
        <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
            <div style={{ marginBottom: '80px' }}>
                <span className="text-xs uppercase tracking-widest text-muted">System Admin</span>
                <h1 className="serif" style={{ fontSize: '48px', marginTop: '16px' }}>Command Center<span style={{ fontStyle: 'normal' }}>.</span></h1>
            </div>

            {/* Stats */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '80px' }}>
                {stats.map((stat) => (
                    <div key={stat.label} style={{ background: 'var(--gray-light)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
                        <stat.icon style={{ width: '24px', marginBottom: '40px', color: 'var(--accent)' }} />
                        <span className="text-xs text-muted uppercase tracking-widest" style={{ marginBottom: '8px' }}>{stat.label}</span>
                        <p style={{ fontSize: '32px', fontWeight: 900 }}>{stat.value}</p>
                        <span className="text-xs font-serif italic" style={{ marginTop: '10px', color: 'var(--accent)' }}>{stat.trend} from last month</span>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {actions.map((action) => (
                    <Link key={action.title} to={action.path} className="product-card" style={{ padding: '40px', border: '1px solid var(--gray-light)', textAlign: 'center' }}>
                        <action.icon style={{ width: '32px', margin: '0 auto 24px', color: 'black' }} />
                        <h3 className="text-xs uppercase" style={{ fontWeight: 900, marginBottom: '8px' }}>{action.title}</h3>
                        <p className="text-xs text-muted serif italic">{action.desc}</p>
                    </Link>
                ))}
            </div>

            <div style={{ marginTop: '100px', padding: '60px', background: 'var(--gray-light)', textAlign: 'center' }}>
                <SparklesIcon style={{ width: '32px', margin: '0 auto 20px', color: 'var(--accent-alt)' }} />
                <h2 className="serif" style={{ fontSize: '24px' }}>System Status: Operational</h2>
                <p className="text-xs text-muted" style={{ marginTop: '10px' }}>All flight services are running within normal parameters.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
