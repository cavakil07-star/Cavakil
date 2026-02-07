// app/api/users/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { Actions, Resources } from "@/lib/permissions";
import { requirePermissionApi } from "@/lib/serverPermissions";
import Order from "@/models/orderModel";
import Service from "@/models/serviceModel";
import SubService from "@/models/subServiceModel";
import CallPlan from "@/models/callPlanModel";

export async function GET(req, { params }) {
    const { id } = await params;

    await connectDB();

    try {
        const user = await User.findById(id)
            .select('-password')
            .populate({
                path: 'orders',
                populate: [
                    { path: 'service' },
                    { path: 'subService' },
                    { path: 'callPlan' },
                ],
            });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, user });

    } catch (err) {
        return NextResponse.json({ success: false, message: 'Failed to fetch user' }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    const { id } = await params;
    const errorResponse = await requirePermissionApi(req, Resources.USERS, Actions.EDIT);
    if (errorResponse) return errorResponse;

    await connectDB();
    try {
        const updates = await req.json();

        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return Response.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return Response.json({ success: true, user });
    } catch (err) {
        return Response.json({ success: false, message: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    const errorResponse = await requirePermissionApi(req, Resources.USERS, Actions.DELETE);
    if (errorResponse) return errorResponse;

    await connectDB();
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return Response.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return Response.json({ success: true, message: 'User deleted' });
    } catch (err) {
        return Response.json({ success: false, message: 'Failed to delete user' }, { status: 500 });
    }
}
