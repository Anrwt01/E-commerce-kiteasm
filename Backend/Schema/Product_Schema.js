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


// import mongoose from "mongoose";

// const Product_schema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   stock: { type: Number, required: true, min: 0 },
//   category: { type: String, required: true, index: true },
  
//   // 1. Explicitly store the main cover photo path
//   mainImage: { 
//     type: String, 
//     required: true 
//   }, 

//   isExclusive: { 
//     type: Boolean, 
//     default: false, 
//   },

//   // 2. Store the other 4 secondary images here
//   secondaryImages: [
//     {
//       url: { type: String, required: true },
//       public_id: { type: String } // Useful if you ever move to Cloudinary later
//     }
//   ],

//   isActive: { type: Boolean, default: true }
// }, { timestamps: true }); // Good practice to track when products are added

// export const ProductModel = mongoose.model("Product", Product_schema);