import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Backend/Helpers/Email.js

export const sendOrderEmail = async (newOrder, user, paymentId) => {
    try {
        const adminEmail = process.env.EMAIL_USER;

        const mailOptions = {
            from: `"KiteAsm Admin" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `🚨 New Order Alert: ${newOrder._id}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
          <h2 style="color: #333; text-align: center;">New Order Received</h2>
          <p style="text-align: center; color: #666;">A new transaction has been successfully logged.</p>
          
          <h3 style="border-bottom: 2px solid #333; padding-bottom: 5px;">💳 Payment & Info</h3>
          <p><strong>Order ID:</strong> ${newOrder._id}</p>
          <p><strong>Payment Ref No:</strong> <span style="color: blue;">${paymentId || "N/A"}</span></p>
          <p><strong>Total Amount:</strong> <span style="font-size: 18px; color: #d32f2f; font-weight: bold;">₹${newOrder.totalAmount}</span></p>
          <p><strong>Payment Method:</strong> ${newOrder.customerDetails.paymentMethod}</p>
          <p><strong>Date:</strong> ${new Date(newOrder.createdAt).toLocaleString()}</p>
          
          <h3 style="border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 20px;">👤 Customer Details</h3>
          <p><strong>Name:</strong> ${newOrder.customerDetails.name}</p>
          <p><strong>Email:</strong> ${newOrder.customerDetails.email}</p>
          <p><strong>Phone:</strong> ${newOrder.customerDetails.phone1} ${newOrder.customerDetails.phone2 ? `/ ${newOrder.customerDetails.phone2}` : ""}</p>
          <p><strong>Shipping Address:</strong><br/>
             <span style="background: #f9f9f9; padding: 5px; display: block; border: 1px dashed #ccc;">
                ${newOrder.customerDetails.address}
             </span>
          </p>
        
          <h3 style="border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 20px;">📦 Products Ordered</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #333; color: #fff; text-align: left;">
                <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Qty</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${newOrder.items.map(item => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${item.productname}</td> 
                  <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">₹${item.price}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
            This is an automated operational email from the KiteAsm Hangar.
          </p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Admin Email Error:", error);
    }
};