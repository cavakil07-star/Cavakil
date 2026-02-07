import { connectDB } from "@/lib/mongodb";
import ClientReview from "@/models/clientReviewModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const review = await ClientReview.findById(id).lean();

        if (!review) {
            return NextResponse.json({ error: "Client review not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: review }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updatedReview = await ClientReview.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return NextResponse.json({ error: "Client review not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedReview }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updatedReview = await ClientReview.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return NextResponse.json({ error: "Client review not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedReview }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedReview = await ClientReview.findByIdAndDelete(id);

        if (!deletedReview) {
            return NextResponse.json({ error: "Client review not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Client review deleted successfully" }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
