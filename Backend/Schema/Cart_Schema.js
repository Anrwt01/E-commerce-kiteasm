import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        quantity: {
          type: Number,
          default: 1,
          min: 1
        },

        price: {
          type: Number,
          required: true // ✅ price at time of adding to cart
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export const CartModel = mongoose.model("Cart", cartSchema);
