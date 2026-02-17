import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/testimonialModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const testimonials = await Testimonial.find({ isVisible: true }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: testimonials });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
