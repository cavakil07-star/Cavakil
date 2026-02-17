'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// ─── Public Website Hooks (No Auth Required) ───────────────────────────
// These hooks fetch data for the public-facing website using CSR.
// They do NOT trigger ISR writes — data is fetched in the browser.

const webApi = axios.create({ baseURL: '/api/web' });

// Fetch all active services
export const usePublicServices = () => {
    return useQuery({
        queryKey: ['public-services'],
        queryFn: () => webApi.get('/services').then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};

// Fetch all categories
export const usePublicCategories = () => {
    return useQuery({
        queryKey: ['public-categories'],
        queryFn: () => webApi.get('/categories').then(res => res.data),
        staleTime: 1000 * 60 * 5,
    });
};

// Fetch all blogs (public listing)
export const usePublicBlogs = () => {
    return useQuery({
        queryKey: ['public-blogs'],
        queryFn: () => webApi.get('/blogs').then(res => res.data),
        staleTime: 1000 * 60 * 5,
    });
};

// Fetch single blog by slug
export const usePublicBlogBySlug = (slug) => {
    return useQuery({
        queryKey: ['public-blog', slug],
        queryFn: () => webApi.get(`/blogs/${slug}`).then(res => res.data),
        enabled: !!slug,
        staleTime: 1000 * 60 * 5,
    });
};

// Fetch service by slug (for service detail page)
export const usePublicServiceBySlug = (slug) => {
    return useQuery({
        queryKey: ['public-service', slug],
        queryFn: () => axios.get(`/api/services/bySlug/${slug}`).then(res => res.data),
        enabled: !!slug,
        staleTime: 1000 * 60 * 5,
    });
};

// Combined hook for services + categories (used by most pages)
export const useWebsiteLayout = () => {
    const servicesQuery = usePublicServices();
    const categoriesQuery = usePublicCategories();

    return {
        services: servicesQuery.data?.data || [],
        categories: categoriesQuery.data?.data || [],
        isLoading: servicesQuery.isLoading || categoriesQuery.isLoading,
        isError: servicesQuery.isError || categoriesQuery.isError,
    };
};

// Fetch testimonials (client-side, no ISR)
export const useTestimonials = () => {
    const testimonialsQuery = useQuery({
        queryKey: ['public-testimonials'],
        queryFn: async () => {
            const res = await axios.get('/api/web/testimonials');
            return res.data?.data || [];
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    return {
        testimonialsQuery,
        testimonials: testimonialsQuery.data || [],
        isLoading: testimonialsQuery.isLoading,
        isError: testimonialsQuery.isError,
    };
};
