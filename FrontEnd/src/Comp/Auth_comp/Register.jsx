import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  // User refs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phone1Ref = useRef(null);
  const phone2Ref = useRef(null);
  const passwordRef = useRef(null);

  // Address refs
  const houseRef = useRef(null);
  const galinoRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Final payload matching backend schema
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone1: phone1Ref.current.value,
      phone2: phone2Ref.current.value || null,
      password: passwordRef.current.value,
      address: [
        {
          house: houseRef.current.value,
          galino: galinoRef.current.value,
          city: cityRef.current.value,
          state: stateRef.current.value,
          pincode: pincodeRef.current.value
        }
      ]
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload
      );

      console.log("Registration Success:", res.data);
      alert("User registered successfully!");

      // If backend sends token on register, use it. Otherwise go to login
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        window.location.href = "/dashboard";
      } else {
        // Fallback if no token (e.g. backend requires manual login)
        // But user asked for a page AFTER login/register, assuming redirect.
        // If no token, maybe redirect to login with pre-filled?
        // For now, let's assume valid flow is to login
        window.location.href = "/login";
      }

    } catch (error) {
      console.error(
        "Registration Error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>

        <form className="register-form" onSubmit={handleSubmit}>

          {/* USER DETAILS */}
          <div className="form-section-title">Personal Details</div>

          <input
            className="register-input"
            type="text"
            placeholder="Full Name"
            ref={nameRef}
            required
          />

          <input
            className="register-input"
            type="email"
            placeholder="Email Address"
            ref={emailRef}
            required
          />

          <div className="input-row">
            <input
              className="register-input"
              type="text"
              placeholder="Primary Phone"
              ref={phone1Ref}
              required
              pattern="[0-9]{10}"
              title="Enter 10-digit phone number"
            />

            <input
              className="register-input"
              type="text"
              placeholder="Alt. Phone (Optional)"
              ref={phone2Ref}
              pattern="[0-9]{10}"
              title="Enter 10-digit phone number"
            />
          </div>

          <input
            className="register-input"
            type="password"
            placeholder="Password (Min 6 chars)"
            ref={passwordRef}
            required
            minLength={6}
          />

          {/* ADDRESS DETAILS */}
          <div className="form-section-title">Address</div>

          <div className="input-row">
            <input
              className="register-input"
              type="text"
              placeholder="House / Flat No"
              ref={houseRef}
              required
            />

            <input
              className="register-input"
              type="text"
              placeholder="Gali / Locality"
              ref={galinoRef}
              required
            />
          </div>

          <div className="input-row">
            <input
              className="register-input"
              type="text"
              placeholder="City"
              ref={cityRef}
              required
            />

            <input
              className="register-input"
              type="text"
              placeholder="State"
              ref={stateRef}
              required
            />
          </div>

          <input
            className="register-input"
            type="text"
            placeholder="Pincode"
            ref={pincodeRef}
            required
            pattern="[0-9]{6}"
            title="Enter 6-digit pincode"
          />

          <button className="register-button" type="submit">Register</button>
        </form>

        <div className="register-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
