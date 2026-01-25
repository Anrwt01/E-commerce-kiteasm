import React from "react";

const WhatsAppButton = () => {
    const phoneNumber = "917011001801";
    const message = "Hello! I'm interested in the Aero Class Elite products.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 1000 }}>
            {/* Soft Pulse Effect behind the button */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#25D366',
                opacity: 0.2,
                animation: 'pulse 2s infinite',
                zIndex: -1
            }} />

            <button
                onClick={handleClick}
                style={{
                    width: '64px',
                    height: '64px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '22px', // Squircle shape for modern look
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                    e.currentTarget.style.background = '#fff';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
                title="Direct Support Line"
            >
                {/* Notification Badge */}
                <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    width: '12px',
                    height: '12px',
                    background: '#22c55e',
                    borderRadius: '50%',
                    border: '2px solid white'
                }} />

                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    style={{ 
                        width: '32px', 
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                        transition: '0.3s'
                    }}
                />
            </button>

            <style>
                {`
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 0.4; }
                        70% { transform: scale(1.5); opacity: 0; }
                        100% { transform: scale(1); opacity: 0; }
                    }
                `}
            </style>
        </div>
    );
};

export default WhatsAppButton;