// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { 
//     ShieldCheckIcon, ArrowLeftIcon, CheckCircleIcon,
//     MapPinIcon, LockClosedIcon
// } from "@heroicons/react/24/outline";

// const Checkout = () => {
//     const navigate = useNavigate();
//     const [cartItems, setCartItems] = useState([]);
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [syncing, setSyncing] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);

//     // Updated to match your Schema exactly
//     const [formData, setFormData] = useState({
//         name: "",
//         phone2: "",
//         address: {
//             house: "",
//             Galino: "",
//             city: "",
//             state: "",
//             pincode: ""
//         }
//     });

//     const fetchData = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const cartRes = await axios.get("http://localhost:5000/api/user/cart", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setCartItems(cartRes.data.items || []);
//             setTotalAmount(cartRes.data.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0));

//             const userRes = await axios.get("http://localhost:5000/api/user/details", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             const user = userRes.data.user;
//             if (user) {
//                 const dbAddr = (user.address && user.address.length > 0) ? user.address[0] : {};
//                 setFormData({
//                     name: user.name || "",
//                     phone2: user.phone2 || "",
//                     address: {
//                         house: dbAddr.house || "",
//                         Galino: dbAddr.Galino || "",
//                         city: dbAddr.city || "",
//                         state: dbAddr.state || "",
//                         pincode: dbAddr.pincode || ""
//                     }
//                 });
//             }
//         } catch (error) {
//             console.error("Initialization Error:", error);
//         }
//     };

//     useEffect(() => { fetchData(); }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name.startsWith("addr_")) {
//             const field = name.split("_")[1];
//             setFormData(prev => ({
//                 ...prev,
//                 address: { ...prev.address, [field]: value }
//             }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const toggleEditAndSave = async () => {
//         if (isEditing) {
//             setSyncing(true);
//             try {
//                 const token = localStorage.getItem("token");
//                 // Match the endpoint exactly as it appears in your logs
//                 await axios.put("http://localhost:5000/api/user/add-update", formData, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//             } catch (error) {
//                 console.error("Sync Error:", error.response?.data || error.message);
//                 alert("Operational Failure: Could not sync address with fleet records.");
//             } finally {
//                 setSyncing(false);
//             }
//         }
//         setIsEditing(!isEditing);
//     };

//     return (
//         <div style={styles.page}>
//             <div style={styles.container}>
//                 <button onClick={() => navigate(-1)} style={styles.backButton}>
//                     <ArrowLeftIcon width={14} /> BACK TO HANGAR
//                 </button>

//                 <div style={styles.mainGrid}>
//                     <div style={styles.leftCol}>
//                         <div style={styles.headerGroup}>
//                             <h1 style={styles.title}>Secure Checkout<span style={{color: '#0ea5e9'}}>.</span></h1>
//                             <p style={styles.subtitle}>Confirm your deployment coordinates below.</p>
//                         </div>

//                         <div style={styles.card}>
//                             <div style={styles.cardTop}>
//                                 <div style={styles.iconHeading}>
//                                     <MapPinIcon width={20} color="#0ea5e9" />
//                                     <span style={styles.cardLabel}>SHIPPING DESTINATION</span>
//                                 </div>
//                                 <button onClick={toggleEditAndSave} style={{...styles.editToggle, backgroundColor: isEditing ? '#0ea5e9' : '#f1f5f9', color: isEditing ? '#fff' : '#1e293b'}} disabled={syncing}>
//                                     {syncing ? "SYNCING..." : (isEditing ? "CONFIRM & SAVE" : "EDIT INFO")}
//                                 </button>
//                             </div>

