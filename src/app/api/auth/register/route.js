import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/userModel';

export async function POST(request) {
    try {
        await connectDB();
        const { name, email, phone, password, company, designation } = await request.json();

        // 1. Basic validation
        if (!email || !password || !phone) {
            return NextResponse.json(
                { message: 'Email, Password, and Phone are required.' },
                { status: 400 }
            );
        }

        // 2. Check if user exists (email or phone)
        const existingUser = await User.findOne({ 
            $or: [{ email }, { phone }] 
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email or phone already exists.' },
                { status: 409 }
            );
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            company,
            designation,
            role: 'user', // Default role
            provider: 'credentials',
        });

        return NextResponse.json(
            { message: 'User registered successfully.', userId: newUser._id },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
