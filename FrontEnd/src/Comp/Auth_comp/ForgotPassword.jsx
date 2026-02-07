import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleResetRequest = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
            setSubmitted(true);
        } catch (error) {
            alert(error.response?.data?.message || "Hangar Error: Could not verify email.");
        } finally {
            setLoading(false);
        }
    };

    const theme = {
        bg: "var(--bg-base)",
        surface: "var(--bg-card)",
        border: "var(--border-soft)",
        textMain: "var(--slate-800)",
        textMuted: "var(--slate-400)",
        accent: "var(--accent)",
    };

    const inputStyle = {
        width: '100%',
        padding: '18px 20px',
        backgroundColor: 'white',
        border: `1px solid ${theme.border}`,
        color: theme.textMain,
        fontSize: '14px',
        outline: 'none',
        marginBottom: '24px',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
        fontWeight: '600',
        fontFamily: 'var(--font-sans)'
    };

    return (
        <div style={{
            backgroundColor: theme.bg,
            minHeight: "100vh",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <style>
                {`
                    input:focus { border-color: ${theme.accent} !important; }
                    .back-btn:hover { color: var(--slate-800) !important; transform: translateX(-4px); }
                    @media (max-width: 480px) {
                        h1 { fontSize: 32px !important; }
                        .container { paddingTop: 0 !important; }
                    }
                `}
            </style>

            <div className="container" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>

                {/* Back Button */}
                <button
                    className="back-btn"
                    onClick={() => navigate("/login")}
                    style={{
                        background: 'none', border: 'none', display: 'flex', alignItems: 'center',
                        gap: '10px', fontSize: '11px', fontWeight: '900', color: theme.textMuted,
                        cursor: 'pointer', marginBottom: '40px', textTransform: 'uppercase',
                        transition: '0.3s', padding: 0, letterSpacing: '1px'
                    }}
                >
                    <ArrowLeftIcon width={16} /> Back to Sign In
                </button>

                {!submitted ? (
                    <>
                        <div style={{ marginBottom: '60px' }}>
                            <h1 style={{
                                fontSize: 'clamp(2rem, 5vw, 3rem)',
                                fontWeight: '900',
                                letterSpacing: '-2px',
                                margin: 0,
                                color: theme.textMain,
                                lineHeight: '1.1'
                            }}>
                                Identity Recovery<span style={{ color: theme.accent }}>.</span>
                            </h1>
                            <p style={{ marginTop: '16px', color: 'var(--slate-600)', fontSize: '16px', lineHeight: '1.6' }}>
                                Initiate credential transmission. Provide your pilot email to receive a system-generated override.
                            </p>
                        </div>

                        <form onSubmit={handleResetRequest}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="email"
                                    placeholder="Pilot Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={inputStyle}
                                />
                                <EnvelopeIcon width={18} style={{ position: 'absolute', right: '16px', top: '16px', color: 'var(--accent)' }} />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: theme.accent,
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '18px',
                                    fontWeight: '900',
                                    fontSize: '13px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.4s ease',
                                    boxShadow: `0 10px 25px rgba(59, 130, 246, 0.3)`,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.5px'
                                }}
                            >
                                {loading ? 'TRANSMITTING...' : 'INITIATE RECOVERY'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="floating-card" style={{
                        textAlign: 'center',
                        padding: '60px 40px',
                    }}>
                        <div style={{
                            width: '70px', height: '70px', backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '50%', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', margin: '0 auto 32px'
                        }}>
                            <CheckCircleIcon width={40} color={theme.accent} />
                        </div>
                        <h2 style={{ color: 'var(--slate-800)', fontSize: '26px', fontWeight: '900', marginBottom: '16px', letterSpacing: '-1px' }}>Transmission Successful</h2>
                        <p style={{ color: 'var(--slate-600)', fontSize: '16px', lineHeight: '1.6', marginBottom: '40px' }}>
                            New credentials routed to <span style={{ color: 'var(--slate-800)', fontWeight: '800' }}>{email}</span>. Access your inbox to resume operations.
                        </p>
                        <Link
                            to="/login"
                            style={{
                                display: 'block', width: '100%', padding: '20px',
                                backgroundColor: theme.accent, color: 'white',
                                textDecoration: 'none', borderRadius: '18px',
                                fontWeight: '900', fontSize: '13px',
                                transition: '0.4s',
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            Return to Sign In
                        </Link>
                    </div>
                )}

                <p style={{
                    marginTop: '48px',
                    textAlign: 'center',
                    fontSize: '10px',
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: '600'
                }}>
                    Secured Fleet Protocol // v2.4.0
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;