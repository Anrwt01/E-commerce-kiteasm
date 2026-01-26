import { Router } from "express";
import { verifyme } from "../Http/Middleware/Verifyme.js";
const router = Router();

import { createRazorpayPayment, verifyPayment } from "../Http/Controller/Payment/createRazorpayPayment.js";

router.post("/razorpay", verifyme, createRazorpayPayment);
router.post("/verify", verifyme, verifyPayment);

// FIX: Export the 'router' variable you actually defined
export default router;