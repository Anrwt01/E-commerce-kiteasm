import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Layout & Global Components
import Navbar from "./Comp/Common_Comp/Navbar.jsx";
import Footer from "./Comp/Common_Comp/Footer.jsx";
import WhatsAppButton from "./Comp/Common_Comp/WhatsAppButton.jsx";
import Protected_Route from "./Comp/Common_Comp/Protected_Route.jsx";
import PublicRoute from "./Comp/Common_Comp/PublicRoute.jsx"; // New

// Public Pages
import Home from "./Comp/Open_comp/Home.jsx";
import Products from "./Comp/Open_comp/Products.jsx";
import ProductDetails from "./Comp/Open_comp/ProductDetails.jsx";
import About from "./Comp/Open_comp/About.jsx";
import Contact from "./Comp/Open_comp/Contact.jsx";

// Auth Pages
import Login from "./Comp/Auth_comp/Login.jsx";
import Register from "./Comp/Auth_comp/Register.jsx";
import Profile from "./Comp/User_Comp/profile.jsx";

// User Secure Pages
import Dashboard from "./Comp/User_Comp/Dashboard.jsx";
import User_details_update from "./Comp/User_Comp/User_details_update.jsx";
import Cart from "./Comp/User_Comp/Cart.jsx";
import Checkout from "./Comp/User_Comp/Checkout.jsx";
import MyOrders from "./Comp/User_Comp/MyOrders.jsx";
import Wishlist from "./Comp/User_Comp/Wishlist.jsx";
import ForgotPassword from "./Comp/Auth_comp/ForgotPassword.jsx";

// Admin Secure Pages
import AdminDashboard from "./Comp/Admin_comp/AdminDashboard.jsx";
import AddProduct from "./Comp/Admin_comp/AddProduct.jsx";
import AllProducts from "./Comp/Admin_comp/AllProducts.jsx";
// import UpdateProduct from "./Comp/Admin_comp/UpdateProduct.jsx";
import AllOrders from "./Comp/Admin_comp/AllOrders.jsx"
import OrderDetails from "./Comp/Admin_comp/OrderDetails.jsx"

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <Routes>

          {/* --- 🔓 GUEST ONLY ROUTES (Blocked if logged in) --- */}
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* --- 🌍 SHARED PUBLIC ROUTES (Always accessible) --- */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path='/profile' element={<Profile />} />

          {/* --- 🔒 PROTECTED USER ROUTES (Login Required) --- */}
          <Route element={<Protected_Route adminOnly={false} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user/update" element={<User_details_update />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/wishlist" element={<Wishlist />} />

          </Route>

          {/* --- 🛡️ PROTECTED ADMIN ROUTES (Admin Only) --- */}
          <Route element={<Protected_Route adminOnly={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AllProducts />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            {/* <Route path="/admin/update-product/:id" element={<UpdateProduct />} /> */}
            <Route path="/admin/orders" element={<AllOrders />} />
            <Route path="/admin/OrderDetails/:id" element={<OrderDetails />} />
          </Route>

          {/* 404 CATCH-ALL */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', paddingTop: '150px' }}>
              <h1>404: Off Radar</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          } />

        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
};

export default App;