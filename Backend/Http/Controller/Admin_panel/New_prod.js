
import { ProductModel } from "../../../Schema/Product_Schema.js";




export const New_prod = async (req,res)=>{
      const { name, description, price, stock, category } = req.body;

      

      
try{
     if (!name || !description || !price || stock === undefined || !category) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      stock,
      category,
      images: [{ url: "/products/default.jpg" }] // static image example
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

