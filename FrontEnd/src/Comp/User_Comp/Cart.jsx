import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import "./Cart.css";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(true);
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
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success || res.data.data) {
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
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCart();
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => navigate(-1), 500); // Navigate back after animation
    };

    const calculateTotal = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const total = calculateTotal();

    return (
        <Dialog open={open} onClose={handleClose} className="cart-drawer-root relative z-[9999]">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-auto bg-[#111] shadow-2xl border-l border-white/10">
                                <div className="flex-1 overflow-y-auto px-6 py-8">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-2xl font-bold text-white tracking-tight">
                                            Shopping Cart
                                        </DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                className="relative -m-2 p-2 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-7" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        {loading ? (
                                            <div className="flex justify-center py-20">
                                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
                                            </div>
                                        ) : !cart || cart.items.length === 0 ? (
                                            <div className="text-center py-20">
                                                <div className="text-6xl mb-4">🛒</div>
                                                <p className="text-gray-400 text-lg">Your cart is empty</p>
                                                <button
                                                    onClick={handleClose}
                                                    className="mt-6 text-red-500 font-bold hover:text-red-400"
                                                >
                                                    Start Shopping &rarr;
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-white/5">
                                                    {cart.items.filter(item => item.productId).map((item) => (
                                                        <li key={item._id} className="flex py-6 transition-all hover:bg-white/[0.02] rounded-xl px-2 -mx-2">
                                                            <div className="size-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                                                <img
                                                                    alt={item.productId?.name || "Product"}
                                                                    src={item.productId?.images?.[0]?.url || "/images/products/kite.jpg"}
                                                                    className="size-full object-contain p-2"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-bold text-white">
                                                                        <h3>{item.productId?.name || "Untitled Product"}</h3>
                                                                        <p className="ml-4 text-red-500">₹{item.price * item.quantity}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-400 uppercase tracking-widest">
                                                                        Qty: {item.quantity}
                                                                    </p>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500">In Stock</p>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemove(item.productId?._id)}
                                                                        className="font-bold text-gray-400 hover:text-red-500 transition-colors"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-white/10 bg-white/[0.02] backdrop-blur-md px-6 py-8">
                                    <div className="flex justify-between text-xl font-bold text-white mb-2">
                                        <p>Subtotal</p>
                                        <p>₹{total}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-8">
                                        <button
                                            onClick={() => navigate("/checkout")}
                                            className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 text-lg font-black text-white shadow-xl hover:from-red-500 hover:to-red-400 transition-all active:scale-[0.98]"
                                        >
                                            Checkout Now
                                        </button>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm">
                                        <p className="text-gray-400">
                                            or{' '}
                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                className="font-bold text-red-500 hover:text-red-400 transition-colors"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default Cart;

