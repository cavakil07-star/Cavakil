'use client'
import React, { useState, useMemo } from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout'
import CategoriesBox from './CategoriesBox'
import CategoriesGrid from './CategoriesGrid'
import ServicesBox from './ServicesBox'
import TalkToLawyerCard from '@/components/website/TalkToLawyerCard'
import { motion } from 'framer-motion'

export default function ServicesClient({ services, categories }) {
    // 'all' = show category cards, 'show-all-services' = all services list, or categoryId = filtered
    const [selectedCategory, setSelectedCategory] = useState('all')

    // Filter and sort services by displayOrder
    const filteredServices = useMemo(() => {
        let result = [];
        if (selectedCategory === 'all') {
            result = []; // Category grid mode, no services shown
        } else if (selectedCategory === 'show-all-services') {
            result = [...services];
        } else {
            result = services.filter(s => s.categories.includes(selectedCategory));
        }
        // Sort by displayOrder (ascending)
        return result.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
    }, [services, selectedCategory]);

    const categoryName = categories?.find(c => c._id === selectedCategory)?.name || "All Services";

    // Check if we're in category grid mode
    const showCategoryGrid = selectedCategory === 'all';

    // Handle category selection from grid
    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    // Handle back to categories
    const handleBackToCategories = () => {
        setSelectedCategory('all');
    };

    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className='mb-10'>
                {/* Enhanced Hero Section */}
                <div className="w-full bg-gradient-to-r from-[#001a33] to-[#002244] py-12 md:py-14 text-white mb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight'>
                            Our Services
                        </h1>
                        <p className='max-w-2xl mx-auto text-md md:text-lg text-blue-100 opacity-90'>
                            Expert solutions tailored to your specific needs
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className='max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8'>
                    {showCategoryGrid ? (
                        /* Phase 1: Category Cards Grid */
                        <div className='mb-12'>
                            <CategoriesGrid
                                categories={categories}
                                services={services}
                                onSelectCategory={handleSelectCategory}
                            />
                            
                            {/* Mobile TalkToLawyerCard */}
                            <div className='lg:hidden mt-8'>
                                <TalkToLawyerCard />
                            </div>
                        </div>
                    ) : (
                        /* Phase 2: Services List with Sidebar */
                        <div className='flex flex-col lg:flex-row gap-4 mb-12'>
                            {/* Left Sidebar - Sticky on desktop */}
                            <div className='w-full lg:w-1/4 sm:flex flex-col gap-6 hidden'>
                                <div className='sticky top-24'>
                                    <CategoriesBox
                                        categories={categories}
                                        selectedCategory={selectedCategory}
                                        onSelectCategory={setSelectedCategory}
                                    />

                                    <div className='mt-6 hidden lg:block'>
                                        <TalkToLawyerCard />
                                    </div>
                                </div>
                            </div>

                            {/* Services Grid */}
                            <div className='w-full lg:w-3/4'>
                                {/* Back to Categories Button */}
                                <motion.button
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={handleBackToCategories}
                                    className='mb-4 inline-flex items-center gap-2 text-[#0A3460] hover:text-[#1e5a9e] font-medium transition-colors group'
                                >
                                    <svg 
                                        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span>Back to Categories</span>
                                </motion.button>

                                <div className='mb-4 flex justify-between items-center'>
                                    <h2 className='text-2xl font-bold text-gray-800'>
                                        {selectedCategory === 'show-all-services'
                                            ? 'All Services'
                                            : categoryName
                                        }
                                    </h2>
                                    <span className='text-gray-500'>
                                        {filteredServices.length} services available
                                    </span>
                                </div>

                                <ServicesBox services={filteredServices} />
                            </div>
                        </div>
                    )}

                    {/* Mobile-only TalkToLawyerCard when showing services */}
                    {!showCategoryGrid && (
                        <div className='lg:hidden mt-8'>
                            <TalkToLawyerCard />
                        </div>
                    )}
                </div>
            </div>
        </WebsiteLayout>
    )
}