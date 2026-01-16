import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const res = await axios.get("http://localhost:5000/api/user/cart", {
                headers: { Authorization: token }
            });

            if (res.data.success || res.data.data) {
                // Backend returns { success: true, data: cart } from Full_cart.js
                // Or sometimes { items: [] } depending on how it was written
                // Based on Full_cart.js: res.data.data is the cart object
                setCart(res.data.data || { items: [] });
            } else {
                setCart({ items: [] });
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/user/cart/remove/${productId}`, {
                headers: { Authorization: token }
            });
            fetchCart(); // Refresh cart
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Failed to remove item");
        }
    };

    const calculateTotal = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    if (loading) return <div className="cart-loading">Loading Cart...</div>;

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="cart-container">
                <div className="empty-cart">
                    <h2>Your Cart is Empty</h2>
                    <button onClick={() => navigate("/products")}>Start Shopping</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            <div className="cart-content">
                <div className="cart-items">
                    {cart.items.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img
                                src={item.productId.images?.[0]?.url || "/images/products/kite.jpg"}
                                alt={item.productId.name}
                                onError={(e) => { e.target.src = "/images/products/kite.jpg" }}
                            />
                            <div className="item-details">
                                <h3>{item.productId.name}</h3>
                                <p>Price: ₹{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button
                                    onClick={() => handleRemove(item.productId._id)}
                                    style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Summary</h2>
                    <p>Total Items: {cart.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                    <h3>Total Price: ₹{calculateTotal()}</h3>
                    <button className="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
