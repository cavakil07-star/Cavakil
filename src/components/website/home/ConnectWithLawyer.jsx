"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { TalkToExpertBtn } from '../common/TalkToExpertBtn';

export const ConnectWithLawyer = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="relative overflow-hidden py-12 lg:py-18 px-4 w-full bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full filter blur-[80px] opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100 rounded-full filter blur-[100px] opacity-50"></div>
                <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-100 rounded-full filter blur-[120px] opacity-30"></div>
            </div>

            {/* Decorative shapes */}
            <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-blue-200 opacity-20"></div>
            <div className="absolute bottom-16 right-20 w-24 h-24 rounded-full bg-indigo-200 opacity-20"></div>
            <div className="absolute top-1/4 right-1/3 w-20 h-20 rotate-45 bg-purple-200 opacity-15"></div>

            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-between">
                {/* Left: Image with decorative elements */}
                <div className="w-full lg:w-1/2 flex justify-center relative">
                    <div className="relative w-full max-w-lg">
                        {/* Floating elements */}
                        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-10 animate-pulse-slow"></div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 opacity-10 animate-pulse-slow-delay"></div>

                        {/* Main image container */}
                        <div
                            className={`relative w-full aspect-square rounded-3xl overflow-hidden border-8 border-white shadow-2xl transition-all duration-500 ${hovered ? 'scale-105 rotate-1' : 'scale-100 rotate-0'
                                }`}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <Image
                                alt='Legal expert consultation'
                                width={600}
                                height={600}
                                src={"/connectWithLawyer.png"}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating badges */}
                        <div className="absolute -top-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-float">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">25+ Years</p>
                                    <p className="text-xs text-gray-500">Experience</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-float-delay">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">98% Success</p>
                                    <p className="text-xs text-gray-500">Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Text content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
                    <div className="max-w-lg mx-auto lg:mx-0">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 font-medium mb-3">
                            Expert Consultation
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                            Connect with our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Advocate/ CA/CS Taxation Experts
                            </span>
                        </h2>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Get personalized legal advice from our team of experienced tax professionals. We provide tailored solutions for your unique situation with a focus on efficiency and clarity.
                        </p>

                        <div className="mb-10">
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">No hidden fees</span>
                                </div>

                                {/* <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">24/7 support</span>
                                </div> */}

                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Free initial consultation</span>
                                </div>
                            </div>

                            <div className="relative inline-block">
                                <TalkToExpertBtn />
                                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center animate-ping-slow opacity-60"></div>
                            </div>
                        </div>

                        {/* <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm inline-block">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Call us directly</p>
                                    <p className="text-lg font-bold text-gray-800">7485755698</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Floating chat icon
            <div className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg flex items-center justify-center cursor-pointer animate-bounce-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div> */}
        </div>
    );
};

// Add these to your global CSS (or CSS-in-JS solution)
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes float-delay {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(1.05); }
  }
  
  @keyframes ping-slow {
    0% { transform: scale(1); opacity: 0.6; }
    75%, 100% { transform: scale(1.5); opacity: 0; }
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-float-delay {
    animation: float-delay 5s ease-in-out infinite;
    animation-delay: 1s;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-ping-slow {
    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 2s infinite;
  }
  
  .animate-pulse-slow-delay {
    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    animation-delay: 1s;
  }
`;

// Add the styles to the head
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
}