import Razorpay from "razorpay";
import { OrderModel } from "../../../Schema/OrderSchema.js";

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

    res.status(200).json({
      razorpayOrderId: payment.id,
      amount: payment.amount
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Razorpay payment failed" });
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
