"use client"
import React from 'react'
import Footer from '@/components/website/common/Footer'
import NavBar from '@/components/website/common/Navbar'
import CallButton from './CallButton'
import { useWebsiteLayout } from '@/hooks/useWebsiteData'

export default function WebsiteLayout({ children }) {
    const { services, categories } = useWebsiteLayout();

    return (
        <div className='bg-gray-100'>
            <div className=''>
                <NavBar services={services} categories={categories} />
            </div>

            <div className='min-h-screen pt-20 bg-gradient-to-b from-[#f8fafc] to-[#eef2f7]'>
                {children}
            </div>

            <CallButton />
            <Footer />
        </div>
    )
}
