import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        payload
      );

      console.log("Login Success:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

        // Use full redirect to ensure app state is fresh
        window.location.href = "/dashboard";
      } else {
        alert("Login successful but no token received.");
      }

    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="login-input"
              type="email"
              placeholder="Email Address"
              ref={emailRef}
              required
            />
          </div>

          <div className="input-group">
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </div>

          <button className="login-button" type="submit">
            Log In
          </button>
        </form>

        <div className="form-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
