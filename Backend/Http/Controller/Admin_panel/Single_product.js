import { ProductModel } from "../../../Schema/Product_Schema.js";


export const Single_prod_details =async (req,res)=>{
    const {Prod_id} = req.params;

    try {
const product = await ProductModel.findById(Prod_id);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

   return res.status(200).json({
            Message : "Single Product DEtails",
            product     
           })
    }  catch (error) {
    console.error("Error fetching Products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Products"
    });
  }
}