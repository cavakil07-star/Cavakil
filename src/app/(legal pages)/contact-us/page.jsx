'use client';
// app/(legal pages)/contact-us/page.jsx
import React from 'react'
import Contact from '@/components/website/home/Contact';
import WebsiteLayout from '@/components/website/WebsiteLayout';

export default function Page() {
    return (
        <WebsiteLayout>
            <Contact />
        </WebsiteLayout>
    )
}
