import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User_details_update = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // New state for initial fetch

  // Refs for all inputs
  const nameRef = useRef(null);
  const phone2Ref = useRef(null);
  const houseRef = useRef(null);
  const galinoRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchCurrentDetails();
    }
  }, [navigate]);

  // --- FETCH EXISTING DATA TO PRE-FILL ---
  const fetchCurrentDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/details", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const user = res.data.user;
        const addr = user.address?.[0] || {}; // Get first address object

        // Set values directly to refs
        nameRef.current.value = user.name || "";
        phone2Ref.current.value = user.phone2 || "";
        houseRef.current.value = addr.house || "";
        galinoRef.current.value = addr.galino || "";
        cityRef.current.value = addr.city || "";
        stateRef.current.value = addr.state || "";
        pincodeRef.current.value = addr.pincode || "";
      }
    } catch (error) {
      console.error("Error fetching prefill data:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: nameRef.current.value,
      phone2: phone2Ref.current.value || null,
      address: [{
        house: houseRef.current.value,
        galino: galinoRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        pincode: pincodeRef.current.value
      }]
    };

    try {
      await axios.put("http://localhost:5000/api/user/profile/update", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '20px', background: 'var(--gray-light)',
    border: '1px solid transparent', fontSize: '14px', outline: 'none',
    marginBottom: '20px'
  };

  if (fetching) return (
    <div style={{ textAlign: 'center', paddingTop: '200px' }} className="serif italic">
      Retrieving mission profile...
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 className="serif" style={{ fontSize: '48px' }}>Update Profile<span style={{ fontStyle: 'normal' }}>.</span></h1>
        <p className="text-xs text-muted uppercase tracking-widest" style={{ marginTop: '16px' }}>Refine your coordinates</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <span className="text-xs uppercase tracking-widest" style={{ fontWeight: 900, display: 'block', marginBottom: '20px' }}>01. Identity</span>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input type="text" placeholder="Full Name" ref={nameRef} required style={inputStyle} />
            <input type="text" placeholder="Alt Phone" ref={phone2Ref} pattern="[0-9]{10}" style={inputStyle} />
          </div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest" style={{ fontWeight: 900, display: 'block', marginBottom: '20px' }}>02. Address</span>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input type="text" placeholder="House / Flat No" ref={houseRef} required style={inputStyle} />
            <input type="text" placeholder="Gali / Locality" ref={galinoRef} required style={inputStyle} />
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <input type="text" placeholder="City" ref={cityRef} required style={inputStyle} />
            <input type="text" placeholder="State" ref={stateRef} required style={inputStyle} />
            <input type="text" placeholder="Pincode" ref={pincodeRef} required style={inputStyle} />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn btn-black" style={{ padding: '24px' }}>
          {loading ? 'Updating...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default User_details_update;