import Razorpay from "razorpay";
import { OrderModel } from "../../../Schema/OrderSchema.js";
import { paymentSch } from "../../../Schema/Payment_schema.js";
import { sendOrderEmail } from "../../Helpers/Email.js";
import { sendOrderStatusEmail } from "../../Helpers/SendOrderStatusEmail.js";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";





const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

export const createRazorpayPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const payment = await razorpay.orders.create({
      amount: order.totalAmount * 100, // paise
      currency: "INR",
      receipt: orderId
    });

    order.paymentGateway = "Razorpay";
    order.paymentOrderId = payment.id;
    await order.save();



    console.log("DEBUG - Sending to frontend:", {
  id: payment.id,
  keyExists: !!process.env.RAZORPAY_KEY
});

   
    res.status(200).json({
    success: true,
    razorpayOrderId: payment.id, // Ensure this matches pRes.razorpayOrderId
    key:  process.env.RAZORPAY_KEY, // Ensure this matches pRes.key
    amount: order.totalAmount,
    currency: payment.currency
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Razorpay payment failed" });
  }
};
export const verifyPayment = async (req, res) => {
  console.log("--- START VERIFICATION ---");
  console.log("Received Body:", req.body);

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // STEP 1: SIGNATURE VERIFICATION
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      console.log("❌ STEP 1 FAILED: Signature Mismatch");
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }
    console.log("✅ STEP 1 PASSED: Signature Verified");

    const order = await OrderModel.findById(orderId);
    if (!order) {
      console.log("❌ STEP 2 FAILED: Order ID not found in DB:", orderId);
      return res.status(404).json({ message: "Order not found" });
    }
    console.log("✅ STEP 2 PASSED: Order Found");

    // STEP 3: UPDATE ORDER STATUS
    try {
      order.paymentStatus = "paid";
      order.paymentId = razorpay_payment_id;
      order.orderStatus = "processing";
      await order.save();
      console.log("✅ STEP 3 PASSED: Order Updated to Paid");
    } catch (err) {
      console.error("❌ STEP 3 FAILED: Database Update Error", err);
      return res.status(500).json({ message: "Failed to update order status" });
    }

    // STEP 4: PAYMENT COLLECTION RECORD
    try {
      await paymentSch.create({
        userId: order.userId, // Using order.userId since req.userId might be undefined in the handler
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: order.totalAmount,
        status: "Success"
      });
      console.log("✅ STEP 4 PASSED: Payment Record Created");
    } catch (err) {
      console.error("❌ STEP 4 FAILED: Payment Schema Create Error", err);
      // We don't return here so the user still gets their success screen
    }

    // STEP 5: ADMIN EMAIL
    console.log("🔄 ATTEMPTING STEP 5: Admin Email...");
    sendOrderEmail(order, {}, razorpay_payment_id)
      .then(() => console.log("✅ STEP 5 PASSED: Admin Email Sent"))
      .catch(err => console.error("❌ STEP 5 FAILED: Admin Email Error:", err));

    // STEP 6: CUSTOMER EMAIL
    console.log("🔄 ATTEMPTING STEP 6: Customer Email...");
    sendOrderStatusEmail(order.customerDetails.email, order.customerDetails.name, order)
      .then(() => console.log("✅ STEP 6 PASSED: Customer Email Sent"))
      .catch(err => console.error("❌ STEP 6 FAILED: Customer Email Error:", err));

    // FINAL RESPONSE
    return res.json({ success: true, message: "Payment verified successfully" });

  } catch (error) {
    console.error("🔥 CRITICAL SYSTEM ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// import Stripe from "stripe";
// import { OrderModel } from "../../../Schema/OrderSchema.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET);

// export const createStripePayment = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     const order = await OrderModel.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: { name: "Order Payment" },
//             unit_amount: order.totalAmount * 100
//           },
//           quantity: 1
//         }
//       ],
//       mode: "payment",
//       metadata: { orderId }, // 🔥 link order
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel"
//     });

//     order.paymentGateway = "Stripe";
//     await order.save();

//     res.status(200).json({ sessionId: session.id });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Stripe payment failed" });
//   }
// };
