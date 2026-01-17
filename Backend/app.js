import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";
import mongoose from "mongoose";
import Routes from "./Routes/Routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🔧 Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// 📂 Static Files (Errors)
app.use(express.static(path.join(__dirname, "Public")));

console.log("RAZORPAY_KEY:", process.env.RAZORPAY_KEY);

// 🚏 Routes
app.use("/api", Routes);

// 404 Handler - Unmatched routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "Public", "Errors", "404.html"));
});

// 500 Handler - Global Error Middleware
app.use((err, req, res, next) => {
  console.error("Critical Error:", err.stack);
  res.status(500).sendFile(path.join(__dirname, "Public", "Errors", "500.html"));
});

// 🗄️ Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("⚠️ Server will continue to run to serve error pages.");
  });

// 🚀 Start Server
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

