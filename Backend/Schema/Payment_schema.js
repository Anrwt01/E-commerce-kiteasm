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

export const paymentSch = mongoose.model("Payment", paymentSchema);
