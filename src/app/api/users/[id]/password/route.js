// app/api/users/[id]/password/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function PATCH(req, { params }) {
    const { id } = await params;
    await connectDB();
    const { currentPassword, newPassword, confirmNewPassword } = await req.json();

    if (newPassword !== confirmNewPassword) {
        return NextResponse.json({ success: false, message: 'Passwords do not match' }, { status: 400 });
    }

    const password = await bcrypt.hash(newPassword, 10);

    const user = await User.findByIdAndUpdate(id, { password: password }, { new: true });

    await user.save();

    return NextResponse.json({ success: true, message: 'Password updated' });
}
