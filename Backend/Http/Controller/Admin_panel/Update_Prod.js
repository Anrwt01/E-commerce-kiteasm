import { ProductModel } from "../../../Schema/Product_Schema.js";

export const Update_prod = async (req, res) => {
  const { Prod_id } = req.query;
  const { price, stock } = req.body;

  try {
    const product = await ProductModel.findById(Prod_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (price !== undefined) product.price = price;

    if (stock !== undefined) {
      product.stock = stock;
      product.isActive = stock > 0; // 🔥 AUTO TOGGLE
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated",
      data: product
    });

  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
