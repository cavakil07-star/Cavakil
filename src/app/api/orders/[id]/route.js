import { connectDB } from "@/lib/mongodb";
import Order from "@/models/orderModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await connectDB()
        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: order });
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

        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        // Return 200 with success message instead of 204
        return NextResponse.json(
            { success: true, message: "Order deleted successfully" },
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
        const { id, status } = await req.json();

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Order ID is required" },
                { status: 400 }
            );
        }

        // Build an update object based on whichever fields were passed
        const updateFields = {};
        if (status !== undefined) updateFields.status = status;

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json(
                { success: false, message: "Nothing to update. Provide 'status'." },
                { status: 400 }
            );
        }

        await connectDB();

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return NextResponse.json(
                { success: false, message: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updatedOrder },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ success: false, message: e.message }, { status: 400 });
    }
}