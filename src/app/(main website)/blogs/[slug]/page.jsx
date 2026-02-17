'use client';
// app/blogs/[slug]/page.jsx

import EnquiryForm from '@/components/website/EnquiryForm';
import TalkToLawyerCard from '@/components/website/TalkToLawyerCard';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import React from 'react'
import BlogData from '../components/BlogData';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import LatestBlogs from '@/components/website/LatestBlogs';
import { usePublicBlogBySlug } from '@/hooks/useWebsiteData';
import { useParams } from 'next/navigation';

export default function Page() {
    const params = useParams();
    const slug = params?.slug;

    const blogQuery = usePublicBlogBySlug(slug);
    const blog = blogQuery.data?.data;

    if (blogQuery.isLoading) {
        return (
            <WebsiteLayout>
                <div className="max-w-7xl mx-auto py-20 text-center">
                    <p className="text-gray-500">Loading blog...</p>
                </div>
            </WebsiteLayout>
        );
    }

    if (!blog) {
        return (
            <WebsiteLayout>
                <div className="max-w-7xl mx-auto py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Blog Not Found</h1>
                </div>
            </WebsiteLayout>
        );
    }

    return (
        <WebsiteLayout>
            <article className="max-w-7xl mx-auto space-y-5 px-2">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Blog",
                            "name": blog.title,
                            "description": blog.shortDescription,
                            "image": blog.imageURL,
                            "url": `${typeof window !== 'undefined' ? window.location.origin : ''}/blogs/${blog.slug}`
                        })
                    }}
                />
                <section className="flex gap-4 lg:gap-10 flex-col lg:flex-row pt-5">
                    <div className="flex-1 h-full flex flex-col">
                        <Breadcrumb className="mb-1 px-2">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{blog.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <BlogData blog={blog} />
                    </div>
                    <div className="lg:w-82 flex flex-col gap-5 lg:sticky lg:top-6 lg:h-fit">
                        <div>
                            <div className='flex flex-col gap-4'>
                            </div>
                        </div>
                        <TalkToLawyerCard />
                        <EnquiryForm />
                    </div>
                </section>

                <div>
                    <LatestBlogs />
                </div>

            </article>
        </WebsiteLayout>
    )
}
