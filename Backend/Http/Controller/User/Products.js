import { ProductModel } from "../../../Schema/Product_Schema.js";


export const User_All_product = async (req, res) => {

  try {

    const products = await ProductModel.find({});
    // console.log(`📊 Total products in database: ${products.length}`);
    // if (products.length > 0) {
    //   console.log("🆔 Product IDs:", products.map(p => p._id.toString()).slice(0, 5));
    // }

    return res.status(200).json({
      Message: "ALL Product DEtails",
      products
    })
  } catch (error) {
    console.error("Error fetching Products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Products"
    });
  }
}