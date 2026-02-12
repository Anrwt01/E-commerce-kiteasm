import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/config.js";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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
        bg: "#f8fafc", // slate-50
        surface: "#ffffff",
        border: "#e2e8f0", // slate-200
        textMain: "#0f172a", // slate-900
        textMuted: "#64748b", // slate-500
        accent: "#3b82f6", // blue-500
    };

    return (
        <div className="forgot-password-wrapper">
            <style>
                {`
                    :root {
                        --accent: ${theme.accent};
                        --text-main: ${theme.textMain};
                        --text-muted: ${theme.textMuted};
                    }
                    .forgot-password-wrapper {
                        background-color: ${theme.bg};
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 24px;
                        font-family: 'Inter', system-ui, sans-serif;
                    }
                    .auth-card {
                        max-width: 440px;
                        width: 100%;
                        background: ${theme.surface};
                        padding: 40px;
                        border-radius: 24px;
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
                        border: 1px solid ${theme.border};
                    }
                    .back-btn {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 13px;
                        font-weight: 700;
                        color: var(--text-muted);
                        background: none;
                        border: none;
                        cursor: pointer;
                        margin-bottom: 32px;
                        transition: all 0.2s ease;
                        padding: 0;
                    }
                    .back-btn:hover {
                        color: var(--accent);
                        transform: translateX(-4px);
                    }
                    .title {
                        font-size: 32px;
                        font-weight: 800;
                        letter-spacing: -1px;
                        color: var(--text-main);
                        margin: 0 0 12px 0;
                        line-height: 1.2;
                    }
                    .desc {
                        color: var(--text-muted);
                        font-size: 15px;
                        line-height: 1.6;
                        margin-bottom: 32px;
                    }
                    .input-group {
                        position: relative;
                        margin-bottom: 20px;
                    }
                    .custom-input {
                        width: 100%;
                        padding: 16px 48px 16px 16px;
                        border-radius: 12px;
                        border: 1px solid ${theme.border};
                        font-size: 15px;
                        font-weight: 500;
                        transition: all 0.2s ease;
                        box-sizing: border-box;
                    }
                    .custom-input:focus {
                        outline: none;
                        border-color: var(--accent);
                        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                    }
                    .input-icon {
                        position: absolute;
                        right: 16px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: var(--text-muted);
                    }
                    .submit-btn {
                        width: 100%;
                        padding: 16px;
                        background-color: var(--accent);
                        color: white;
                        border: none;
                        border-radius: 12px;
                        font-weight: 700;
                        font-size: 15px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
                    }
                    .submit-btn:hover:not(:disabled) {
                        filter: brightness(1.1);
                        transform: translateY(-1px);
                        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
                    }
                    .submit-btn:disabled {
                        opacity: 0.7;
                        cursor: not-allowed;
                    }
                    .success-icon-box {
                        width: 64px;
                        height: 64px;
                        background: #eff6ff;
                        border-radius: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 24px;
                    }
                    .footer-tag {
                        margin-top: 32px;
                        text-align: center;
                        font-size: 11px;
                        font-weight: 700;
                        color: var(--text-muted);
                        letter-spacing: 1px;
                        opacity: 0.6;
                    }
                    @media (max-width: 480px) {
                        .auth-card {
                            padding: 24px;
                            border-radius: 20px;
                        }
                        .title { font-size: 26px; }
                        .forgot-password-wrapper { padding: 16px; }
                    }
                `}
            </style>

            <div className="auth-card">
                {/* Back Button */}
                <button className="back-btn" onClick={() => navigate("/login")}>
                    <ArrowLeftIcon width={18} /> BACK TO SIGN IN
                </button>

                {!submitted ? (
                    <>
                        <div className="header-section">
                            <h1 className="title">
                                Identity Recovery<span style={{ color: theme.accent }}>.</span>
                            </h1>
                            <p className="desc">
                                Initiate credential transmission. Provide your pilot email to receive a system-generated override.
                            </p>
                        </div>

                        <form onSubmit={handleResetRequest}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="Pilot Email Address"
                                    className="custom-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <EnvelopeIcon width={20} className="input-icon" />
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'TRANSMITTING...' : 'INITIATE RECOVERY'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <div className="success-icon-box">
                            <CheckCircleIcon width={36} color={theme.accent} />
                        </div>
                        <h2 className="title" style={{fontSize: '24px'}}>Successful</h2>
                        <p className="desc">
                            New credentials routed to <br/>
                            <strong style={{ color: theme.textMain }}>{email}</strong>. Check your inbox.
                        </p>
                        <Link to="/login" className="submit-btn" style={{ display: 'block', textDecoration: 'none', textAlign: 'center' }}>
                            RETURN TO SIGN IN
                        </Link>
                    </div>
                )}

                <p className="footer-tag">
                    SECURED PROTOCOL // V2.4.0
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;