import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
    ShieldCheckIcon, 
    TruckIcon, 
    LockClosedIcon, 
    ArrowLeftIcon, 
    CheckCircleIcon,
    MapPinIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Matches your User Schema fields
    const [formData, setFormData] = useState({
        name: "",
        phone2: "",
        address: {
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "India"
        }
    });
const fetchData = async () => {
    try {
        const token = localStorage.getItem("token");
        
        // 1. Fetch Cart (as before)
        const cartRes = await axios.get("http://localhost:5000/api/user/cart", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(cartRes.data.items || []);
        setTotalAmount(cartRes.data.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0));

        // 2. Fetch User Details
        const userRes = await axios.get("http://localhost:5000/api/user/details", {
            headers: { Authorization: `Bearer ${token}` }
        });

        const user = userRes.data.user;
        if (user) {
            // Check if address array exists and has at least one item
            const dbAddr = (user.address && user.address.length > 0) ? user.address[0] : {};

            setFormData({
                name: user.name || "",
                phone2: user.phone2 || "",
                address: {
                    // Mapping your specific DB keys to the form
                    street: `${dbAddr.house || ""} ${dbAddr.Galino || ""}`.trim(), 
                    city: dbAddr.city || "",
                    state: dbAddr.state || "",
                    pincode: dbAddr.pincode || "",
                    country: "India"
                }
            });
        }
    } catch (error) {
        console.error("Initialization Error:", error);
    }
};
    useEffect(() => { fetchData(); }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("addr_")) {
            const field = name.split("_")[1];
            setFormData(prev => ({
                ...prev,
                address: { ...prev.address, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            // STEP A: UPDATE DB (Rewrite Address/Phone if changed)
            await axios.put("http://localhost:5000/api/user/update", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // STEP B: INITIALIZE RAZORPAY (Placeholder for your specific Razorpay Logic)
            // 1. Create Order on Backend
            // 2. Open Razorpay Popup
            
            console.log("DB Updated. Proceeding to Payment for:", formData.name);
            setLoading(false);
        } catch (error) {
            console.error("Checkout process failed:", error);
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                {/* Header Section */}
                <button onClick={() => navigate(-1)} style={styles.backButton}>
                    <ArrowLeftIcon width={14} /> BACK TO HANGAR
                </button>

                <div style={styles.mainGrid}>
                    {/* LEFT: Shipping Details */}
                    <div style={styles.leftCol}>
                        <div style={styles.headerGroup}>
                            <h1 style={styles.title}>Secure Checkout<span style={{color: '#0ea5e9'}}>.</span></h1>
                            <p style={styles.subtitle}>Confirm your deployment coordinates below.</p>
                        </div>

                        <div style={styles.card}>
                            <div style={styles.cardTop}>
                                <div style={styles.iconHeading}>
                                    <MapPinIcon width={20} color="#0ea5e9" />
                                    <span style={styles.cardLabel}>SHIPPING DESTINATION</span>
                                </div>
                                <button 
                                    onClick={() => setIsEditing(!isEditing)} 
                                    style={styles.editToggle}
                                >
                                    {isEditing ? "LOCK DETAILS" : "EDIT INFO"}
                                </button>
                            </div>

                            {!isEditing ? (
                                <div style={styles.displayArea}>
                                    <div style={styles.profileMeta}>
                                        <div style={styles.metaItem}>
                                            <span style={styles.tinyLabel}>ACQUISITION PILOT</span>
                                            <p style={styles.mainValue}>{formData.name || "Unknown Pilot"}</p>
                                        </div>
                                        <div style={styles.metaItem}>
                                            <span style={styles.tinyLabel}>CONTACT</span>
                                            <p style={styles.mainValue}>+91 {formData.phone2 || "---"}</p>
                                        </div>
                                    </div>
                                    <div style={styles.addressBox}>
                                        <span style={styles.tinyLabel}>HANGAR ADDRESS</span>
                                        <p style={styles.addressText}>
                                            {formData.address.street || "No street provided"}<br />
                                            {formData.address.city}, {formData.address.state} - {formData.address.pincode}
                                        </p>
                                    </div>
                                    <div style={styles.verifiedBadge}>
                                        <CheckCircleIcon width={14} /> Syncing with DB
                                    </div>
                                </div>
                            ) : (
                                <div style={styles.formArea}>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.inputLabel}>Pilot Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.inputLabel}>Contact Number (Phone2)</label>
                                        <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} style={styles.input} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.inputLabel}>Street / Building</label>
                                        <textarea name="addr_street" value={formData.address.street} onChange={handleChange} style={{...styles.input, height: '80px'}} />
                                    </div>
                                    <div style={styles.gridInputs}>
                                        <input type="text" name="addr_city" placeholder="City" value={formData.address.city} onChange={handleChange} style={styles.input} />
                                        <input type="text" name="addr_state" placeholder="State" value={formData.address.state} onChange={handleChange} style={styles.input} />
                                        <input type="text" name="addr_pincode" placeholder="Pincode" value={formData.address.pincode} onChange={handleChange} style={styles.input} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Order Summary */}
                    <div style={styles.rightCol}>
                        <div style={styles.summaryCard}>
                            <h2 style={styles.summaryTitle}>INVENTORY SUMMARY</h2>
                            <div style={styles.itemList}>
                                {cartItems.map((item, i) => (
                                    <div key={i} style={styles.itemRow}>
                                        <span style={styles.itemName}>{item.productId?.name} <small>x{item.quantity}</small></span>
                                        <span style={styles.itemPrice}>₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={styles.billDivider} />
                            
                            <div style={styles.totalRow}>
                                <div style={styles.totalLabel}>
                                    <span style={{display: 'block', fontSize: '10px', color: '#94a3b8'}}>TOTAL PAYABLE</span>
                                    <span style={{fontSize: '32px', fontWeight: '800'}}>₹{totalAmount}</span>
                                </div>
                            </div>

                            <button onClick={handlePayment} disabled={loading} style={styles.payBtn}>
                                {loading ? "SYNCHRONIZING..." : (
                                    <><ShieldCheckIcon width={20} /> AUTHORIZE ACQUISITION</>
                                )}
                            </button>
                            <p style={styles.safeNote}><LockClosedIcon width={12} /> Secure Razorpay Gateway</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modern Styles
const styles = {
    page: { backgroundColor: "#f8fafc", minHeight: "100vh", padding: "100px 24px" },
    container: { maxWidth: "1140px", margin: "0 auto" },
    backButton: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '900', color: '#94a3b8', cursor: 'pointer', marginBottom: '40px' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px', alignItems: 'start' },
    title: { fontSize: '48px', fontWeight: '800', letterSpacing: '-2px', margin: 0 },
    subtitle: { color: '#64748b', fontSize: '16px', marginTop: '8px', marginBottom: '48px' },
    card: { backgroundColor: '#fff', borderRadius: '24px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
    cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
    iconHeading: { display: 'flex', alignItems: 'center', gap: '10px' },
    cardLabel: { fontSize: '12px', fontWeight: '900', letterSpacing: '1px' },
    editToggle: { background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '10px', fontWeight: '800', cursor: 'pointer' },
    displayArea: { border: '1px solid #f1f5f9', padding: '32px', borderRadius: '16px', backgroundColor: '#fcfdfe', position: 'relative' },
    profileMeta: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' },
    tinyLabel: { fontSize: '10px', fontWeight: '900', color: '#94a3b8', display: 'block', marginBottom: '4px' },
    mainValue: { fontSize: '18px', fontWeight: '700', margin: 0 },
    addressText: { fontSize: '16px', color: '#475569', lineHeight: '1.6', margin: 0 },
    verifiedBadge: { position: 'absolute', bottom: '10px', right: '16px', fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700' },
    formArea: { display: 'flex', flexDirection: 'column', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    inputLabel: { fontSize: '11px', fontWeight: '800', color: '#64748b' },
    input: { padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' },
    gridInputs: { display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '12px' },
    summaryCard: { backgroundColor: '#0f172a', padding: '40px', borderRadius: '32px', color: '#fff' },
    summaryTitle: { fontSize: '12px', fontWeight: '900', letterSpacing: '2px', color: '#475569', marginBottom: '32px' },
    itemRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' },
    itemName: { color: '#94a3b8' },
    billDivider: { height: '1px', backgroundColor: '#1e293b', margin: '32px 0' },
    payBtn: { width: '100%', padding: '20px', borderRadius: '16px', backgroundColor: '#0ea5e9', color: '#fff', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '32px' },
    safeNote: { textAlign: 'center', fontSize: '10px', color: '#475569', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }
};

export default Checkout;