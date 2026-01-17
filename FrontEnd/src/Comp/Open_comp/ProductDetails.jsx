import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/products/${id}`
      );
      setProduct(res.data.product);
    } catch (error) {
      console.error("Error fetching product", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return <p className="loading">Product not found</p>;

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

  const imageUrl = product ? getImageUrl(product) : "";

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to cart");
        // navigate("/login"); // Optional
        return;
      }

      await axios.post(
        `http://localhost:5000/api/user/cart/add/${product._id}`,
        { quantity: 1 },
        { headers: { Authorization: token } }
      );
      // Redirect to cart for better flow
      // alert("Added to cart!"); 
      navigate("/cart");
    } catch (error) {
      console.error("Add to cart error", error);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="details-container">
      <div className="details-card">
        <img src={imageUrl} alt={product.name} />

        <div className="details-info">
          <h1>{product.name}</h1>
          <p className="details-price">₹{product.price}</p>
          <p className="details-desc">{product.description}</p>

          <p className="details-stock">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <button
            disabled={product.stock === 0}
            onClick={addToCart}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
