// app/services/[slug]/page.jsx
// SERVER COMPONENT — kept as server component for SEO metadata only
// Page body uses a client component for rendering (zero ISR)

import { getServiceBySlug } from '@/lib/main/services';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './components/ServiceDetailClient';

// ❌ REMOVED: generateStaticParams — was pre-rendering 91+ pages causing ISR writes
// ❌ REMOVED: force-dynamic

export async function generateMetadata({ params }) {
    const { slug } = await params;
    // Direct MongoDB query — no fetch cache, no ISR writes
    const service = await getServiceBySlug(slug);

    if (!service) return {
        title: "Service Not Found",
        description: "The requested service does not exist"
    };

    return {
        title: service.pageHeading,
        description: service.shortDescription,
        openGraph: {
            title: service.pageHeading,
            description: service.shortDescription,
            images: [service.imageURL],
            url: `/services/${service.slug}`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: service.pageHeading,
            description: service.shortDescription,
            images: [service.imageURL]
        }
    };
}

export default async function Page({ params }) {
    const { slug } = await params;

    return <ServiceDetailClient slug={slug} />;
}