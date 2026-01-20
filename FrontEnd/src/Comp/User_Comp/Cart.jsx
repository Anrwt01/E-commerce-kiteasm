import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            if (!token) {
                setCart({ items: [] });
                return;
            }

            const res = await axios.get(
                "http://localhost:5000/api/user/cart",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setCart(res.data.cart || res.data || { items: [] });
        } catch (err) {
            console.error("Fetch cart error:", err);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (productId) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/user/cart/remove/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCart();
        } catch (err) {
            alert("Failed to remove item");
        }
    };

    const total = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (loading) {
        return <div className="page-center">Loading cart…</div>;
    }

    return (
        <div className="cart-page container">

            <h1 className="page-title">Your Cart</h1>

            {/* Not Logged In */}
            {!token && (
                <div className="empty-state">
                    <p>Please login to save and checkout your cart.</p>
                    <Link to="/login" className="btn-primary">
                        Login
                    </Link>
                </div>
            )}

            {/* Empty Cart */}
            {cart.items.length === 0 && (
                <div className="empty-state">
                    <p>Your cart is empty.</p>
                    <Link to="/products" className="btn-outline">
                        Continue Shopping
                    </Link>
                </div>
            )}

            {/* Cart Items */}
            {cart.items.length > 0 && (
                <>
                    <div className="cart-items">
                        {cart.items.map((item) => (
                            <div className="cart-row" key={item._id}>
                                <img
                                    src={item.productId?.images?.[0]?.url || "/images/products/kite.jpg"}
                                    alt={item.productId?.name}
                                />

                                <div className="cart-info">
                                    <h3>{item.productId?.name}</h3>
                                    <p>Qty: {item.quantity}</p>
                                </div>

                                <div className="cart-price">
                                    ₹{item.price * item.quantity}
                                    <button
                                        onClick={() => removeItem(item.productId._id)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Total: ₹{total}</h2>

                        <button
                            className="btn-primary"
                            onClick={() =>
                                token ? navigate("/checkout") : navigate("/login")
                            }
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
