"use client";

import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';

function WhatsAppButton() {
    const [isHovered, setIsHovered] = useState(false);
    
    // WhatsApp configuration
    const phoneNumber = "917696000201"; // Format: country code + number (no + or spaces)
    const message = "Hello! I would like to inquire about your services.";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* WhatsApp Icon */}
            <div className="relative">
                <FaWhatsapp className="text-3xl animate-pulse" />
                {/* Ripple effect */}
                <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></span>
            </div>
            
            {/* Text */}
            <span className="font-semibold text-base hidden sm:inline-block group-hover:tracking-wide transition-all">
                Chat with us
            </span>

            {/* Mobile only icon */}
            <span className="sm:hidden font-medium text-sm">Chat</span>
            
            {/* Hover effect glow */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </a>
    );
}

export default WhatsAppButton;
