import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserModel } from "../../../Schema/User_Schema.js";

dotenv.config();

export const Register = async (req, res) => {
  try {
    const { name, email, password, address, phone1, phone2 } = req.body;

    // 🔍 Validation
    if (!name || !email || !password || !phone1) {
      return res.status(400).json({
        message: "Name, email, password and phone are required"
      });
    }

    // 🔎 Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already registered"
      });
    }

    // // 🔐 Hash password (FIXED)
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // 👤 Create user
    const user = await UserModel.create({
      name,
      email,
      password,
      phone1,
      phone2,
      address
    });

    // 🔑 JWT payload (minimal & safe)
    const tokenPayload = {
      id: user._id,
      role: user.role
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token, user
    });

  } catch (error) {
    console.error("Error registering customer:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register"
    });
  }
};
