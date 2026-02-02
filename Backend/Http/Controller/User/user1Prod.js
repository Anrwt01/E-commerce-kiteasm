import { ProductModel } from "../../../Schema/Product_Schema.js";
import mongoose from "mongoose";

export const User_Single_prod = async (req, res) => {
  const { Prod_id } = req.params;
  

  try {
    // Try findById first
    const product = await ProductModel.findById(Prod_id);
    // console.log("📦 Product found with findById:", product ? "YES" : "NO");

    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
