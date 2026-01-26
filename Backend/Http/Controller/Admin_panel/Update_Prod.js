import { ProductModel } from "../../../Schema/Product_Schema.js";

export const Update_prod = async (req, res) => {
  const { Prod_id } = req.params;

  const { name, description, price, stock, category } = req.body;

  try {
    const product = await ProductModel.findById(Prod_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
   if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price !== undefined) product.price = Number(price);
    
    if (stock !== undefined) {
      product.stock = Number(stock);
      product.isActive = product.stock > 0; // 🔥 AUTO TOGGLE
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
