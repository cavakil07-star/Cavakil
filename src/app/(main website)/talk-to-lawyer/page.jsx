import React from 'react'
import { getCategories, getServices } from '@/lib/main/getHomePageData';
import TTLClient from './components/TTLClient';
import { getCallPlanData } from '@/lib/main/getStaticData';

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

    const callPlans = await getCallPlanData()

    return <TTLClient services={services} categories={categories} callPlans={callPlans} />
}
