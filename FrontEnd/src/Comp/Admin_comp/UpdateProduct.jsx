import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./AddProduct.css"; // Reusing default form CSS

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
            // Use existing endpoint
            const res = await axios.get(`http://localhost:5000/api/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // The controller Single_prod_details likely returns { success: true, product: {...} }
            // Let's verify typically, or handle common structures.
            // Assuming res.data.product
            // But wait, "User_Single_prod" might differ from "Single_prod_details"
            // Let's check Routes.js -> Lines 114-119: router.get("/admin/products/:Prod_id", ..., Single_prod_details);
            // I'll assume res.data.product or res.data

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
            alert("Failed to fetch product details.");
            navigate("/admin/all-products");
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProductDetails(productId);
        } else {
            alert("No product ID provided!");
            navigate("/admin/all-products");
        }
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

            alert("Product updated successfully!");
            navigate("/admin/all-products");
        } catch (error) {
            console.error("Update product error:", error);
            alert("Failed to update product.");
        }
    };

    if (loading) return <div className="add-product-container">Loading...</div>;

    return (
        <div className="add-product-container">
            <form className="add-product-form" onSubmit={handleSubmit}>
                <h1>Update Product</h1>

                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-textarea"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-input"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                        type="number"
                        name="stock"
                        className="form-input"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Kites">Kites</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        className="form-input"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required // Optional if you want to allow no image
                    />
                    {formData.imageUrl && (
                        <img src={formData.imageUrl} alt="Preview" className="image-preview" />
                    )}
                </div>

                <button type="submit" className="submit-btn">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
