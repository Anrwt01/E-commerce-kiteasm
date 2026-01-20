import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Layout & Global Components
import Navbar from "./Comp/Common_Comp/Navbar.jsx";
import Footer from "./Comp/Common_Comp/Footer.jsx";
import WhatsAppButton from "./Comp/Common_Comp/WhatsAppButton.jsx";
import Protected_Route from "./Comp/Common_Comp/Protected_Route.jsx";

// Public Pages
import Home from "./Comp/Open_comp/Home.jsx";
import Products from "./Comp/Open_comp/Products.jsx";
import ProductDetails from "./Comp/Open_comp/ProductDetails.jsx";
import About from "./Comp/Open_comp/About.jsx";
import Contact from "./Comp/Open_comp/Contact.jsx";

// Auth Pages
import Login from "./Comp/Auth_comp/Login.jsx";
import Register from "./Comp/Auth_comp/Register.jsx";

// User Secure Pages
import Dashboard from "./Comp/User_Comp/Dashboard.jsx";
import User_details_update from "./Comp/User_Comp/User_details_update.jsx";
import Cart from "./Comp/User_Comp/Cart.jsx";
import Checkout from "./Comp/User_Comp/Checkout.jsx";
import MyOrders from "./Comp/User_Comp/MyOrders.jsx";

// Admin Secure Pages
import AdminDashboard from "./Comp/Admin_comp/AdminDashboard.jsx";
import AddProduct from "./Comp/Admin_comp/AddProduct.jsx";
import AllProducts from "./Comp/Admin_comp/AllProducts.jsx";
import UpdateProduct from "./Comp/Admin_comp/UpdateProduct.jsx";
import AllOrders from "./Comp/Admin_comp/AllOrders.jsx"
import OrderDetails from "./Comp/Admin_comp/OrderDetails.jsx"

/**
 * Ensures page resets to top when navigating.
 * Without this, clicking a product at the bottom of a list 
 * would open the details page already scrolled down.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      {/* 1. Global Handlers */}
      <ScrollToTop />

      {/* 2. Global Navigation */}
      <Navbar />

      {/* 3. Dynamic Content Area */}
      <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <Routes>
          
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* CATALOG SYSTEM: Unified plural naming */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* --- 🔒 PROTECTED USER ROUTES --- */}
          {/* These require the user to be logged in */}
          <Route element={<Protected_Route />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user/update" element={<User_details_update />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
          </Route>

          {/* --- 🔒 ADMIN ROUTES --- */}
          {/* Direct access to management tools */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AllProducts />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<AllOrders />} />
            <Route path="/admin/OrderDetails" element={<OrderDetails />} />

          {/* 404 CATCH-ALL (Optional) */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', paddingTop: '150px' }}>
              <h1>404: Off Radar</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          } />

        </Routes>
      </main>

      {/* 4. Global Footer Elements */}
      <Footer />
      <WhatsAppButton />

    </BrowserRouter>
  );
};

export default App;