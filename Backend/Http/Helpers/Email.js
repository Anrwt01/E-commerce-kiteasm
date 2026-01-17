import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOrderEmail = async (order, user, paymentId) => {
    try {
        const adminEmail = process.env.EMAIL_USER; // Send to self/admin

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: adminEmail,
            subject: `New Order Received - Order #${order._id}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
          <h2 style="color: #333;">New Order Notification</h2>
          <p>A new order has been placed successfully.</p>
          
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">Order Details</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Payment Ref No:</strong> ${paymentId || "N/A"}</p>
          <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">User Details</h3>
          <p><strong>Name:</strong> ${user.name || "Guest"}</p>
          <p><strong>Email:</strong> ${user.email || "N/A"}</p>
          
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">Products</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f9f9f9; text-align: left;">
                <th style="padding: 8px; border: 1px solid #ddd;">Product</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Qty</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.productId}</td> 
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">₹${item.price}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <p style="margin-top: 20px; font-size: 12px; color: #777;">This is an automated email from your E-commerce Admin System.</p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
