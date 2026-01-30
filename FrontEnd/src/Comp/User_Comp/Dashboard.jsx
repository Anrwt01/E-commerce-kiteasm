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
    }
];
    return (
        <div className="dash-container">
            {/* Soft Grid Background */}
            <div className="grid-bg"></div>

            {/* Premium Top Navigation */}
            <nav className="top-nav">
                <div className="nav-inner">
                    <div className="logo-brand">KITEASM<span>.</span></div>
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
                    {/* <div className="status-badge">SYSTEMS_NOMINAL</div> */}
                    <h1 className="hero-title">Welcome, {user.name?.split(" ")[0]}</h1>
                </header>

                {/* Bento Grid - Styled as floating panels */}
                <div className="bento-grid">
                    {[
                        { title: 'COLLECTIONS', path: '/products', icon: ShoppingBagIcon, desc: 'View Inventory' },
                        { title: 'MANIFEST', path: '/orders', icon: CubeIcon, desc: 'Track Orders' },
                        { title: 'CARGO', path: '/cart', icon: SparklesIcon, desc: 'Active Cart' },
                        { title: 'TERMINAL', path: '/user/update', icon: Cog6ToothIcon, desc: 'Adjust Params' },
                    ].map((item) => (
                        <Link key={item.title} to={item.path} className="bento-card">
                            <div className="bento-icon-box">
                                <item.icon style={{ width: '24px' }} strokeWidth={1.5} />
                            </div>
                            <div className="bento-text">
                                <span className="bento-title">{item.title}</span>
                                <span className="bento-desc">{item.desc}</span>
                            </div>
                            <ChevronRightIcon className="bento-arrow" style={{ width: '14px' }} />
                        </Link>
                    ))}
                </div>

                {/* Featured Products */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">Latest Equipment</h2>
                        <Link to="/products" className="view-link">VIEW ALL</Link>
                    </div>
                    <div className="product-row">
                        {featuredProducts.map((p) => (
                            <Link key={p._id} to={`/products/${p._id}`} className="modern-p-card">
                                <div className="p-img-box">
                                    <img src={productImages[p.images?.[0]?.url]} alt={p.name} />
                                    <div className="p-overlay">SHOP_NOW</div>
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
            <div key={owner.name} className="founder-card">
                <div className="founder-img-wrapper">
                    <img src={owner.image} alt={owner.name} className="founder-img" />
                </div>
                
                <div className="founder-info">
                    <h4 className="founder-name">{owner.name}</h4>
                    <span className="founder-role">{owner.role}</span>
                    <p className="founder-desc">{owner.desc}</p>
                    
                    <div className="founder-socials">
                        <a href={owner.instagram} aria-label="Instagram">
                            <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44-1.44-.645-1.44-1.44.645-1.44 1.44-1.44z"/></svg>
                        </a>
                        <a href={owner.youtube} aria-label="YouTube">
                            <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        ))}
    </div>
</section>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');

                /* Command Center Section */
.command-center {
    margin-top: 120px;
    padding: 80px 0;
    text-align: center;
}

.command-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 60px;
}

.command-header .line {
    flex: 0 1 40px;
    height: 1px;
    background: #000;
}

.command-header h3 {
    font-size: 12px;
    letter-spacing: 4px;
    font-weight: 800;
    color: #000;
}

/* Founder Cards Grid */
.founders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
}

.founder-card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 24px;
    padding: 50px 40px;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    position: relative;
    overflow: hidden;
}

.founder-card:hover {
    transform: translateY(-10px);
    border-color: #000;
    box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1);
}

/* Image Styling */
.founder-img-wrapper {
    width: 140px;
    height: 140px;
    margin: 0 auto 30px;
    border-radius: 40px; /* Squircle shape like screenshot */
    padding: 5px;
    border: 1px solid #000;
    overflow: hidden;
}

.founder-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 35px;
    background: #f9f9f9;
}

/* Typography */
.founder-name {
    font-family: 'Playfair Display', 'Georgia', serif; /* Elegant Serif */
    font-size: 32px;
    font-weight: 500;
    font-style: italic;
    margin: 0 0 10px;
}

.founder-role {
    display: block;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 2px;
    margin-bottom: 20px;
    color: #000;
}

.founder-desc {
    font-size: 14px;
    line-height: 1.6;
    color: #666;
    max-width: 320px;
    margin: 0 auto 30px;
}

/* Social Icons */
.founder-socials {
    display: flex;
    justify-content: center;
    gap: 25px;
}

.social-icon {
    width: 20px;
    height: 20px;
    color: #000;
    transition: transform 0.3s ease;
}

.social-icon:hover {
    transform: scale(1.2);
    color: #666;
}

