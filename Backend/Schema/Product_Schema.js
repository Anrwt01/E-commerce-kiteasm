import mongoose from "mongoose";

const Product_schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, index: true },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String }
    }
  ],
  isActive: { type: Boolean, default: true }
});

export const ProductModel = mongoose.model("Product", Product_schema);
