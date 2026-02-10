// app/api/auth/[...nextauth]/route.js
// Using next-auth v4 (stable) with App Router

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const authOptions = {
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                
                await connectDB();
                
                const user = await User.findOne({ email }).select('+password');
                if (!user) throw new Error('No user found');
                if (!["admin", "sub-admin"].includes(user.role)) throw new Error("Not authorized");
                
                const valid = await bcrypt.compare(password, user.password);
                if (!valid) throw new Error('Invalid credentials');
                
                return { 
                    id: user._id.toString(), 
                    role: user.role, 
                    phone: user.phone,
                    permissions: user.permissions 
                };
            }
        }),
        CredentialsProvider({
            id: 'otp',
            name: 'Phone OTP',
            credentials: {
                phone: { label: 'Phone', type: 'text' },
                email: { label: 'Email', type: 'email' },
                sessionId: { label: 'Session ID', type: 'text' },
                otp: { label: 'OTP', type: 'text' }
            },
            async authorize(credentials) {
                const { phone, email } = credentials;
                
                try {
                    await connectDB();
                    
                    // Validate: must have either phone or email
                    if (!phone && !email) {
                        throw new Error('Phone or email is required');
                    }
                    
                    let user;
                    
                    if (phone) {
                        // Phone login flow
                        if (!/^\d{10}$/.test(phone)) {
                            throw new Error('Invalid phone number');
                        }

                        user = await User.findOne({ phone });

                        if (user && user.role !== 'user') {
                            throw new Error('Invalid user: Admin must use email login');
                        }

                        if (!user) {
                            user = await User.create({ phone, role: 'user' });
                        }
                    } else if (email) {
                        // Email login flow
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(email)) {
                            throw new Error('Invalid email address');
                        }

                        user = await User.findOne({ email });

                        if (user && user.role !== 'user') {
                            throw new Error('Invalid user: Admin must use email login');
                        }

                        if (!user) {
                            user = await User.create({ email, role: 'user' });
                        }
                    }

                    return {
                        id: user._id.toString(),
                        role: user.role,
                        phone: user.phone,
                        email: user.email
                    };
                } catch (error) {
                    console.error('OTP Auth Error:', error);
                    throw new Error(error.message || 'Could not authenticate');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.phone = user.phone;
                token.email = user.email;
                token.permissions = user.permissions;
                // Admin session: 30 minutes | User session: 30 days
                const maxAge = user.role === 'user' ? 60 * 60 * 24 * 30 : 60 * 30;
                token.exp = Math.floor(Date.now() / 1000) + maxAge;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                role: token.role,
                phone: token.phone,
                email: token.email
            };
            return session;
        }
    },
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };