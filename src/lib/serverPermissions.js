// lib/serverPermissions.js

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Server-side only: check an incoming request
export async function requirePermissionApi(req, resource, action) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (token.role === 'admin') {
            return null; // admins always allowed
        }

        // for sub-admin, check their permissions map
        const perms = token.permissions?.[resource];
        if (token.role === 'sub-admin' && perms?.[action]) {
            return null;
        }

        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    } catch (err) {
        console.error('Permission check error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
