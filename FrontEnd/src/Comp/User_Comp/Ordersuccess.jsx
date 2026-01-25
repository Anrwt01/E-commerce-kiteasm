import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckBadgeIcon, RocketLaunchIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Retrieve Order ID passed from the Checkout navigation
    const orderId = location.state?.orderId || "N/A";

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.iconCircle}>
                    <CheckBadgeIcon width={60} color="#0ea5e9" />
                </div>
                
                <h1 style={styles.title}>Deployment Confirmed<span style={{color: '#0ea5e9'}}>.</span></h1>
                <p style={styles.subtitle}>Your acquisition has been logged in our fleet records.</p>
                
                <div style={styles.infoBox}>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>ORDER ID</span>
                        <span style={styles.value}># {orderId.slice(-8).toUpperCase()}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>PAYMENT MODE</span>
                        <span style={styles.value}>CASH ON DELIVERY</span>
                    </div>
                </div>

                <div style={styles.message}>
                    <p>Our logistics team is currently preparing your package for dispatch. You will receive an email update once the hangar clears it for take-off.</p>
                </div>

                <div style={styles.buttonGroup}>
                    <button onClick={() => navigate("/orders")} style={styles.secondaryBtn}>
                        VIEW ALL ORDERS
                    </button>
                    <button onClick={() => navigate("/")} style={styles.primaryBtn}>
                        CONTINUE SHOPPING <ArrowRightIcon width={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { backgroundColor: "#f8fafc", minHeight: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
    card: { backgroundColor: '#fff', maxWidth: '500px', width: '100%', padding: '48px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
    iconCircle: { backgroundColor: '#f0f9ff', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' },
    title: { fontSize: '32px', fontWeight: '800', letterSpacing: '-1px', margin: '0 0 8px' },
    subtitle: { color: '#64748b', fontSize: '16px', marginBottom: '32px' },
    infoBox: { backgroundColor: '#f8fafc', borderRadius: '16px', padding: '24px', marginBottom: '32px', border: '1px solid #e2e8f0' },
    infoRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
    label: { fontSize: '10px', fontWeight: '900', color: '#94a3b8' },
    value: { fontSize: '14px', fontWeight: '700', color: '#1e293b' },
    message: { fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '40px' },
    buttonGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
    primaryBtn: { backgroundColor: '#0ea5e9', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
    secondaryBtn: { backgroundColor: 'transparent', color: '#64748b', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }
};

export default OrderSuccess;