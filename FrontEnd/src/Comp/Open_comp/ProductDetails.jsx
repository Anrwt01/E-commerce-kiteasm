import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.error("Error fetching product", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      await axios.post(`http://localhost:5000/api/user/cart/add/${product._id}`, { quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/cart");
    } catch (error) {
      console.error("Add to cart error", error);
    }
  };

  const getImageUrl = (product, index = 0) => {
    if (product.images && product.images.length > index) {
      const img = product.images[index];
      const url = img.url || img;
      if (typeof url === "string") {
        if (url.startsWith("http")) return url;
        return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
      }
    }
    return "/images/products/kite.jpg";
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="serif italic">Preparing for takeoff...</div>
    </div>
  );

  if (!product) return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '160px' }}>
      <h1 className="serif">Flight Cancelled.</h1>
      <p className="text-muted uppercase text-xs tracking-widest" style={{ marginTop: '20px', marginBottom: '40px' }}>The gear you seek is off-radar.</p>
      <button onClick={() => navigate('/products')} className="btn btn-black">Back to Fleet</button>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>

        {/* Thumbnails */}
        <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[...Array(3)].map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              style={{
                aspectRatio: '1/1', border: activeImage === i ? '1px solid black' : '1px solid var(--gray-light)',
                padding: '10px', background: 'var(--gray-light)'
              }}
            >
              <img src={getImageUrl(product, i)} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div style={{ gridColumn: 'span 6', background: 'var(--gray-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
          <img
            src={getImageUrl(product, activeImage)}
            alt={product.name}
            style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
          />
        </div>

        {/* Info */}
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <span className="text-xs uppercase tracking-widest text-muted">Elite Collection</span>
            <h1 style={{ fontSize: '60px', marginTop: '20px' }}>{product.name}<span style={{ fontStyle: 'normal' }}>.</span></h1>
            <p className="serif italic text-muted" style={{ fontSize: '24px', marginTop: '10px' }}>₹{product.price}</p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest" style={{ marginBottom: '16px' }}>Description</h4>
            <p className="text-muted serif italic" style={{ lineHeight: 1.6 }}>
              {product.description || "The pinnacle of high-altitude performance. Meticulously crafted for stability and grace in the most demanding atmospheric conditions."}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '60px', padding: '30px 0', borderTop: '1px solid var(--gray-light)', borderBottom: '1px solid var(--gray-light)' }}>
            <div>
              <span className="text-xs uppercase tracking-widest text-muted">Materials</span>
              <p className="text-xs uppercase" style={{ fontWeight: 900, marginTop: '8px' }}>Carbon / Ripstop</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-muted">Aero Class</span>
              <p className="text-xs uppercase" style={{ fontWeight: 900, marginTop: '8px' }}>Elite Light</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-xs uppercase tracking-widest">Quantity</span>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ fontSize: '20px' }}>-</button>
                <span style={{ fontWeight: 900 }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ fontSize: '20px' }}>+</button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn btn-black"
              style={{ padding: '24px', fontSize: '12px' }}
            >
              Add to Expedition Bag
            </button>
          </div>

          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <TruckIcon style={{ width: 20, color: 'var(--gray-mid)' }} />
              <span className="text-xs uppercase tracking-widest text-muted">Global Dispatch</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheckIcon style={{ width: 20, color: 'var(--gray-mid)' }} />
              <span className="text-xs uppercase tracking-widest text-muted">Aero Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
