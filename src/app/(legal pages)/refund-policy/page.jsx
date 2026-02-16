'use client';
// app/(legal pages)/refund-policy/page.jsx
import WebsiteLayout from "@/components/website/WebsiteLayout";
import ReactMarkdown from 'react-markdown';
import styles from './components/post.module.css';
import rehypeRaw from 'rehype-raw';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Page() {
    const policyQuery = useQuery({
        queryKey: ['public-refund-policy'],
        queryFn: () => axios.get('/api/refund-policy').then(res => res.data),
        staleTime: 1000 * 60 * 10,
    });
    const refundPolicy = policyQuery.data;

    return (
        <WebsiteLayout>
            {refundPolicy &&
                <div>
                    {/* Full-width header section */}
                    <div className="w-full bg-[#002244] py-12">
                        <div className="max-w-7xl mx-auto px-5 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Refund Policy</h1>
                            <div className="mt-4 text-blue-100">
                                Last updated: {new Date(refundPolicy.lastUpdated).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="max-w-7xl mx-auto px-5 py-6">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className={`${styles.postStyle} p-6 md:px-10`}>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {refundPolicy.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </WebsiteLayout>
    )
}