import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Common
import Navbar from "./Comp/Common_Comp/Navbar.jsx";
import Protected_Route from "./Comp/Common_Comp/Protected_Route.jsx";
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
import Admin_Route from "./Comp/Common_Comp/Admin_Route.jsx";
import AdminDashboard from "./Comp/Admin_comp/AdminDashboard.jsx";
import AddProduct from "./Comp/Admin_comp/AddProduct.jsx";
import UpdateProduct from "./Comp/Admin_comp/UpdateProduct.jsx";
import AllProducts from "./Comp/Admin_comp/AllProducts.jsx";
import AllOrders from "./Comp/Admin_comp/AllOrders.jsx";
import OrderDetails from "./Comp/Admin_comp/OrderDetails.jsx";


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <Navbar />

      {/* Refined Test Navigation (Debug Mode) */}
      <div style={{
        padding: '8px 20px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        zIndex: 1001,
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        fontSize: '12px',
        color: '#94a3b8'
      }}>
        <strong style={{ color: '#fff' }}>Quick Access:</strong>
        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link>
        <Link to="/products" style={{ color: '#94a3b8' }}>Products</Link>
        <Link to="/about" style={{ color: '#94a3b8' }}>About</Link>
        <Link to="/contact" style={{ color: '#94a3b8' }}>Contact</Link>
        <Link to="/login" style={{ color: '#94a3b8' }}>Login</Link>
        <Link to="/register" style={{ color: '#94a3b8' }}>Register</Link>
        <Link to="/dashboard" style={{ color: '#94a3b8' }}>Dashboard</Link>
        <Link to="/user/update" style={{ color: '#94a3b8' }}>Update User</Link>
        <Link to="/cart" style={{ color: '#94a3b8' }}>Cart</Link>
        <Link to="/checkout" style={{ color: '#94a3b8' }}>Checkout</Link>
        <Link to="/orders" style={{ color: '#94a3b8' }}>My Orders</Link>
        <Link to="/admin/dashboard" style={{ color: '#94a3b8' }}>Admin Dash</Link>
        <Link to="/admin/add-product" style={{ color: '#94a3b8' }}>Add Product</Link>
        <Link to="/admin/update-product" style={{ color: '#94a3b8' }}>Update Product</Link>
        <Link to="/admin/all-products" style={{ color: '#94a3b8' }}>All Admin Products</Link>
        <Link to="/admin/orders" style={{ color: '#94a3b8' }}>All Orders</Link>
        <Link to="/admin/order-details" style={{ color: '#94a3b8' }}>Order Details</Link>
      </div>

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

      {/* Footer always visible */}
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
};

export default App;
