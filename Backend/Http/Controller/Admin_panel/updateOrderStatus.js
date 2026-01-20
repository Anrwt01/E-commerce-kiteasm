import { OrderModel } from "../../../Schema/OrderSchema.js";
import { UserModel } from "../../../Schema/User_Schema.js";
import { sendOrderStatusEmail } from "../../Helpers/SendOrderStatusEmail.js";

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findById(orderId).populate("userId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    // email user
    await sendOrderStatusEmail(order, order.userId);

    res.json({
      success: true,
      message: "Order status updated & email sent",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
