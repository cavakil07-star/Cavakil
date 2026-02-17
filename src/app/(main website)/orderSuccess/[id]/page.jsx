'use client';
// app/orderSuccess/[id]/page.jsx
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Page() {
    const params = useParams();
    const id = params?.id;

    const orderQuery = useQuery({
        queryKey: ['public-order', id],
        queryFn: () => axios.get(`/api/orders/${id}`).then(res => res.data),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    return (
        <WebsiteLayout>
            <div className="max-w-4xl mx-auto px-4 py-8"></div>
        </WebsiteLayout>
    )
}