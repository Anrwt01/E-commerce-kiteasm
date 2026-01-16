import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common
import Navbar from "./Comp/Common_Comp/Navbar.jsx";
import Footer from "./Comp/Common_Comp/Footer.jsx";

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


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
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
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
