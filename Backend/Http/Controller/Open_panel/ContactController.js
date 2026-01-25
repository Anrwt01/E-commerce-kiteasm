import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const SendContactEmail = async (req, res) => {
    try {
        const { email, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({ message: "Email and Message are required" });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Admin receives the inquiry
            replyTo: email,
            subject: `New Inquiry from KiteAsm Contact Form`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #4f46e5;">New Contact Message</h2>
                    <p><strong>From:</strong> ${email}</p>
                    <hr />
                    <p style="font-size: 16px; color: #333;">${message}</p>
                    <hr />
                    <p style="font-size: 12px; color: #777;">This message was sent from your website contact form.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Message sent successfully!" });

    } catch (error) {
        console.error("Contact Email Error:", error);
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
};
