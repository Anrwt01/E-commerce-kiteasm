import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { productImages } from "../../utils/productImages";
import axios from "axios";
import { Trash2, ChevronLeft, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";

// Define styles object with responsive design
const styles = {
  container: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    color: "#000000",
  },
  main: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "140px 24px 80px",
  },
  header: {
    marginBottom: "40px",
  },
  backButton: {
    background: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    marginTop: "16px",
  },
  // Styles moved to injected block for media query support
  cartItems: {
    // No specific styles, just container
  },
  cartItem: {
    background: "#F9F9F9",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "16px",
  },
  itemImage: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    overflow: "hidden",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    margin: 0,
    fontSize: "16px",
  },
  itemPrice: {
    fontWeight: "800",
  },
  itemQty: {
    fontSize: "12px",
    color: "#666666",
  },
  removeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  orderSummary: {
    background: "#F9F9F9",
    borderRadius: "24px",
    padding: "30px",
    height: "fit-content",
  },
  summaryTitle: {
    fontWeight: "800",
  },
  summaryDetails: {
    marginTop: "24px",
    borderBottom: "1px solid #EEEEEE",
    paddingBottom: "16px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  totalAmount: {
    fontWeight: "800",
    fontSize: "20px",
  },
  checkoutButton: {
    width: "100%",
    padding: "18px",
    background: "#000000",
    color: "#ffffff",
    borderRadius: "12px",
    fontWeight: "700",
    marginTop: "24px",
    cursor: "pointer",
  },
  emptyCart: {
    textAlign: "center",
    paddingTop: "80px",
  },
  emptyIcon: {
    color: "#CCCCCC",
  },
  emptyTitle: {
    fontSize: "24px",
    margin: "16px 0",
  },
  browseLink: {
    color: "#000000",
    fontWeight: "700",
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

  const normalize = (s = "") => s.toLowerCase();

  // FIXED: This function now safely handles the whole array
  const getDeliveryCharge = (items = []) => {
    // Safety check to ensure items is an array
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
    const has = (key) => types.some(t => t.includes(key));

    items.forEach(item => {
      const name = normalize(item.productId?.name || "");
      const category = normalize(item.productId?.category || "");

      if (category === "kite") kiteQty += item.quantity;
      if (name.includes("3inch")) hasBag3 = true;
      if (name.includes("6inch")) hasBag6 = true;
      if (name.includes("Cover")) hasCover = true;
      if (name.includes("Oswal")) hasOswal = true;
      if (name.includes("Stand")) hasStand = true;
      if (name.includes("manjha")) hasManjha = true;
    });

    // 1️⃣ Per-unit Manjha rule (ONLY manjha in cart)
    if (only("manjha")) {
      return items.reduce((sum, i) => sum + (i.quantity * 200), 0);
    }

    // 2️⃣ Combination flat-rate rules
    if (hasManjha && hasCover && hasOswal) return 200;
    if (hasStand && hasCover) return 200;
    if (hasOswal && hasCover) return 200;

    // 3️⃣ Bag + Kite bulk rules
    if (kiteQty > 0) {
      if (hasBag6) return Math.ceil(kiteQty / 250) * 600;
      if (hasBag3) return Math.ceil(kiteQty / 150) * 600;
    }

    // 4️⃣ Single-product flat cart rules
    if (only("tape")) return 49;
    if (only("cover")) return 99;
    if (only("oswal")) return 149;
    if (only("kite")) return 450;

    return 250;
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await axios.get("http://localhost:5000/api/user/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(res)
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

    // FIXED: Call the function ONCE for the whole cart
    const shipTotal = getDeliveryCharge(items);

    setSubtotal(itemTotal);
    setLogistics(shipTotal);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    if (!productId) return;
    setDeletingId(productId);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/user/cart/remove/${productId}`, {
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
      <Loader2 className="animate-spin" size={40} />
    </div>
  );

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <header style={styles.header}>
          <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
            <ChevronLeft size={18} /> Back to Catalog
          </button>
          <h1 style={styles.title}>Your Cart.</h1>
        </header>

        {cart.length > 0 ? (
          <div style={styles.cartGrid}>
            <div style={styles.cartItems}>
              {cart.map((item) => (
                <div key={item.productId?._id} style={styles.cartItem}>
                  <div style={styles.itemImage}>
                    <img
                      src={`../uploads/${item.productId._id}/main.jpg`}
                      alt="product"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemName}>{item.productId?.name}</h3>
                    <p style={styles.itemPrice}>₹{item.productId?.price}</p>
                    <span style={styles.itemQty}>QTY: {item.quantity}</span>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId?._id)}
                    disabled={deletingId === item.productId?._id}
                    style={styles.removeButton}
                  >
                    {deletingId === item.productId?._id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                  </button>
                </div>
              ))}
            </div>

            <aside style={styles.orderSummary}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              <div style={styles.summaryDetails}>
                <div style={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: "600" }}>₹{subtotal}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Logistics</span>
                  <span style={{ fontWeight: "600" }}>₹{logistics}</span>
                </div>
              </div>
              <div style={styles.totalRow}>
                <span style={{ fontWeight: "800" }}>Total</span>
                <span style={styles.totalAmount}>₹{subtotal + logistics}</span>
              </div>
              <button onClick={() => navigate("/checkout")} style={styles.checkoutButton}>
                Proceed to Checkout
              </button>
            </aside>
          </div>
        ) : (
          <div style={styles.emptyCart}>
            <ShoppingBag size={48} style={styles.emptyIcon} />
            <h2 style={styles.emptyTitle}>Hangar is Empty</h2>
            <Link to="/products" style={styles.browseLink}>Browse the Collection</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;