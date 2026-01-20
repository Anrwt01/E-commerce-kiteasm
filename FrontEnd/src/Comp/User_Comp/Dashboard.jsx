import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagIcon, SparklesIcon, Cog6ToothIcon, CubeIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token) {
            navigate("/login");
        } else if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return null;

    const sections = [
        { title: 'Explore Store', desc: 'Latest drops & gear', icon: ShoppingBagIcon, path: '/products' },
        { title: 'My Orders', desc: 'Track your deliveries', icon: CubeIcon, path: '/orders' },
        { title: 'Expedition Bag', desc: 'Ready for flight', icon: SparklesIcon, path: '/cart' },
        { title: 'Settings', desc: 'Profile & coordinates', icon: Cog6ToothIcon, path: '/user/update' },
    ];

    return (
        <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
            <div style={{ marginBottom: '80px' }}>
                <span className="text-xs uppercase tracking-widest text-muted">Member Hub</span>
                <h1 className="serif" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginTop: '16px' }}>
                    Hello, {user.name?.split(" ")[0].toUpperCase()}<span style={{ fontStyle: 'normal' }}>.</span>
                </h1>
                <p className="text-muted serif italic" style={{ fontSize: '18px', marginTop: '10px' }}>Manage your fleet and exclusive member benefits.</p>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {sections.map((section) => (
                    <Link
                        key={section.title}
                        to={section.path}
                        className="product-card"
                        style={{ background: 'var(--gray-light)', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transition: 'background 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#eeeeee'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--gray-light)'}
                    >
                        <section.icon style={{ width: '32px', marginBottom: '40px', color: 'black' }} />
                        <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', trackingWidest: '0.1em', marginBottom: '10px' }}>{section.title}</h3>
                        <p className="text-xs text-muted font-serif italic">{section.desc}</p>
                    </Link>
                ))}
            </div>

            <div style={{ marginTop: '100px', padding: '60px', background: 'var(--black)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '30px' }}>
                <SparklesIcon style={{ width: '32px', color: 'var(--accent)' }} />
                <h2 className="serif" style={{ fontSize: '32px' }}>Member Status: Premium</h2>
                <p style={{ maxWidth: '600px', fontSize: '14px', opacity: 0.7, lineHeight: 1.6 }}>
                    As an Aero Kite member, you have early access to the Summer '26 Apex Series and exclusive invitations to pro-flyer clinics.
                </p>
                <button className="btn" style={{ background: 'white', color: 'black' }}>View Perks</button>
            </div>

            <div style={{ marginTop: '60px', textAlign: 'center' }}>
                <button
                    onClick={handleLogout}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--gray-mid)', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, trackingWidest: '0.2em' }}
                >
                    <ArrowRightOnRectangleIcon style={{ width: '16px' }} />
                    Securely Sign Out
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
