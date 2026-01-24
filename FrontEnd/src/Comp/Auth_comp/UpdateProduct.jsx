import React, { useEffect, useState } from "react";
import axios from "axios";
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
            const res = await axios.get(`http://localhost:5000/api/admin/products/${id}`, {
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

            await axios.put(`http://localhost:5000/api/admin/products/${productId}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Manifest Updated Successfully.");
            navigate("/admin/all-products");
        } catch (error) {
            alert("Failed to update product specs.");
        }
    };

    const styles = {
        container: { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '140px 24px 100px' },
        card: { maxWidth: '850px', margin: '0 auto', background: 'white', padding: '48px', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 20px 50px rgba(0,0,0,0.04)' },
        input: { width: '100%', padding: '14px 18px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', outline: 'none', marginBottom: '20px', transition: 'all 0.2s' },
        label: { display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px', marginLeft: '4px' }
    };

    if (loading) return (
        <div style={{ ...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ArrowPathIcon style={{ width: '40px', color: '#0ea5e9' }} className="animate-spin" />
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={{ maxWidth: '850px', margin: '0 auto', marginBottom: '32px' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeftIcon width={16} /> Cancel Modification
                </button>
            </div>

            <div style={styles.card}>
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', marginBottom: '12px' }}>
                        <WrenchScrewdriverIcon style={{ width: '18px' }} />
                        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Engineering Dept</span>
                    </div>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-1.5px' }}>Modify Unit Specs<span style={{ color: '#0ea5e9' }}>.</span></h1>
                    <p style={{ color: '#64748b', marginTop: '8px', fontSize: '15px' }}>Product Reference: {productId.slice(-6).toUpperCase()}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                        {/* LEFT: Core Data */}
                        <div>
                            <label style={styles.label}>Identity</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />

                            <label style={styles.label}>Valuation (₹)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={styles.input} />

                            <label style={styles.label}>Inventory Capacity</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required style={styles.input} />
                        </div>

                        {/* RIGHT: Meta Data */}
                        <div>
                            <label style={styles.label}>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} required style={styles.input}>
                                <option value="Kites">Kites</option>
                                <option value="Decor">Decor</option>
                                <option value="Gear">Gear</option>
                                <option value="Accessories">Accessories</option>
                            </select>

                            <label style={styles.label}>Visual Manifest URL</label>
                            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required style={styles.input} />

                            <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '16px', height: '108px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Preview" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <PhotoIcon style={{ width: '32px', color: '#cbd5e1' }} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <label style={styles.label}>Technical Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required style={{ ...styles.input, height: '120px', resize: 'none' }} />
                    </div>

                    <button 
                        type="submit" 
                        style={{ width: '100%', padding: '18px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '16px', fontSize: '14px', fontWeight: '800', letterSpacing: '1px', cursor: 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                        <ArrowPathIcon width={20} strokeWidth={2.5} /> COMMIT CHANGES TO DATABASE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;