import { OrderModel } from "../../../Schema/OrderSchema.js";
import { CartModel } from "../../../Schema/Cart_Schema.js";
import { ProductModel } from "../../../Schema/Product_Schema.js";
import { paymentSch } from "../../../Schema/Payment_schema.js";
import { UserModel } from "../../../Schema/User_Schema.js";
import { sendOrderEmail } from "../../Helpers/Email.js";
import { sendOrderStatusEmail } from "../../Helpers/SendOrderStatusEmail.js";

export const Checkout = async (req, res) => {
    try {

    
        const userId = req.userId;
        const {
            productname, 
            items, 
            totalAmount, 
            address, 
            name, 
            email, 
            phone1, 
            phone2, 
            paymentMethod,
            paymentId // Passed from frontend if online payment
        } = req.body;
        // console.log(req.body)

        // 1. Validate incoming data
        if (!email || !address || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Missing required order data." });
        }

        // 2. Reduce Stock and Verify Availability
        // We use a loop to update each product's stock
        for (const item of items) {
            const product = await ProductModel.findById(item.productId?._id || item.productId);
            
            if (!product) {
                return res.status(404).json({ success: false, message: `Product ${item.productId} not found.` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
            }

            // Decrease the stock count
            product.stock -= item.quantity;
            await product.save();
        }

        // 3. Create Order
        const newOrder = await OrderModel.create({
            userId,
            items: items.map(item => ({
                productId: item.productId?._id || item.productId,
                productname :item.productname,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount,
            customerDetails: {
                name,
                email,
                phone1,
                phone2,
                address: `${address.house}, ${address.Galino}, ${address.city}, ${address.state} - ${address.pincode}`,
                paymentMethod: paymentMethod || "COD"
            },
            paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
            orderStatus: "processing"
        });

        // 4. Clear Cart
        await CartModel.findOneAndDelete({ userId });

        
        
    
            if (paymentMethod === "COD") {
                // We already have newOrder from the DB, so we pass it directly
                sendOrderEmail(newOrder, {}, "CASH_ON_DELIVERY") // 'user' is now inside 'newOrder'
                    .catch(err => console.error("Admin Email Error:", err));
                
                    const order = newOrder
                sendOrderStatusEmail(email, name, order)
                    .catch(err => console.error("Customer Email Error:", err));
            }

        // 6. Final Response
        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully", 
            orderId: newOrder._id 
        });

    } catch (error) {
        console.error("CRITICAL BACKEND ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};