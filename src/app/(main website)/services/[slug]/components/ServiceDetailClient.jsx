'use client';
// Client component for service detail page rendering

import React from 'react';
import TalkToLawyerCard from '@/components/website/TalkToLawyerCard';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import EnquiryForm from '@/components/website/EnquiryForm';
import ScrollableServiceSections from '@/components/website/ScrollableServiceSections';
import TabbedDocuments from '@/components/website/TabbedDocuments';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePublicServiceBySlug } from '@/hooks/useWebsiteData';

export default function ServiceDetailClient({ slug }) {
    const serviceQuery = usePublicServiceBySlug(slug);
    const service = serviceQuery.data;

    if (serviceQuery.isLoading) {
        return (
            <WebsiteLayout>
                <div className="max-w-7xl mx-auto py-20 text-center">
                    <p className="text-gray-500">Loading service...</p>
                </div>
            </WebsiteLayout>
        );
    }

    if (!service) {
        return (
            <WebsiteLayout>
                <div className="max-w-7xl mx-auto py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Service Not Found</h1>
                </div>
            </WebsiteLayout>
        );
    }

    return (
        <WebsiteLayout>
            <main className="mx-auto px-4 py-8">
                <article className="max-w-7xl mx-auto">
                    {/* Structured Data for SEO */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Service",
                                "name": service.name,
                                "description": service.shortDescription,
                                "image": service.imageURL,
                                "serviceType": service.serviceTypeDetails?.join(', '),
                                "url": `${typeof window !== 'undefined' ? window.location.origin : ''}/services/${service.slug}`
                            })
                        }}
                    />

                    <section className="flex gap-4 lg:gap-10 flex-col lg:flex-row relative">
                        {/* left section */}
                        <div className="flex-1 h-full flex flex-col">
                            <Breadcrumb className="mb-3">
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{service.name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>

                            <div className='mb-4'>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                    {service.pageHeading}
                                </h1>

                                <ul className="space-y-3 mt-4">
                                    {service?.serviceTypeDetails?.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                                            <span className="mt-1 text-green-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 flex-shrink-0"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="text-sm sm:text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Filler Block */}
                            {service.subServices?.length > 0 &&
                                <div className="mt-4 flex-1 flex gap-4">
                                    <TabbedDocuments subServices={service?.subServices} />
                                </div>
                            }
                        </div>

                        {/* right section */}
                        <div className="lg:w-82 flex flex-col gap-4 sticky top-5">
                            <EnquiryForm />
                            {service.subServices?.length > 0 &&
                                <TalkToLawyerCard />
                            }
                        </div>
                    </section>

                    {service.serviceBigDescription?.length > 0 &&
                        <ScrollableServiceSections serviceBigDescription={service.serviceBigDescription} />
                    }
                </article>
            </main>
        </WebsiteLayout>
    );
}
