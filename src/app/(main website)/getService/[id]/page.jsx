'use client';
// app/getService/[id]/page.jsx
import React from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout';
import SubServiceClient from './components/SubServiceClient';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Page() {
    const params = useParams();
    const id = params?.id;

    const subServiceQuery = useQuery({
        queryKey: ['public-subservice', id],
        queryFn: () => axios.get(`/api/subservices/${id}`).then(res => res.data),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
    const subService = subServiceQuery.data;

    if (subServiceQuery.isLoading) {
        return (
            <WebsiteLayout>
                <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </WebsiteLayout>
        );
    }

    if (!subService) {
        return (
            <WebsiteLayout>
                <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Service Not Found</h1>
                </div>
            </WebsiteLayout>
        );
    }

    return (
        <WebsiteLayout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex items-baseline gap-3 my-4">
                        {subService.discountedPrice ? (
                            <>
                                <span className="text-3xl font-bold text-primary">
                                    ₹{subService.discountedPrice}
                                </span>
                                <span className="text-lg text-gray-500 line-through">
                                    ₹{subService.actualPrice}
                                </span>
                                <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                                    Save ₹{subService.actualPrice - subService.discountedPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-primary">
                                ₹{subService.actualPrice}
                            </span>
                        )}
                    </div>
                </div>
                <SubServiceClient
                    subService={subService}
                />
            </div>
        </WebsiteLayout>
    )
}
