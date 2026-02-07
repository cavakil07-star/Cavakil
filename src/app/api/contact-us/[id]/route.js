import { connectDB } from "@/lib/mongodb";
import ContactUs from "@/models/contactUsModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const contact = await ContactUs.findById(id).lean();

        if (!contact) {
            return NextResponse.json({
                success: false,
                message: 'Contact submission not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: contact
        }, { status: 200 });

    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();

        // Only allow updating status and important fields
        const allowedUpdates = {};
        if (body.status !== undefined) allowedUpdates.status = body.status;
        if (body.important !== undefined) allowedUpdates.important = body.important;

        const updatedContact = await ContactUs.findByIdAndUpdate(
            id,
            allowedUpdates,
            { new: true, runValidators: true }
        ).lean();

        if (!updatedContact) {
            return NextResponse.json({
                success: false,
                message: 'Contact submission not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: updatedContact
        }, { status: 200 });

    } catch (error) {
        console.error('PATCH Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedContact = await ContactUs.findByIdAndDelete(id);

        if (!deletedContact) {
            return NextResponse.json({
                success: false,
                message: 'Contact submission not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Contact submission deleted successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
