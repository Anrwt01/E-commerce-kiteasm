import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "", // Using URL for now as per plan
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            // Backend expects images: [{ url: "..." }]
            // But my backend code for New_prod seemed to ignore req.body.images and utilize a hardcoded one?
            // Step 84 output: uses hardcoded images: [{ url: "/products/default.jpg" }]
            // I should update the backend controller to accept image URL if I want it to work properly.
            // But for this step, let's send what we have. 
            // I will assume the backend controller will be fixed or I should fix it.
            // Wait, "New_prod" in step 84 has: 
            // images: [{ url: "/products/default.jpg" }] // static image example
            // I MUST fix the backend controller to use the image URL from body if I want this to be "full working".

            const payload = {
                ...formData,
                // If I fix backend, I should send images array OR imageUrl
                images: [{ url: formData.imageUrl }]
            };

            await axios.post("http://localhost:5000/api/admin/products", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Product added successfully!");
            navigate("/admin/all-products");
        } catch (error) {
            console.error("Add product error:", error);
            alert("Failed to add product.");
        }
    };

    return (
        <div className="add-product-container">
            <form className="add-product-form" onSubmit={handleSubmit}>
                <h1>Add New Product</h1>

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
                        <option value="Kites">Kites</option> {/* Project seems to be Kiteasm */}
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        className="form-input"
                        placeholder="https://example.com/image.jpg"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                    {formData.imageUrl && (
                        <img src={formData.imageUrl} alt="Preview" className="image-preview" />
                    )}
                </div>

                <button type="submit" className="submit-btn">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
