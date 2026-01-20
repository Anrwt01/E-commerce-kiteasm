import { CartModel } from "../../../Schema/Cart_Schema.js";
import { ProductModel } from "../../../Schema/Product_Schema.js";

// Get User Cart
export const getCart = async (req, res) => {
    try {
        const userId = req.userId;
        let cart = await CartModel.findOne({ userId }).populate("items.productId");

        if (!cart) {
            return res.status(200).json({ items: [], total: 0 });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Add Item to Cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity = 1 } = req.body;

        
        console.log(productId)
        console.log(typeof productId)

        const product = await ProductModel.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await CartModel.findOne({ userId });

        if (cart) {
            // Check if product exists in cart
            const itemIndex = cart.items.findIndex(
                (p) => p.productId.toString() === productId
            );

            if (itemIndex > -1) {
                // Product exists, update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Product does not exist, push new item
                cart.items.push({
                    productId,
                    quantity,
                    price: product.price
                });
            }
        } else {
            // New Cart
            cart = new CartModel({
                userId,
                items: [{ productId, quantity, price: product.price }]
            });
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Remove Item from Cart
export const removeFromCart = async (req, res) => {
    try {
       

        let cart = await CartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: "Item removed", cart });
    } catch (error) {
        console.error("Remove form Cart Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
