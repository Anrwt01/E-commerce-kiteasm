import Razorpay from "razorpay";
import { OrderModel } from "../../../Schema/OrderSchema.js";
import { CartModel } from "../../../Schema/Cart_Schema.js";
import { ProductModel } from "../../../Schema/Product_Schema.js";
import { paymentSch } from "../../../Schema/Payment_schema.js";
import { sendOrderEmail } from "../../Helpers/Email.js";
// import { sendOrderStatusEmail } from "../../Helpers/SendOrderStatusEmail.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

// 1. Razorpay Order Initialise karna
export const createRazorpayPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await OrderModel.findById(orderId);
    
    if (!order) return res.status(404).json({ message: "Order not found" });

    const payment = await razorpay.orders.create({
      amount: order.totalAmount * 100, // paise mein
      currency: "INR",
      receipt: orderId.toString()
    });

    order.paymentOrderId = payment.id;
    await order.save();

    res.status(200).json({
        success: true,
        razorpayOrderId: payment.id,
        key: process.env.RAZORPAY_KEY,
        amount: order.totalAmount
    });
  } catch (error) {
    console.error("Initiation Error:", error);
    res.status(500).json({ message: "Razorpay initiation failed" });
  }
};

// 2. Sabse important: Verification Logic
export const verifyPayment = async (req, res) => {
    console.log("--- STARTING SECURE VERIFICATION ---");
    try {
        const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        // 1️⃣. RAZORPAY SIGNATURE VERIFICATION
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign)
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            console.log("❌ Fraudulent Transaction Attempted: Signature Mismatch");
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // 2️⃣. FETCH ORDER
        const order = await OrderModel.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Duplicate request handle karne ke liye
        if (order.status === "Paid" || order.paymentStatus === "paid") {
            return res.status(200).json({ success: true, message: "Order already processed" });
        }

        // 3️⃣. STOCK MANAGEMENT
        for (const item of order.items) {
            const product = await ProductModel.findById(item.productId);
            if (product) {
                product.stock = Math.max(0, product.stock - item.quantity);
                await product.save();
            }
        }

        // 4️⃣. UPDATE ORDER STATUS
        order.status = "Paid";
        order.paymentStatus = "paid";
        order.paymentId = razorpay_payment_id;
        order.razorpayOrderId = razorpay_order_id;
        order.razorpaySignature = razorpay_signature;
        await order.save();

        // 5️⃣. SMART CART CLEANUP ($pull)
        // Sirf wahi items delete honge jo order hue hain
        const orderItemIds = order.items.map(item => item.productId.toString());
        await CartModel.findOneAndUpdate(
            { userId: order.userId },
            { $pull: { items: { productId: { $in: orderItemIds } } } }
        );

        // 6️⃣. PAYMENT RECORD FOR DASHBOARD
        await paymentSch.create({
            userId: order.userId._id || order.userId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount: order.totalAmount,
            status: "Success"
        });

        // 7️⃣. SEND NOTIFICATIONS
        const userDetails = order.customerDetails || {};
        sendOrderEmail(order, userDetails, razorpay_payment_id)
            .catch(err => console.error("Admin Email failed:", err));

        console.log("✅ Payment Verified, Stock Updated, and Cart Cleaned Up");

        res.json({
            success: true,
            message: "Payment successful, order confirmed"
        });

    } catch (error) {
        console.error("🔥 CRITICAL VERIFICATION ERROR:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};