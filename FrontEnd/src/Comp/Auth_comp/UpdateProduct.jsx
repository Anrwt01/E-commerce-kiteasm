import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    ArrowLeftIcon,
    ArrowPathIcon,
    WrenchScrewdriverIcon,
    PhotoIcon
} from "@heroicons/react/24/outline";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("id");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
    });
    const [loading, setLoading] = useState(true);

    const fetchProductDetails = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const product = res.data.product || res.data;

            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                imageUrl: product.images && product.images.length > 0 ? product.images[0].url : ""
            });
            setLoading(false);
        } catch (error) {
            console.error("Fetch product error:", error);
            navigate("/admin/all-products");
        }
    };

    useEffect(() => {
        if (productId) fetchProductDetails(productId);
        else navigate("/admin/all-products");
    }, [productId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const payload = {
                ...formData,
                images: [{ url: formData.imageUrl }]
            };

            await axios.put(`${API_BASE_URL}/admin/products/${productId}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Manifest Updated Successfully.");
            navigate("/admin/all-products");
        } catch (error) {
            alert("Failed to update product specs.");
        }
    };

    const styles = {
        container: {
            backgroundColor: '#0b0f1a',
            minHeight: '100vh',
            padding: '140px 24px 100px',
            color: '#fff'
        },
        card: {
            maxWidth: '850px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '48px',
            borderRadius: '32px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)'
        },
        input: {
            width: '100%',
            padding: '14px 18px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: 'none',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            fontSize: '14px',
            outline: 'none',
            marginBottom: '20px',
            color: '#fff',
            transition: 'all 0.3s ease'
        },
        label: {
            display: 'block',
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: '#64748b',
            marginBottom: '8px',
            marginLeft: '4px'
        },
        previewBox: {
            background: 'rgba(0,0,0,0.2)',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: '16px',
            height: '108px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        },
        submitBtn: {
            width: '100%',
            padding: '18px',
            background: '#0ea5e9',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '800',
            letterSpacing: '1px',
            cursor: 'pointer',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(14, 165, 233, 0.3)',
            transition: 'transform 0.2s ease'
        }
    };

    if (loading) return (
        <div style={{ ...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ArrowPathIcon style={{ width: '40px', color: '#0ea5e9' }} className="animate-spin" />
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={{ maxWidth: '850px', margin: '0 auto', marginBottom: '32px' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <ArrowLeftIcon width={16} /> Cancel Modification
                </button>
            </div>

            <div style={styles.card}>
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', marginBottom: '12px' }}>
                        <WrenchScrewdriverIcon style={{ width: '18px' }} />
                        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Engineering Dept</span>
                    </div>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#fff', margin: 0, letterSpacing: '-1.5px' }}>
                        Modify Unit Specs<span style={{ color: '#0ea5e9' }}>.</span>
                    </h1>
                    <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '14px', letterSpacing: '0.5px' }}>
                        PRODUCT REF: {productId ? productId.slice(-8).toUpperCase() : "N/A"}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                        {/* LEFT: Core Data */}
                        <div>
                            <label style={styles.label}>Identity</label>
                            <input
                                type="text" name="name" value={formData.name}
                                onChange={handleChange} required style={styles.input}
                            />

                            <label style={styles.label}>Valuation (₹)</label>
                            <input
                                type="number" name="price" value={formData.price}
                                onChange={handleChange} required style={styles.input}
                            />

                            <label style={styles.label}>Inventory Capacity</label>
                            <input
                                type="number" name="stock" value={formData.stock}
                                onChange={handleChange} required style={styles.input}
                            />
                        </div>

                        {/* RIGHT: Meta Data */}
                        <div>
                            <label style={styles.label}>Category</label>
                            <select
                                name="category" value={formData.category}
                                onChange={handleChange} required style={styles.input}
                            >
                                <option value="Kites" style={{ background: '#0b0f1a' }}>Kites</option>
                                <option value="Decor" style={{ background: '#0b0f1a' }}>Decor</option>
                                <option value="Gear" style={{ background: '#0b0f1a' }}>Gear</option>
                                <option value="Accessories" style={{ background: '#0b0f1a' }}>Accessories</option>
                            </select>

                            <label style={styles.label}>Visual Manifest URL</label>
                            <input
                                type="url" name="imageUrl" value={formData.imageUrl}
                                onChange={handleChange} required style={styles.input}
                            />

                            <div style={styles.previewBox}>
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Preview" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <PhotoIcon style={{ width: '32px', color: '#334155' }} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <label style={styles.label}>Technical Description</label>
                        <textarea
                            name="description" value={formData.description}
                            onChange={handleChange} required
                            style={{ ...styles.input, height: '120px', resize: 'none' }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.submitBtn}
                        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        <ArrowPathIcon width={20} strokeWidth={2.5} /> COMMIT CHANGES TO DATABASE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;