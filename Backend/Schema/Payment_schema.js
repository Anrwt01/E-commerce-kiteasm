import  mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

orderId: String,
paymentId: String,
signature: String,
amount: Number,
status: String,

createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);