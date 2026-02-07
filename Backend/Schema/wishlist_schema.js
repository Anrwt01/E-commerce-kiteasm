import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // References your UserModel
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // References your ProductModel
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const WishlistModel = mongoose.model("Wishlist", wishlistSchema);