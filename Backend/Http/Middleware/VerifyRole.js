import dotenv from "dotenv";
dotenv.config();
import { UserModel } from "../../Schema/User_Schema.js";

export const verifyRole = async (req, res, next) => {
  try {
    const userId = req.userId; // set by auth middleware

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    // ✅ Find user by ID
    const user = await UserModel.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access denied"
      });
    }

    // ✅ User is admin → continue
    next();
  } catch (error) {
    console.error("verifyRole error:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};
