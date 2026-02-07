import { connectDB } from "@/lib/mongodb";
import SuccessStory from "@/models/successStoryModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const story = await SuccessStory.findById(id).lean();

        if (!story) {
            return NextResponse.json({ error: "Success story not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: story }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updatedStory = await SuccessStory.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedStory) {
            return NextResponse.json({ error: "Success story not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedStory }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updatedStory = await SuccessStory.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedStory) {
            return NextResponse.json({ error: "Success story not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedStory }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedStory = await SuccessStory.findByIdAndDelete(id);

        if (!deletedStory) {
            return NextResponse.json({ error: "Success story not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Success story deleted successfully" }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
