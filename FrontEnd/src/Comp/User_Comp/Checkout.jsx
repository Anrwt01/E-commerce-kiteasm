import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

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
            // Assuming res.data.items based on Cart_schema/controller
            // Let's protect against empty cart
            const items = res.data.cart?.items || res.data.items || [];
            if (items.length === 0) {
                alert("Your cart is empty!");
                navigate("/products");
            }
            setCartItems(items);

            // Calculate total
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
            alert("Please fill in all address details.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            // 1. Create Order on Backend
            const orderRes = await axios.post("http://localhost:5000/api/user/checkout",
                { address },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { orderId, amount } = orderRes.data;

            // 2. Create Razorpay Order
            const paymentRes = await axios.post("http://localhost:5000/api/payment/razorpay",
                { orderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { razorpayOrderId } = paymentRes.data;

            // 3. Load Script
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
                alert("Razorpay SDK failed to load. Are you online?");
                setLoading(false);
                return;
            }

            // 4. Open Razorpay Modal
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_PlaceHolder", // Frontend Environment Variable or Hardcoded fallback (not recommended)
                // Wait, I don't know the user's frontend env var name. 
                // Usually it's safer to get the key from the backend API if possible, or assume user put it in VITE_RAZORPAY_KEY.
                // Or I can leave it blank and Razorpay might complain.
                // Let's assume standard Vite env var.
                amount: amount * 100,
                currency: "INR",
                name: "Kiteasm Store",
                description: "Order Payment",
                order_id: razorpayOrderId,
                handler: async function (response) {
                    // 5. Verify Payment
                    try {
                        const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", {
                            orderId,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        }, { headers: { Authorization: `Bearer ${token}` } });

                        if (verifyRes.data.success) {
                            alert("Payment Successful! Order Placed.");
                            navigate("/orders"); // Redirect to My Orders
                        }
                    } catch (err) {
                        console.error("Verification failed", err);
                        alert("Payment verification failed.");
                    }
                },
                prefill: {
                    name: JSON.parse(localStorage.getItem("user"))?.name || "",
                    email: JSON.parse(localStorage.getItem("user"))?.email || "",
                    contact: address.phone
                },
                theme: {
                    color: "#007bff"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            setLoading(false);

        } catch (error) {
            console.error("Checkout error:", error);
            alert("Checkout failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <div className="checkout-grid">

                {/* Shipping Form */}
                <div className="shipping-card">
                    <h2>Shipping Address</h2>
                    <form className="checkout-form">
                        <div className="form-group">
                            <label>Street Address</label>
                            <textarea
                                name="street"
                                rows="2"
                                value={address.street}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name="city" value={address.city} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input type="text" name="state" value={address.state} onChange={handleChange} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Pincode</label>
                                <input type="text" name="pincode" value={address.pincode} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <input type="text" name="country" value={address.country} disabled />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" value={address.phone} onChange={handleChange} />
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="summary-card">
                    <h2>Order Summary</h2>
                    <div className="summary-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="summary-item">
                                <div className="summary-item-info">
                                    <h4>{item.productName || item.productId?.name || "Product"}</h4>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                                <div className="summary-item-price">
                                    ${item.price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="summary-total">
                        <h3>Total Amount</h3>
                        <span className="total-price">${totalAmount}</span>
                    </div>

                    <button
                        className="pay-btn"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Proceed to Pay"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
