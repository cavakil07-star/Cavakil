import { connectDB } from "@/lib/mongodb";
import ContactUs from "@/models/contactUsModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);

        // Parse query parameters with validation
        const status = searchParams.get('status');
        const important = searchParams.get('important');
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));

        const filter = {};

        // Build filter object
        if (status && status !== 'all') {
            filter.status = status;
        }

        if (important && important !== 'all') {
            filter.important = important === 'true';
        }

        const skip = (page - 1) * limit;

        // Use lean() for better performance and add proper sorting
        const [contacts, totalCount] = await Promise.all([
            ContactUs.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            ContactUs.countDocuments(filter)
        ]);

        return NextResponse.json({
            success: true,
            data: contacts,
            totalCount: totalCount,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
                hasNextPage: page < Math.ceil(totalCount / limit),
                hasPrevPage: page > 1
            }
        }, { status: 200 });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        await connectDB();

        const newContact = await ContactUs.create(body);

        return NextResponse.json({
            success: true,
            data: newContact
        }, { status: 201 });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 400 });
    }
}
