import React from 'react'
import ServicesClient from './components/ServicesClient'
import { getCategories, getServices } from '@/lib/main/getHomePageData';

export const metadata = {
  title: "CA Vakil",
};

// Force dynamic rendering - skip static generation during build
export const dynamic = 'force-dynamic';

export default async function Page() {
    const servicesData = await getServices();
    const services = servicesData?.data || [];
    const categoriesData = await getCategories();
    const categories = categoriesData?.data || [];

    return <ServicesClient services={services} categories={categories} />
}
