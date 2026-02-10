"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TalkToExpertBtn } from '../common/TalkToExpertBtn';
import Link from 'next/link';

export const LegalSolutions = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const primaryColor = "#003366";
    const accentColor = "#ff9900";

    const legalSolutions = [
        {
            icon: '/icons/icon1.png',
            icon_bg: "#e6f0ff",
            heading: "Private Limited Company",
            desc: "Incorporate your business with full legal backing and expert guidance.",
            slug: "private-limited-company-registration"
        },
        {
            icon: '/icons/icon2.png',
            icon_bg: "#e6f0ff",
            heading: "Digital Signature Certificate (DSC)",
            desc: "Secure your digital identity for filing GST, ROC, and other government compliances.",
            slug: "digital-signature"
        },
        // {
        //     icon: '/icons/icon3.png',
        //     icon_bg: "#e6f0ff",
        //     heading: "Provident Fund (PF) Registration",
        //     desc: "Stay compliant and employee-friendly with easy PF registration support.",
        //     slug: "provident-fund-registration"
        // },
        {
            icon: '/icons/icon4.png',
            icon_bg: "#e6f0ff",
            heading: "GST Return Filing",
            desc: "Avoid penalties with timely and accurate GST return filing by experts.",
            slug: "gst-return-filing"
        },
        {
            icon: '/icons/icon5.png',
            icon_bg: "#e6f0ff",
            heading: "Income Tax Filing",
            desc: "Get expert help to file your personal or business income tax returns on time.",
            slug: "income-tax-e-filing"
        },
        {
            icon: '/icons/icon6.png',
            icon_bg: "#e6f0ff",
            heading: "GST Registration",
            desc: "Ensure smooth tax operations with fast and accurate GST registration.",
            slug: "gst-registration"
        }
    ];


    return (
        <div className="relative bg-gradient-to-br from-gray-50 to-white py-16 lg:px-4 text-center w-full overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-indigo-50 to-indigo-50 transform -skew-y-3 -translate-y-20"></div>
            <div className="absolute bottom-40 right-0 w-64 h-64 rounded-full bg-[#003366]/5 translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 px-4"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-2">
                        Experience a smarter
                    </h2>
                    <motion.h3
                        className="text-3xl md:text-4xl font-bold text-[#003366] mb-6 relative inline-block"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Taxation and Legal solution platform in your hand
                        <motion.div
                            className=" bottom-0 left-0 w-full h-1 bg-[#ff9900]"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        />
                    </motion.h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-6">
                        Streamline your legal processes with our comprehensive suite of services designed for modern businesses.
                    </p>
                </motion.div>

                <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8 px-4">
                    {legalSolutions.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-start gap-4 bg-white rounded-xl border border-gray-200 text-black p-6 relative overflow-hidden"
                            whileHover={{
                                y: -10,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            transition={{ duration: 0.3 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/services/${item.slug}`} className="flex flex-col items-start gap-4 h-full">
                                {/* Hover effect overlay */}
                                {hoveredIndex === index && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-[#003366]/5 to-[#003366]/10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    />
                                )}

                                {/* Icon with animated background */}
                                <div className="relative">
                                    <div
                                        className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                                        style={{
                                            backgroundColor: hoveredIndex === index ? primaryColor : item.icon_bg
                                        }}
                                    >
                                        <img
                                            src={item.icon}
                                            alt={`icon-${index}`}
                                            className="w-8 h-8 transition-all duration-300"
                                            style={{ filter: hoveredIndex === index ? "" : "" }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-2">
                                    <p
                                        className="w-full text-start font-bold text-lg text-[#003366] transition-colors duration-300"
                                        style={{ color: hoveredIndex === index ? primaryColor : primaryColor }}
                                    >
                                        {item.heading}
                                    </p>
                                    <p className="text-gray-600 text-sm w-full text-start">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Learn more button */}
                                <button
                                    className="pt-4 text-sm font-medium flex items-center transition-all duration-300"
                                    style={{
                                        color: hoveredIndex === index ? primaryColor : "#666",
                                        marginTop: "auto"
                                    }}
                                >
                                    <p>
                                        Learn more
                                    </p>
                                    <svg
                                        className="w-4 h-4 ml-2 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        style={{ transform: hoveredIndex === index ? "translateX(4px)" : "none" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-12"
                >
                    <TalkToExpertBtn className="px-8 py-4 text-lg font-semibold" />
                    <p className="text-gray-500 mt-6 text-sm">
                        Join 5,000+ businesses that trust our legal solutions
                    </p>
                </motion.div>
            </div>
        </div>
    )
}