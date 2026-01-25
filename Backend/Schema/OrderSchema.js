import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],

    customerDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone1: { type: String },
       phone2 : { type: String },
      address : {type : String},
      paymentMethod: { type: String, default: "COD" }
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
    razorpaySignature: String
  },
  { timestamps: true }
);


export const OrderModel = mongoose.model("OrderModel", orderSchema )