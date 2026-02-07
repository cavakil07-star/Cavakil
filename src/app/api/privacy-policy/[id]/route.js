// app/api/privacy-policy/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import PrivacyPolicy from "@/models/privacyPolicyModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        await connectDB();

        const updatedPrivacy = await PrivacyPolicy.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ data: updatedPrivacy });
    } catch (e) {
        return NextResponse.json(
            {
                error: e.message.includes('validation')
                    ? "Invalid data"
                    : "Server error"
            },
            { status: e.message.includes('validation') ? 400 : 500 }
        );
    }
}