import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Common
import Navbar from "./Comp/Common_Comp/Navbar.jsx";
import Footer from "./Comp/Common_Comp/Footer.jsx";
import WhatsAppButton from "./Comp/Common_Comp/WhatsAppButton.jsx";

// Open / Public
import Home from "./Comp/Open_comp/Home.jsx";
import Products from "./Comp/Open_comp/Products.jsx";
import ProductDetails from "./Comp/Open_comp/ProductDetails.jsx";
import About from "./Comp/Open_comp/About.jsx";
import Contact from "./Comp/Open_comp/Contact.jsx";

// Auth
import Login from "./Comp/Auth_comp/Login.jsx";
import Register from "./Comp/Auth_comp/Register.jsx";

// User
import Dashboard from "./Comp/User_Comp/Dashboard.jsx";
import User_details_update from "./Comp/User_Comp/User_details_update.jsx";
import Cart from "./Comp/User_Comp/Cart.jsx";
import Checkout from "./Comp/User_Comp/Checkout.jsx";
import MyOrders from "./Comp/User_Comp/MyOrders.jsx";

// Admin
import AdminDashboard from "./Comp/Admin_comp/AdminDashboard.jsx";
import AddProduct from "./Comp/Admin_comp/AddProduct.jsx";
import UpdateProduct from "./Comp/Admin_comp/UpdateProduct.jsx";
import AllProducts from "./Comp/Admin_comp/AllProducts.jsx";
import AllOrders from "./Comp/Admin_comp/AllOrders.jsx";
import OrderDetails from "./Comp/Admin_comp/OrderDetails.jsx";

// Scroll to Top Handler
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
      <ScrollToTop />

      {/* Navbar always visible */}
      <Navbar />

      {/* Routes Context */}
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/update" element={<User_details_update />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/update-product" element={<UpdateProduct />} />
          <Route path="/admin/all-products" element={<AllProducts />} />
          <Route path="/admin/orders" element={<AllOrders />} />
          <Route path="/admin/order-details" element={<OrderDetails />} />
        </Routes>
      </main>

      {/* Footer always visible */}
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
};

export default App;
