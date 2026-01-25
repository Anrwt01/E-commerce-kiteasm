import { ProductModel } from "../../../Schema/Product_Schema.js";


export const searchproduct = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isActive: true }; // Only show active products

    // 1. Filter by Category if provided
    if (category && category !== "All") {
      query.category = category;
    }

    // 2. Filter by Search (Case-insensitive Regex)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    // Execute query with sorting (newest first)
    const products = await ProductModel.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};