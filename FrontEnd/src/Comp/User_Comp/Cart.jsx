import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Trash2, ChevronLeft, ShoppingBag, ArrowRight, Loader2, Heart } from "lucide-react";
import API_BASE_URL from "../../utils/config.js";

// Define styles object with Anti-Gravity aesthetic
const styles = {
  page: {
    background: "var(--bg-base)",
    minHeight: "100vh",
    padding: "140px 16px 80px",
    color: "var(--slate-800)",
    fontFamily: "var(--font-sans)"
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto"
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    border: 'none',
    background: 'none',
    fontSize: 11,
    fontWeight: 900,
    color: 'var(--slate-400)',
    cursor: 'pointer',
    marginBottom: 24,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: '0.3s'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: 60,
    alignItems: 'start'
  },
  leftCol: { width: '100%' },
  rightCol: { width: '100%' },
  mainTitle: {
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    fontWeight: 900,
    marginTop: 10,
    letterSpacing: '-2px',
    color: 'var(--slate-800)'
  },
  subtitle: {
    color: 'var(--slate-600)',
    marginTop: 8,
    fontSize: 16
  },
  sectionCard: {
    background: 'var(--bg-card)',
    padding: '40px',
    borderRadius: 32,
    border: '1px solid var(--border-soft)',
    boxShadow: 'var(--shadow-floating)',
    marginBottom: 32
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    gap: 10
  },
  iconHeading: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 900,
    fontSize: 11,
    color: 'var(--accent)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  summaryCard: {
    background: 'var(--bg-card)',
    color: 'var(--slate-800)',
    padding: '40px',
    borderRadius: 32,
    border: '1px solid var(--border-soft)',
    boxShadow: 'var(--shadow-floating)'
  },
  cartList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    color: 'var(--slate-600)'
  },
  divider: {
    height: 1,
    background: 'var(--border-soft)',
    margin: '32px 0'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 40
  },
  totalAmount: {
    fontWeight: "900",
    fontSize: "28px",
    color: "var(--slate-800)",
    letterSpacing: "-1px"
  },
  orderBtn: {
    width: '100%',
    padding: '22px',
    borderRadius: 20,
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    fontWeight: '900',
    cursor: 'pointer',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
    transition: '0.4s'
  },
  emptyCart: {
    textAlign: "center",
    paddingTop: "80px",
  },
  emptyIcon: {
    color: "var(--slate-400)",
  },
  emptyTitle: {
    fontSize: "24px",
    margin: "16px 0",
    fontWeight: "900",
    color: "var(--slate-800)"
  },
  browseLink: {
    color: "var(--accent)",
    fontWeight: "900",
    textDecoration: "none",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
};

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [logistics, setLogistics] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  const token = localStorage.getItem("token");

  const normalize = (s = "") => s.toLowerCase();

  const getDeliveryCharge = (items = []) => {
    if (!Array.isArray(items) || items.length === 0) return 0;

    let kiteQty = 0;
    let hasBag3 = false;
    let hasBag6 = false;
    let hasCover = false;
    let hasOswal = false;
    let hasStand = false;
    let hasManjha = false;

    const types = items.map(i =>
      normalize(i.productId?.category || i.productId?.name || "")
    );

    const only = (key) => types.length > 0 && types.every(t => t.includes(key));

    items.forEach(item => {
      const name = normalize(item.productId?.name || "");
      const category = normalize(item.productId?.category || "");

      if (category === "kite") kiteQty += item.quantity;
      if (name.includes("Kiteasm Kite Bag")) hasBag3 = true;
      if (name.includes("3inch")) hasBag3 = true;
      if (name.includes("6inch")) hasBag6 = true;
      if (name.includes("3x Manjha Cover")) hasCover = true;
      if (name.includes("Oswal No3")) hasOswal = true;
      if (name.includes("Stand")) hasStand = true;
      if (name.includes("manjha")) hasManjha = true;
    });

    if (only("manjha")) {
      return items.reduce((sum, i) => sum + (i.quantity * 200), 0);
    }

    if (hasManjha && hasCover && hasOswal) return 200;
    if (hasStand && hasCover) return 200;
    if (hasOswal && hasCover) return 200;

    if (kiteQty > 0) {
      if (hasBag6) return Math.ceil(kiteQty / 250) * 600;
      if (hasBag3) return Math.ceil(kiteQty / 150) * 600;
    }

    if (only("tape")) return 49;
    if (only("3x Manjha Cover")) return 99;
    if (only("Oswal No3")) return 149;
    if (only("kite")) return 450;

    return 250;
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await axios.get(`${API_BASE_URL}/user/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const items = res.data.cart?.items || res.data.items || [];
      setCart(items);
      calculateTotals(items);
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (items) => {
    if (!Array.isArray(items)) return;

    const itemTotal = items.reduce((acc, item) => {
      const price = item.productId?.price || 0;
      return acc + (price * item.quantity);
    }, 0);

    const shipTotal = getDeliveryCharge(items);

    setSubtotal(itemTotal);
    setLogistics(shipTotal);
  };

  const fetchWishlist = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/my-wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems(res.data.products?.map(p => p._id) || []);
    } catch (error) {
      console.error("Wishlist fetch failed:", error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/toggle-wishlist`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200 || res.status === 201) {
        setWishlistItems(prev =>
          prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
        );
      }
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  const removeItem = async (productId) => {
    if (!productId) return;
    setDeletingId(productId);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/user/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedCart = cart.filter(item => item.productId?._id !== productId);
      setCart(updatedCart);
      calculateTotals(updatedCart);
    } catch (err) {
      console.error("Remove item error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return (
    <div style={styles.loading}>
      <Loader2 className="animate-spin" size={40} color="var(--accent)" />
    </div>
  );

  const totalAmount = subtotal + logistics;

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }

        @media (max-width: 768px) {
          .cart-page {
            padding: 120px 12px 60px !important;
          }
          .cart-section-card {
            padding: 24px !important;
            border-radius: 24px !important;
          }
          .cart-item-wrapper {
            gap: 16px !important;
          }
          .cart-item-image {
            width: 60px !important;
            height: 60px !important;
          }
          .cart-item-title {
            font-size: 14px !important;
          }
          .cart-summary-card {
            padding: 24px !important;
            border-radius: 24px !important;
          }
          .cart-order-btn {
            padding: 18px !important;
            font-size: 12px !important;
          }
          .cart-main-title {
            font-size: 1.8rem !important;
          }
        }

        @media (max-width: 480px) {
          .cart-item-wrapper {
            gap: 12px !important;
          }
          .cart-item-image {
            width: 50px !important;
            height: 50px !important;
          }
          .cart-section-card {
            padding: 20px !important;
          }
        }
      `}</style>
      <div style={styles.page} className="cart-page">
        <div style={styles.container}>
          <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
            <ChevronLeft size={16} /> Back to Catalog
          </button>

          <header style={{ marginBottom: 60 }}>
            <h1 className="main-title cart-main-title" style={styles.mainTitle}>Your Cart<span style={{ color: 'var(--accent)' }}>.</span></h1>
            <p style={styles.subtitle}>Review your selected items before proceeding to checkout.</p>
          </header>

          {cart.length > 0 ? (
            <div style={styles.layout} className="cart-layout">
              <div style={styles.leftCol}>
                <div style={styles.sectionCard} className="cart-section-card">
                  <div style={styles.cardHeader}>
                    <div style={styles.iconHeading}>
                      <ShoppingBag size={16} />
                      <span>Your Items</span>
                    </div>
                  </div>
                  <div style={styles.cartList}>
                    {cart.map((item) => (
                      <div key={item.productId?._id} className="cart-item-wrapper" style={{ display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 20, borderBottom: '1px solid var(--border-soft)', marginBottom: 20 }}>
                        <div className="cart-item-image" style={{ width: 80, height: 80, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-soft)', flexShrink: 0 }}>
                          <img
                            src={`../uploads/${item.productId._id}/main.jpg`}
                            alt="product"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 className="cart-item-title" style={{ margin: 0, fontSize: 16, fontWeight: 900, color: 'var(--slate-800)', letterSpacing: '-0.5px' }}>{item.productId?.name}</h3>
                          <p style={{ margin: '4px 0', fontSize: 15, color: 'var(--accent)', fontWeight: '800' }}>₹{item.productId?.price}</p>
                          <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--slate-400)' }}>UNIT COUNT: {item.quantity}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                          <button
                            onClick={() => toggleWishlist(item.productId?._id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: wishlistItems.includes(item.productId?._id) ? 'var(--accent)' : 'var(--slate-400)',
                              transition: '0.3s'
                            }}
                          >
                            <Heart size={20} fill={wishlistItems.includes(item.productId?._id) ? "var(--accent)" : "none"} />
                          </button>
                          <button
                            onClick={() => removeItem(item.productId?._id)}
                            disabled={deletingId === item.productId?._id}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', transition: '0.3s' }}
                          >
                            {deletingId === item.productId?._id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={styles.rightCol}>
                <div style={styles.summaryCard} className="cart-summary-card">
                  <div style={styles.cardHeader}>
                    <div style={styles.iconHeading}>
                      <ArrowRight size={16} />
                      <span>Shipment Manifest</span>
                    </div>
                  </div>
                  <div style={styles.cartList}>
                    <div style={styles.cartItem}>
                      <span style={{ fontWeight: '600' }}>Inventory Subtotal</span>
                      <span style={{ fontWeight: 900, color: 'var(--slate-800)' }}>₹{subtotal}</span>
                    </div>
                    <div style={styles.cartItem}>
                      <span style={{ fontWeight: '600' }}>Logistics & Handling</span>
                      <span style={{ fontWeight: 900, color: 'var(--slate-800)' }}>₹{logistics}</span>
                    </div>
                  </div>
                  <div style={styles.divider}></div>
                  <div style={styles.totalRow}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 10, color: 'var(--slate-400)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>TOTAL PAYABLE</span>
                      <span style={styles.totalAmount}>₹{totalAmount}</span>
                    </div>
                  </div>
                  <button onClick={() => navigate("/checkout")} style={styles.orderBtn} className="cart-order-btn">
                    Authorize Fulfillment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.emptyCart}>
              <ShoppingBag size={48} style={styles.emptyIcon} />
              <h2 style={styles.emptyTitle}>Cart is Empty</h2>
              <Link to="/products" style={styles.browseLink}>Browse the Collection</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;