import { OrderModel } from "../../../Schema/OrderSchema.js";
import { CartModel } from "../../../Schema/Cart_Schema.js";
import { ProductModel } from "../../../Schema/Product_Schema.js";
import { sendOrderEmail } from "../../Helpers/Email.js";

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const userId = req.userId;

    const order = await OrderModel.findById(orderId).populate("userId"); // Populate user data if needed here, or rely on customerDetails if saved
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    // 1️⃣ Deduct stock for each product
    for (const item of order.items) {
      const product = await ProductModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found`
        });
      }

      // ❌ Prevent negative stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    // 2️⃣ Mark order as paid and save payment details
    order.status = "Paid";
    order.paymentId = razorpay_payment_id;
    order.razorpayOrderId = razorpay_order_id;
    order.razorpaySignature = razorpay_signature;

    // Ensure paymentResult object structure if schema supports it or just flat fields above
    // Schema in step 177 showed flat fields: paymentId, razorpayOrderId, razorpaySignature
    // So sticking to flat assignment.

    await order.save();

    // 3️⃣ Clear user cart
    const cart = await CartModel.findOne({ userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    // 4️⃣ Send Email to Admin
    // Pass order and user details. 
    // If order.userId is populated, we use that. 
    // Or if valid customerDetails exists in order schema (step 177 showed it does), use that.
    const userDetails = order.customerDetails || (order.userId ? { name: order.userId.name, email: order.userId.email } : {});

    const orderItemIds = order.items.map(item => item.productId.toString());

    await CartModel.findOneAndUpdate(
      { userId: order.userId },
      { 
        $pull: { 
          items: { productId: { $in: orderItemIds } } 
        } 
  }
);
    // Run asynchronously, don't block response
    sendOrderEmail(order, userDetails, razorpay_payment_id).catch(err => console.error("Email send failed", err));

    res.json({
      success: true,
      message: "Payment successful, stock updated, order confirmed"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Payment verification or stock update failed"
    });
  }
};
