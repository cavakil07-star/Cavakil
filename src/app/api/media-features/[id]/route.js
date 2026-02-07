import { connectDB } from "@/lib/mongodb";
import MediaFeature from "@/models/mediaFeatureModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const feature = await MediaFeature.findById(id).lean();

        if (!feature) {
            return NextResponse.json({ error: "Media feature not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: feature }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updatedFeature = await MediaFeature.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedFeature) {
            return NextResponse.json({ error: "Media feature not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedFeature }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updatedFeature = await MediaFeature.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedFeature) {
            return NextResponse.json({ error: "Media feature not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedFeature }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedFeature = await MediaFeature.findByIdAndDelete(id);

        if (!deletedFeature) {
            return NextResponse.json({ error: "Media feature not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Media feature deleted successfully" }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
