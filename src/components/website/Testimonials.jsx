'use client';

import { useTestimonials } from '@/hooks/useWebsiteData';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
    const { testimonials, isLoading, isError } = useTestimonials();
    const scrollRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    // Triple the testimonials for infinite loop effect
    const loopedItems = [...testimonials, ...testimonials, ...testimonials];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && scrollRef.current && testimonials.length > 0) {
            // Start in the middle set of items
            const itemWidth = scrollRef.current.scrollWidth / 3;
            scrollRef.current.scrollLeft = itemWidth;
        }
    }, [isMounted, testimonials.length]);

    const handleScroll = () => {
        if (!scrollRef.current || testimonials.length === 0) return;

        const { scrollLeft, scrollWidth } = scrollRef.current;
        const oneThird = scrollWidth / 3;

        // If we've scrolled into the third set, jump back to the second set's start
        if (scrollLeft >= 2 * oneThird) {
            scrollRef.current.scrollLeft = scrollLeft - oneThird;
        }
        // If we've scrolled into the first set, jump to the same position in the second set
        else if (scrollLeft <= 0) {
            scrollRef.current.scrollLeft = oneThird;
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return (
            <section className="py-16 bg-[#F8F9FF]">
                <div className="container mx-auto px-4 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a73e8] mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading success stories...</p>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) return null;

    return (
        <section className="py-16 bg-[#f4f7ff] overflow-hidden" id="testimonials">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 px-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-100 text-sm font-medium text-gray-600 mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span> Client confidence, proven
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#0B1B35] leading-tight">
                        Simplifying Tax & GST Compliance<br />
                        <span className="text-[#1a73e8]">Trusted by Many Businesses</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base">
                        Real stories from founders and operators who rely on us for tax, compliance, and trademark clarity.
                    </p>
                </div>

                <div className="relative max-w-7xl mx-auto group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 lg:left-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-xl text-[#0B1B35] hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-gray-100"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 lg:right-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-xl text-[#0B1B35] hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-gray-100"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Scroll Container */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory no-scrollbar"
                    >
                        {loopedItems.map((testimonial, idx) => (
                            <div
                                key={`${testimonial._id}-${idx}`}
                                className="min-w-[85vw] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center bg-white p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,33,102,0.05),0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(0,33,102,0.08)] transition-all flex flex-col items-center text-center h-full relative"
                            >
                                <div className="flex flex-col items-center mb-8">
                                    <h3 className="font-bold text-xl text-[#0B1B35] mb-1.5">{testimonial.userName}</h3>
                                    <p className="text-sm font-medium text-gray-500 mb-4 tracking-wide uppercase">
                                        {testimonial.designation}{testimonial.company && <span className="text-gray-300"> • </span>}{testimonial.company}
                                    </p>

                                    {/* Star Rating */}
                                    <div className="flex gap-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-4 h-4 text-amber-500 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative px-2">
                                    <span className="absolute -top-4 -left-2 text-4xl text-gray-200 font-serif leading-none italic select-none">“</span>
                                    <p className="text-gray-600 text-[15px] md:text-[16px] leading-relaxed relative z-10 font-normal">
                                        {testimonial.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
