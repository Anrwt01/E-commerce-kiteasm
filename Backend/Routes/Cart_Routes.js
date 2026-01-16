import express from "express";
import { addToCart, getCart, removeFromCart } from "../Http/Controller/User/Cart_Controller.js";
import { isAuthenticated } from "../Http/Middleware/Auth_Middleware.js"; // Assuming you have auth middleware

const router = express.Router();

router.get("/", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.delete("/remove/:productId", isAuthenticated, removeFromCart);

export default router;
