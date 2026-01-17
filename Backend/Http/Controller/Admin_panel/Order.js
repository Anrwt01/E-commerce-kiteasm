import { OrderModel } from "../../../Schema/OrderSchema.js";

export const Order_Update = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Order update failed" });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ message: "Failed to fetch order details" });
  }
};
