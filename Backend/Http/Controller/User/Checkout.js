import { OrderModel } from "../../../Schema/OrderSchema.js";
import { CartModel } from "../../../Schema/Cart_Schema.js";
import { ProductModel } from "../../../Schema/Product_Schema.js";
import { paymentSch } from "../../../Schema/Payment_schema.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_SECRET
// });

// 1. Pehle sirf Order create hoga (Pending status mein)
export const Checkout = async (req, res) => {
    try {
        const userId = req.userId;
        const { address, name, email, phone1, phone2, paymentMethod, totalAmount } = req.body;

        // 1. Fresh Cart fetch karo with Population (Database se Product Name uthane ke liye)
        const cart = await CartModel.findOne({ userId }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: "Cart khali hai bhai!" });
        }

        // 2. Items Map karo (Ab productname seedha DB se aayega, Frontend se nahi)
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            productname: item.productId.name, // 100% Reliable Name
            quantity: item.quantity,
            price: item.productId.price
        }));

        // 3. Naya Order Create karo (Pending status mein)
        const newOrder = await OrderModel.create({
            userId,
            items: orderItems,
            totalAmount,
            customerDetails: {
                name,
                email,
                phone1,
                phone2,
                address: `${address.house}, ${address.Galino}, ${address.city}, ${address.state} - ${address.pincode}`,
                paymentMethod: paymentMethod || "Razorpay"
            },
            paymentStatus: "pending",
            orderStatus: "processing"
        });

        res.status(201).json({ 
            success: true, 
            message: "Order initiated successfully", 
            orderId: newOrder._id 
        });

    } catch (error) {
        console.error("Checkout Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};