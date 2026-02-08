import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShieldCheckIcon, ArrowLeftIcon, CheckCircleIcon,
  MapPinIcon, LockClosedIcon, TruckIcon, CreditCardIcon
} from "@heroicons/react/24/outline";

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
  editBtn: {
    border: 'none',
    padding: '12px 20px',
    borderRadius: 14,
    fontSize: 10,
    fontWeight: 900,
    cursor: 'pointer',
    transition: '0.4s',
    flexShrink: 0,
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  dataDisplay: {
    background: 'var(--bg-base)',
    padding: 32,
    borderRadius: 24,
    border: '1px solid var(--border-soft)'
  },
  infoRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 32,
    marginBottom: 24
  },
  label: {
    fontSize: 10,
    fontWeight: 900,
    color: 'var(--slate-400)',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  val: {
    fontSize: 16,
    fontWeight: 900,
    margin: '0',
    color: 'var(--slate-800)'
  },
  verifiedTag: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 10,
    color: '#10b981',
    fontWeight: 900,
    marginTop: 16,
    borderTop: '1px solid var(--border-soft)',
    paddingTop: 16
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  input: {
    padding: '16px 20px',
    borderRadius: 16,
    border: '1px solid var(--border-soft)',
    outline: 'none',
    fontSize: 14,
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
    fontWeight: '600',
    transition: '0.3s'
  },
  payGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    marginTop: 32
  },
  payOption: {
    padding: '24px',
    borderRadius: 24,
    border: '2px solid var(--border-soft)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    transition: '0.4s',
    background: 'white'
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
  cartItemLayout: {
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
  secureNote: {
    textAlign: 'center',
    fontSize: 10,
    color: 'var(--slate-400)',
    marginTop: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontWeight: 900,
    letterSpacing: '1px',
    textTransform: 'uppercase'
  }
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone1: "",
    phone2: "",
    address: {
      house: "",
      galino: "",
      city: "",
      state: "",
      pincode: ""
    }
  });

  const [logisticsCost, setLogisticsCost] = useState(0);

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
      if (name.includes("3inch")) hasBag3 = true;
      if (name.includes("6inch")) hasBag6 = true;
      if (name.includes("Cover")) hasCover = true;
      if (name.includes("Oswal")) hasOswal = true;
      if (name.includes("Stand")) hasStand = true;
      if (name.includes("manjha")) hasManjha = true;
    });

    if (only("manjha")) return items.reduce((sum, i) => sum + (i.quantity * 200), 0);
    if (hasManjha && hasCover && hasOswal) return 200;
    if (hasStand && hasCover) return 200;
    if (hasOswal && hasCover) return 200;

    if (kiteQty > 0) {
      if (hasBag6) return Math.ceil(kiteQty / 250) * 600;
      if (hasBag3) return Math.ceil(kiteQty / 150) * 600;
    }

    if (only("tape")) return 49;
    if (only("cover")) return 99;
    if (only("oswal")) return 149;
    if (only("kite")) return 450;

    return 250;
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // If we have state passed from Cart, use it primarily for totals
      const stateParams = location.state || {};

      const [cartRes, userRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/user/cart`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/user/details`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const items = cartRes.data.items || [];
      setCartItems(items);

      // If state matches, use passed totals. Otherwise recalculate as fallback
      if (stateParams.totalAmount) {
        setTotalAmount(stateParams.totalAmount);
        setLogisticsCost(stateParams.logistics || 0);
      } else {
        const sub = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const ship = getDeliveryCharge(items);
        setLogisticsCost(ship);
        setTotalAmount(sub + ship);
      }

      const user = userRes.data.user;
      const addr = user?.address?.[0] || {};

      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone1: user?.phone1 || "",
        phone2: user?.phone2 || "",
        address: {
          house: addr.house || "",
          galino: addr.galino || addr.Galino || "",
          city: addr.city || "",
          state: addr.state || "",
          pincode: addr.pincode || ""
        }
      });
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("addr_")) {
      const field = name.split("_")[1];
      setFormData(prev => ({ ...prev, address: { ...prev.address, [field]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleEditAndSave = async () => {
    if (isEditing) {
      setSyncing(true);
      try {
        const token = localStorage.getItem("token");
        await axios.put(`${API_BASE_URL}/user/add-update`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        alert("Failed to sync profile updates.");
      } finally {
        setSyncing(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const handlePlaceOrder = async () => {
    if (isEditing) {
      alert("Please save your delivery coordinates.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.productId?._id || item.productId,
          productname: item.productId?.name || "Kiteasm Unit",
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount,
        name: formData.name,
        email: formData.email,
        phone1: formData.phone1,
        phone2: formData.phone2,
        address: {
          house: formData.address.house,
          Galino: formData.address.galino,
          city: formData.address.city,
          state: formData.address.state,
          pincode: formData.address.pincode
        },
        paymentMethod
      };

      const res = await axios.post(`${API_BASE_URL}/user/checkout`, orderPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const serverOrderId = res.data.orderId;
        if (paymentMethod === "Razorpay") {
          const { data: pRes } = await axios.post(
            `${API_BASE_URL}/razorpay`,
            { orderId: serverOrderId },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const options = {
            key: pRes.key,
            amount: pRes.amount,
            currency: "INR",
            name: "KITEASM",
            order_id: pRes.razorpayOrderId,
            handler: async (response) => {
              try {
                const verificationPayload = {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: serverOrderId
                };
                const { data: vRes } = await axios.post(
                  `${API_BASE_URL}/verify`,
                  verificationPayload,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                if (vRes.success) navigate("/orders", { replace: true });
              } catch (verifyErr) {
                alert("Payment succeeded but verification failed.");
              }
            },
            theme: { color: "#3b82f6" },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          navigate("/orders", { replace: true });
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Unknown Deployment Error";
      alert(`Checkout Failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeftIcon width={14} /> RETURN TO STORE
        </button>

        <div style={styles.layout}>
          {/* Details Section */}
          <div style={styles.leftCol}>
            <header style={{ marginBottom: 60 }}>
              <h1 style={styles.mainTitle}>Confirm Payment<span style={{ color: 'var(--accent)' }}>.</span></h1>
              <p style={styles.subtitle}>Confirm your delivery Address and contact nodes for fulfillment.</p>
            </header>

            <section style={styles.sectionCard}>
              <div style={styles.cardHeader}>
                <div style={styles.iconHeading}>
                  <MapPinIcon width={22} color="var(--accent)" />
                  <span>DELIVERY COORDINATES</span>
                </div>
                <button onClick={toggleEditAndSave} style={{
                  ...styles.editBtn,
                  backgroundColor: isEditing ? 'var(--accent)' : 'var(--bg-base)',
                  color: isEditing ? '#fff' : 'var(--slate-600)'
                }}>
                  {syncing ? "SYNCING..." : isEditing ? "SAVE SETTINGS" : "EDIT INFO"}
                </button>
              </div>

              {!isEditing ? (
                <div style={styles.dataDisplay}>
                  <div style={styles.infoRow}>
                    <div>
                      <span style={styles.label}>RECIPIENT</span>
                      <p style={styles.val}>{formData.name || "N/A"}</p>
                    </div>
                    <div>
                      <span style={styles.label}>PRIMARY CONTACT</span>
                      <p style={styles.val}>+91 {formData.phone1}</p>
                    </div>
                  </div>
                  <div style={styles.infoRow}>
                    <div>
                      <span style={styles.label}>DESTINATION HANGAR</span>
                      <p style={styles.val}>
                        {formData.address.house}, {formData.address.galino}<br />
                        {formData.address.city}, {formData.address.state} - {formData.address.pincode}
                      </p>
                    </div>
                    {formData.phone2 && (
                      <div>
                        <span style={styles.label}>SECONDARY CONTACT</span>
                        <p style={styles.val}>+91 {formData.phone2}</p>
                      </div>
                    )}
                  </div>
                  <div style={styles.verifiedTag}>
                    <CheckCircleIcon width={16} /> DATA SYNCHRONIZED
                  </div>
                </div>
              ) : (
                <div style={styles.formGrid}>
                  <div style={styles.inputGroup}><label style={styles.label}>Full Name</label><input name="name" value={formData.name} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label style={styles.label}>Primary Phone</label><input name="phone1" value={formData.phone1} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label style={styles.label}>Secondary Phone</label><input name="phone2" value={formData.phone2} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label style={styles.label}>House/Apt</label><input name="addr_house" value={formData.address.house} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label style={styles.label}>Street/Gali</label><input name="addr_galino" value={formData.address.galino} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label style={styles.label}>City</label><input name="addr_city" value={formData.address.city} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label style={styles.label}>State</label><input name="addr_state" value={formData.address.state} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label style={styles.label}>Pincode</label><input name="addr_pincode" value={formData.address.pincode} onChange={handleChange} style={styles.input} /></div>
                </div>
              )}
            </section>

            <section style={styles.sectionCard}>
              <div style={styles.iconHeading}>
                <CreditCardIcon width={22} color="var(--accent)" /> <span>PAYMENT GATEWAY</span>
              </div>
              <div style={styles.payGrid}>
                <div
                  onClick={() => setPaymentMethod("Razorpay")}
                  style={{
                    ...styles.payOption,
                    borderColor: paymentMethod === 'Razorpay' ? 'var(--accent)' : 'var(--border-soft)',
                    boxShadow: paymentMethod === 'Razorpay' ? '0 10px 25px rgba(59, 130, 246, 0.1)' : 'none'
                  }}
                >
                  <ShieldCheckIcon width={24} color={paymentMethod === 'Razorpay' ? 'var(--accent)' : 'var(--slate-400)'} />
                  <div>
                    <b style={{ color: paymentMethod === 'Razorpay' ? 'var(--slate-800)' : 'var(--slate-600)' }}>Digital Transmission</b>
                    <p style={{ margin: 0, fontSize: 11, color: 'var(--slate-400)' }}>UPI, Cards, NetBanking</p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("COD")}
                  style={{
                    ...styles.payOption,
                    borderColor: paymentMethod === 'COD' ? 'var(--accent)' : 'var(--border-soft)',
                    boxShadow: paymentMethod === 'COD' ? '0 10px 25px rgba(59, 130, 246, 0.1)' : 'none'
                  }}
                >
                  <TruckIcon width={24} color={paymentMethod === 'COD' ? 'var(--accent)' : 'var(--slate-400)'} />
                  <div>
                    <b style={{ color: paymentMethod === 'COD' ? 'var(--slate-800)' : 'var(--slate-600)' }}>Arrival Settlement</b>
                    <p style={{ margin: 0, fontSize: 11, color: 'var(--slate-400)' }}>Pay on Delivery</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side: Order Summary */}
          <div style={styles.rightCol}>
            <div style={styles.summaryCard}>
              <header style={styles.cardHeader}>
                <div style={styles.iconHeading}>
                  <TruckIcon width={16} />
                  <span>Inventory Summary</span>
                </div>
              </header>

              <div style={styles.cartList}>
                {cartItems.map((item, i) => (
                  <div key={i} style={styles.cartItemLayout}>
                    <span style={{ flex: 1, fontWeight: '800', color: 'var(--slate-800)' }}>{item.productId?.name} <small style={{ color: 'var(--slate-400)', marginLeft: '8px' }}>UNIT COUNT: {item.quantity}</small></span>
                    <span style={{ fontWeight: 900, color: 'var(--accent)' }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>



              <div style={styles.totalRow}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 10, color: 'var(--slate-400)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>TOTAL PAYABLE</span>
                  <span style={{ fontSize: 32, fontWeight: 900, color: 'var(--slate-800)', letterSpacing: '-1.5px' }}>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || isEditing}
                style={{ ...styles.orderBtn, opacity: (loading || isEditing) ? 0.6 : 1 }}
              >
                {loading ? "PROCESSING..." : (
                  paymentMethod === "COD" ? "CONFIRM ORDER" : "PAY"
                )}
              </button>

              <p style={styles.secureNote}>
                <LockClosedIcon width={14} />
                <span>SECURE CHECKOUT GATEWAY</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;