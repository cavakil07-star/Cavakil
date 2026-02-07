// app/blogs/page.jsx
import React from 'react';
import { getCategories, getServices } from '@/lib/main/getHomePageData';
import BlogsClient from './components/BlogsClient';
import { getBlogsData } from '@/lib/main/getBlogsData';

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

    const blogsData = await getBlogsData();
    const blogs = blogsData?.data || [];

    return (
        <BlogsClient
            services={services}
            categories={categories}
            allBlogs={blogs}
        />
    );
}
