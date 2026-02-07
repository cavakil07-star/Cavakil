import { connectDB } from "@/lib/mongodb";
import CallPlan from "@/models/callPlanModel";
import { NextResponse } from "next/server";

async function checkForDuplicate({ name, slug, excludeId = null }) {
    const conditions = [];
    if (name) conditions.push({ name });

    if (conditions.length === 0) return false;

    const query = { $or: conditions };
    if (excludeId) query._id = { $ne: excludeId };

    return await CallPlan.findOne(query);
}

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await connectDB()

        const callPlan = await CallPlan.findById(id)

        if (!callPlan) {
            return NextResponse.json(
                { error: "Call Plan not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({ data: callPlan })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json(); // Changed from destructuring { data }

        await connectDB();

        const existing = await CallPlan.findById(id);
        if (!existing) {
            return NextResponse.json(
                { error: "CallPlan not found" },
                { status: 404 }
            );
        }

        const duplicate = await checkForDuplicate({
            name: body.name,
            excludeId: id
        });

        if (duplicate) {
            return NextResponse.json(
                { error: "Already exists" },
                { status: 409 } // 409 Conflict more appropriate
            );
        }

        const updatedCallPlan = await CallPlan.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ data: updatedCallPlan });


    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: error.message },
            { status: error.message.includes('validation') ? 400 : 500 },
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        await connectDB();

        const deleted = await CallPlan.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json(
                { error: "CallPlan not found" },
                { status: 404 }
            );
        }

        // Return 200 with success message instead of 204
        return NextResponse.json(
            { success: true, message: "CallPlan deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}