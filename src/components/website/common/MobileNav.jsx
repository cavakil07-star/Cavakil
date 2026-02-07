'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiX, FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import LoginButton from '@/components/auth/LoginButton'

export default function MobileNav({ services, categories, isOpen, onClose }) {
    const svcList = Array.isArray(services) ? services : []
    const catList = Array.isArray(categories) ? categories : []
    const [activeDropdown, setActiveDropdown] = useState(null)
    const primaryColor = "#003366"
    const topCategories = catList.slice(0, 5)

    const getServicesFor = (catId) =>
        svcList
            .filter((s) => Array.isArray(s.categories) && s.categories.includes(catId))
            .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
            .slice(0, 4)

    const toggleDropdown = (catId) => {
        setActiveDropdown(activeDropdown === catId ? null : catId)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-white p-1 rounded-lg">
                                        <Image
                                            alt="logo"
                                            src="/logo.png"
                                            height={200}
                                            width={200}
                                            className="h-10 w-auto"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <FiX className="text-gray-700" size={24} />
                                </button>
                            </div>

                            {/* Navigation Content */}
                            <div className="flex-1 overflow-y-auto py-4 px-6">
                                {/* <div className="mb-6">
                                    <LoginButton className="w-full py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors" />
                                </div> */}

                                <div className="space-y-2">
                                    {topCategories.map((cat) => (
                                        <div key={cat._id} className="border border-gray-100 rounded-xl overflow-hidden">
                                            <button
                                                className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                                                onClick={() => toggleDropdown(cat._id)}
                                            >
                                                <div className="flex items-center">
                                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden mr-3">
                                                        <Image
                                                            src={cat.imageURL}
                                                            alt={cat.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <span className="font-medium text-gray-800">{cat.name}</span>
                                                </div>
                                                {activeDropdown === cat._id ? (
                                                    <FiChevronUp className="text-[#003366]" size={20} />
                                                ) : (
                                                    <FiChevronDown size={20} />
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {activeDropdown === cat._id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="bg-gray-50 overflow-hidden"
                                                    >
                                                        <div className="p-4 border-t border-gray-100">
                                                            {getServicesFor(cat._id).length > 0 ? (
                                                                <ul className="space-y-3">
                                                                    {getServicesFor(cat._id).map((svc) => (
                                                                        <motion.li
                                                                            key={svc._id}
                                                                            initial={{ opacity: 0, y: -10 }}
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            exit={{ opacity: 0 }}
                                                                            className="bg-white rounded-lg shadow-sm"
                                                                        >
                                                                            <Link
                                                                                href={`/services/${svc.slug}`}
                                                                                className="flex items-center p-3"
                                                                                onClick={onClose}
                                                                            >
                                                                                <div className="flex-1">
                                                                                    <div className="font-medium text-gray-800">
                                                                                        {svc.name}
                                                                                    </div>
                                                                                </div>
                                                                                <FiArrowRight className="text-[#003366]" />
                                                                            </Link>
                                                                        </motion.li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <div className="p-3 text-center text-sm italic text-gray-500 bg-white rounded-lg">
                                                                    No services available
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Link
                                        href="/services"
                                        className="block p-4 text-center bg-gradient-to-r from-[#003366] to-[#002244] text-white rounded-xl font-medium shadow-lg"
                                        onClick={onClose}
                                    >
                                        Browse All Services
                                    </Link>

                                    <Link
                                        href="/blogs"
                                        className="block p-4 text-center bg-white border border-[#003366] text-[#003366] rounded-xl font-medium"
                                        onClick={onClose}
                                    >
                                        Legal Insights & Blogs
                                    </Link>

                                    <Link
                                        href="/about"
                                        className="block p-4 text-center bg-white border border-gray-200 text-gray-800 rounded-xl font-medium"
                                        onClick={onClose}
                                    >
                                        About Us
                                    </Link>

                                    <Link
                                        href="/contact-us"
                                        className="block p-4 text-center bg-white border border-gray-200 text-gray-800 rounded-xl font-medium flex items-center justify-center"
                                        onClick={onClose}
                                    >
                                        Contact Us <FiArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 text-center text-xs text-gray-400">
                                © {new Date().getFullYear()} CA Vakil. All rights reserved.
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}