//                             {!isEditing ? (
//                                 <div style={styles.displayArea}>
//                                     <div style={styles.profileMeta}>
//                                         <div style={styles.metaItem}>
//                                             <span style={styles.tinyLabel}>ACQUISITION PILOT</span>
//                                             <p style={styles.mainValue}>{formData.name || "Pilot Name Required"}</p>
//                                         </div>
//                                         <div style={styles.metaItem}>
//                                             <span style={styles.tinyLabel}>CONTACT</span>
//                                             <p style={styles.mainValue}>+91 {formData.phone2 || "---"}</p>
//                                         </div>
//                                     </div>
//                                     <div style={styles.addressBox}>
//                                         <span style={styles.tinyLabel}>HANGAR ADDRESS</span>
//                                         <p style={styles.addressText}>
//                                             {formData.address.house} {formData.address.Galino}<br />
//                                             {formData.address.city}, {formData.address.state} - {formData.address.pincode}
//                                         </p>
//                                     </div>
//                                     <div style={styles.verifiedBadge}>
//                                         <CheckCircleIcon width={14} /> Profile Synchronized
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div style={styles.formArea}>
//                                     <div style={styles.gridInputs}>
//                                         <div style={styles.inputGroup}>
//                                             <label style={styles.inputLabel}>Pilot Name</label>
//                                             <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} />
//                                         </div>
//                                         <div style={styles.inputGroup}>
//                                             <label style={styles.inputLabel}>Phone 2</label>
//                                             <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} style={styles.input} />
//                                         </div>
//                                     </div>
//                                     <div style={styles.gridInputs}>
//                                         <div style={styles.inputGroup}>
//                                             <label style={styles.inputLabel}>House/Flat No.</label>
//                                             <input type="text" name="addr_house" value={formData.address.house} onChange={handleChange} style={styles.input} />
//                                         </div>
//                                         <div style={styles.inputGroup}>
//                                             <label style={styles.inputLabel}>Gali/Street Name</label>
//                                             <input type="text" name="addr_Galino" value={formData.address.Galino} onChange={handleChange} style={styles.input} />
//                                         </div>
//                                     </div>
//                                     <div style={styles.gridInputs}>
//                                         <input type="text" name="addr_city" placeholder="City" value={formData.address.city} onChange={handleChange} style={styles.input} />
//                                         <input type="text" name="addr_state" placeholder="State" value={formData.address.state} onChange={handleChange} style={styles.input} />
//                                         <input type="text" name="addr_pincode" placeholder="Pincode" value={formData.address.pincode} onChange={handleChange} style={styles.input} />
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div style={styles.rightCol}>
//                         <div style={styles.summaryCard}>
//                             <h2 style={styles.summaryTitle}>INVENTORY SUMMARY</h2>
//                             <div style={styles.itemList}>
//                                 {cartItems.map((item, i) => (
//                                     <div key={i} style={styles.itemRow}>
//                                         <span style={styles.itemName}>{item.productId?.name} <small>x{item.quantity}</small></span>
//                                         <span style={styles.itemPrice}>₹{item.price * item.quantity}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div style={styles.billDivider} />
//                             <div style={styles.totalRow}>
//                                 <div style={styles.totalLabel}>
//                                     <span style={{display: 'block', fontSize: '10px', color: '#64748b'}}>TOTAL PAYABLE</span>
//                                     <span style={{fontSize: '32px', fontWeight: '800'}}>₹{totalAmount}</span>
//                                 </div>
//                             </div>
//                             <button onClick={() => alert("Redirecting to Razorpay...")} disabled={isEditing} style={{...styles.payBtn, opacity: isEditing ? 0.5 : 1}}>
//                                 <ShieldCheckIcon width={20} /> AUTHORIZE ACQUISITION
//                             </button>
//                             <p style={styles.safeNote}><LockClosedIcon width={12} /> Secure Razorpay Gateway</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Styles remain mostly the same as previous version but updated for grid inputs
// const styles = {
//     page: { backgroundColor: "#f8fafc", minHeight: "100vh", padding: "100px 24px" },
//     container: { maxWidth: "1140px", margin: "0 auto" },
//     backButton: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '900', color: '#94a3b8', cursor: 'pointer', marginBottom: '40px' },
//     mainGrid: { display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px' },
//     title: { fontSize: '48px', fontWeight: '800', letterSpacing: '-2px', margin: 0 },
//     subtitle: { color: '#64748b', fontSize: '16px', marginTop: '8px', marginBottom: '48px' },
//     card: { backgroundColor: '#fff', borderRadius: '24px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
//     cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
//     iconHeading: { display: 'flex', alignItems: 'center', gap: '10px' },
//     cardLabel: { fontSize: '12px', fontWeight: '900' },
//     editToggle: { border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '10px', fontWeight: '800', cursor: 'pointer' },
//     displayArea: { border: '1px solid #f1f5f9', padding: '32px', borderRadius: '16px', backgroundColor: '#fcfdfe', position: 'relative' },
//     profileMeta: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' },
//     tinyLabel: { fontSize: '10px', fontWeight: '900', color: '#94a3b8' },
//     mainValue: { fontSize: '18px', fontWeight: '700', margin: 0 },
//     addressText: { fontSize: '16px', color: '#475569', lineHeight: '1.6', margin: 0 },
//     verifiedBadge: { position: 'absolute', bottom: '10px', right: '16px', fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700' },
//     formArea: { display: 'flex', flexDirection: 'column', gap: '20px' },
//     inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
//     inputLabel: { fontSize: '11px', fontWeight: '800', color: '#64748b' },
//     input: { padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', width: '100%' },
//     gridInputs: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
//     summaryCard: { backgroundColor: '#0f172a', padding: '40px', borderRadius: '32px', color: '#fff' },
//     summaryTitle: { fontSize: '12px', fontWeight: '900', color: '#475569', marginBottom: '32px' },
//     itemRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px' },
//     itemName: { color: '#94a3b8' },
//     billDivider: { height: '1px', backgroundColor: '#1e293b', margin: '32px 0' },
//     payBtn: { width: '100%', padding: '20px', borderRadius: '16px', backgroundColor: '#0ea5e9', color: '#fff', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
//     safeNote: { textAlign: 'center', fontSize: '10px', color: '#475569', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }
// };

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon, ArrowLeftIcon, CheckCircleIcon,
  MapPinIcon, LockClosedIcon, TruckIcon, CreditCardIcon,
  PencilSquareIcon, DevicePhoneMobileIcon
} from "@heroicons/react/24/outline";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

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
      // console.log(cartRes)

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
                Galino: formData.address.galino, // Backend expects capital 'G'
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
                // 2. Razorpay Order Creation - FIXED URL
                const { data: pRes } = await axios.post(
                    "http://localhost:5000/api/razorpay", // Matches app.use("/api", ...) + router.post("/razorpay")
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

                      try{
                                      // response only contains razorpay fields. We need to add our DB orderId.
                             const verificationPayload = {
                                    razorpay_order_id: response.razorpay_order_id,
                                          razorpay_payment_id: response.razorpay_payment_id,
                                          razorpay_signature: response.razorpay_signature,
                                          orderId: serverOrderId // <--- THIS IS THE MISSING PIECE
                                      };
                                      console.log("Response from Razorpay:", response);
                                
                                const { data: vRes } = await axios.post(
                                    "http://localhost:5000/api/verify", 
                                    verificationPayload , 
                                    { headers: { Authorization: `Bearer ${token}` } }
                                );

                            if (vRes.success) {
                                navigate("/orders");
                            }
                        } catch (verifyErr) {
                            console.error("VERIFICATION ERROR:", verifyErr);
                            alert("Payment succeeded but verification failed. Check your orders page.");
                        }
                    },
                    theme: { color: "#3b82f6" },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                navigate("/orders");
            }
        }
    } catch (err) {
        console.error("FULL ERROR OBJECT:", err);
        // This will now show the real error message instead of 'undefined'
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
          {/* Left Column: Details */}
          <div style={styles.leftCol}>
            <header style={{ marginBottom: 40 }}>
              <h1 style={styles.mainTitle}>Finalize Deployment<span style={{ color: '#3b82f6' }}>.</span></h1>
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
                  <div style={styles.infoRow}>
                    <div style={styles.infoBlock}>
                      <span style={styles.label}>RECIPIENT</span>
                      <p style={styles.val}>{formData.name || "N/A"}</p>
                    </div>
                    <div style={styles.infoBlock}>
                      <span style={styles.label}>PRIMARY CONTACT</span>
                      <p style={styles.val}>+91 {formData.phone1}</p>
                    </div>
                  </div>
                  <div style={styles.infoRow}>
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
                <div style={styles.formGrid}>
                  <div style={styles.inputGroup}><label>Full Name</label><input name="name" value={formData.name} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label>Primary Phone</label><input name="phone1" value={formData.phone1} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label>Secondary Phone</label><input name="phone2" value={formData.phone2} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label>House/Apt</label><input name="addr_house" value={formData.address.house} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label>Street/Gali</label><input name="addr_galino" value={formData.address.galino} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label>City</label><input name="addr_city" value={formData.address.city} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label>State</label><input name="addr_state" value={formData.address.state} onChange={handleChange} style={styles.input} /></div>
                  <div style={styles.inputGroup}><label>Pincode</label><input name="addr_pincode" value={formData.address.pincode} onChange={handleChange} style={styles.input} /></div>
                </div>
              )}
            </section>

          <section style={styles.sectionCard}>
  <div style={styles.iconHeading}>
    <CreditCardIcon width={22} color="#3b82f6" /> <span>PAYMENT METHOD</span>
  </div>
  <div style={styles.payGrid}>
    {/* Razorpay First */}
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
        <p style={{margin:0, fontSize:11}}>UPI, Cards, NetBanking</p>
      </div>
    </div>

    {/* COD Second */}
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
        <p style={{margin:0, fontSize:11}}>Pay on Delivery</p>
      </div>
    </div>
  </div>
