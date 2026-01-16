import { OrderModel } from "../../../Schema/OrderSchema.js";

export const All_product = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch all orders of logged-in user
    const orders = await OrderModel.find({ userId })
      .sort({ createdAt: -1 }); // latest first

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found",
        orders: []
      });
    }

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
