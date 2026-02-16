import { connectDB } from "@/lib/mongodb";
import Service from "@/models/serviceModel";
import Category from "@/models/categoryModel";
import Testimonial from "@/models/testimonialModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();

        // Optional filters via query params
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const featured = searchParams.get('featured'); // Fixed missing variable definition

        const serviceQuery = {};
        const categoryQuery = {};
        const testimonialQuery = { isVisible: true };

        if (status !== null) {
            serviceQuery.status = status === 'true';
            categoryQuery.status = status === 'true';
        }
        if (featured !== null) {
            serviceQuery.featured = featured === 'true';
        }

        const services = await Service
            .find(serviceQuery)
            .sort({ createdAt: -1 })
            .populate("subServices");

        const categories = await Category
            .find(categoryQuery)
            .sort({ createdAt: -1 });

        const testimonials = await Testimonial
            .find(testimonialQuery)
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: {
                services,
                categories,
                testimonials,
            },
        });
    } catch (error) {
        console.error("GET /api/web/homepage-data error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
