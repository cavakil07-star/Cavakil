// app/blogs/[slug]page.jsx

import EnquiryForm from '@/components/website/EnquiryForm';
import TalkToLawyerCard from '@/components/website/TalkToLawyerCard';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getBlogBySlug } from '@/lib/main/getBlogsData';
import { getCategories, getServices } from '@/lib/main/getHomePageData';
import React from 'react'
import BlogData from '../components/BlogData';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import { getRelatedServices } from '@/lib/main/relatedServices';
import ServiceCard from '../components/ServiceCard';
import LatestBlogs from '@/components/website/LatestBlogs';
import { notFound } from 'next/navigation';

// Force dynamic rendering - skip static generation during build
export const dynamic = 'force-dynamic';


// export async function generateMetadata({ params }) {
//     const slug = await params
//     // const blog = await getBlogBySlug(slug.slug);

//     if (!blog) return {
//         title: "blog Not Found",
//         description: "The requested service does not exist"
//     };

//     return {
//         title: blog.title,
//         description: blog.shortDescription,
//         openGraph: {
//             title: blog.title,
//             description: blog.shortDescription,
//             images: [blog.imageURL],
//             url: `/blogs/${blog.slug}`,
//             type: 'website'
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: blog.title,
//             description: blog.shortDescription,
//             images: [blog.imageURL]
//         }
//     };
// }

export default async function page({ params }) {
    const servicesData = await getServices();
    const services = servicesData?.data || [];
    const categoriesData = await getCategories();
    const categories = categoriesData?.data || [];

    const { slug } = await params;
    const blogData = await getBlogBySlug(slug)
    const blog = blogData?.data;

    // If blog is not found, show 404 page
    if (!blog) {
        notFound();
    }

    // console.log(blog)
    // const relatedServices = getRelatedServices(
    //     blog.tags || [],
    //     services.data || [],
    //     3
    // );

    return (
        <WebsiteLayout services={services} categories={categories}>
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
                            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.slug}`
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
                                {/* {relatedServices.map((item, idx) => (
                                <div key={idx}>
                                    <ServiceCard service={item} />
                                </div>
                            ))} */}
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
        </WebsiteLayout >
    )
}

