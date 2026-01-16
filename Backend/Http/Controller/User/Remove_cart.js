import { CartModel } from "../../../Schema/Cart_Schema.js";

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.params;

        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart
        });

    } catch (error) {
        console.error("Remove from cart error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
