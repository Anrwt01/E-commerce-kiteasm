import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User_details_update.css"

const User_details_update = () => {
  const navigate = useNavigate();

  // Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const nameRef = useRef(null);
  const phone2Ref = useRef(null);

  // Address refs
  const houseRef = useRef(null);
  const galinoRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);

  const sendUpdatedUserDetails = async (e) => {
    e.preventDefault(); // ✅ important

    const payload = {
      name: nameRef.current.value,
      phone2: phone2Ref.current.value || null,
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
      const res = await axios.put(
        "http://localhost:5000/api/user/profile/update",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Profile updated successfully");
      console.log(res.data);

    } catch (error) {
      console.error(
        "Update error:",
        error.response?.data || error.message
      );
      alert("Failed to update profile");
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>

      <form onSubmit={sendUpdatedUserDetails}>
        <input
          className="register-input"
          type="text"
          placeholder="Full Name"
          ref={nameRef}
          required
        />

        <input
          className="register-input"
          type="text"
          placeholder="Alternate Phone Number"
          ref={phone2Ref}
          pattern="[0-9]{10}"
          title="Enter 10-digit phone number"
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default User_details_update;
