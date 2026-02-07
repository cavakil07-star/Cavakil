// app/services/[slug]/page.jsx
import TalkToLawyerCard from '@/components/website/TalkToLawyerCard';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getAllServicesSlugs, getServiceBySlug } from '@/lib/main/services';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import EnquiryForm from '@/components/website/EnquiryForm';
import ScrollableServiceSections from '@/components/website/ScrollableServiceSections';
import TabbedDocuments from '@/components/website/TabbedDocuments';
import { getCategories, getServices } from '@/lib/main/getHomePageData';


export async function generateStaticParams() {
    const services = await getAllServicesSlugs();

    return services.map(service => ({
        slug: service.slug,
    }));
}


export async function generateMetadata({ params }) {
    const service = await getServiceBySlug(params.slug);

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

async function Page({ params }) {

    const servicesData = await getServices();
    const services = servicesData?.data || [];
    const categoriesData = await getCategories();
    const categories = categoriesData?.data || [];

    const service = await getServiceBySlug(params.slug);
    // console.log(service)
    if (!service) {
        notFound();
    }

    console.log(service)

    return (
        <WebsiteLayout services={services} categories={categories}>
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
                                "serviceType": service.serviceTypeDetails.join(', '),
                                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/services/${service.slug}`
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
                            {service.subServices.length > 0 &&
                                <div className="mt-4 flex-1 flex gap-4">
                                    <TabbedDocuments subServices={service?.subServices} />
                                </div>
                            }
                        </div>

                        {/* right section */}
                        <div className="lg:w-82 flex flex-col gap-4 sticky top-5">
                            <EnquiryForm />
                            {service.subServices.length > 0 &&
                                <TalkToLawyerCard />
                            }
                        </div>
                    </section>

                    {service.serviceBigDescription.length > 0 &&
                        <ScrollableServiceSections serviceBigDescription={service.serviceBigDescription} />
                    }
                </article>
            </main>
        </WebsiteLayout>
    );
}

export default Page;