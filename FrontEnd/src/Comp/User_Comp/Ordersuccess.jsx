import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckBadgeIcon, RocketLaunchIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

// Define styles object with Anti-Gravity aesthetic
const styles = {
    page: {
        backgroundColor: "var(--bg-base)",
        minHeight: "100vh",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "var(--font-sans)"
    },
    card: {
        backgroundColor: 'var(--bg-card)',
        maxWidth: '500px',
        width: '100%',
        padding: '60px',
        borderRadius: '40px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-floating)',
        border: '1px solid var(--border-soft)'
    },
    iconCircle: {
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        width: '120px',
        height: '120px',
        borderRadius: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 40px',
        transform: 'rotate(-5deg)'
    },
    title: {
        fontSize: '32px',
        fontWeight: '900',
        letterSpacing: '-2px',
        margin: '0 0 12px',
        color: 'var(--slate-800)'
    },
    subtitle: {
        color: 'var(--slate-600)',
        fontSize: '16px',
        marginBottom: '40px',
        lineHeight: '1.6'
    },
    infoBox: {
        backgroundColor: 'var(--bg-base)',
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '40px',
        border: '1px solid var(--border-soft)'
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    label: {
        fontSize: '10px',
        fontWeight: '900',
        color: 'var(--slate-400)',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    value: {
        fontSize: '14px',
        fontWeight: '900',
        color: 'var(--slate-800)',
        letterSpacing: '0.5px'
    },
    message: {
        fontSize: '14px',
        color: 'var(--slate-500)',
        lineHeight: '1.8',
        marginBottom: '48px',
        padding: '0 10px'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    primaryBtn: {
        backgroundColor: 'var(--accent)',
        color: '#fff',
        border: 'none',
        padding: '20px',
        borderRadius: '18px',
        fontWeight: '900',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '13px',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
        transition: '0.4s'
    },
    secondaryBtn: {
        backgroundColor: 'transparent',
        color: 'var(--slate-600)',
        border: '1px solid var(--border-soft)',
        padding: '18px',
        borderRadius: '18px',
        fontWeight: '900',
        cursor: 'pointer',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: '0.3s'
    }
};

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Retrieve Order ID passed from the Checkout navigation
    const orderId = location.state?.orderId || "N/A";

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.iconCircle}>
                    <CheckBadgeIcon width={60} color="var(--accent)" />
                </div>

                <h1 style={styles.title}>Deployment Confirmed<span style={{ color: 'var(--accent)' }}>.</span></h1>
                <p style={styles.subtitle}>Your hardware acquisition has been successfully logged in our fleet records.</p>

                <div style={styles.infoBox}>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>ORDER ID</span>
                        <span style={styles.value}># {orderId.slice(-8).toUpperCase()}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>LOGISTICS MODE</span>
                        <span style={styles.value}>STANDARD CLEARANCE</span>
                    </div>
                </div>

                <div style={styles.message}>
                    <p>Our logistics team is currently preparing your package for dispatch. You will receive a system-update once the hangar clears it for take-off.</p>
                </div>

                <div style={styles.buttonGroup}>
                    <button onClick={() => navigate("/orders")} style={styles.primaryBtn}>
                        TRACK SHIPMENT <ArrowRightIcon width={16} />
                    </button>
                    <button onClick={() => navigate("/")} style={styles.secondaryBtn}>
                        BACK TO HANGAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;