import React, { useEffect, useState } from "react";
// import { productImages } from "../../utils/productImages";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import './Admin.css';
import { useNavigate } from "react-router-dom";
import {
  PlusIcon, ArrowLeftIcon,
  CubeIcon, XMarkIcon, PencilSquareIcon
} from "@heroicons/react/24/outline";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "", description: "", price: "", stock: "", category: ""
  });
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products || res.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_BASE_URL}/admin/products/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.map((p) => p._id === id ? res.data.data : p));
      setEditingId(null);
    } catch (error) {
      alert("Update failed.");
    }
  };

  const s = {
    container: { backgroundColor: 'var(--bg-base)', minHeight: '100vh', padding: '160px 24px 80px', fontFamily: 'var(--font-sans)' },
    wrapper: { maxWidth: '1400px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' },
    title: { fontSize: ' clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: 'var(--slate-800)', margin: 0, letterSpacing: '-2px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' },
    card: (isEditing) => ({
      padding: '24px',
      border: isEditing ? '2px solid var(--accent)' : '1px solid var(--border-soft)',
      display: 'flex', flexDirection: 'column'
    }),
    imageWrapper: { position: 'relative', marginBottom: '20px' },
    img: { width: '100%', height: '240px', borderRadius: '18px', objectFit: 'cover', backgroundColor: '#f1f5f9' },
    badge: (stock) => ({
      position: 'absolute', top: '12px', right: '12px',
      fontSize: '10px', fontWeight: '900', padding: '6px 12px', borderRadius: '50px',
      backgroundColor: stock < 5 ? '#fee2e2' : 'rgba(59, 130, 246, 0.1)',
      color: stock < 5 ? '#991b1b' : 'var(--accent)',
      textTransform: 'uppercase', letterSpacing: '0.5px',
      backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)'
    }),
    inputGroup: { marginBottom: '16px' },
    label: { display: 'block', fontSize: '10px', fontWeight: '900', color: 'var(--slate-400)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' },
    input: {
      width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--border-soft)',
      fontSize: '14px', outline: 'none', background: 'var(--bg-base)', color: 'var(--slate-800)',
      fontWeight: '600', transition: '0.3s'
    },
    btnPrimary: {
      backgroundColor: 'var(--accent)', color: 'white', padding: '14px 28px', borderRadius: '16px',
      border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
      boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)', transition: '0.3s', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px'
    },
    btnModify: {
      width: '100%', padding: '12px', borderRadius: '14px', border: '1px solid var(--border-soft)',
      backgroundColor: 'white', color: 'var(--slate-800)', fontWeight: '800', cursor: 'pointer',
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: '0.3s',
      fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px'
    }
  };

  if (loading) return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh', backgroundColor: 'var(--bg-base)' }}>
      <CubeIcon width={50} style={{ color: 'var(--accent)', opacity: 0.5 }} />
      <p style={{ marginTop: '20px', fontWeight: '800', color: 'var(--slate-400)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px' }}>Loading Inventory...</p>
    </div>
  );

  return (
    <div className="admin-container" style={{ backgroundColor: 'var(--bg-base)' }}>
      <style>{`
        @media (max-width: 600px) {
          .admin-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .admin-product-card {
            padding: 10px !important;
            border-radius: 12px !important;
          }
          .admin-product-img {
            height: 120px !important;
          }
          .admin-product-name {
            font-size: 14px !important;
          }
          .admin-product-price {
            font-size: 16px !important;
          }
        }
      `}</style>
      <div style={s.wrapper}>
        <header className="admin-header">
          <div>
            <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px' }}>
              <ArrowLeftIcon width={16} /> Back to Dashboard
            </button>
            <h1 style={s.title}>Product Inventory<span style={{ color: 'var(--accent)' }}>.</span></h1>
          </div>
          <button onClick={() => navigate('/admin/add-product')} style={s.btnPrimary}>
            <PlusIcon width={20} /> Add Product
          </button>
        </header>

        <div className="admin-product-grid">
          {products.map((p) => {
            const isEditing = editingId === p._id;
            return (
              <div key={p._id} className="floating-card" style={s.card(isEditing)}>
                <div style={s.imageWrapper}>
                  <img src={p.mainImage || `../uploads/${p._id}/main.jpg`}
                    alt={p.name} style={s.img} className="admin-product-img" />
                  <span style={s.badge(p.stock)}>
                    {p.stock < 5 ? 'Critical Stock: ' : ''}{p.stock} units
                  </span>
                </div>

                {!isEditing ? (
                  /* NORMAL DISPLAY STATE */
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ marginBottom: '20px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.category}</span>
                      <h3 className="admin-product-name" style={{ fontSize: '20px', fontWeight: '900', color: 'var(--slate-800)', marginTop: '8px', letterSpacing: '-0.5px' }}>{p.name}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--slate-600)', marginTop: '10px', lineHeight: '1.7' }}>{p.description}</p>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--border-soft)' }}>
                      <span className="admin-product-price" style={{ fontSize: '22px', fontWeight: '900', color: 'var(--accent)' }}>₹{p.price.toLocaleString()}</span>
                      <button
                        onClick={() => {
                          setEditingId(p._id);
                          setEditData({
                            name: p.name, description: p.description || "",
                            price: p.price, stock: p.stock, category: p.category || ""
                          });
                        }}
                        style={{ ...s.btnModify, width: 'auto', padding: '8px 16px' }}
                      >
                        <PencilSquareIcon width={18} /> Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  /* EDITING STATE - FORM PREFILLED */
                  <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Product Name</label>
                      <input style={s.input} value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                    </div>

                    <div style={s.inputGroup}>
                      <label style={s.label}>Category</label>
                      <input style={s.input} value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
                    </div>

                    <div style={s.inputGroup}>
                      <label style={s.label}>Description</label>
                      <textarea
                        style={{ ...s.input, height: '70px', resize: 'none', fontFamily: 'inherit' }}
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={s.label}>Price (₹)</label>
                        <input type="number" style={s.input} value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={s.label}>Stock</label>
                        <input type="number" style={s.input} value={editData.stock} onChange={(e) => setEditData({ ...editData, stock: e.target.value })} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                      <button onClick={() => handleUpdate(p._id)} style={{ ...s.btnPrimary, flex: 1, justifyContent: 'center' }}>Save Changes</button>
                      <button onClick={() => setEditingId(null)} style={{ ...s.btnPrimary, backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-soft)', color: 'var(--slate-400)', boxShadow: 'none' }}><XMarkIcon width={20} /></button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;