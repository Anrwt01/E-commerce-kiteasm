import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShieldCheckIcon, TruckIcon, LockClosedIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        phone: ""
    });

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/user/cart", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const items = res.data.data?.items || res.data.items || [];
            if (items.length === 0) {
                navigate("/products");
                return;
            }
            setCartItems(items);
            const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            setTotalAmount(total);
        } catch (error) {
            console.error("Cart fetch error:", error);
            navigate("/cart");
        }
    };

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!address.street || !address.city || !address.pincode || !address.phone) {
            alert("Mission Control requires full address details.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const orderRes = await axios.post("http://localhost:5000/api/user/checkout",
                { address },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { orderId, amount } = orderRes.data;
            const paymentRes = await axios.post("http://localhost:5000/api/payment/razorpay",
                { orderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { razorpayOrderId } = paymentRes.data;
            const isScriptLoaded = await loadRazorpayScript();

            if (!isScriptLoaded) {
                alert("Razorpay SDK failed to load.");
                setLoading(false);
                return;
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_PlaceHolder",
                amount: amount * 100,
                currency: "INR",
                name: "AERO KITES",
                description: "Premium Gear Acquisition",
                order_id: razorpayOrderId,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", {
                            orderId,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        }, { headers: { Authorization: `Bearer ${token}` } });

                        if (verifyRes.data.success) {
                            navigate("/orders");
                        }
                    } catch (err) {
                        console.error("Verification failed", err);
                    }
                },
                prefill: {
                    name: JSON.parse(localStorage.getItem("user"))?.name || "",
                    email: JSON.parse(localStorage.getItem("user"))?.email || "",
                    contact: address.phone
                },
                theme: { color: "#000000" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            setLoading(false);

        } catch (error) {
            console.error("Checkout error:", error);
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '20px', background: 'var(--gray-light)',
        border: '1px solid transparent', fontSize: '12px', fontWeight: 900,
        textTransform: 'uppercase', outline: 'none', marginBottom: '16px'
    };

    return (
        <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', maxWidth: '800px' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px' }} className="text-xs uppercase tracking-widest text-muted">
                <ArrowLeftIcon style={{ width: 16 }} />
                Return to Hangar
            </button>

            <div style={{ marginBottom: '80px' }}>
                <h1 className="serif" style={{ fontSize: '48px' }}>Checkout<span style={{ fontStyle: 'normal' }}>.</span></h1>
                <p className="text-xs text-muted uppercase tracking-widest" style={{ marginTop: '16px' }}>Single-column minimalist flow</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
                {/* Shipping */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
                        <TruckIcon style={{ width: 20, color: 'var(--accent)' }} />
                        <h2 className="text-xs uppercase tracking-widest" style={{ fontWeight: 900 }}>01. Shipping</h2>
                    </div>
                    <textarea
                        name="street" placeholder="Street Address" rows="2" value={address.street} onChange={handleChange}
                        style={{ ...inputStyle, resize: 'none', height: '100px' }}
                    />
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} style={inputStyle} />
                        <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} style={inputStyle} />
                        <input type="text" name="phone" placeholder="Phone" value={address.phone} onChange={handleChange} style={inputStyle} />
                    </div>
                </div>

                {/* Summary */}
                <div style={{ background: 'var(--gray-light)', padding: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
                        <LockClosedIcon style={{ width: 20, color: 'var(--accent-alt)' }} />
                        <h2 className="text-xs uppercase tracking-widest" style={{ fontWeight: 900 }}>02. Summary</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                        {cartItems.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p className="text-xs" style={{ fontWeight: 900, textTransform: 'uppercase' }}>{item.productName || item.productId?.name}</p>
                                    <p className="text-xs text-muted">QTY: {item.quantity}</p>
                                </div>
                                <p className="text-xs" style={{ fontWeight: 900 }}>₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="text-xs uppercase text-muted">Subtotal</span>
                            <span className="text-xs" style={{ fontWeight: 900 }}>₹{totalAmount}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="text-xs uppercase text-muted">Logistics</span>
                            <span className="text-xs" style={{ fontWeight: 900, color: 'var(--accent)' }}>COMPLIMENTARY</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <span className="serif" style={{ fontSize: '24px' }}>Total.</span>
                            <span style={{ fontSize: '24px', fontWeight: 900 }}>₹{totalAmount}</span>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="btn btn-black"
                    style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                >
                    <ShieldCheckIcon style={{ width: 24 }} />
                    <span style={{ fontSize: '14px' }}>{loading ? "Processing Transaction..." : "Authorize Acquisition"}</span>
                </button>
            </div>
        </div>
    );
};

export default Checkout;
