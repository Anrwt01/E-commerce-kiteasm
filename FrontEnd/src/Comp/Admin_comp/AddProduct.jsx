import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { useNavigate } from "react-router-dom";
import {
    CloudArrowUpIcon,
    ArrowLeftIcon,
    SparklesIcon
} from "@heroicons/react/24/outline";

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        isExclusive: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            // Only include the images array if imageUrl actually has text
            const payload = {
                ...formData,
                // images: formData.imageUrl ? [{ url: formData.imageUrl }] : []
            };

            const res = await axios.post(`${API_BASE_URL}/admin/New/products`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Fleet unit deployed successfully.");
            navigate("/admin/products");
        } catch (error) {
            // Log the SPECIFIC error from the server to debug 404/500
            console.error("Backend Error:", error.response?.data || error.message);
            alert(`Operational failure: ${error.response?.data?.message || "Could not add product."}`);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '16px 20px',
        backgroundColor: 'var(--bg-base)',
        border: '1px solid var(--border-soft)',
        borderRadius: '16px',
        fontSize: '14px',
        color: 'var(--slate-800)',
        outline: 'none',
        transition: 'all 0.3s ease',
        marginBottom: '24px',
        fontFamily: 'var(--font-sans)',
        fontWeight: '600'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '10px',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--slate-400)',
        marginBottom: '8px',
        marginLeft: '4px'
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh', padding: '160px 24px 100px', fontFamily: 'var(--font-sans)' }}>
            {/* --- BACK BUTTON --- */}
            <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '32px' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none',
                        color: 'var(--slate-400)', cursor: 'pointer', fontSize: '11px', fontWeight: '900',
                        textTransform: 'uppercase', letterSpacing: '1px'
                    }}
                >
                    <ArrowLeftIcon width={16} /> Return to Inventory
                </button>
            </div>

            <div className="floating-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '60px' }}>

                {/* --- HEADER --- */}
                <div style={{ marginBottom: '60px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)', marginBottom: '16px' }}>
                        <SparklesIcon style={{ width: '20px' }} />
                        <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>Fleet Operations</span>
                    </div>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--slate-800)', margin: 0, letterSpacing: '-1.5px' }}>Deploy New Gear<span style={{ color: 'var(--accent)' }}>.</span></h1>
                    <p style={{ color: 'var(--slate-600)', marginTop: '12px', fontSize: '16px', lineHeight: '1.6' }}>Enter the specifications for the new unit below to launch it into the global marketplace.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>

                        {/* LEFT COLUMN */}
                        <div>
                            <label style={labelStyle}>Product Identity</label>
                            <input type="text" name="name" placeholder="e.g. Stratos High-Flyer" value={formData.name} onChange={handleChange} required style={inputStyle} />

                            <label style={labelStyle}>Detailed Description</label>
                            <textarea name="description" placeholder="Technical specs and material details..." value={formData.description} onChange={handleChange} required style={{ ...inputStyle, height: '145px', resize: 'none' }} />
                        </div>

                        {/* RIGHT COLUMN */}
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={labelStyle}>Valuation (₹)</label>
                                    <input type="number" name="price" placeholder="0.00" value={formData.price} onChange={handleChange} required style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Unit Stock</label>
                                    <input type="number" name="stock" placeholder="Qty" value={formData.stock} onChange={handleChange} required style={inputStyle} />
                                </div>
                            </div>

                            <label style={labelStyle}>Fleet Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                                <option value="">Select Category</option>
                                <option value="Kites">Kites (Airframe)</option>
                                <option value="Manjha">Manjha (Aesthetics)</option>
                                <option value="saddi">saddi (Technical)</option>
                                <option value="accessories">accessories (Technical)</option>
                            </select>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '10px 4px 24px' }}>
                                <input
                                    type="checkbox"
                                    name="isExclusive"
                                    id="isExclusive"
                                    checked={formData.isExclusive}
                                    onChange={handleChange}
                                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent)' }}
                                />
                                <label htmlFor="isExclusive" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer', color: 'var(--slate-800)', fontSize: '13px' }}>
                                    Mark as Exclusive Release
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* --- PREVIEW BOX --- */}
                    {formData.imageUrl && (
                        <div style={{ marginTop: '10px', marginBottom: '32px', background: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                            <img src={formData.imageUrl} alt="Preview" style={{ maxHeight: '180px', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
                            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '12px', fontWeight: '700' }}>IMAGE PREVIEW ACTIVE</p>
                        </div>
                    )}

                    {/* --- SUBMIT --- */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '20px',
                            background: 'var(--accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '18px',
                            fontSize: '13px',
                            fontWeight: '900',
                            letterSpacing: '1.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'all 0.4s',
                            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                            textTransform: 'uppercase'
                        }}
                    >
                        <CloudArrowUpIcon width={20} /> DEPLOY TO THE SKY
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;