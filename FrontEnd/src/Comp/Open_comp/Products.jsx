import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (product) => {
    if (product.images && product.images.length > 0) {
      const img = product.images[0];
      const url = img.url || img;
      if (typeof url === "string") {
        if (url.startsWith("http") || url.startsWith("/")) return url;
        return `/images/products/${url}`;
      }
    }
    return "/images/products/kite.jpg";
  };

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="products-container">
      <h1 className="products-title">Our Products</h1>

      <div className="products-grid">
        {products.map((product) => (
          <div
            className="product-card"
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <div className="product-image-wrapper">
              <img src={getImageUrl(product)} alt={product.name} />
            </div>

            <div className="product-info-minimal">
              <h3 className="product-name-minimal">{product.name}</h3>
              <p className="product-price-minimal">₹{product.price}</p>

              {product.stock === 0 ? (
                <span className="stock-pill-minimal out-stock">Out of Stock</span>
              ) : (
                <span className="stock-pill-minimal in-stock">In Stock</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
