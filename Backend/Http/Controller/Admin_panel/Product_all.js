import { ProductModel } from "../../../Schema/Product_Schema.js";

// Get All Products for Admin
export const All_product = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Delete Product
export const Delete_prod = async (req, res) => {
  try {
    const { Prod_id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(Prod_id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};