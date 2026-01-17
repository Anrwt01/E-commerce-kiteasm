import { OrderModel } from "../../../Schema/OrderSchema.js";
import { CartModel } from "../../../Schema/Cart_Schema.js";
import { ProductModel } from "../../../Schema/Product_Schema.js";


export const Checkout = async (req, res) => {
  try {
    const userId = req.userId;
    const { address } = req.body;

    if (!address || !address.city || !address.pincode) {
      return res.status(400).json({ message: "Address required" });
    }

    const cart = await CartModel.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    let totalAmount = 0;

    // 🔍 Validate Stock & Calculate Total
    for (const item of cart.items) {
      const product = await ProductModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Out of stock: ${product.name}. Available: ${product.stock}`
        });
      }

      totalAmount += item.price * item.quantity;
    }

    const order = await OrderModel.create({
      userId,
      items: cart.items,
      totalAmount,
      address,
      status: "Pending"
    });

    res.status(201).json({
      success: true,
      orderId: order._id,
      amount: totalAmount
    });

  } catch (err) {
    res.status(500).json({ message: "Checkout failed" });
  }
};

