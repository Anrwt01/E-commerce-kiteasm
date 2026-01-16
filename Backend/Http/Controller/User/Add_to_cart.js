import { CartModel } from "../../../Schema/Cart_Schema.js";
import { ProductModel } from "../../../Schema/Product_Schema.js";


export const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // from verifyme middleware
    const { productId } = req.params;
    const { quantity = 1 } = req.body;

    // 1️⃣ Get product
    const product = await ProductModel.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Product out of stock"
      });
    }

    // 2️⃣ Find or create cart
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = await CartModel.create({ userId, items: [] });
    }

    // 3️⃣ Check if product already in cart
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId: product._id,
        quantity,
        price: product.price
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart
    });

  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};
