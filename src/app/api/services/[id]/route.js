// /api/services/[slug]/route.js

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import Service from "@/models/serviceModel";
import SubService from "@/models/subServiceModel";
import Tag from "@/models/tagModel";
import { NextResponse } from "next/server";

async function checkForDuplicate({ name, slug, excludeId = null }) {
    const conditions = [];
    if (name) conditions.push({ name });
    if (slug) conditions.push({ slug });

    if (conditions.length === 0) return false;

    const query = { $or: conditions };
    if (excludeId) query._id = { $ne: excludeId };

    return await Service.findOne(query);
}

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        console.log(id)

        const service = await Service.findById(id)
            .populate('subServices')

        if (!service) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ data: service }, { status: 200 });
    } catch (error) {
        console.error('GET /api/services/[slug] error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const data = await req.json();
        await connectDB();

        // Ensure displayOrder is a number if provided
        if (data.displayOrder !== undefined) {
            data.displayOrder = parseInt(data.displayOrder, 10);
        }

        // Check for duplicates
        const duplicate = await checkForDuplicate({
            name: data.name,
            slug: data.slug,
            excludeId: id
        });

        if (duplicate) {
            return NextResponse.json(
                { error: "Service with this slug or name already exists" },
                { status: 409 } // 409 Conflict more appropriate
            );
        }

        const updatedService = await Service.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true, }
        );

        if (!updatedService) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(updatedService);
    } catch (error) {
        console.error('PUT /api/services/[slug] error:', error);
        return NextResponse.json(
            { message: 'Error updating service', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/services/[slug] error:', error);
        return NextResponse.json(
            { message: 'Error deleting service', error: error.message },
            { status: 500 }
        );
    }
}




















// export async function GET(req, { params }) {
//     try {
//         await connectDB();
//         const { slug } = params;

//         const service = await Service.findOne(slug)
//             .populate('categories')
//             .populate('tags');

//         if (!service) {
//             return NextResponse.json({ message: 'Service not found' }, { status: 404 });
//         }

//         return NextResponse.json(service, { status: 200 });
//     } catch (error) {
//         console.error('GET /api/services/[slug] error:', error);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// }

// export async function PUT(req, { params }) {
//     await connectDB();

//     const { id } = params;
//     const data = await req.json();

//     try {
//         const updatedService = await Service.findByIdAndUpdate(id, data, {
//             new: true,
//             runValidators: true,
//         });

//         if (!updatedService) {
//             return NextResponse.json({ message: 'Service not found' }, { status: 404 });
//         }

//         return NextResponse.json(updatedService);
//     } catch (error) {
//         return NextResponse.json({ message: 'Error updating service', error }, { status: 500 });
//     }
// }

// export async function DELETE(req, { params }) {
//     await connectDB();

//     const { id } = params;

//     try {
//         const deletedService = await Service.findByIdAndDelete(id);

//         if (!deletedService) {
//             return NextResponse.json({ message: 'Service not found' }, { status: 404 });
//         }

//         return NextResponse.json({ message: 'Service deleted successfully' });
//     } catch (error) {
//         return NextResponse.json({ message: 'Error deleting service', error }, { status: 500 });
//     }
// }