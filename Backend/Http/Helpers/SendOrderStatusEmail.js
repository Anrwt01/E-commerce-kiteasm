import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Zoho SMTP Transport
 * NOTE:
 * EMAIL_USER = your Zoho email (example@zohomail.in)
 * EMAIL_PASS = Zoho App Password (NOT your normal password)
 */
const transporter = nodemailer.createTransport({
 service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send order status update email to user
 */
export const sendOrderStatusEmail = async ( email, name, order) => {
  try {
    //    
    if (!email) {
      console.log("User email not found, skipping email");
      return;
    }

    const statusText = {
      processing: "Your order is now being processed",
      shipped: "Your order has been shipped 🚚",
      delivered: "Your order has been delivered 🎉",
    };

    const mailOptions = {
      from: `"KiteAsm Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Order Update • ${statusText[order.orderStatus]}`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
          <div style="max-width:600px; background:#ffffff; margin:auto; padding:24px; border-radius:8px; border:1px solid #eaeaea;">
            
            <h2 style="color:#111;">Hello ${name || "Customer"},</h2>

            <p style="font-size:15px; color:#333;">
              ${statusText[order.orderStatus]}.
            </p>

            <hr style="margin:20px 0;" />

            <h3 style="margin-bottom:10px;">🧾 Order Details</h3>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Status:</strong> ${order.orderStatus.toUpperCase()}</p>
            <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>

            <h3 style="margin-top:20px;">📦 Items</h3>
            <table style="width:100%; border-collapse:collapse;">
              <thead>
                <tr style="background:#f3f3f3;">
                  <th style="padding:8px; border:1px solid #ddd;">Product</th>
                  <th style="padding:8px; border:1px solid #ddd;">Qty</th>
                  <th style="padding:8px; border:1px solid #ddd;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.items
                  .map(
                    (item) => `
                  <tr>
                    <td style="padding:8px; border:1px solid #ddd;">
                      ${item.productId?.name || "Product"}
                    </td>
                    <td style="padding:8px; border:1px solid #ddd;">
                      ${item.quantity}
                    </td>
                    <td style="padding:8px; border:1px solid #ddd;">
                      ₹${item.price}
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <p style="margin-top:24px; font-size:14px;">
              If you have any questions, reply to this email or contact our support.
            </p>

            <p style="margin-top:16px;">
              Thank you for shopping with <strong>KiteAsm</strong> 🪁
            </p>

            <p style="font-size:12px; color:#888; margin-top:30px;">
              This is an automated message. Please do not share sensitive information.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Order status email sent:", info.response);
  } catch (error) {
    console.error("Failed to send order status email:", error);
  }
};
