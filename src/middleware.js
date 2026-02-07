import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function middleware(req) {
    const path = req.nextUrl.pathname;
    const session = await auth();

    // Admin route protection
    if (path.startsWith('/admin')) {
        if (!session) {
            return NextResponse.redirect(new URL('/auth', req.url));
        }

        if (!['admin', 'sub-admin'].includes(session.user?.role)) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    // User route protection
    if (path.startsWith('/user')) {
        if (!session) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        if (session.user?.role !== 'user') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};