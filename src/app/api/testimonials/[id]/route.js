// api/testimonials/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/testimonialModel";
import { NextResponse } from "next/server";

// Utility function for duplicate checking
async function checkForDuplicate({ userName, company, excludeId = null }) {
    const query = {};
    if (userName) query.userName = userName;
    if (company) query.company = company;
    if (excludeId) query._id = { $ne: excludeId };

    if (!query.userName || !query.company) return false;

    return await Testimonial.findOne(query);
}

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        await connectDB();

        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
            return NextResponse.json(
                { error: "Testimonial not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: testimonial });
    } catch (e) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json(); // Changed from destructuring { data }

        await connectDB();

        // Check if tag exists first
        const existingTestimonial = await Testimonial.findById(id);
        if (!existingTestimonial) {
            return NextResponse.json(
                { error: "Testimonial not found" },
                { status: 404 }
            );
        }

        // Check for duplicates
        const duplicate = await checkForDuplicate({
            userName: body.userName,
            company: body.company,
            excludeId: id
        });

        if (duplicate) {
            return NextResponse.json(
                { error: "Testimonial with this name and company already exists" },
                { status: 409 } // 409 Conflict more appropriate
            );
        }

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            id,
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ data: updatedTestimonial });
    } catch (e) {
        return NextResponse.json(
            {
                error: e.message.includes('validation')
                    ? "Invalid Testimonial data"
                    : "Server error"
            },
            { status: e.message.includes('validation') ? 400 : 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await connectDB();

        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return NextResponse.json(
                { error: "Testimonial not found" },
                { status: 404 }
            );
        }

        // Return 200 with success message instead of 204
        return NextResponse.json(
            { success: true, message: "Testimonial deleted successfully" },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(req) {
    try {
        const { id, isVisible, priority } = await req.json();

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Testimonial ID is required." },
                { status: 400 }
            );
        }

        // Build update object
        const updateFields = {};
        if (typeof isVisible === "boolean") updateFields.isVisible = isVisible;
        if (typeof priority === "number") updateFields.priority = priority;

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json(
                { success: false, message: "Nothing to update. Provide 'isVisible' or 'priority'." },
                { status: 400 }
            );
        }

        await connectDB();

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedTestimonial) {
            return NextResponse.json(
                { success: false, message: "Testimonial not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updatedTestimonial },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            { success: false, message: e.message },
            { status: 400 }
        );
    }
}
