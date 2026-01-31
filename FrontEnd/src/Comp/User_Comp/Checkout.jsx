import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon, ArrowLeftIcon, CheckCircleIcon,
  MapPinIcon, LockClosedIcon, TruckIcon, CreditCardIcon
} from "@heroicons/react/24/outline";

const Checkout = () => {
  const navigate = useNavigate();

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

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [cartRes, userRes] = await Promise.all([
        axios.get("http://localhost:5000/api/user/cart", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:5000/api/user/details", { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setCartItems(cartRes.data.items || []);
      setTotalAmount(cartRes.data.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0);

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
        await axios.put("http://localhost:5000/api/user/add-update", formData, {
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

      const res = await axios.post("http://localhost:5000/api/user/checkout", orderPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const serverOrderId = res.data.orderId;
        if (paymentMethod === "Razorpay") {
          const { data: pRes } = await axios.post(
            "http://localhost:5000/api/razorpay",
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
                  "http://localhost:5000/api/verify",
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
      <style>{`
        @media (max-width: 992px) {
          .checkout-layout { grid-template-columns: 1fr !important; gap: 30px !important; }
          .right-col-container { margin-top: 0 !important; }
          .main-title { font-size: 32px !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .info-row { grid-template-columns: 1fr !important; }
          .pay-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeftIcon width={14} /> RETURN TO STORE
        </button>

        <div className="checkout-layout" style={styles.layout}>
          {/* Details Section */}
          <div style={styles.leftCol}>
            <header style={{ marginBottom: 40 }}>
              <h1 className="main-title" style={styles.mainTitle}>Finalize Deployment<span style={{ color: '#3b82f6' }}>.</span></h1>
              <p style={styles.subtitle}>Confirm your delivery coordinates and contact nodes.</p>
            </header>

            <section style={styles.sectionCard}>
              <div style={styles.cardHeader}>
                <div style={styles.iconHeading}>
                  <MapPinIcon width={22} color="#3b82f6" />
                  <span>DELIVERY COORDINATES</span>
                </div>
                <button onClick={toggleEditAndSave} style={{
                  ...styles.editBtn,
                  backgroundColor: isEditing ? '#3b82f6' : '#f1f5f9',
                  color: isEditing ? '#fff' : '#475569'
                }}>
                  {syncing ? "SYNCING..." : isEditing ? "SAVE SETTINGS" : "EDIT INFO"}
                </button>
              </div>

              {!isEditing ? (
                <div style={styles.dataDisplay}>
                  <div className="info-row" style={styles.infoRow}>
                    <div style={styles.infoBlock}>
                      <span style={styles.label}>RECIPIENT</span>
                      <p style={styles.val}>{formData.name || "N/A"}</p>
                    </div>
                    <div style={styles.infoBlock}>
                      <span style={styles.label}>PRIMARY CONTACT</span>
                      <p style={styles.val}>+91 {formData.phone1}</p>
                    </div>
                  </div>
                  <div className="info-row" style={styles.infoRow}>
                    <div style={styles.infoBlock}>
                      <span style={styles.label}>DESTINATION HANGAR</span>
                      <p style={styles.val}>
                        {formData.address.house}, {formData.address.galino}<br />
                        {formData.address.city}, {formData.address.state} - {formData.address.pincode}
                      </p>
                    </div>
                    {formData.phone2 && (
                      <div style={styles.infoBlock}>
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
                <div className="form-grid" style={styles.formGrid}>
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
                <CreditCardIcon width={22} color="#3b82f6" /> <span>PAYMENT METHOD</span>
              </div>
              <div className="pay-grid" style={styles.payGrid}>
                <div
                  onClick={() => setPaymentMethod("Razorpay")}
                  style={{
                    ...styles.payOption,
                    borderColor: paymentMethod === 'Razorpay' ? '#3b82f6' : '#e2e8f0',
                    backgroundColor: paymentMethod === 'Razorpay' ? '#eff6ff' : '#fff'
                  }}
                >
                  <ShieldCheckIcon width={24} />
                  <div>
                    <b>Online Payment</b>
                    <p style={{ margin: 0, fontSize: 11 }}>UPI, Cards, NetBanking</p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("COD")}
                  style={{
                    ...styles.payOption,
                    borderColor: paymentMethod === 'COD' ? '#3b82f6' : '#e2e8f0',
                    backgroundColor: paymentMethod === 'COD' ? '#eff6ff' : '#fff'
                  }}
                >
                  <TruckIcon width={24} />
                  <div>
                    <b>COD</b>
                    <p style={{ margin: 0, fontSize: 11 }}>Pay on Delivery</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side: Order Summary */}
          <div className="right-col-container" style={styles.rightCol}>
            <div style={styles.summaryCard}>
              <h3 style={{ fontSize: 12, letterSpacing: 1.5, color: '#94a3b8', marginBottom: 24, fontWeight: 900 }}>INVENTORY SUMMARY</h3>
              <div style={styles.cartList}>
                {cartItems.map((item, i) => (
                  <div key={i} style={styles.cartItem}>
                    <span style={{flex: 1}}>{item.productId?.name} <small style={{color: '#64748b'}}>x{item.quantity}</small></span>
                    <span style={{fontWeight: 700, color: '#fff'}}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div style={styles.divider} />
              
              <div style={styles.totalRow}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span style={{fontSize: 10, color: '#64748b', fontWeight: 800}}>TOTAL PAYABLE</span>
                    <span style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>₹{totalAmount}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder} 
                disabled={loading || isEditing} 
                style={{ ...styles.orderBtn, opacity: (loading || isEditing) ? 0.6 : 1 }}
              >
                {loading ? "PROCESSING..." : (
                  paymentMethod === "COD" ? "CONFIRM ORDER" : "AUTHORIZE PAYMENT"
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

const styles = {
  page: { background: "#f8fafc", minHeight: "100vh", padding: "40px 16px", color: "#1e293b" },
  container: { maxWidth: 1100, margin: "0 auto" },
  backBtn: { display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'none', fontSize: 11, fontWeight: 800, color: '#94a3b8', cursor: 'pointer', marginBottom: 24 },
  layout: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' },
  leftCol: { width: '100%' },
  rightCol: { width: '100%', marginTop: '100px' }, // Increased top margin for laptop screens
  mainTitle: { fontSize: 42, fontWeight: 800, marginTop: 10, letterSpacing: '-1.5px' },
  subtitle: { color: '#64748b', marginTop: 8, fontSize: 15 },
  sectionCard: { background: '#fff', padding: '32px', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', marginBottom: 24 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 10 },
  iconHeading: { display: 'flex', alignItems: 'center', gap: 10, fontWeight: 900, fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' },
  editBtn: { border: 'none', padding: '10px 18px', borderRadius: 10, fontSize: 10, fontWeight: 800, cursor: 'pointer', transition: '0.2s', flexShrink: 0 },
  dataDisplay: { background: '#f8fafc', padding: 24, borderRadius: 16, border: '1px solid #f1f5f9' },
  infoRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 },
  label: { fontSize: 10, fontWeight: 900, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase' },
  val: { fontSize: 15, fontWeight: 700, margin: '0', color: '#1e293b' },
  verifiedTag: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#10b981', fontWeight: 900, marginTop: 12 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
  input: { padding: '12px 16px', borderRadius: 12, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, width: '100%', boxSizing: 'border-box', background: '#fff' },
  payGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 },
  payOption: { padding: 20, borderRadius: 16, border: '2px solid', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, transition: '0.2s' },
  summaryCard: { background: '#0f172a', color: '#fff', padding: '35px', borderRadius: 32, border: '1px solid #1e293b', height: 'auto' },
  cartList: { display: 'flex', flexDirection: 'column', gap: 16 },
  cartItem: { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#94a3b8' },
  divider: { height: 1, background: '#1e293b', margin: '24px 0' },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 },
  orderBtn: { width: '100%', padding: '20px', borderRadius: 18, background: '#3b82f6', color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: 14, boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)' },
  secureNote: { textAlign: 'center', fontSize: 10, color: '#475569', marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 800, letterSpacing: '0.5px' }
};

export default Checkout;