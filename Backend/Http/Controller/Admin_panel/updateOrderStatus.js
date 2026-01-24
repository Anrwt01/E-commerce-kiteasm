import { OrderModel } from "../../../Schema/OrderSchema.js";
import { sendOrderStatusEmail } from "../../Helpers/SendOrderStatusEmail.js";

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // console.log(status,orderId )
    const order = await OrderModel.findById(orderId).populate("userId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update DB
    order.orderStatus = status;
    await order.save();

    // Resolve email safely
    const email =
      order.userId?.email ||
      order.customerDetails?.email;

    const name =
      order.userId?.name ||
      order.customerDetails?.name ||
      "Customer";

    if (!email) {
      console.warn("No email found for order:", order._id);
    } else {
      // console.log(email, name, order)
      await sendOrderStatusEmail( email, name, order );
      console.log("Email sent to:", email);
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order
    });

  } catch (err) {
    console.error("Order update failed:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
