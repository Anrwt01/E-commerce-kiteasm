
import { ProductModel } from "../../../Schema/Product_Schema.js";

export const getProductSuggestions = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ suggestions: [] });

    const suggestions = await ProductModel.find(
      { name: { $regex: q, $options: "i" }, isActive: true },
      { name: 1, category: 1, images: 1 } // Only return necessary fields
    ).limit(5);

    res.json({ success: true, suggestions });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};