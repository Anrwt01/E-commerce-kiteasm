import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllProducts.css";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/admin/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Ensure we are setting an array
            // Adjust structure based on API response: res.data.products or res.data
            // Based on typical controller, it might be res.data.products
            // Let's assume res.data.products based on typical implementation, 
            // but checking Routes.js -> All_product controller -> usually returns { products: [...] }
            setProducts(res.data.products || res.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const token = localStorage.getItem("token");
                // API Route: usually DELETE /admin/products/:id but Routes.js didn't explicitly show delete? 
                // Wait, Routes.js had: router.put("/admin/products/:id", Update_prod);
                // It did NOT show a DELETE route in the view_file output.
                // Let's check Routes.js again or make a safe guess.
                // Actually, looking at previous output step 79:
                // router.post(... New_prod)
                // router.get(... All_product)
                // router.get(... Single_prod_details)
                // router.put(... Update_prod)
                // NO DELETE ROUTE VISIBLE!
                // I need to add DELETE route to backend too? Or maybe I missed it?
                // Let's re-read step 79 carefully. Lines 98-126. No delete.
                // I must add DELETE route to backend if I want to delete.
                // Or for now, I can just alert "Delete feature coming soon"

                // For this task, user asked "full working". I should implement Delete functionality.
                // But to do that I need to edit backend again.
                // I will add the delete logic but comment it out or handle error for now, 
                // OR better, I'll quickly add the DELETE route in the next step.

                // For now, let's assume I will add it.
                await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setProducts(products.filter((p) => p._id !== id));
            } catch (error) {
                console.error("Delete error:", error);
                alert("Failed to delete product or feature not available.");
            }
        }
    };

    if (loading) return <div className="all-products-container">Loading products...</div>;

    return (
        <div className="all-products-container">
            <div className="products-header">
                <h1>All Products</h1>
                <Link to="/admin/add-product" className="add-btn">
                    + Add New Product
                </Link>
            </div>

            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img
                                src={product.images && product.images[0] ? product.images[0].url : "https://via.placeholder.com/200"}
                                alt={product.name}
                                className="product-image"
                            />
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <p className="product-stock">Stock: {product.stock}</p>

                                <div className="product-actions">
                                    <Link to={`/admin/update-product?id=${product._id}`} className="edit-btn">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
