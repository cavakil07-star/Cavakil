// app/api/services/route.js
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/serviceModel";
import { NextResponse } from "next/server";
import SubService from "@/models/subServiceModel";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        
        // Ensure displayOrder is a number if provided
        if (body.displayOrder !== undefined) {
            body.displayOrder = parseInt(body.displayOrder, 10);
        }
        
        const newService = await Service.create(body);

        return NextResponse.json(
            { success: true, data: newService, },
            { status: 201 }
        )

    } catch (error) {
        console.error('POST /api/services error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const featured = searchParams.get('featured');

        const query = {};

        if (status !== null) query.status = status === 'true';
        if (featured !== null) query.featured = featured === 'true';

        const services = await Service
            .find(query)
            .sort({ createdAt: -1 })
            .populate('subServices');

        return NextResponse.json({ success: true, data: services });
    } catch (error) {
        console.error('GET /api/services error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}