import React from 'react';
import { ContactForm } from '../common/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaBuilding, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
    return (
        <section className="relative overflow-hidden pb-20 pt-10 px-4 bg-gradient-to-br from-[#f0f8ff] to-[#e6f7ff]">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-blue-100 opacity-40"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-teal-100 opacity-30"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-cyan-100 opacity-20"></div>
            </div>

            {/* Floating shapes */}
            <div className="absolute top-40 left-20 w-16 h-16 rounded-lg bg-blue-200 opacity-20 rotate-45"></div>
            <div className="absolute bottom-40 right-24 w-20 h-20 rounded-full bg-teal-200 opacity-20"></div>

            {/* Main content */}
            <div className="relative max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-6 py-2 bg-white rounded-full shadow-sm mb-4">
                        <span className="text-sm font-medium text-blue-600">Get in Touch</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Connect With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00564F] to-teal-600">Tax Experts</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Have questions or need assistance? Our team is ready to provide personalized GST & Taxation guidance.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Contact Info */}
                    <div className="lg:w-2/5">
                        <div className="bg-white rounded-3xl shadow-xl p-8 h-full border border-gray-100">
                            <div className="mb-10">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Office</h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-[#00564F] to-teal-500 rounded-full mb-6"></div>
                                <p className="text-gray-600 mb-8">
                                    Visit our office or reach out through any of our communication channels. We're here to help you with all your legal needs.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-[#00564F] text-xl" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-gray-800 mb-1">Address</h4>
                                        <p className="text-gray-600">1334/1 1st Floor, Haibowal Khurd, Ludhiana, Punjab, 141001</p>
                                    </div>
                                </div>

                                {/* <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                                        <FaBuilding className="text-[#00564F] text-xl" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-gray-800 mb-1">Office</h4>
                                        <p className="text-gray-600">Legal Tower, 5th Floor, Suite 502</p>
                                    </div>
                                </div> */}

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center">
                                        <FaPhone className="text-[#00564F] text-xl" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                                        <p className="text-gray-600">+91 7696 000 201</p>
                                        <a 
                                            href="https://wa.me/917696000201?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20services."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 flex items-center text-sm text-green-600 hover:text-green-700 hover:underline transition-all duration-200 cursor-pointer group"
                                        >
                                            <FaWhatsapp className="mr-2 group-hover:scale-110 transition-transform" />
                                            <span>Available on WhatsApp</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                                        <FaEnvelope className="text-[#00564F] text-xl" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                                        <p className="text-gray-600">baggarajiv@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                                        <FaClock className="text-[#00564F] text-xl" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-gray-800 mb-1">Working Hours</h4>
                                        <p className="text-gray-600">Mon – Sat: 10:00 AM – 7:00 PM</p>
                                        <p className="text-gray-600">Sunday: Emergency appointments only</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map placeholder */}
                            {/* <div className="mt-10 rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-60 bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00564F] text-white mb-4">
                                        <FaMapMarkerAlt className="text-xl" />
                                    </div>
                                    <p className="font-medium text-gray-700">New Delhi Office Location</p>
                                    <p className="text-sm text-gray-500 mt-1">Interactive map would appear here</p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:w-3/5">
                        <div className="bg-white rounded-3xl shadow-xl p-3 md:p-8 h-full">
                            {/* <div className="mb-8">
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">Send us a message</h3>
                                <div className="w-20 h-1 bg-gradient-to-r from-[#00564F] to-teal-500 rounded-full mb-6"></div>
                                <p className="text-gray-600">
                                    Fill out the form below and our team will get back to you within 24 hours. For urgent matters, please call our office directly.
                                </p>
                            </div> */}

                            <ContactForm />

                            {/* Additional info */}
                            {/* <div className="mt-10 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                                            <FaPhone className="text-lg" />
                                        </div>
                                        <h4 className="font-bold text-gray-800 mb-1">Call Directly</h4>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                    </div>

                                    <div className="bg-teal-50 rounded-xl p-4 text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600 mb-3">
                                            <FaWhatsapp className="text-lg" />
                                        </div>
                                        <h4 className="font-bold text-gray-800 mb-1">WhatsApp</h4>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                    </div>

                                    <div className="bg-indigo-50 rounded-xl p-4 text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-3">
                                            <FaEnvelope className="text-lg" />
                                        </div>
                                        <h4 className="font-bold text-gray-800 mb-1">Email Us</h4>
                                        <p className="text-gray-600">contact@legalexperts.com</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}