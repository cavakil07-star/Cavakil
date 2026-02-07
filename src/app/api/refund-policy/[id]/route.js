// app/api/refund-policy/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import RefundPolicy from "@/models/refundPolicyModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        await connectDB();

        const updatedRefund = await RefundPolicy.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ data: updatedRefund });
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