import { CartModel } from "../../../Schema/Cart_Schema.js";

export const Full_cart = async (req, res) => {
  try {
    const userId = req.userId;

    // 🔎 Find cart for logged-in user
    const cart = await CartModel.findOne({ userId })
      .populate("items.productId", "name price images");

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Full cart details",
      data: cart
    });

  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart"
    });
  }
};
