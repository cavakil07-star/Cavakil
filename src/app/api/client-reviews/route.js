import { connectDB } from "@/lib/mongodb";
import ClientReview from "@/models/clientReviewModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);

        const isVisible = searchParams.get('isVisible');
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));
        const forWebsite = searchParams.get('forWebsite') === 'true';

        const filter = {};

        if (isVisible && isVisible !== 'all') {
            filter.isVisible = isVisible === 'true';
        }

        // For website, only show visible items
        if (forWebsite) {
            filter.isVisible = true;
        }

        const skip = (page - 1) * limit;

        const [reviews, totalCount] = await Promise.all([
            ClientReview.find(filter)
                .sort({ displayOrder: 1, createdAt: -1 })
                .skip(forWebsite ? 0 : skip)
                .limit(forWebsite ? 100 : limit)
                .lean(),
            ClientReview.countDocuments(filter)
        ]);

        return NextResponse.json({
            success: true,
            data: reviews,
            totalCount: totalCount,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
                hasNextPage: page < Math.ceil(totalCount / limit),
                hasPrevPage: page > 1
            }
        }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        await connectDB();

        const newReview = await ClientReview.create(body);
        return NextResponse.json({ success: true, data: newReview }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}
