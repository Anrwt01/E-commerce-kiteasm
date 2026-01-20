import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
    ShoppingBagIcon, SparklesIcon, Cog6ToothIcon, 
    CubeIcon, ChevronRightIcon, PowerIcon 
} from "@heroicons/react/24/outline";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const fetchQuickProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/user/products');
            setFeaturedProducts(res.data.products?.slice(0, 4) || []);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUserData = localStorage.getItem("user");

        if (!token || !storedUserData) {
            navigate("/login");
            return;
        }

        try {
            const parsedUser = JSON.parse(storedUserData);
            setUser(parsedUser);
            fetchQuickProducts();
            setLoading(false);
        } catch (err) {
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    const getImageUrl = (images) => {
        if (!images || images.length === 0) return 'https://images.unsplash.com/photo-1552010757-51d8bebb6a9c?w=500';
        const url = images[0].url;
        return url.startsWith('http') ? url : `http://localhost:5000${url}`;
    };

    if (loading || !user) return null;

    const owners = [
        {
            name: "Rahul Sharma",
            role: "Chief Pilot",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            handle: "@rahul_aero"
        },
        {
            name: "Vikram Mehra",
            role: "Aero Engineer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            handle: "@vikram_tech"
        }
    ];

    return (
        <div className="dash-container">
            {/* Top Navigation Bar */}
            <nav className="top-nav">
                <div className="nav-inner">
                    <div className="logo"><span>.</span></div>
                    <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="power-btn">
                        <PowerIcon style={{ width: '20px' }} />
                    </button>
                </div>
            </nav>

            <div className="main-content">
                <header className="hero-header">
                    <div className="status-pill">
                        <span className="status-dot"></span>
                        LIVE FLIGHT DECK
                    </div>
                    <h1 className="hero-title">Welcome, {user.name?.split(" ")[0]}</h1>
                    <p className="hero-subtitle">All systems are operational. Ready for departure.</p>
                </header>

                {/* Quick Actions Grid */}
                <div className="modern-grid">
                    {[
                        { title: 'Hangar', path: '/products', icon: ShoppingBagIcon, color: '#0ea5e9' },
                        { title: 'Logbook', path: '/orders', icon: CubeIcon, color: '#6366f1' },
                        { title: 'Inventory', path: '/cart', icon: SparklesIcon, color: '#ec4899' },
                        { title: 'Settings', path: '/user/update', icon: Cog6ToothIcon, color: '#64748b' },
                    ].map((item) => (
                        <Link key={item.title} to={item.path} className="action-card">
                            <div className="icon-wrapper" style={{ color: item.color }}>
                                <item.icon style={{ width: '24px' }} />
                            </div>
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>

                {/* Featured Products */}
                <section className="section-spacing">
                    <div className="flex-header">
                        <h2>New Arrivals</h2>
                        <Link to="/products" className="view-all">Explore All <ChevronRightIcon style={{ width: '12px' }} /></Link>
                    </div>
                    <div className="product-grid">
                        {featuredProducts.map((p) => (
                            <Link key={p._id} to={`/products/${p._id}`} className="product-card">
                                <div className="img-holder">
                                    <img src={getImageUrl(p.images)} alt={p.name} />
                                </div>
                                <div className="info-holder">
                                    <h4>{p.name}</h4>
                                    <p>₹{p.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* --- MODERN FOUNDERS LOUNGE --- */}
                <section className="founders-lounge">
                    <div className="lounge-header">
                        <p className="overline">The Founding Team</p>
                        <h3>Command Center</h3>
                    </div>
                    
                    <div className="founders-grid">
                        {owners.map((owner) => (
                            <div key={owner.name} className="founder-card">
                                <img src={owner.image} alt={owner.name} className="founder-img" />
                                <div className="founder-info">
                                    <h4>{owner.name}</h4>
                                    <p>{owner.role}</p>
                                    <div className="social-row">
                                        <a href="#" className="soc-btn">YouTube</a>
                                        <a href="#" className="soc-btn">Instagram</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

                :root {
                    --white: #ffffff;
                    --bg-soft: #f8fafc;
                    --text-main: #0f172a;
                    --text-muted: #64748b;
                    --accent: #0ea5e9;
                    --border: #e2e8f0;
                }

                .dash-container { 
                    background: var(--bg-soft); 
                    min-height: 100vh; 
                    color: var(--text-main); 
                    font-family: 'Plus Jakarta Sans', sans-serif; 
                }
                
                .top-nav { 
                    position: fixed; top: 0; width: 100%; height: 80px; 
                    background: rgba(255, 255, 255, 0.8); 
                    backdrop-filter: blur(20px); z-index: 100; 
                    border-bottom: 1px solid var(--border); 
                }
                .nav-inner { 
                    max-width: 1100px; margin: 0 auto; height: 100%; 
                    display: flex; align-items: center; justify-content: space-between; padding: 0 24px; 
                }
                .logo { font-weight: 800; font-size: 22px; letter-spacing: -0.5px; }
                .logo span { color: var(--accent); }
                .power-btn { 
                    background: #f1f5f9; border: none; padding: 10px; 
                    border-radius: 12px; color: var(--text-muted); 
                    cursor: pointer; transition: 0.2s; 
                }
                .power-btn:hover { background: #fee2e2; color: #ef4444; }

                .main-content { max-width: 1000px; margin: 0 auto; padding: 140px 24px 100px; }
                
                .status-pill { 
                    display: inline-flex; align-items: center; gap: 8px; 
                    background: white; padding: 6px 12px; border-radius: 100px; 
                    font-size: 10px; font-weight: 800; color: var(--text-muted);
                    box-shadow: 0 2px 10px rgba(0,0,0,0.02); margin-bottom: 16px;
                }
                .status-dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; }
                .hero-title { font-size: 42px; font-weight: 800; letter-spacing: -1.5px; margin: 0; }
                .hero-subtitle { color: var(--text-muted); font-size: 16px; margin-top: 8px; }

                .modern-grid { 
                    display: grid; grid-template-columns: repeat(4, 1fr); 
                    gap: 16px; margin: 48px 0; 
                }
                .action-card { 
                    background: white; padding: 32px 16px; border-radius: 24px; 
                    text-decoration: none; color: var(--text-main); 
                    border: 1px solid var(--border); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex; flex-direction: column; align-items: center; gap: 12px;
                }
                .action-card:hover { transform: translateY(-5px); border-color: var(--accent); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); }
                .icon-wrapper { padding: 12px; background: #f8fafc; border-radius: 16px; }
                .action-card span { font-size: 13px; font-weight: 700; }

                .flex-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
                .flex-header h2 { font-size: 22px; font-weight: 800; }
                .view-all { color: var(--accent); font-size: 14px; text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 4px; }

                .product-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .product-card { background: white; border-radius: 28px; overflow: hidden; text-decoration: none; color: inherit; border: 1px solid var(--border); }
                .img-holder { height: 240px; background: #f1f5f9; }
                .img-holder img { width: 100%; height: 100%; object-fit: cover; }
                .info-holder { padding: 20px; }
                .info-holder h4 { font-size: 16px; margin: 0; }
                .info-holder p { color: var(--accent); font-weight: 800; margin-top: 6px; }

                .founders-lounge { margin-top: 80px; padding: 60px 40px; background: white; border-radius: 40px; border: 1px solid var(--border); }
                .lounge-header { text-align: center; margin-bottom: 48px; }
                .overline { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); font-weight: 800; }
                .lounge-header h3 { font-size: 28px; font-weight: 800; margin-top: 8px; }

                .founders-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .founder-card { display: flex; gap: 20px; align-items: center; }
                .founder-img { width: 90px; height: 90px; border-radius: 24px; object-fit: cover; }
                .founder-info h4 { margin: 0; font-size: 18px; font-weight: 800; }
                .founder-info p { color: var(--text-muted); font-size: 14px; margin: 4px 0 12px; }
                .social-row { display: flex; gap: 8px; }
                .soc-btn { 
                    padding: 6px 12px; background: #f1f5f9; color: var(--text-main); 
                    border-radius: 8px; text-decoration: none; font-size: 11px; font-weight: 700; 
                }
                .soc-btn:hover { background: var(--text-main); color: white; }

                @media (max-width: 768px) {
                    .modern-grid { grid-template-columns: repeat(2, 1fr); }
                    .product-grid { grid-template-columns: 1fr; }
                    .founders-grid { grid-template-columns: 1fr; }
                    .hero-title { font-size: 32px; }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;