// controllers/wishlistController.js
import { WishlistModel } from "../../../Schema/wishlist_schema.js";

export const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId; // Matches req.userId in Verifyme.js

        let wishlist = await WishlistModel.findOne({ user: userId });

        if (!wishlist) {
            // Create new wishlist if it doesn't exist
            wishlist = await WishlistModel.create({ user: userId, products: [productId] });
            return res.status(201).json({ message: "Added to wishlist", wishlist });
        }

        const index = wishlist.products.findIndex(id => id.toString() === productId);
        if (index === -1) {
            // Add if not present
            wishlist.products.push(productId);
            await wishlist.save();
            res.status(200).json({ message: "Added to wishlist" });
        } else {
            // Remove if already present (Toggle)
            wishlist.products.splice(index, 1);
            await wishlist.save();
            res.status(200).json({ message: "Removed from wishlist" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const wishlist = await WishlistModel.findOne({ user: userId }).populate("products");

        if (!wishlist) return res.status(200).json({ products: [] });

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};