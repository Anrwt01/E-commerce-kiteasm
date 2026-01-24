import React, { useEffect, useState } from "react";
import { productImages } from "../../utils/productImages";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  TrashIcon, PlusIcon, ArrowLeftIcon, 
  CubeIcon, CheckIcon, XMarkIcon, PencilSquareIcon 
} from "@heroicons/react/24/outline";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ price: "", stock: "" });
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
            await axios.put(`http://localhost:5000/api/admin/products/${id}`, editData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products.map((p) => 
                p._id === id ? { ...p, price: Number(editData.price), stock: Number(editData.stock) } : p
            ));
            setEditingId(null);
        } catch (error) {
            alert("Update failed.");
        }
    };

    const styles = {
        container: { backgroundColor: '#fdfdfe', minHeight: '100vh', padding: '120px 40px' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
        card: (isEditing) => ({
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '16px',
            border: isEditing ? '2px solid #0ea5e9' : '1px solid #f1f5f9',
            boxShadow: isEditing ? '0 10px 30px -10px rgba(14, 165, 233, 0.2)' : '0 2px 4px rgba(0,0,0,0.02)',
            transition: 'all 0.2s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }),
        img: { width: '100%', height: '160px', borderRadius: '12px', objectFit: 'cover', backgroundColor: '#f8fafc' },
        badge: (stock) => ({
            fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '6px',
            backgroundColor: stock < 5 ? '#fff1f2' : '#f0fdf4',
            color: stock < 5 ? '#e11d48' : '#16a34a'
        }),
        input: {
            width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0',
            fontSize: '13px', fontWeight: '700', outline: 'none', color: '#1e293b'
        }
    };

    if (loading) return <div style={{ textAlign: 'center', paddingTop: '200px' }}><CubeIcon width={40} className="animate-spin" /></div>;

    return (
        <div style={styles.container}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <button onClick={() => navigate('/admin')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '700', fontSize: '12px', marginBottom: '8px' }}>
                            <ArrowLeftIcon width={14} /> BACK
                        </button>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Inventory</h1>
                    </div>
                    <button onClick={() => navigate('/admin/add-product')} style={{ backgroundColor: '#0f172a', color: 'white', padding: '12px 20px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <PlusIcon width={18} /> NEW ITEM
                    </button>
                </header>

                <div style={styles.grid}>
                    {products.map((p) => {
                        const isEditing = editingId === p._id;
                        return (
                            <div key={p._id} style={styles.card(isEditing)}>
                                <img src={productImages[p.images?.[0]?.url]} alt={p.name} style={styles.img} />
                                
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                                        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{p.name}</h3>
                                        <span style={styles.badge(p.stock)}>{p.stock} units</span>
                                    </div>
                                    <span style={{ fontSize: '16px', fontWeight: '900', color: '#0ea5e9' }}>₹{p.price}</span>
                                </div>

                                {isEditing ? (
                                    <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', marginTop: '4px', animation: 'slideIn 0.2s ease' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ fontSize: '9px', fontWeight: '800', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>PRICE</label>
                                                <input type="number" style={styles.input} value={editData.price} onChange={(e) => setEditData({...editData, price: e.target.value})} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ fontSize: '9px', fontWeight: '800', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>STOCK</label>
                                                <input type="number" style={styles.input} value={editData.stock} onChange={(e) => setEditData({...editData, stock: e.target.value})} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                                            <button onClick={() => handleUpdate(p._id)} style={{ flex: 1, backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}>SAVE</button>
                                            <button onClick={() => setEditingId(null)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}><XMarkIcon width={16} /></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                        <button 
                                            onClick={() => { setEditingId(p._id); setEditData({ price: p.price, stock: p.stock }); }} 
                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: '700', fontSize: '11px', cursor: 'pointer' }}
                                        >
                                            <PencilSquareIcon width={14} /> MODIFY
                                        </button>
                                        <button style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                                            <TrashIcon width={14} />
                                        </button>
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