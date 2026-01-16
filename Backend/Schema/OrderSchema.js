import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        items: [
        {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number
        }
        ],
        customerDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String }
        },

        totalAmount: { type: Number, required: true },

        paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
        },

        orderStatus: {
        type: String,
        enum: ["processing", "shipped", "delivered"],
        default: "processing"
        },

        paymentId: String,
        razorpayOrderId: String,
        razorpaySignature: String,

        createdAt: { type: Date, default: Date.now }
        });



export const OrderModel = mongoose.model("OrderModel",orderSchema )