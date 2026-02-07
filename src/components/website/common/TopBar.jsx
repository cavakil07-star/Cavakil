'use client'

import React from 'react'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'

const TopBar = () => {
    return (
        <div className="hidden lg:block bg-[#003366] text-white/90 text-sm py-2 px-4 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex justify-center items-center">
                <div className="flex items-center gap-8">
                    <a 
                        href="tel:+917696000201" 
                        className="flex items-center gap-2 hover:text-white transition-colors group"
                    >
                        <div className="p-1 rounded-full bg-white/10 group-hover:bg-blue-500 transition-colors">
                            <Phone size={14} className="text-white" />
                        </div>
                        <span className="font-medium tracking-wide font-poppins">+91 7696 000 201</span>
                    </a>

                    <div className="w-px h-4 bg-white/20"></div>

                    <a 
                        href="mailto:support@cavakil.com" 
                        className="flex items-center gap-2 hover:text-white transition-colors group"
                    >
                        <div className="p-1 rounded-full bg-white/10 group-hover:bg-blue-500 transition-colors">
                            <Mail size={14} className="text-white" />
                        </div>
                        <span className="font-medium tracking-wide font-poppins">support@cavakil.com</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TopBar
