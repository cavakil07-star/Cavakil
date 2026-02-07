import { getTestimonialsData } from '@/lib/main/getStaticData';
import Image from 'next/image';

export default async function Testimonials() {
    const data = await getTestimonialsData({
        isVisible: true,
        limit: 3,
        page: 1
    });

    const testimonials = data?.testimonials?.length > 0 ? data.testimonials : [
        {
            userName: 'Sneha Kapoor',
            designation: 'Boutique Owner',
            company: 'Fashion Forward',
            imageURL: '/avatars/sneha.png',
            message: 'Starting my company felt overwhelming, but their legal team made it smooth and stress-free. Everything was done on time with full clarity.'
        },
        {
            userName: 'Priya Mehta',
            designation: 'Startup Founder',
            company: 'InnovateX',
            imageURL: '/avatars/priya.png',
            message: 'Their GST and PF registration service was quick, transparent, and affordable. Highly recommend for any small business owner.'
        },
        {
            userName: 'Yogesh Arora',
            designation: 'Tech Entrepreneur',
            company: 'CodeVerse',
            imageURL: '/avatars/yogesh.png',
            message: 'We had no idea how to protect our brand, but their trademark experts guided us through every step. Professional and reliable.'
        }
    ];

    return (
        <section className="w-full bg-gradient-to-b from-white via-[#f4f7ff] to-[#eaf2ff]" id='testimonials'>
            <div className='w-11/12 md:max-w-7xl py-16 lg:px-16 mx-auto flex flex-col gap-10'>
                {/* Heading */}
                <div className="max-w-3xl mx-auto text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs md:text-sm font-medium text-slate-700 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Client confidence, proven
                    </div>
                    <h2 className="text-slate-800 text-2xl md:text-3xl font-semibold">Simplifying Tax & GST Compliance</h2>
                    <h3 className="text-slate-900 text-3xl md:text-5xl font-bold leading-tight">
                        Trusted by Many Businesses
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base">
                        Real stories from founders and operators who rely on us for tax, compliance, and trademark clarity.
                    </p>
                </div>


                {/* Cards */}
                <div className="grid gap-6 md:gap-7 md:grid-cols-3">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="relative bg-white rounded-2xl p-5 pt-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] border border-slate-100 transition-transform duration-200 hover:-translate-y-1">
                            {/* Name & Role */}
                            <h4 className="text-center text-lg font-semibold text-gray-900">
                                {t.userName}
                            </h4>
                            <p className="text-sm text-gray-500 text-center">{t?.designation && t?.designation} {t.company}</p>

                            {/* Stars */}
                            <div className="flex justify-center mt-3 gap-0.5 text-amber-400">
                                <span className="text-lg">★★★★★</span>
                            </div>

                            {/* Divider */}
                            <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                            {/* Quote */}
                            <blockquote className="text-gray-700 text-sm leading-relaxed relative pl-4">
                                <span className="absolute -left-1 top-0 text-3xl text-gray-200">“</span>
                                <span className="ml-1 block">{t.message}</span>
                            </blockquote>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