</section>
          </div>

          {/* Right Column: Summary */}
          <div style={styles.rightCol}>
            <div style={styles.summaryCard}>
              <h3 style={{ fontSize: 14, letterSpacing: 1, color: '#94a3b8', marginBottom: 24 }}>ORDER SUMMARY</h3>
              <div style={styles.cartList}>
                {cartItems.map((item, i) => (
                  <div key={i} style={styles.cartItem}>
                    <span>{item.productId?.name} <small>x{item.quantity}</small></span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div style={styles.divider} />
              <div style={styles.totalRow}>
                <span>TOTAL PAYABLE</span>
                <span style={{ fontSize: 24, fontWeight: 800 }}>₹{totalAmount}</span>
              </div>

              <button onClick={handlePlaceOrder} disabled={loading || isEditing} style={{...styles.orderBtn, opacity: (loading || isEditing) ? 0.6 : 1}}>
                {loading ? "PROCESSING..." : (
                  paymentMethod === "COD" ? "CONFIRM ORDER" : "AUTHORIZE PAYMENT"
                )}
              </button>
              <p style={styles.secureNote}><LockClosedIcon width={14} /> End-to-End Encrypted Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { background: "#f8fafc", minHeight: "100vh", padding: "60px 20px", color: "#1e293b" },
  container: { maxWidth: 1100, margin: "0 auto" },
  backBtn: { display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'none', fontSize: 12, fontWeight: 700, color: '#64748b', cursor: 'pointer', marginBottom: 20 },
  layout: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: 50 },
  mainTitle: { fontSize: 42, fontWeight: 800, margin: 0, letterSpacing: '-1px' },
  subtitle: { color: '#64748b', marginTop: 8 },
  sectionCard: { background: '#fff', padding: 30, borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: 24 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  iconHeading: { display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 12, color: '#475569' },
  editBtn: { border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: '0.2s' },
  dataDisplay: { background: '#f8fafc', padding: 20, borderRadius: 12, position: 'relative' },
  infoRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 15 },
  label: { fontSize: 10, fontWeight: 800, color: '#94a3b8' },
  val: { fontSize: 15, fontWeight: 600, margin: '4px 0 0 0' },
  verifiedTag: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#10b981', fontWeight: 800, marginTop: 10 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 5 },
  input: { padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14 },
  payGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginTop: 20 },
  payOption: { padding: 15, borderRadius: 12, border: '2px solid', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: '0.2s' },
  summaryCard: { background: '#0f172a', color: '#fff', padding: 35, borderRadius: 24, position: 'sticky', top: 40 },
  cartList: { display: 'flex', flexDirection: 'column', gap: 12 },
  cartItem: { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#94a3b8' },
  divider: { height: 1, background: '#1e293b', margin: '20px 0' },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  orderBtn: { width: '100%', padding: 18, borderRadius: 12, background: '#3b82f6', color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 14 },
  secureNote: { textAlign: 'center', fontSize: 11, color: '#475569', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
};

export default Checkout;