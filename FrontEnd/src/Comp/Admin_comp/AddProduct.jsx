import React, { useState } from "react";
import axios from "axios";
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
        category: "",
        imageUrl: "" ,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        
        // Only include the images array if imageUrl actually has text
        const payload = {
            ...formData,
            images: formData.imageUrl ? [{ url: formData.imageUrl }] : []
        };

        const res = await axios.post("http://localhost:5000/api/admin/New/products", payload, {
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
        padding: '14px 18px',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        fontSize: '14px',
        color: '#1e293b',
        outline: 'none',
        transition: 'all 0.2s ease',
        marginBottom: '20px',
        fontFamily: 'inherit'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '11px',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#64748b',
        marginBottom: '8px',
        marginLeft: '4px'
    };

    return (
        <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', padding: '140px 24px 100px' }}>
            {/* --- BACK BUTTON --- */}
            <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '32px' }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}
                >
                    <ArrowLeftIcon width={16} /> Return to Dashboard
                </button>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '48px', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 20px 50px rgba(0,0,0,0.04)' }}>
                
                {/* --- HEADER --- */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', marginBottom: '12px' }}>
                        <SparklesIcon style={{ width: '18px' }} />
                        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Fleet Operations</span>
                    </div>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-1px' }}>Deploy New Gear.</h1>
                    <p style={{ color: '#64748b', marginTop: '8px', fontSize: '15px' }}>Enter the specifications for the new unit below.</p>
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
                            <select name="category" value={formData.category} onChange={handleChange} required style={{...inputStyle, appearance: 'none', cursor: 'pointer'}}>
                                <option value="">Select Category</option>
                                <option value="Kites">Kites (Airframe)</option>
                                <option value="Manjha">Manjha (Aesthetics)</option>
                                 <option value="saddi">saddi (Technical)</option>
                                <option value="accessories">accessories (Technical)</option>

                            </select>

                            {/* <label style={labelStyle}>Visual Manifest URL</label>
                            <input type="url" name="imageUrl" placeholder="https://unsplash.com/..." value={formData.imageUrl} onChange={handleChange} required style={inputStyle} /> */}
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
                            padding: '18px', 
                            background: '#0f172a', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '16px', 
                            fontSize: '14px', 
                            fontWeight: '800', 
                            letterSpacing: '1px', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <CloudArrowUpIcon width={20} /> CONFIRM FLEET ADDITION
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;