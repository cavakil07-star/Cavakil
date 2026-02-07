'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi'
import LoginButton from '@/components/auth/LoginButton'

export default function BigNav({ services, categories }) {
    const svcList = Array.isArray(services) ? services : []
    const catList = Array.isArray(categories) ? categories : []
    const [activeDropdown, setActiveDropdown] = useState(null)
    const primaryColor = "#003366"
    const topCategories = catList.slice(0, 6) // Increased from 5 to 10 categories

    const getServicesFor = (catId) =>
        svcList
            .filter((s) => Array.isArray(s.categories) && s.categories.includes(catId))
            .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
            .slice(0, 20)

    return (
        <div className="hidden xl:flex items-center space-x-2">
            {topCategories.length > 0 && (
                <div className="flex space-x-1">
                    {topCategories.map((cat) => (
                        <div
                            key={cat._id}
                            className="relative group"
                            onMouseEnter={() => setActiveDropdown(cat._id)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                className={`flex items-center px-2 py-3 text-sm rounded-lg transition-all duration-200 ${activeDropdown === cat._id
                                    ? `text-white bg-[${primaryColor}]`
                                    : `text-gray-700 hover:text-white hover:bg-[${primaryColor}]`
                                    }`}
                            >
                                <span className="font-semibold">{cat.name}</span>
                                {/* {activeDropdown === cat._id ? (
                                    <FiChevronUp className="ml-1" size={16} />
                                ) : (
                                    <FiChevronDown className="ml-1" size={16} />
                                )} */}
                            </button>

                            {activeDropdown === cat._id && (
                                <div
                                    className="absolute left-0 mt-1 w-[550px] rounded-xl shadow-xl bg-white border border-gray-100 overflow-hidden z-50 animate-fadeIn"
                                    onMouseEnter={() => setActiveDropdown(cat._id)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <div className="grid grid-cols-1">
                                        {/* <div className="p-2 bg-gradient-to-br from-[#003366]/5 to-white border-r border-gray-100">
                                            <div className="flex flex-col items-center">
                                                <div className="relative w-full h-40 mb-2 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={cat.imageURL}
                                                        alt={cat.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 to-transparent" />
                                                    <h3 className="absolute bottom-2 left-2 text-sm font-bold text-white">
                                                        {cat.name}
                                                    </h3>
                                                </div>

                                                <Link
                                                    href="/services"
                                                    className="w-full flex items-center justify-center bg-[#003366] text-white px-2 py-2 rounded-lg text-sm font-medium hover:bg-[#002244] transition-colors"
                                                >
                                                    View all services
                                                    <FiArrowRight className="ml-2" />
                                                </Link>
                                            </div>
                                        </div> */}

                                        <div className="p-2">
                                            {/* <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-base font-bold text-[#003366] uppercase tracking-wide">
                                                    {cat.name}
                                                </h4>
                                                <span className="text-xs bg-[#003366]/10 text-[#003366] px-2 py-1 rounded-full">
                                                    {getServicesFor(cat._id).length} services
                                                </span>
                                            </div> */}

                                            <ul className=" grid grid-cols-2 gap-1">
                                                {getServicesFor(cat._id).length > 0 ? (
                                                    getServicesFor(cat._id).map((svc) => (
                                                        <li key={svc._id} className="group">
                                                            <Link
                                                                href={`/services/${svc.slug}`}
                                                                className="flex h-full items-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100"
                                                            >
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-sm text-gray-800 group-hover:text-[#003366]">
                                                                        {svc.name}
                                                                    </div>
                                                                </div>
                                                                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <FiArrowRight className="text-[#003366]" />
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="p-3 text-center text-sm italic text-gray-500 bg-gray-50 rounded-lg">
                                                        No services available in this category
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <Link
                        href="/services"
                        className="flex items-center px-2 py-3 text-sm font-semibold text-gray-700 hover:text-white hover:bg-[#003366] rounded-lg transition-colors duration-200"
                    >
                        All Services
                    </Link>

                    <Link
                        href="/about"
                        className="flex items-center px-2 py-3 text-sm font-semibold text-gray-700 hover:text-white hover:bg-[#003366] rounded-lg transition-colors duration-200"
                    >
                        About Us
                    </Link>

                    {/* <Link
                        href="/blogs"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#003366] rounded-lg transition-colors duration-200"
                    >
                        Blogs
                    </Link> */}
                </div>
            )}

            <div className="ml-2 flex items-center space-x-3">
                <LoginButton className="px-4 py-2 rounded-lg hover:bg-gray-100" />
                <Link href="/contact-us">
                    <button className="bg-[#003366] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#002244] transition-colors flex items-center">
                        Contact Us
                        <FiArrowRight className="ml-2" />
                    </button>
                </Link>
            </div>
        </div>
    )
}