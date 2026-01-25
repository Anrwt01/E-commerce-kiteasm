import React, { useState } from "react";
import axios from "axios";
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
            // This hits the controller that generates the password and emails it
            await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            setSubmitted(true);
        } catch (error) {
            alert(error.response?.data?.message || "Hangar Error: Could not verify email.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '20px', background: '#f8fafc',
        border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none',
        marginBottom: '20px', borderRadius: '12px', transition: 'all 0.3s'
    };

    return (
        <div style={{ backgroundColor: "#fff", minHeight: "100vh", paddingTop: '160px' }}>
            <div style={{ maxWidth: '450px', margin: '0 auto', padding: '0 20px' }}>
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate("/login")} 
                    style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '900', color: '#94a3b8', cursor: 'pointer', marginBottom: '40px', textTransform: 'uppercase' }}
                >
                    <ArrowLeftIcon width={14} /> Back to Login
                </button>

                {!submitted ? (
                    <>
                        <div style={{ marginBottom: '40px' }}>
                            <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', margin: 0 }}>
                                Lost Access<span style={{color: '#0ea5e9'}}>.</span>
                            </h1>
                            <p style={{ marginTop: '12px', color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                                Enter your registered email. We'll transmit a system-generated password to your inbox.
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
                                <EnvelopeIcon width={20} style={{ position: 'absolute', right: '20px', top: '22px', color: '#cbd5e1' }} />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading} 
                                style={{ 
                                    width: '100%', padding: '20px', backgroundColor: 'black', color: 'white', 
                                    border: 'none', borderRadius: '12px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                {loading ? 'Transmitting...' : 'Generate New Password'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', background: '#f0f9ff', borderRadius: '24px', border: '1px solid #e0f2fe' }}>
                        <CheckCircleIcon width={48} color="#0ea5e9" style={{ margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>Transmission Sent!</h2>
                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '30px' }}>
                            Check <b>{email}</b> for your new credentials. Use them to sign back into your hangar.
                        </p>
                        <Link 
                            to="/login" 
                            style={{ display: 'block', width: '100%', padding: '16px', backgroundColor: '#0ea5e9', color: 'white', textDecoration: 'none', borderRadius: '12px', fontWeight: '700' }}
                        >
                            Return to Sign In
                        </Link>
                    </div>
                )}

                <p style={{ marginTop: '60px', textAlign: 'center', fontSize: '12px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Secured Fleet Protocol v2.4
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;