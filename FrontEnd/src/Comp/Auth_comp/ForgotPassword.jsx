import React, { useState } from "react";
import axios from "axios";
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
            await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            setSubmitted(true);
        } catch (error) {
            alert(error.response?.data?.message || "Hangar Error: Could not verify email.");
        } finally {
            setLoading(false);
        }
    };

    const theme = {
        bg: "#000000",
        surface: "#0a0a0a",
        border: "#1a1a1a",
        textMain: "#ffffff",
        textMuted: "#666666",
        accent: "#0ea5e9", // Keeping your sky blue accent
    };

    const inputStyle = {
        width: '100%',
        padding: '16px 20px',
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
        color: theme.textMain,
        fontSize: '14px',
        outline: 'none',
        marginBottom: '20px',
        borderRadius: '8px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxSizing: 'border-box'
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
                    input:focus { border-color: ${theme.accent} !important; box-shadow: 0 0 0 1px ${theme.accent}; }
                    .back-btn:hover { color: white !important; transform: translateX(-4px); }
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
                        gap: '8px', fontSize: '11px', fontWeight: '700', color: theme.textMuted, 
                        cursor: 'pointer', marginBottom: '32px', textTransform: 'uppercase',
                        transition: 'all 0.2s', padding: 0
                    }}
                >
                    <ArrowLeftIcon width={14} /> Back to Hangar
                </button>

                {!submitted ? (
                    <>
                        <div style={{ marginBottom: '32px' }}>
                            <h1 style={{ 
                                fontSize: '42px', 
                                fontWeight: '800', 
                                letterSpacing: '-1.5px', 
                                margin: 0, 
                                color: theme.textMain,
                                lineHeight: '1.1'
                            }}>
                                Identity Recovery<span style={{color: theme.accent}}>.</span>
                            </h1>
                            <p style={{ marginTop: '16px', color: theme.textMuted, fontSize: '14px', lineHeight: '1.6' }}>
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
                                <EnvelopeIcon width={18} style={{ position: 'absolute', right: '16px', top: '16px', color: theme.textMuted }} />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading} 
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{ 
                                    width: '100%', 
                                    padding: '16px', 
                                    backgroundColor: isHovered ? '#fff' : theme.textMain, 
                                    color: '#000', 
                                    border: 'none', 
                                    borderRadius: '8px', 
                                    fontWeight: '800', 
                                    fontSize: '14px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s ease',
                                    transform: isHovered && !loading ? 'translateY(-2px)' : 'none',
                                    boxShadow: isHovered && !loading ? `0 10px 20px -10px ${theme.accent}` : 'none'
                                }}
                            >
                                {loading ? 'TRANSMITTING...' : 'INITIATE RECOVERY'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px 30px', 
                        background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', 
                        borderRadius: '16px', 
                        border: `1px solid ${theme.border}` 
                    }}>
                        <div style={{ 
                            width: '60px', height: '60px', backgroundColor: 'rgba(14, 165, 233, 0.1)', 
                            borderRadius: '50%', display: 'flex', alignItems: 'center', 
                            justifyContent: 'center', margin: '0 auto 24px' 
                        }}>
                            <CheckCircleIcon width={32} color={theme.accent} />
                        </div>
                        <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>Transmission Successful</h2>
                        <p style={{ color: theme.textMuted, fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>
                            New credentials routed to <span style={{color: 'white'}}>{email}</span>. Access your inbox to resume operations.
                        </p>
                        <Link 
                            to="/login" 
                            style={{ 
                                display: 'block', width: '100%', padding: '14px', 
                                backgroundColor: theme.accent, color: 'white', 
                                textDecoration: 'none', borderRadius: '8px', 
                                fontWeight: '700', fontSize: '14px',
                                transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
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