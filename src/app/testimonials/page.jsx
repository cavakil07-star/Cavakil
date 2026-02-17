'use client';

import { useWebsiteLayout } from "@/hooks/useWebsiteData";
import NavBar from "@/components/website/common/Navbar";
import Footer from "@/components/website/common/Footer";
import Testimonials from "@/components/website/Testimonials";

export default function TestimonialsPage() {
    const { services, categories } = useWebsiteLayout();

    return (
        <div className="">
            <NavBar services={services} categories={categories} />
            <div className="min-h-screen">
                <div className="pt-28 md:pt-36 pb-12 bg-gradient-to-br from-blue-50 to-white">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#003366]">
                            Trusted by Many Businesses
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Real stories from founders and operators who rely on us for tax, compliance, and trademark clarity.
                        </p>
                    </div>
                </div>

                <Testimonials />
            </div>
            <Footer />
        </div>
    );
}
