// src/auth.js - Auth.js v5 configuration (for server-side auth checks)
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authConfig = {
    session: { strategy: 'jwt' },
    providers: [
        Credentials({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: () => null // Placeholder - actual auth in route.js
        }),
        Credentials({
            id: 'otp',
            name: 'Phone OTP',
            credentials: {
                phone: { label: 'Phone', type: 'text' },
                sessionId: { label: 'Session ID', type: 'text' },
                otp: { label: 'OTP', type: 'text' }
            },
            authorize: () => null // Placeholder - actual auth in route.js
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.phone = user.phone;
                const maxAge = user.role === 'user' ? 60 * 60 * 24 * 30 : 60 * 30;
                token.exp = Math.floor(Date.now() / 1000) + maxAge;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                role: token.role,
                phone: token.phone
            };
            return session;
        }
    },
    pages: {
        signIn: '/',
    },
    trustHost: true,
};

export const { auth } = NextAuth(authConfig);

// Export authOptions for backwards compatibility
export const authOptions = {
    providers: [],
};
