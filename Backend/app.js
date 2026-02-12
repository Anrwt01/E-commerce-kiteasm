import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
// In server.js
import paymentRoutes from './Routes/paymentRoutes.js';
// app.use("/api", paymentRoutes);

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



// 🚏 Routes
app.use("/api", Routes);
// server.js / app.js
// app.use("/api", paymentRoutes);

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

// // 🚀 Start Server with Clustering
// import cluster from "cluster";
// import os from "os";

// const numCPUs = os.cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);
//   console.log(`Forsking for ${numCPUs} CPUs...`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     // Optional: Restart worker on death
//     cluster.fork();
//   });
// } else {
//   const server = http.createServer(app);
//   const PORT = process.env.PORT || 5000;

//   server.listen(PORT, () => {
//     console.log(`🚀 Worker ${process.pid} running server at http://localhost:${PORT}`);
//   });

// 🚀 Start Server (Simple mode without clustering)
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

