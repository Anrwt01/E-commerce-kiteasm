import React, { useEffect, useState } from "react";
import { productImages } from "../../utils/productImages";
import axios from "axios";
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
      const res = await axios.get("http://localhost:5000/api/admin/products", {
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
      const res = await axios.put(`http://localhost:5000/api/admin/products/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.map((p) => p._id === id ? res.data.data : p));
      setEditingId(null);
    } catch (error) {
      alert("Update failed.");
    }
  };

  const s = {
    container: { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '100px 20px 60px 20px' },
    wrapper: { maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' },
    title: { fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' },
    card: (isEditing) => ({
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '20px',
      border: isEditing ? '2px solid #3b82f6' : '1px solid #e2e8f0',
      boxShadow: isEditing ? '0 20px 25px -5px rgba(59, 130, 246, 0.1)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
      display: 'flex', flexDirection: 'column'
    }),
    imageWrapper: { position: 'relative', marginBottom: '16px' },
    img: { width: '100%', height: '200px', borderRadius: '12px', objectFit: 'cover', backgroundColor: '#f1f5f9' },
    badge: (stock) => ({
      position: 'absolute', top: '12px', right: '12px',
      fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px',
      backgroundColor: stock < 5 ? '#fee2e2' : '#dcfce7',
      color: stock < 5 ? '#991b1b' : '#166534',
    }),
    inputGroup: { marginBottom: '12px' },
    label: { display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', marginBottom: '4px' },
    input: {
      width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0',
      fontSize: '14px', outline: 'none'
    },
    btnPrimary: {
      backgroundColor: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '12px',
      border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
    },
    btnModify: {
      width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0',
      backgroundColor: 'white', color: '#475569', fontWeight: '600', cursor: 'pointer',
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px'
    }
  };

  if (loading) return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <CubeIcon width={50} className="animate-spin" style={{ color: '#3b82f6' }} />
    </div>
  );

  return (
    <div style={s.container}>
      <div style={s.wrapper}>
        <header style={s.header}>
          <div>
            <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <ArrowLeftIcon width={16} /> Dashboard
            </button>
            <h1 style={s.title}>Product Inventory</h1>
          </div>
          <button onClick={() => navigate('/admin/add-product')} style={s.btnPrimary}>
            <PlusIcon width={20} /> Add Product
          </button>
        </header>

        <div style={s.grid}>
          {products.map((p) => {
            const isEditing = editingId === p._id;
            return (
              <div key={p._id} style={s.card(isEditing)}>
                <div style={s.imageWrapper}>
                  <img src={productImages[p.images?.[0]?.url] || "https://via.placeholder.com/300"} alt={p.name} style={s.img} />
                  <span style={s.badge(p.stock)}>
                    {p.stock < 5 ? 'Low Stock: ' : ''}{p.stock} units
                  </span>
                </div>

                {!isEditing ? (
                  /* NORMAL DISPLAY STATE */
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase' }}>{p.category}</span>
                      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>{p.name}</h3>
                      <p style={{ fontSize: '14px', color: '#64748b', marginTop: '6px', lineHeight: '1.5' }}>{p.description}</p>
                    </div>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>₹{p.price}</span>
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
                      <input style={s.input} value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
                    </div>

                    <div style={s.inputGroup}>
                      <label style={s.label}>Category</label>
                      <input style={s.input} value={editData.category} onChange={(e) => setEditData({...editData, category: e.target.value})} />
                    </div>

                    <div style={s.inputGroup}>
                      <label style={s.label}>Description</label>
                      <textarea 
                        style={{...s.input, height: '70px', resize: 'none', fontFamily: 'inherit'}} 
                        value={editData.description} 
                        onChange={(e) => setEditData({...editData, description: e.target.value})} 
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={s.label}>Price (₹)</label>
                        <input type="number" style={s.input} value={editData.price} onChange={(e) => setEditData({...editData, price: e.target.value})} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={s.label}>Stock</label>
                        <input type="number" style={s.input} value={editData.stock} onChange={(e) => setEditData({...editData, stock: e.target.value})} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleUpdate(p._id)} style={{ ...s.btnPrimary, flex: 1, justifyContent: 'center', backgroundColor: '#3b82f6' }}>Save</button>
                      <button onClick={() => setEditingId(null)} style={{ ...s.btnPrimary, backgroundColor: '#f1f5f9', color: '#475569' }}><XMarkIcon width={20} /></button>
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