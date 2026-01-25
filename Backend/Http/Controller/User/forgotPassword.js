import crypto from "crypto";
import { UserModel } from "../../../Schema/User_Schema.js";
import nodemailer from "nodemailer";

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // console.log(email)
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 1. Generate a random 8-character password
        const temporaryPassword = crypto.randomBytes(4).toString("hex"); 

        // 2. Hash and update the database
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(temporaryPassword, salt);
        
        user.password = temporaryPassword;
        await user.save();

        // 3. Configure Nodemailer
        const transporter = nodemailer.createTransport({
                    host:  'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            });

    //            const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST, // e.g., smtp.zoho.in or smtp.gmail.com
    // port: process.env.EMAIL_PORT, // 465 or 587
    // secure: process.env.EMAIL_PORT == 465, 
    // auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS, // ALWAYS use the App Password here
    // }}),
    

        // 4. Send the raw temporary password to the user
        await transporter.sendMail({
            to: user.email,
            subject: "Your New Access Credentials",
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2>New System Generated Password</h2>
                    <p>Your password has been reset. Use the credentials below to log in:</p>
                    <div style="background: #f4f4f4; padding: 15px; font-size: 20px; font-weight: bold; text-align: center;">
                        ${temporaryPassword}
                    </div>
                    <p>We recommend changing this password immediately after logging in.</p>
                </div>
            `,
        });

        res.status(200).json({ success: true, message: "New password sent to your email." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error resetting password.", error });
    }
};