import { OrderModel } from "../../../Schema/OrderSchema.js";
import { CartModel } from "../../../Schema/Cart_Schema.js";
import { ProductModel } from "../../../Schema/Product_Schema.js";

export const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.userId;

    const order = await OrderModel.findById(orderId);
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

    // 2️⃣ Mark order as paid
    order.status = "Paid";
    await order.save();

    // 3️⃣ Clear user cart
    const cart = await CartModel.findOne({ userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

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
