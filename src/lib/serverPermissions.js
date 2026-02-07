// lib/serverPermissions.js

import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// Server-side only: check an incoming request
export async function requirePermissionApi(req, resource, action) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (session.user.role === 'admin') {
            return null; // admins always allowed
        }

        // for sub-admin, check their permissions map
        const perms = session.user.permissions?.[resource];
        if (session.user.role === 'sub-admin' && perms?.[action]) {
            return null;
        }

        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    } catch (err) {
        console.error('Permission check error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
