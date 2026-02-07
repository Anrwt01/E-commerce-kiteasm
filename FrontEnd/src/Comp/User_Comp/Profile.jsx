import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { ArrowLeft, User, Mail, Calendar, ChevronRight } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992); // Track screen size
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE_URL}/user/Details`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) setUser(data.user);
      } catch (err) {
        console.error("Auth Error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    page: {
      background: "var(--bg-base)",
      minHeight: "100vh",
      padding: isMobile ? "100px 20px 60px" : "140px 16px 80px",
      color: "var(--slate-800)",
      fontFamily: "var(--font-sans)",
    },
    container: {
      maxWidth: 1100,
      margin: "0 auto",
    },
    backBtn: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      border: "none",
      background: "none",
      fontSize: 11,
      fontWeight: 900,
      color: "var(--slate-400)",
      cursor: "pointer",
      marginBottom: 32,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    layout: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", // Stacks on mobile
      gap: isMobile ? "40px" : "80px",
      alignItems: "start",
    },
    mainTitle: {
      fontSize: isMobile ? "48px" : "clamp(2.5rem, 8vw, 4.5rem)",
      fontWeight: 900,
      marginTop: 10,
      letterSpacing: "-2px",
      color: "var(--slate-800)",
      lineHeight: "0.9",
      marginBottom: isMobile ? "20px" : "40px",
    },
    sectionCard: {
      background: "var(--bg-card)",
      padding: isMobile ? "30px 20px" : "48px",
      borderRadius: isMobile ? "30px" : "40px",
      border: "1px solid var(--border-soft)",
      boxShadow: "var(--shadow-floating)",
    },
    infoBox: {
      padding: "24px 0",
      borderBottom: "1px solid var(--border-soft)",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "9px",
      fontWeight: "900",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--slate-400)",
    },
    valText: {
      fontSize: isMobile ? "16px" : "20px",
      fontWeight: "800",
      letterSpacing: "-0.5px",
      color: "var(--slate-800)",
      wordBreak: "break-word", // Prevents long emails from breaking layout
    },
    btnPrimary: {
      backgroundColor: "var(--accent)",
      color: "#fff",
      padding: "20px",
      borderRadius: "18px",
      border: "none",
      fontSize: "12px",
      fontWeight: "900",
      letterSpacing: "1px",
      textTransform: "uppercase",
      cursor: "pointer",
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
    },
    btnSecondary: {
      backgroundColor: "transparent",
      color: "var(--slate-600)",
      padding: "18px",
      borderRadius: "18px",
      border: "1px solid var(--border-soft)",
      fontSize: "11px",
      fontWeight: "900",
      letterSpacing: "1px",
      textTransform: "uppercase",
      cursor: "pointer",
      width: "100%",
    },
    avatar: {
      width: "56px",
      height: "56px",
      backgroundColor: "rgba(59, 130, 246, 0.05)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "24px",
    },
  };

  if (loading)
    return (
      <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "2px", color: "var(--accent)" }}>
          INITIALIZING IDENTITY...
        </div>
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <main style={styles.layout}>
          {/* Left Section - Hero Area */}
          <section style={{ textAlign: isMobile ? "center" : "left" }}>
            <div style={{ ...styles.avatar, margin: isMobile ? "0 auto 24px" : "0 0 24px" }}>
              <User size={28} color="var(--accent)" />
            </div>
            <h1 style={styles.mainTitle}>
              {user?.name?.split(" ")[0]} <br />
              <span style={{ color: "var(--accent)" }}>{user?.name?.split(" ")[1] || "Pilot"}</span>
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", justifyContent: isMobile ? "center" : "flex-start" }}>
              <div style={{ width: "40px", height: "1px", backgroundColor: "var(--border-soft)" }} />
              <p style={{ fontSize: "10px", fontWeight: "900", letterSpacing: "1px", textTransform: "uppercase", color: "var(--slate-400)" }}>
                USER STATUS: ACTIVE
              </p>
            </div>
          </section>

          {/* Right Section - Data Card */}
          <section>
            <div style={styles.sectionCard}>
              <div style={styles.infoBox}>
                <p style={styles.label}>E-Mail Address</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                  <p style={styles.valText}>{user?.email}</p>
                  <Mail size={18} color="var(--slate-200)" style={{ flexShrink: 0 }} />
                </div>
              </div>

              <div style={styles.infoBox}>
                <p style={styles.label}>Registration Date</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={styles.valText}>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "---"}
                  </p>
                  <Calendar size={18} color="var(--slate-200)" />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "32px" }}>
                <button style={styles.btnPrimary} onClick={() => navigate("/orders")}>
                  VIEW SHIPMENT HISTORY <ChevronRight size={16} />
                </button>
                <button style={styles.btnSecondary} onClick={() => navigate("/user/update")}>
                  UPDATE USER PROFILE
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;