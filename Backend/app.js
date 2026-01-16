import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";

import cors from "cors";
import mongoose from "mongoose";
// import env from "./env.js";
import Routes from "./Routes/Routes.js"; // ✅ correct import



const app = express();

// 🔧 Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);

console.log("RAZORPAY_KEY:", process.env.RAZORPAY_KEY);


// 🚏 Routes
app.use("/api", Routes); 

// 🗄️ Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const server = http.createServer(app);

    server.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Cannot connect to MongoDB", err);
  });
