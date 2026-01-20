import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
    });

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

            await axios.post("http://localhost:5000/api/admin/products", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Product added successfully!");
            navigate("/admin/all-products");
        } catch (error) {
            console.error(error);
            alert("Failed to add product.");
        }
    };

    const inputStyle = {
        width: '100%', padding: '16px', background: 'var(--gray-light)',
        border: '1px solid transparent', fontSize: '14px', outline: 'none',
        marginBottom: '20px'
    };

    return (
        <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', maxWidth: '600px' }}>
            <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                <h1 className="serif" style={{ fontSize: '40px' }}>New Gear Addition<span style={{ fontStyle: 'normal' }}>.</span></h1>
                <p className="text-xs text-muted uppercase tracking-widest" style={{ marginTop: '16px' }}>Manifest a new fleet unit</p>
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, height: '100px', resize: 'none' }} />

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} required style={inputStyle} />
                    <input type="number" name="stock" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} required style={inputStyle} />
                </div>

                <select name="category" value={formData.category} onChange={handleChange} required style={inputStyle}>
                    <option value="">Select Category</option>
                    <option value="Kites">Kites</option>
                    <option value="Decor">Decor</option>
                    <option value="Gear">Gear</option>
                </select>

                <input type="url" name="imageUrl" placeholder="Image URL (Unsplash recommended)" value={formData.imageUrl} onChange={handleChange} required style={inputStyle} />

                {formData.imageUrl && (
                    <div style={{ marginBottom: '20px', background: 'var(--gray-light)', padding: '20px', textAlign: 'center' }}>
                        <img src={formData.imageUrl} alt="Preview" style={{ maxHeight: '200px', maxWidth: '100%' }} />
                    </div>
                )}

                <button type="submit" className="btn btn-black" style={{ width: '100%', padding: '20px' }}>
                    Confirm Addition
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