@media (max-width: 850px) {
    .founders-grid { grid-template-columns: 1fr; }
    .founder-card { padding: 40px 20px; }
}
                :root {
                    --bg-main: #FDFDFD;
                    --bg-subtle: #F3F4F6;
                    --text-black: #000000;
                    --text-muted: #6B7280;
                    --accent: #000000;
                    --card-shadow: 0 10px 30px -10px rgba(0,0,0,0.08);
                }

                .dash-container {
                    background-color: var(--bg-main);
                    min-height: 100vh;
                    color: var(--text-black);
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    position: relative;
                }

                /* Subtle Grid Overlay */
                .grid-bg {
                    position: fixed;
                    inset: 0;
                    background-image: radial-gradient(#e5e7eb 0.8px, transparent 0.8px);
                    background-size: 24px 24px;
                    opacity: 0.5;
                    pointer-events: none;
                }

                .top-nav {
                    position: fixed; top: 0; width: 100%; height: 80px;
                    background: rgba(255,255,255,0.8);
                    backdrop-filter: blur(10px); z-index: 100;
                    border-bottom: 1px solid #E5E7EB;
                }

                .nav-inner {
                    max-width: 1200px; margin: 0 auto; height: 100%;
                    display: flex; align-items: center; justify-content: space-between; padding: 0 40px;
                }

                .logo-brand { font-weight: 800; font-size: 20px; letter-spacing: -0.5px; }
                .logo-brand span { color: #6B7280; }

                .nav-actions { display: flex; align-items: center; gap: 24px; }
                .user-badge { 
                    font-size: 12px; color: var(--text-black); font-weight: 600;
                    display: flex; align-items: center; gap: 10px;
                    background: var(--bg-subtle); padding: 8px 16px; border-radius: 100px;
                }
                .online-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; }

                .power-btn { 
                    background: var(--text-black); border: none; color: white;
                    padding: 10px; cursor: pointer; border-radius: 50%; transition: 0.3s;
                    display: flex; align-items: center; justify-content: center;
                }
                .power-btn:hover { transform: scale(1.1); background: #ef4444; }

                .main-content { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 140px 40px 100px; }

                .status-badge { 
                    display: inline-block; font-size: 10px; font-weight: 800; 
                    letter-spacing: 1px; color: white; background: #000; 
                    padding: 4px 12px; border-radius: 4px; margin-bottom: 20px; 
                }
                .hero-title { font-size: 56px; font-weight: 800; letter-spacing: -2px; margin: 0; }
                .hero-tagline { color: var(--text-muted); margin-top: 12px; font-size: 18px; }

                /* Bento Cards */
                .bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 60px 0; }
                .bento-card {
                    background: white; border: 1px solid #E5E7EB;
                    padding: 30px 24px; display: flex; flex-direction: column; gap: 20px;
                    text-decoration: none; color: var(--text-black); 
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    box-shadow: var(--card-shadow); border-radius: 16px;
                }
                .bento-card:hover { transform: translateY(-8px); border-color: #000; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
                .bento-icon-box { 
                    width: 48px; height: 48px; background: #F3F4F6; 
                    border-radius: 12px; display: flex; align-items: center; justify-content: center;
                }
                .bento-title { font-size: 13px; font-weight: 800; letter-spacing: 0.5px; }
                .bento-desc { font-size: 11px; color: var(--text-muted); margin-top: 4px; font-weight: 500; }
                .bento-arrow { opacity: 0.3; margin-top: auto; align-self: flex-end; }

                /* Product Cards */
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .section-title { font-size: 24px; font-weight: 800; margin: 0; }
                .view-link { color: var(--text-black); font-size: 12px; text-decoration: underline; font-weight: 700; }

                .product-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
                .modern-p-card { text-decoration: none; color: var(--text-black); }
                .p-img-box { 
                    aspect-ratio: 1/1; background: #F3F4F6; position: relative; overflow: hidden;
                    border-radius: 12px; transition: 0.4s;
                }
                .p-img-box img { width: 100%; height: 100%; object-fit: cover; }
                .p-overlay { 
                    position: absolute; bottom: 0; left: 0; right: 0; background: #000; color: white;
                    text-align: center; padding: 12px; font-size: 11px; font-weight: 800;
                    transform: translateY(100%); transition: 0.3s;
                }
                .modern-p-card:hover .p-overlay { transform: translateY(0); }
                .modern-p-card:hover .p-img-box { transform: scale(0.98); }
                .p-meta h4 { margin: 15px 0 5px; font-size: 15px; font-weight: 700; }
                .p-meta p { color: var(--text-muted); font-weight: 500; font-size: 14px; }

                /* Commanders Section */
                .command-center { margin-top: 100px; padding: 60px 0; border-top: 1px solid #E5E7EB; }
                .command-header h3 { font-size: 12px; letter-spacing: 3px; color: var(--text-muted); margin-bottom: 40px; }
                .founders-flex { display: flex; gap: 80px; }
                .commander-card { display: flex; align-items: center; gap: 24px; }
                .commander-img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 4px solid white; box-shadow: var(--card-shadow); }
                .commander-role { font-size: 10px; color: var(--text-muted); letter-spacing: 1px; font-weight: 800; }
                .commander-details h4 { margin: 4px 0; font-size: 20px; font-weight: 800; }

                @media (max-width: 1000px) {
                    .bento-grid, .product-row { grid-template-columns: repeat(2, 1fr); }
                    .founders-flex { flex-direction: column; gap: 40px; }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;