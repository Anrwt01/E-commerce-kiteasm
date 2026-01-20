import React from "react";

const WhatsAppButton = () => {
    const phoneNumber = "917678253479";
    const message = "Hello! I have a query regarding your products.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: 'fixed', bottom: '40px', right: '40px', zIndex: 1000,
                width: '64px', height: '64px', background: 'white',
                border: '1px solid var(--gray-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Chat with us on WhatsApp"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                style={{ width: '28px', opacity: 0.5 }}
            />
        </button>
    );
};

export default WhatsAppButton;
