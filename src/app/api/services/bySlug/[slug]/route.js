// app/api/services/bySlug/[slug]
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import Service from "@/models/serviceModel";
import SubService from "@/models/subServiceModel";
import Tag from "@/models/tagModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { slug } = await params;
        const service = await Service.findOne({ slug })
            .populate('categories')
            .populate('tags')
            .populate('subServices')

        if (!service) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(service, { status: 200 });
    } catch (error) {
        console.error('GET /api/services/bySlug/[slug] error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}