import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/enquiryModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await connectDB()
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return NextResponse.json(
                { error: "Enquiry not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: enquiry });
    } catch (e) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await connectDB();

        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
        if (!deletedEnquiry) {
            return NextResponse.json(
                { error: "Enquiry not found" },
                { status: 404 }
            );
        }

        // Return 200 with success message instead of 204
        return NextResponse.json(
            { success: true, message: "Enquiry deleted successfully" },
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
        const { id, status, important } = await req.json();

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Enquiry ID is required" },
                { status: 400 }
            );
        }

        // Build an update object based on whichever fields were passed
        const updateFields = {};
        if (status !== undefined) updateFields.status = status;
        if (important !== undefined) updateFields.important = important;

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json(
                { success: false, message: "Nothing to update. Provide 'status' or 'important'." },
                { status: 400 }
            );
        }

        await connectDB();

        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedEnquiry) {
            return NextResponse.json(
                { success: false, message: "Enquiry not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updatedEnquiry },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ success: false, message: e.message }, { status: 400 });
    }
}