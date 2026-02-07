// api/tags/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import Tag from "@/models/tagModel";
import { NextResponse } from "next/server";

// Utility function for duplicate checking
async function checkForDuplicateTag({ name, slug, excludeId = null }) {
    const conditions = [];
    if (name) conditions.push({ name });
    if (slug) conditions.push({ slug });

    if (conditions.length === 0) return false;

    const query = { $or: conditions };
    if (excludeId) query._id = { $ne: excludeId };

    return await Tag.findOne(query);
}

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        await connectDB();

        const tag = await Tag.findById(id);
        if (!tag) {
            return NextResponse.json(
                { error: "Tag not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: tag });
    } catch (e) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json(); // Changed from destructuring { data }

        await connectDB();

        // Check if tag exists first
        const existingTag = await Tag.findById(id);
        if (!existingTag) {
            return NextResponse.json(
                { error: "Tag not found" },
                { status: 404 }
            );
        }

        // Check for duplicates
        const duplicate = await checkForDuplicateTag({
            name: body.name,
            slug: body.slug,
            excludeId: id
        });

        if (duplicate) {
            return NextResponse.json(
                { error: "Tag with this slug or name already exists" },
                { status: 409 } // 409 Conflict more appropriate
            );
        }

        const updatedTag = await Tag.findByIdAndUpdate(
            id,
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ data: updatedTag });
    } catch (e) {
        return NextResponse.json(
            {
                error: e.message.includes('validation')
                    ? "Invalid tag data"
                    : "Server error"
            },
            { status: e.message.includes('validation') ? 400 : 500 }
        );
    }
}


export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await connectDB();

        const deletedTag = await Tag.findByIdAndDelete(id);
        if (!deletedTag) {
            return NextResponse.json(
                { error: "Tag not found" },
                { status: 404 }
            );
        }

        // Return 200 with success message instead of 204
        return NextResponse.json(
            { success: true, message: "Tag deleted successfully" },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}


















// import { db } from "@/lib/firebase/firebase-client";
// import { Timestamp, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
// import { NextResponse } from 'next/server';

// export async function GET(request, { params }) {
//     const { id } = params;
//     try {
//         const snap = await getDoc(doc(db, `tags/${id}`));
//         const cat = snap.data();
//         return NextResponse.json({ data: cat });
//     } catch (e) {
//         return NextResponse.json({ error: e.message }, { status: 404 });
//     }
// }

// export async function PUT(request, { params }) {
//     const { id } = params;
//     try {
//         const { data } = await request.json();

//         const updatePayload = {
//             ...data,
//             updatedAt: serverTimestamp(),
//         };

//         const firestoreRef = doc(db, `tags/${id}`);
//         await updateDoc(firestoreRef, updatePayload);

//         return NextResponse.json({ success: true });
//     } catch (e) {
//         return NextResponse.json({ error: e.message }, { status: 400 });
//     }
// }

// export async function DELETE(request, { params }) {
//     const { id } = params;
//     try {
//         await deleteDoc(doc(db, `tags/${id}`));
//         return NextResponse.json({ success: true });
//     } catch (e) {
//         return NextResponse.json({ error: e.message }, { status: 400 });
//     }
// }
