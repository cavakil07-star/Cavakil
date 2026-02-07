import React from 'react'
import Contact from '@/components/website/home/Contact';
import { getServices, getCategories } from '@/lib/main/getHomePageData';
import WebsiteLayout from '@/components/website/WebsiteLayout';

export const metadata = {
  title: "CA Vakil",
};

// Force dynamic rendering - skip static generation during build
export const dynamic = 'force-dynamic';

export default async function page() {

    const servicesData = await getServices();
    const services = servicesData?.data || [];
    const categoriesData = await getCategories();
    const categories = categoriesData?.data || [];

    return (
        <WebsiteLayout services={services} categories={categories}>
            <Contact />
        </WebsiteLayout>
    )
}
