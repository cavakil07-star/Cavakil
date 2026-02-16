// lib/main/getHomePageData.js
// ⚠️ These functions are only used by generateMetadata in services/[slug]/page.jsx
// They previously used ISR (next: { revalidate: 60 }) causing millions of ISR writes.
// Now the public pages use CSR hooks from useWebsiteData.js instead.
//
// If no server component imports these anymore, this file can be safely deleted.

import axios from "axios";

export const getServices = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/web/services`, {
            cache: 'no-store', // No caching, no ISR writes
        });

        if (!res.ok) {
            throw new Error('Failed to fetch services');
        }

        const data = await res.json();
        return data || { data: [] };
    } catch (error) {
        console.log('Error fetching services:', error);
        return { data: [] };
    }
};

export const getCategories = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/web/categories`, {
            cache: 'no-store', // No caching, no ISR writes
        });

        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }

        const data = await res.json();
        return data || { data: [] };
    } catch (error) {
        console.log('Error fetching categories:', error);
        return { data: [] };
    }
};
