import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

const Wishlist = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchWishlist = useCallback(async () => {
        if (!token) {
            navigate("/login");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/my-wishlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(res.data.products || []);
        } catch (error) {
            console.error("Wishlist fetch failed:", error);
        } finally {
            setLoading(false);
        }
    }, [token, navigate]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const toggleWishlist = async (productId) => {
        try {
            await axios.post(
                `${API_BASE_URL}/toggle-wishlist`,
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProducts(prev => prev.filter(p => p._id !== productId));
        } catch (error) {
            console.error("Wishlist removal failed:", error);
        }
    };

    const styles = {
        pageWrapper: {
            padding: "160px 5% 80px",
            backgroundColor: 'var(--bg-base)',
            minHeight: '100vh',
            width: '100%',
            boxSizing: 'border-box'
        },
        innerContent: { maxWidth: "1200px", margin: "0 auto" },
        title: {
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "800",
            marginBottom: "40px",
            letterSpacing: "-2px",
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "30px"
        },
        card: {
            background: "#fff",
            borderRadius: "24px",
            padding: "15px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
            position: 'relative'
        },
        img: {
            width: '100%',
            height: '240px',
            borderRadius: '18px',
            objectFit: 'cover',
            marginBottom: '15px'
        },
        removeBtn: {
            position: 'absolute',
            top: '25px',
            right: '25px',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ef4444',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.innerContent}>
                <button
                    onClick={() => navigate("/products")}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748B', fontWeight: '700', cursor: 'pointer', marginBottom: '20px' }}
                >
                    <ArrowLeft size={18} /> BACK TO SHOP
                </button>

                <h1 style={styles.title}>
                    Your Wishlist <Heart fill="var(--accent)" color="var(--accent)" />
                </h1>

                {loading ? (
                    <p>Loading your favorites...</p>
                ) : products.length > 0 ? (
                    <div style={styles.grid}>
                        {products.map((product) => (
                            <div key={product._id} style={styles.card}>
                                <button
                                    style={styles.removeBtn}
                                    onClick={() => toggleWishlist(product._id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                                <img
                                    src={`../uploads/${product._id}/main.jpg`}
                                    alt={product.name}
                                    style={styles.img}
                                    onError={(e) => e.target.src = "https://via.placeholder.com/300"}
                                />
                                <div style={{ padding: '0 10px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase' }}>{product.category}</span>
                                    <h3 style={{ margin: '5px 0 15px', fontSize: '1.2rem', fontWeight: '700' }}>{product.name}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.3rem', fontWeight: '800' }}>₹{product.price}</span>
                                        <button
                                            onClick={() => navigate(`/products/${product._id}`)}
                                            style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 15px', fontWeight: '700', cursor: 'pointer' }}
                                        >
                                            VIEW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <ShoppingBag size={64} color="#CBD5E1" style={{ marginBottom: '20px' }} />
                        <h2 style={{ color: '#64748B' }}>Your wishlist is empty</h2>
                        <button
                            onClick={() => navigate("/products")}
                            style={{ marginTop: '20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '50px', padding: '12px 30px', fontWeight: '800', cursor: 'pointer' }}
                        >
                            EXPLORE PRODUCTS
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
