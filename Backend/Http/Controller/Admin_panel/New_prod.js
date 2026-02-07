import { ProductModel } from "../../../Schema/Product_Schema.js";

export const New_prod = async (req, res) => {
  const { name, description, price, stock, category, mainImage, secondaryImages, isExclusive } = req.body;

  try {
    if (!name || !description || !price || stock === undefined || !category || !mainImage) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // console.log(name, description, price, stock, category)
    // Use provided images or fallback
    // const productImages = images && images.length > 0 ? images : [{ url: "/products/default.jpg" }];

    const product = await ProductModel.create({
      name,
      description,
      price,
      stock,
      category,
      mainImage,
      secondaryImages,
      isExclusive
    });

    return res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
}
