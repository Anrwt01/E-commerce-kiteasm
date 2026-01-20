import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
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

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="serif italic">Polling inventory...</div>
        </div>
    );

    return (
        <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', borderBottom: '1px solid var(--gray-light)', paddingBottom: '40px' }}>
                <div>
                    <span className="text-xs uppercase tracking-widest text-muted">Inventory Catalog</span>
                    <h1 className="serif" style={{ fontSize: '48px', marginTop: '16px' }}>All Products<span style={{ fontStyle: 'normal' }}>.</span></h1>
                </div>
                <Link to="/admin/add-product" className="btn btn-black">Add New Gear</Link>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <div className="product-image-wrapper">
                                <img
                                    src={product.images && product.images[0] ? product.images[0].url : "/images/products/kite.jpg"}
                                    alt={product.name}
                                />
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase' }}>{product.name}</h3>
                                    <p className="text-xs" style={{ fontWeight: 900 }}>₹{product.price}</p>
                                </div>
                                <p className="text-xs text-muted" style={{ marginTop: '4px' }}>STOCK: {product.stock}</p>

                                <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                                    <Link to={`/admin/update-product?id=${product._id}`} className="text-xs uppercase tracking-widest" style={{ fontWeight: 900 }}>Edit</Link>
                                    <button onClick={() => handleDelete(product._id)} className="text-xs uppercase tracking-widest" style={{ fontWeight: 900, color: 'var(--accent-alt)' }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="serif italic text-muted">No products found in the database.</p>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
