import express from "express";
import { addToCart, getCart, removeFromCart } from "../Http/Controller/User/Cart_Controller.js";
import { verifyme } from "../Http/Middleware/Verifyme.js";
const router = express.Router();

router.get("/", verifyme, getCart);
router.post("/add", verifyme, addToCart);
router.delete("/remove/:productId", verifyme, removeFromCart);

export default router;
