import React from "react";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
    // Replace with your actual WhatsApp Business number
    const phoneNumber = "917678253479";
    const message = "Hello! I have a query regarding your products.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="whatsapp-float" onClick={handleClick} title="Chat with us on WhatsApp">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="whatsapp-icon"
            />
        </div>
    );
};

export default WhatsAppButton;
