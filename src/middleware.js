import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const path = req.nextUrl.pathname;
    
    const token = await getToken({ 
        req, 
        secret: process.env.NEXTAUTH_SECRET 
    });

    // Admin route protection
    if (path.startsWith('/admin')) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth', req.url));
        }

        if (!['admin', 'sub-admin'].includes(token.role)) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    // User route protection
    if (path.startsWith('/user')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        if (token.role !== 'user') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};