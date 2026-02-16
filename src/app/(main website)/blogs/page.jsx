'use client';
// app/blogs/page.jsx
import React from 'react';
import BlogsClient from './components/BlogsClient';
import { usePublicBlogs, useWebsiteLayout } from '@/hooks/useWebsiteData';

export default function Page() {
    const { services, categories } = useWebsiteLayout();

    const blogsQuery = usePublicBlogs();
    const blogs = blogsQuery.data?.data || [];

    return (
        <BlogsClient
            services={services}
            categories={categories}
            allBlogs={blogs}
        />
    );
}
