"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ServicesByCategory({ services = [], categories = [] }) {
    const catList = Array.isArray(categories) ? categories : [];
    const svcList = Array.isArray(services) ? services : [];
    const displayCategories = catList.slice(0, 9);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <section className="pt-12 pb-16 relative overflow-hidden bg-gradient-to-br from-[#f0f8ff] via-[#cae2f7] to-[#92bdff]">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-blue-100 opacity-40"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-teal-100 opacity-30"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-cyan-100 opacity-20"></div>
            </div>

            {/* Floating shapes */}
            <div className="absolute top-40 left-20 w-16 h-16 rounded-lg bg-blue-200 opacity-20 rotate-45"></div>
            <div className="absolute bottom-40 right-24 w-20 h-20 rounded-full bg-teal-200 opacity-20"></div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-6">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Professional Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
                    >
                        Comprehensive legal solutions tailored to your unique needs
                    </motion.p>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '120px' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"
                    />
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                >
                    {displayCategories.map((category) => {
                        const matchedServices = svcList.filter(
                            service => service.categories?.includes(category._id)
                        ).slice(0, 7);

                        return (
                            <motion.div
                                key={category._id}
                                variants={item}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.1 }}
                                className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-100 flex flex-col transform transition-all duration-300 hover:shadow-2xl"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                                    <img
                                        src={category.imageURL}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <h3 className="text-2xl font-bold text-white drop-shadow-md">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-4 flex-1 flex flex-col">
                                    <ul className="space-y-3 mb-6 flex-1">
                                        {matchedServices.map((service) => (
                                            <li key={service._id} className="flex items-start">
                                                <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <Link
                                                    href={`/services/${service.slug}`}
                                                    className="ml-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                                                >
                                                    {service.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto pt-4">
                                        <Link
                                            href={`/services`}
                                            className="block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            Explore Services
                                            <svg className="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/services"
                        className="inline-block z-50 px-8 py-4 text-lg font-bold bg-white text-indigo-700 rounded-full border-2 border-indigo-200 shadow-md hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                        View All Services
                        <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative bottom element */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#EEF4FF] to-transparent z-1"></div>
        </section>
    );
}

// Add these to your global CSS (or CSS-in-JS solution)
const styles = `
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(1.05); }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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