import { NextResponse } from 'next/server';
import SubService from '@/models/subServiceModel';
import { connectDB } from '@/lib/mongodb';

// GET a single sub-service by ID
export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get('serviceId');

    if (!serviceId) {
        return NextResponse.json({ message: 'Missing serviceId' }, { status: 400 });
    }

    try {
        const subServices = await SubService.find({ service: serviceId });
        return NextResponse.json(subServices);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching sub-services', error }, { status: 500 });
    }
}

// app/api/subservices/[id]/route.js
export async function PUT(req, { params }) {
    const { id } = await params;

    try {
        const data = await req.json();
        await connectDB();

        const updated = await SubService.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return NextResponse.json(
                { message: 'Sub-service not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error('PUT /api/subservices/[id] error:', error);

        // Return full error info as JSON so the client can unwrap it
        return NextResponse.json(
            {
                message: error.message,
                name: error.name,
                // if Mongoose validation errors exist, send them too:
                details: error.errors || null,
            },
            { status: 500 }
        );
    }
}


// DELETE a sub-service by ID
export async function DELETE(req, { params }) {
    const { id } = await params;
    await connectDB();

    try {
        const deleted = await SubService.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ message: 'Sub-service not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Sub-service deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting sub-service', error }, { status: 500 });
    }
}
