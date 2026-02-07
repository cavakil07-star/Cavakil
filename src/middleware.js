import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Force Node.js runtime instead of Edge
export const runtime = 'nodejs';

export async function middleware(req) {
    const path = req.nextUrl.pathname;
    
    // Get token from cookies
    const cookieName = process.env.NODE_ENV === 'production' 
        ? '__Secure-authjs.session-token' 
        : 'authjs.session-token';
    const tokenCookie = req.cookies.get(cookieName)?.value 
        || req.cookies.get('next-auth.session-token')?.value
        || req.cookies.get('__Secure-next-auth.session-token')?.value;
    
    let token = null;
    
    if (tokenCookie) {
        try {
            const secret = new TextEncoder().encode(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET);
            const { payload } = await jwtVerify(tokenCookie, secret);
            token = payload;
        } catch (error) {
            console.error('Token verification failed:', error.message);
        }
    }

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