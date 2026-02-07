// /api/blogs/[id]/route.js

import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const blog = await Blog.findById(id)

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ data: blog }, { status: 200 });
    } catch (error) {
        console.error('GET /api/blogs/[id] error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();

        if (!body) {
            return NextResponse.json({ message: 'Request body is empty' }, { status: 400 });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        )

        if (!updatedBlog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ succes: true, data: updatedBlog });
    } catch (error) {
        console.error('PUT /api/blogs/[id] error:', error);
        return NextResponse.json(
            { message: 'Error updating service', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/blogs/[id] error:', error);
        return NextResponse.json(
            { message: 'Error deleting service', error: error.message },
            { status: 500 }
        );
    }
}
