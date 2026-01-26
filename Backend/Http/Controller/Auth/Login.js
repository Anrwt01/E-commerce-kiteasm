import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../../../Schema/User_Schema.js";

dotenv.config();

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 🔎 Find user (include password explicitly)
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Email or password is incorrect"
      });
    }

    // 🔐 Compare password
    const isMatch = await password === user.password;

    if (!isMatch) {
      return res.status(401).json({
        message: "Email or password is incorrect"
      });
    }

    // 🔑 Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
      // { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token, user
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};
