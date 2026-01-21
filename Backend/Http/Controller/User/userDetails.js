import { UserModel } from "../../../Schema/User_Schema.js";

export const userDetails = async (req, res) => {
  try {
    const userId = req.userId; // set by auth middleware

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user
    });

  } catch (error) {
    console.error("User Details Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
