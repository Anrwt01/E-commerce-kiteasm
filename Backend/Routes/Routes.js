import { Router } from "express";

/* 🔐 Middleware */
import { verifyme } from "../Http/Middleware/Verifyme.js";
import { verifyRole } from "../Http/Middleware/VerifyRole.js";

/* 👤 Auth Controllers */
import { Login } from "../Http/Controller/Auth/Login.js";
import { Register } from "../Http/Controller/Auth/Register.js";

/* 🛒 User Product & Cart Controllers */
import { User_All_product } from "../Http/Controller/User/Products.js";
import { User_Single_prod } from "../Http/Controller/User/user1Prod.js"; // Renamed import
// import { addToCart } from "../Http/Controller/User/Add_to_cart.js";
// import { Full_cart } from "../Http/Controller/User/Full_cart.js";
// import { removeFromCart } from "../Http/Controller/User/Remove_cart.js";
import { updateUserDetails } from "../Http/Controller/User/updateUserDetails.js";
import {getCart, removeFromCart , addToCart}  from "../Http/Controller/User/Cart_Controller.js"
import { userDetails } from "../Http/Controller/User/userDetails.js";

/* 📦 Order & Checkout Controllers */
import { Checkout } from "../Http/Controller/User/Checkout.js";
import { SendContactEmail } from '../Http/Controller/Open_panel/ContactController.js';
import { All_product as UserOrders } from "../Http/Controller/User/All_orders.js";

/* 💳 Payment Controllers */
import { createRazorpayPayment } from "../Http/Controller/Payment/createRazorpayPayment.js";
// import { createStripePayment } from "../Http/Controller/User/Stripe.js";
import { verifyPayment } from "../Http/Controller/Payment/VerifyPayment.js";

/* 🛠 Admin Controllers */
import { AdminALLorder } from "../Http/Controller/Admin_panel/allOrder.js";
import { Order_Update, getSingleOrder } from "../Http/Controller/Admin_panel/Order.js";
import { New_prod } from "../Http/Controller/Admin_panel/New_prod.js";
import { Update_prod } from "../Http/Controller/Admin_panel/Update_Prod.js";
import { All_product, Delete_prod } from "../Http/Controller/Admin_panel/Product_all.js";
import { Single_prod_details } from "../Http/Controller/Admin_panel/Single_product.js";
import { updateOrderStatus } from "../Http/Controller/Admin_panel/updateOrderStatus.js";

// /* 📊 Admin Inventory Controllers */
// import {
//   inventorySummary,
//   inventoryProducts,
//   updateStock
// } from "../Http/Controller/Admin_panel/Inventory.js";

const router = Router();

/* ===========================
   AUTH ROUTES
=========================== */
router.post("/auth/login", Login);
router.post("/auth/register", Register);

/* ===========================
   USER PRODUCTS
=========================== */
// Public Routes
router.get("/user/products", User_All_product);
router.get("/user/products/:Prod_id", User_Single_prod); // Use :Prod_id to match controller
router.post("/contact", SendContactEmail);
/* ===========================
   USER CART
=========================== */
router.get("/user/cart", verifyme, getCart);
router.post("/user/cart/add", verifyme, addToCart);
router.delete("/user/cart/remove/:productId", verifyme, removeFromCart);

/* ===========================
   CHECKOUT & ORDERS (USER)
=========================== */
router.post("/user/checkout", verifyme, Checkout);
router.get("/user/orders", verifyme, UserOrders);
router.get("/user/Details", verifyme,userDetails )

/* ===========================
   PAYMENTS
=========================== */
router.post("/payment/razorpay", verifyme, createRazorpayPayment);
// router.post("/payment/stripe", verifyme, createStripePayment);
router.post("/payment/verify", verifyme, verifyPayment);

/* ===========================
   ADMIN ORDERS
=========================== */
router.get(
   "/admin/orders",
   verifyme,
   verifyRole,
   AdminALLorder
);

router.put(
   "/admin/orders/:id",
   verifyme,
   verifyRole,
   Order_Update
);

router.get(
   "/admin/orders/:id",
   verifyme,
   verifyRole,
   getSingleOrder
);

router.put("/user/profile/update", verifyme, updateUserDetails);


/* ===========================
   ADMIN PRODUCTS
=========================== */
router.post(
   "/admin/products",
   verifyme,
   verifyRole,
   New_prod
);

router.get(
   "/admin/products",
   verifyme,
   verifyRole,
   All_product
);

router.get(
   "/admin/products/:Prod_id",
   verifyme,
   verifyRole,
   Single_prod_details
);

router.put(
   "/admin/products/:Prod_id",
   verifyme,
   verifyRole,
   Update_prod
);

router.delete(
   "/admin/products/:Prod_id",
   verifyme,
   verifyRole,
   Delete_prod
);

router.put(
  "/order/status/:orderId",
  verifyme,
  verifyRole,
  updateOrderStatus
);

// /* ===========================
//    ADMIN INVENTORY DASHBOARD
// =========================== */
// router.get(
//   "/admin/inventory/summary",
//   verifyme,
//   verifyRole,
//   inventorySummary
// );

// router.get(
//   "/admin/inventory/products",
//   verifyme,
//   verifyRole,
//   inventoryProducts
// );

// router.put(
//   "/admin/inventory/update-stock/:productId",
//   verifyme,
//   verifyRole,
//   updateStock
// );

export default router;
