'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CategoriesGrid = ({ categories, services, onSelectCategory }) => {
    // Count services per category
    const getServiceCount = (categoryId) => {
        return services.filter(s => s.categories.includes(categoryId)).length;
    };

    return (
        <div className="w-full">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Browse by Category</h2>
                <span className="text-gray-500">{categories.length} categories</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <motion.div
                        key={category._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectCategory(category._id)}
                        className="cursor-pointer group"
                    >
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                            {/* Category Image */}
                            <div className="relative h-44 w-full overflow-hidden">
                                <Image
                                    src={category.imageURL}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                
                                {/* Service count badge */}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0A3460] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                                    {getServiceCount(category._id)} services
                                </div>
                            </div>

                            {/* Category Info */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-[#0A3460] group-hover:text-[#1e5a9e] transition-colors">
                                    {category.name}
                                </h3>
                                <div className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-[#0A3460] transition-colors">
                                    <span>Explore services</span>
                                    <svg 
                                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* All Services Quick Link */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-center"
            >
                <p className="text-gray-500 mb-2">Want to see everything?</p>
                <button
                    onClick={() => onSelectCategory('show-all-services')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A3460] to-[#1e5a9e] text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                    <span>View All Services</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </motion.div>
        </div>
    );
};

export default CategoriesGrid;
