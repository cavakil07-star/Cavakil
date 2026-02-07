import { connectDB } from "@/lib/mongodb";
import Service from "@/models/serviceModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const res = await Service.find({
            status: true
        })
            .sort({ displayOrder: 1, updatedAt: -1 })

        return NextResponse.json({ success: true, data: res })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: error,
            status: 500
        })
    }
}