import { OrderModel } from "../../../Schema/OrderSchema.js";
import { CartModel } from "../../../Schema/Cart_Schema.js";
import { ProductModel } from "../../../Schema/Product_Schema.js";
import { sendOrderEmail } from "../../Helpers/Email.js";
import {sendOrderStatusEmail}  from "../../Helpers/sendOrderStatusEmail.js";

// export const Checkout = async (req, res) => {
//   try {
//     const userId = req.userId;
//     // const { orderData } = req.body
//     // console.log(orderData.items, orderData.totalAmount, orderData.name, orderData.paymentMethod)
//     // console.log(orderData.shippingAddress)

// const { shippingAddress, items, totalAmount, name, paymentMethod, email, phone1, phone2} = req.body;

//         // Now address the crash point
//         if (!shippingAddress) {
//             return res.status(400).json({ success: false, message: "Shipping address missing" });
//         }

//     // 2. Validate Stock & Prepare Batch Updates
//     const stockUpdates = [];
//     for (const item of items) {
//       const product = await ProductModel.findById(item.productId._id || item.productId);

//       if (!product) {
//         return res.status(404).json({ message: `Product ${item.productId} not found.` });
//       }

//       if (product.stock < item.quantity) {
//         return res.status(400).json({ message: `Insufficient stock for ${product.name}.` });
//       }
      
//       // Queue the stock reduction
//       stockUpdates.push(
//         ProductModel.updateOne(
//           { _id: product._id },
//           { $inc: { stock: -item.quantity } }
//         )
//       );
//     }

//     // 3. Create the Order in DB
//     const order = await OrderModel.create({
//       userId,
//       items: items.map(item => ({
//         productId: item.productId._id || item.productId,
//         quantity: item.quantity,
//         price: item.price
//       })),

   
//       customerDetails: {
//         name: name|| "Pilot", // Accessing name from body if sent
//         email : email,
//         phone1 : phone1,
//         phone2 : phone2,
//         address: `${shippingAddress.house}, ${shippingAddress.Galino}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}`,
//         paymentMethod: paymentMethod || "COD"
//       },
//       totalAmount,
//       paymentStatus: "pending",
//       orderStatus: "processing"
//     });

//     // 4. Execute Stock Updates & Clear Cart
//     await Promise.all([
//       ...stockUpdates,
//       CartModel.findOneAndUpdate({ userId }, { $set: { items: [] } })
//     ]);

//     res.status(201).json({
//       success: true,
//       orderId: order._id,
//       message: "Order deployed successfully to the hangar."
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Hangar Error: Checkout failed.", err });
//   }
// };
// import { ProductModel } from "../models/product.model.js"; // Ensure you import your Product model

export const Checkout = async (req, res) => {
    try {

        //  // FLATTENED PAYLOAD
        // const orderPayload = {
        //     items: cartItems.map(item => ({
        //         productId: item.productId?._id || item.productId,
        //         quantity: item.quantity,
        //         price: item.price
        //     })),
        //     totalAmount,
        //     name: formData.name,       // Sent at top level
        //     email: formData.email,     // Sent at top level
        //     phone1: formData.phone1,   // Sent at top level
        //     phone2: formData.phone2,   // Sent at top level
        //     address: formData.address, // Sent at top level
        //     paymentMethod
        // };
        const userId = req.userId;
        const { 
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

        
        // 5. Send Email to Admin (Non-blocking)
        // We pass the newOrder, user details, and paymentId
        const user = { name, email };
        sendOrderEmail(newOrder, user, paymentId).catch(err => console.error("Email Error:", err));
        // ( email, name, order) => {
            let order =  newOrder
        sendOrderStatusEmail(email, name, newOrder).catch(err => console.error("Email Error:", err));


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