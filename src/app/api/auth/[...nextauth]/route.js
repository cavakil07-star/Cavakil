// app/api/auth/[...nextauth]/route.js
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
            async authorize(credentials) {
                const { email, password } = credentials;
                const { connectDB } = await import('@/lib/mongodb');
                await connectDB();
                const User = (await import('@/models/userModel')).default;
                const bcrypt = (await import('bcryptjs')).default;
                
                const user = await User.findOne({ email }).select('+password');
                if (!user) throw new Error('No user found');
                if (!["admin", "sub-admin"].includes(user.role)) throw new Error("Not authorized");
                const valid = await bcrypt.compare(password, user.password);
                if (!valid) throw new Error('Invalid credentials');
                return { id: user._id.toString(), role: user.role, phone: user.phone };
            }
        }),
        Credentials({
            id: 'otp',
            name: 'Phone OTP',
            credentials: {
                phone: { label: 'Phone', type: 'text' },
                sessionId: { label: 'Session ID', type: 'text' },
                otp: { label: 'OTP', type: 'text' }
            },
            async authorize(credentials) {
                const { phone, sessionId, otp } = credentials;
                try {
                    const { connectDB } = await import('@/lib/mongodb');
                    await connectDB();
                    const User = (await import('@/models/userModel')).default;
                    
                    console.log(sessionId);
                    console.log(otp);
                    if (!phone || !/^\d{10}$/.test(phone)) {
                        throw new Error('Invalid phone number');
                    }

                    let user = await User.findOne({ phone });

                    if (user && user.role !== 'user') {
                        throw new Error('Invalid user: Admin must use email login');
                    }

                    if (!user) {
                        user = await User.create({ phone, role: 'user' });
                    }

                    return {
                        id: user._id.toString(),
                        role: user.role,
                        phone: user.phone
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

const { handlers, auth } = NextAuth(authConfig);

export const { GET, POST } = handlers;
export { auth };