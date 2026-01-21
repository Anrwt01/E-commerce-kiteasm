import React, { useEffect, useState } from "react";
import { productImages } from "../../utils/productImages";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { 
  PencilSquareIcon, 
  TrashIcon, 
  PlusIcon,
  ArrowLeftIcon,
  CubeIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/admin/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(res.data.products || res.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Permanent Action: Decommission this unit from inventory?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProducts(products.filter((p) => p._id !== id));
            } catch (error) {
                console.error("Delete error:", error);
                alert("Failed to delete product.");
            }
        }
    };

    const styles = {
        container: { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '140px 24px 100px' },
        wrapper: { maxWidth: '1200px', margin: '0 auto' },
        header: { 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '60px',
            paddingBottom: '30px',
            borderBottom: '1px solid #e2e8f0'
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '20px',
            border: '1px solid #f1f5f9',
            transition: 'all 0.3s ease',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
        },
        imgWrapper: {
            width: '100%',
            height: '240px',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#f8fafc',
            marginBottom: '20px'
        },
        badge: (stock) => ({
            position: 'absolute',
            top: '30px',
            right: '30px',
            padding: '6px 12px',
            borderRadius: '100px',
            fontSize: '10px',
            fontWeight: '900',
            backgroundColor: stock < 5 ? '#fef2f2' : '#f0fdf4',
            color: stock < 5 ? '#ef4444' : '#22c55e',
            border: `1px solid ${stock < 5 ? '#fee2e2' : '#dcfce7'}`,
        })
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <div className="animate-spin"><CubeIcon width={40} color="#0ea5e9" /></div>
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '2px', color: '#64748b' }}>POLLING INVENTORY...</span>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                
                {/* --- NAVIGATION & HEADER --- */}
                <div style={styles.header}>
                    <div>
                        <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <ArrowLeftIcon width={16} /> Command Center
                        </button>
                        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-1.5px' }}>Fleet Catalog<span style={{ color: '#0ea5e9' }}>.</span></h1>
                    </div>
                    <Link to="/admin/add-product" style={{ textDecoration: 'none', padding: '14px 28px', borderRadius: '14px', background: '#0f172a', color: 'white', fontWeight: '800', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.2)' }}>
                        <PlusIcon width={20} strokeWidth={3} /> DEPLOY GEAR
                    </Link>
                </div>

                {/* --- PRODUCT GRID --- */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div 
                                key={product._id} 
                                style={styles.card}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={styles.badge(product.stock)}>
                                    {product.stock < 5 ? 'LOW STOCK' : 'IN STOCK'}
                                </div>

                                <div style={styles.imgWrapper}>
                                    <img
                                        // src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1531608139434-1912ae0713cd?q=80&w=1000&auto=format&fit=crop"}
                                        src={productImages[product.images?.[0]?.url]}
                                        alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0 }}>{product.name}</h3>
                                    <span style={{ fontSize: '18px', fontWeight: '900', color: '#0ea5e9' }}>₹{product.price}</span>
                                </div>
                                
                                <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Current Capacity: {product.stock} units
                                </p>

                                <div style={{ marginTop: '24px', display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid #f8fafc' }}>
                                    <Link 
                                        to={`/admin/update-product/${product._id}`} 
                                        style={{ flex: 1, textDecoration: 'none', textAlign: 'center', padding: '12px', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: '900', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                    >
                                        <PencilSquareIcon width={16} /> MODIFY
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(product._id)} 
                                        style={{ flex: 1, border: 'none', padding: '12px', borderRadius: '10px', backgroundColor: '#fef2f2', color: '#ef4444', fontSize: '11px', fontWeight: '900', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                    >
                                        <TrashIcon width={16} /> REMOVE
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px', backgroundColor: 'white', borderRadius: '32px', border: '1px dashed #cbd5e1' }}>
                            <ExclamationCircleIcon width={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
                            <p style={{ fontSize: '14px', fontWeight: '700', color: '#94a3b8' }}>MANIFEST EMPTY: NO GEAR DETECTED IN DATABASE</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;