import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // 👤 Basic info
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  // 📞 Phone numbers (NEW)
  phone1: {
    type: Number,
    required: true
  },

  phone2: {
    type: Number // optional
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  // 🔐 Role-based access
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  // 📍 Addresses
  address: [
    {
      house: String,
      galino : String,
      city: String,
      state: String,
      pincode: String
    }
  ],

  // 🕒 Created time
  createdAt: {
    type: Date,
    default: Date.now
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date,

});

export const UserModel = mongoose.model("User", userSchema);
