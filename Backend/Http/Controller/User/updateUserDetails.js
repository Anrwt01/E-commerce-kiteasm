import bcrypt from "bcrypt";
import { UserModel } from "../../../Schema/User_Schema.js";

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId; // set by verifyme middleware

    const {
      name,
      phone2,
      address
    } = req.body;

    console.log(req.body)

    // ❌ No update data sent
    if (
      name === undefined &&
      phone2 === undefined &&
      address === undefined
    ) {
      return res.status(400).json({
        message: "No data provided to update"
      });
    }

    // 🔎 Find user
    const user = await UserModel.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // ✅ Update allowed fields only
    if (name !== undefined) user.name = name;
    if (phone1 !== undefined) user.phone2 = phone2;
    if (address !== undefined) user.address = address;


    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};
