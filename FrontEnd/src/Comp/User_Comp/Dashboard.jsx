import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productImages } from "../../utils/productImages";
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
        } catch (error) {
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    if (loading || !user) return null;

    const owners = [
        {
            name: "Rahul Sharma",
            role: "CHIEF PILOT",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            handle: "@rahul_aero"
        },
        {
            name: "Vikram Mehra",
            role: "AERO ENGINEER",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            handle: "@vikram_tech"
        }
    ];

    return (
        <div className="dash-container">
            {/* Animated Background */}
            <div className="kiteasm-bg-overlay"></div>

            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-inner">
                    <div className="logo-brand">KITEASM<span>.</span></div>
                    <div className="nav-actions">
                        <div className="user-badge">
                            <div className="online-indicator"></div>
                            {user.email}
                        </div>
                        <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="power-btn">
                            <PowerIcon style={{ width: '18px' }} />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="main-content">
                <header className="hero-section">
                    <div className="status-label">SYSTEM_STATUS: ACTIVE</div>
                    <h1 className="hero-title">Welcome Back, {user.name?.split(" ")[0]}</h1>
                    <p className="hero-tagline">Your flight systems are configured and ready for deployment.</p>
                </header>

                {/* Quick Actions - Bento Grid */}
                <div className="bento-grid">
                    {[
                        { title: 'COLLECTIONS', path: '/products', icon: ShoppingBagIcon, desc: 'View Inventory' },
                        { title: 'MANIFEST', path: '/orders', icon: CubeIcon, desc: 'Track Orders' },
                        { title: 'CARGO', path: '/cart', icon: SparklesIcon, desc: 'Active Cart' },
                        { title: 'TERMINAL', path: '/user/update', icon: Cog6ToothIcon, desc: 'Adjust Params' },
                    ].map((item) => (
                        <Link key={item.title} to={item.path} className="bento-card">
                            <div className="bento-icon-box">
                                <item.icon style={{ width: '22px' }} />
                            </div>
                            <div className="bento-text">
                                <span className="bento-title">{item.title}</span>
                                <span className="bento-desc">{item.desc}</span>
                            </div>
                            <ChevronRightIcon className="bento-arrow" style={{ width: '14px' }} />
                        </Link>
                    ))}
                </div>

                {/* Arrivals Section */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">New Arrivals</h2>
                        <Link to="/products" className="view-link">EXP_ALL <ChevronRightIcon style={{ width: '12px' }} /></Link>
                    </div>
                    <div className="product-row">
                        {featuredProducts.map((p) => (
                            <Link key={p._id} to={`/products/${p._id}`} className="modern-p-card">
                                <div className="p-img-box">
                                    <img src={productImages[p.images?.[0]?.url]} alt={p.name} />
                                    <div className="p-overlay">VIEW_DETAILS</div>
                                </div>
                                <div className="p-meta">
                                    <h4>{p.name}</h4>
                                    <p>₹{p.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Founders Command Section */}
                <section className="command-center">
                    <div className="command-header">
                        <span className="accent-bar"></span>
                        <h3>Command Center</h3>
                    </div>
                    <div className="founders-flex">
                        {owners.map((owner) => (
                            <div key={owner.name} className="commander-card">
                                <img src={owner.image} alt={owner.name} className="commander-img" />
                                <div className="commander-details">
                                    <span className="commander-role">{owner.role}</span>
                                    <h4>{owner.name}</h4>
                                    <div className="commander-socials">
                                        <a href="#">YT</a>
                                        <a href="#">IG</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <style>{`
                @keyframes scrollBg {
                    0% { background-position: 0 0; }
                    100% { background-position: 500px 1000px; }
                }

                :root {
                    --obsidian: #000000;
                    --glass: rgba(255, 255, 255, 0.03);
                    --glass-border: rgba(255, 255, 255, 0.08);
                    --accent-blue: #0ea5e9;
                    --text-primary: #ffffff;
                    --text-secondary: #888888;
                }

                .dash-container {
                    background-color: var(--obsidian);
                    min-height: 100vh;
                    color: var(--text-primary);
                    font-family: 'Inter', system-ui, sans-serif;
                    position: relative;
                }

                .kiteasm-bg-overlay {
                    position: fixed;
                    inset: 0;
                    background-image: url('/path-to-your-kiteasm-image.jpg');
                    background-size: 350px;
                    opacity: 0.04;
                    z-index: 0;
                    animation: scrollBg 80s linear infinite;
                    pointer-events: none;
                }

                .top-nav {
                    position: fixed; top: 0; width: 100%; height: 70px;
                    background: rgba(0,0,0,0.8);
                    backdrop-filter: blur(15px); z-index: 100;
                    border-bottom: 1px solid var(--glass-border);
                }

                .nav-inner {
                    max-width: 1200px; margin: 0 auto; height: 100%;
                    display: flex; align-items: center; justify-content: space-between; padding: 0 24px;
                }

                .logo-brand { font-weight: 900; font-size: 18px; letter-spacing: 2px; }
                .logo-brand span { color: var(--accent-blue); }

                .nav-actions { display: flex; align-items: center; gap: 20px; }
                .user-badge { 
                    font-size: 11px; color: var(--text-secondary); letter-spacing: 1px;
                    display: flex; align-items: center; gap: 8px;
                    background: var(--glass); padding: 8px 14px; border-radius: 4px;
                }
                .online-indicator { width: 6px; height: 6px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; }

                .power-btn { 
                    background: transparent; border: 1px solid #333; color: white;
                    padding: 8px; cursor: pointer; border-radius: 4px; transition: 0.3s;
                }
                .power-btn:hover { border-color: #ff4444; color: #ff4444; }

                .main-content { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 130px 24px 100px; }

                .status-label { font-size: 10px; font-weight: 800; letter-spacing: 3px; color: var(--accent-blue); margin-bottom: 15px; }
                .hero-title { font-size: 48px; font-weight: 900; letter-spacing: -2px; margin: 0; }
                .hero-tagline { color: var(--text-secondary); margin-top: 10px; font-size: 16px; font-weight: 300; }

                /* Bento Grid */
                .bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 50px 0; }
                .bento-card {
                    background: var(--glass); border: 1px solid var(--glass-border);
                    padding: 24px; display: flex; align-items: center; gap: 15px;
                    text-decoration: none; color: white; transition: 0.3s cubic-bezier(0.23, 1, 0.32, 1);
                    position: relative;
                }
                .bento-card:hover { background: rgba(255,255,255,0.06); border-color: white; transform: translateY(-3px); }
                .bento-icon-box { color: var(--accent-blue); }
                .bento-title { display: block; font-size: 12px; font-weight: 900; letter-spacing: 1px; }
                .bento-desc { display: block; font-size: 10px; color: var(--text-secondary); margin-top: 2px; }
                .bento-arrow { position: absolute; right: 15px; opacity: 0.2; }

                /* Products */
                .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; border-left: 3px solid white; padding-left: 15px; }
                .section-title { font-size: 20px; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
                .view-link { color: var(--text-secondary); font-size: 11px; text-decoration: none; font-weight: 800; display: flex; align-items: center; gap: 5px; }
                .view-link:hover { color: white; }

                .product-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
                .modern-p-card { text-decoration: none; color: white; transition: 0.4s; }
                .p-img-box { 
                    height: 200px; background: #111; position: relative; overflow: hidden;
                    border: 1px solid var(--glass-border);
                }
                .p-img-box img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
                .p-overlay { 
                    position: absolute; inset: 0; background: rgba(14, 165, 233, 0.9);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 10px; font-weight: 900; opacity: 0; transition: 0.3s;
                }
                .modern-p-card:hover .p-overlay { opacity: 1; }
                .modern-p-card:hover .p-img-box img { transform: scale(1.1); }
                .p-meta { padding: 15px 0; }
                .p-meta h4 { margin: 0; font-size: 14px; font-weight: 600; }
                .p-meta p { color: var(--accent-blue); font-weight: 800; margin-top: 5px; font-size: 13px; }

                /* Founders */
                .command-center { margin-top: 80px; padding: 40px; border: 1px solid var(--glass-border); background: linear-gradient(to right, #050505, #000); }
                .command-header { display: flex; align-items: center; gap: 15px; margin-bottom: 35px; }
                .accent-bar { width: 40px; height: 2px; background: var(--accent-blue); }
                .command-header h3 { font-size: 14px; letter-spacing: 4px; text-transform: uppercase; margin: 0; }

                .founders-flex { display: flex; gap: 50px; }
                .commander-card { display: flex; align-items: center; gap: 20px; }
                .commander-img { width: 70px; height: 70px; border-radius: 2px; filter: grayscale(1); transition: 0.3s; }
                .commander-card:hover .commander-img { filter: grayscale(0); transform: rotate(-3deg); }
                .commander-role { font-size: 9px; color: var(--accent-blue); letter-spacing: 2px; font-weight: 800; }
                .commander-details h4 { margin: 5px 0; font-size: 18px; }
                .commander-socials { display: flex; gap: 12px; margin-top: 8px; }
                .commander-socials a { font-size: 10px; color: var(--text-secondary); text-decoration: none; font-weight: 800; }
                .commander-socials a:hover { color: white; }

                @media (max-width: 900px) {
                    .bento-grid { grid-template-columns: repeat(2, 1fr); }
                    .product-row { grid-template-columns: repeat(2, 1fr); }
                    .founders-flex { flex-direction: column; gap: 30px; }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;