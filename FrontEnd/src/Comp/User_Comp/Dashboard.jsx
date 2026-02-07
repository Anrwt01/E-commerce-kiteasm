import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { productImages } from "../../utils/productImages";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import {
    ShoppingBagIcon, SparklesIcon, Cog6ToothIcon,
    CubeIcon, ChevronRightIcon, PowerIcon
} from "@heroicons/react/24/outline";
import { Heart } from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    const token = localStorage.getItem("token");

    const fetchQuickProducts = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/user/products`);
            setFeaturedProducts(res.data.products || []);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const fetchWishlist = async () => {
        if (!token) return;
        try {
            const res = await axios.get(`${API_BASE_URL}/my-wishlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlistItems(res.data.products?.map(p => p._id) || []);
        } catch (error) {
            console.error("Wishlist fetch failed:", error);
        }
    };

    const toggleWishlist = async (productId) => {
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const res = await axios.post(
                `${API_BASE_URL}/toggle-wishlist`,
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.status === 200 || res.status === 201) {
                setWishlistItems(prev =>
                    prev.includes(productId)
                        ? prev.filter(id => id !== productId)
                        : [...prev, productId]
                );
            }
        } catch (error) {
            console.error("Wishlist toggle failed:", error);
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
            fetchWishlist();
            setLoading(false);
        } catch (error) {
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    if (loading || !user) return null;

    const owners = [
        {
            name: "Udit Sanwal",
            role: "FOUNDER & CEO",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh", // Placeholder avatar
            instagram: "https://www.instagram.com/_notrio_/",
            youtube: "https://www.youtube.com/@RioTheExplorer"
        },
        {
            name: "Shubham Joshi",
            role: "Manager & Marketing",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", // Placeholder avatar
            instagram: "#",
            youtube: "https://www.youtube.com/@RioTheExplorer"
        },
        {
            name: "Anuj Rawat",
            role: "Lead Developer",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack", // Placeholder avatar
            instagram: "https://www.instagram.com/anujjrawtt",
            youtube: "https://www.youtube.com/@RioTheExplorer"
        },

    ];
    return (
        <div className="dash-container">
            {/* Soft Grid Background */}
            {/* <div className="grid-bg"></div> */}

            {/* Premium Top Navigation */}
            <nav className="top-nav">
                <div className="nav-inner">
                    <div className="logo-brand">Kiteasm<span style={{ color: 'var(--accent)' }}>.</span></div>
                    <div className="nav-actions">
                        <div className="user-badge">
                            <span className="online-dot"></span>
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
                    <h1 className="hero-title">Welcome Back, {user.name?.split(" ")[0]}<span style={{ color: 'var(--accent)' }}>.</span></h1>
                </header>

                <div className="bento-grid">
                    {[
                        { title: 'Products', path: '/products', icon: ShoppingBagIcon, desc: 'View Inventory' },
                        { title: 'Orders', path: '/orders', icon: CubeIcon, desc: 'Track Orders' },
                        { title: 'Cart', path: '/cart', icon: SparklesIcon, desc: 'Active Cart' },
                        { title: 'Profile', path: '/user/update', icon: Cog6ToothIcon, desc: 'Adjust Profile' },
                    ].map((item) => (
                        <Link key={item.title} to={item.path} className="bento-card">
                            <div className="bento-icon-box">
                                <item.icon style={{ width: '22px', color: 'var(--accent)' }} strokeWidth={2} />
                            </div>
                            <div className="bento-text">
                                <span className="bento-title">{item.title}</span>
                                <span className="bento-desc">{item.desc}</span>
                            </div>
                            <ChevronRightIcon className="bento-arrow" style={{ width: '14px', color: 'var(--slate-400)' }} />
                        </Link>
                    ))}
                </div>

                <section className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">New Arrivals</h2>
                        <Link to="/products" className="view-link">DISCOVER ALL</Link>
                    </div>

                    <div className="product-row">
                        {featuredProducts
                            .filter(p => p.isExclusive === true)
                            .slice(0, 4)
                            .map((p) => (
                                <Link key={p._id} to={`/products/${p._id}`} className="modern-p-card floating-card">
                                    <div className="p-img-box">
                                        <button
                                            className="dash-wishlist-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleWishlist(p._id);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                background: 'rgba(255,255,255,0.7)',
                                                backdropFilter: 'blur(8px)',
                                                border: '1px solid rgba(0,0,0,0.05)',
                                                borderRadius: '50%',
                                                width: '32px',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                zIndex: 10,
                                                color: wishlistItems.includes(p._id) ? 'var(--accent)' : 'var(--slate-400)',
                                                transition: '0.3s'
                                            }}
                                        >
                                            <Heart size={16} fill={wishlistItems.includes(p._id) ? "var(--accent)" : "none"} />
                                        </button>
                                        <img src={p.mainImage} alt={p.name} />
                                        <div className="p-overlay">VIEW PRODUCT</div>
                                    </div>

                                    <div className="p-meta">
                                        <h4>{p.name}</h4>
                                        <p>₹{p.price.toLocaleString()}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </section>

                <section className="command-center">
                    <div className="command-header">
                        <span className="line"></span>
                        <h3>THE LEADERSHIP</h3>
                        <span className="line"></span>
                    </div>

                    <div className="founders-grid">
                        {owners.map((owner) => (
                            <div key={owner.name} className="founder-card floating-card">
                                <div className="founder-img-wrapper">
                                    <img src={owner.image} alt={owner.name} className="founder-img" />
                                </div>

                                <div className="founder-info">
                                    <h4 className="founder-name">{owner.name}</h4>
                                    <span className="founder-role">{owner.role}</span>

                                    <div className="founder-socials">
                                        <a href={owner.instagram} aria-label="Instagram">
                                            <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44-1.44-.645-1.44-1.44.645-1.44 1.44-1.44z" /></svg>
                                        </a>
                                        <a href={owner.youtube} aria-label="YouTube">
                                            <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <style>{`
                :root {
                    --bg-main: var(--bg-base);
                    --text-black: var(--slate-800);
                    --text-muted: var(--slate-600);
                    --accent-color: var(--accent);
                }

                .dash-container {
                    background-color: var(--bg-main);
                    min-height: 100vh;
                    color: var(--text-black);
                    font-family: var(--font-sans);
                    position: relative;
                }

                .top-nav {
                    position: fixed; top: 0; width: 100%; height: 80px;
                    background: rgba(255,255,255,0.7);
                    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                    z-index: 100;
                    border-bottom: 1px solid var(--border-soft);
                }

                .nav-inner {
                    max-width: 1400px; margin: 0 auto; height: 100%;
                    display: flex; align-items: center; justify-content: space-between; padding: 0 40px;
                }

                .logo-brand { font-weight: 900; font-size: 20px; letter-spacing: -1px; text-transform: uppercase; }

                .nav-actions { display: flex; align-items: center; gap: 24px; }
                .user-badge { 
                    font-size: 11px; color: var(--text-black); font-weight: 800;
                    display: flex; align-items: center; gap: 10px;
                    background: var(--bg-card); padding: 8px 18px; border-radius: 100px;
                    border: 1px solid var(--border-soft); box-shadow: var(--shadow-sm);
                    text-transform: uppercase; letter-spacing: 0.5px;
                }
                .online-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; }

                .power-btn { 
                    background: var(--text-black); border: none; color: white;
                    padding: 10px; cursor: pointer; border-radius: 50%; transition: 0.3s;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .power-btn:hover { transform: scale(1.1); background: #ef4444; }

                .main-content { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; padding: 160px 40px 100px; }

                .hero-title { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 500; letter-spacing: -2.5px; margin: 0; color: var(--text-black); }

                /* Bento Cards */
                .bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin: 60px 0; }
                
                .bento-card {
                    background: rgba(255, 255, 255, 0.4);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 32px;
                    border-radius: 24px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                    position: relative;
                    overflow: hidden;
                }

                .bento-card:hover {
                    background: rgba(255, 255, 255, 0.7);
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                    border-color: var(--accent-color);
                }
                
                .bento-icon-box { 
                    width: 56px; height: 56px; background: white; 
                    border-radius: 18px; display: flex; align-items: center; justify-content: center;
                    transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.03);
                    flex-shrink: 0;
                }
                .bento-card:hover .bento-icon-box { 
                    background: var(--accent-color); 
                    transform: scale(1.1) rotate(-5deg);
                    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.3);
                }
                .bento-card:hover .bento-icon-box svg { color: white !important; }
                
                .bento-text { display: flex; flex-direction: column; gap: 4px; }
                .bento-title { font-size: 15px; font-weight: 800; letter-spacing: -0.5px; color: var(--text-black); }
                .bento-desc { font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }

                .bento-arrow {
                    position: absolute;
                    right: 24px;
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .bento-card:hover .bento-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                /* Product Cards */
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
                .section-title { font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -1px; }
                .view-link { color: var(--accent-color); font-size: 12px; text-decoration: none; font-weight: 800; letter-spacing: 1px; }

                .product-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
                .modern-p-card { text-decoration: none; color: var(--text-black); padding: 12px; }
                .p-img-box { 
                    aspect-ratio: 1/1; background: #F1F5F9; position: relative; overflow: hidden;
                    border-radius: 18px; transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .p-img-box img { width: 100%; height: 100%; object-fit: cover; }
                .p-overlay { 
                    position: absolute; bottom: 0; left: 0; right: 0; background: var(--accent-color); color: white;
                    text-align: center; padding: 14px; font-size: 10px; font-weight: 900;
                    transform: translateY(100%); transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                    letter-spacing: 1px;
                }
                .modern-p-card:hover .p-overlay { transform: translateY(0); }
                .p-meta h4 { margin: 20px 0 5px; font-size: 16px; font-weight: 800; letter-spacing: -0.5px; }
                .p-meta p { color: var(--accent-color); font-weight: 800; font-size: 14px; }

                /* Founders Section */
                .command-center { margin-top: 120px; padding: 80px 0; text-align: center; }
                .command-header h3 { font-size: 12px; letter-spacing: 4px; color: var(--text-muted); margin-bottom: 60px; font-weight: 900; }
                
                .founders-grid { 
                    display: grid; 
                    grid-template-columns: repeat(3, 1fr); 
                    gap: 32px; 
                    max-width: 1200px; 
                    margin: 0 auto; 
                }

                .founder-card { padding: 50px 40px; text-align: center; }
                .founder-img-wrapper { 
                    width: 140px; height: 140px; margin: 0 auto 30px; 
                    border-radius: 40px; border: 2px solid var(--accent-color);
                    padding: 8px; background: white;
                }
                .founder-img { border-radius: 32px; background: #f1f5f9; }
                .founder-name { font-size: 32px; font-weight: 800; letter-spacing: -1px; color: var(--text-black); }
                .founder-role { font-size: 11px; font-weight: 900; letter-spacing: 2px; color: var(--accent-color); text-transform: uppercase; }

                .social-icon { width: 20px; height: 20px; color: var(--slate-400); transition: 0.3s; margin-left: 15px; }
                .social-icon:hover { color: var(--accent-color); transform: translateY(-3px); }

                @media (max-width: 1200px) {
                    .bento-grid, .product-row, .founders-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 768px) {
                    .founders-grid { grid-template-columns: 1fr; }
                }

                @media (max-width: 600px) {
                    .bento-grid { grid-template-columns: 1fr; }
                    .product-row { grid-template-columns: repeat(2, 1fr) !important; gap: 16px; }
                    .hero-title { font-size: 36px; }
                    .main-content { padding: 120px 20px 60px; }
                    .nav-inner { padding: 0 20px; }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;