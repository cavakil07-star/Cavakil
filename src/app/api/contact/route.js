import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import ContactUs from '@/models/contactUsModel'

export async function POST(request) {
    try {
        const body = await request.json()

        // Validate required fields
        if (!body.name || !body.email || !body.phone || !body.description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        await connectDB()

        // Create new contact submission
        const newContact = await ContactUs.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            description: body.description,
        })

        return NextResponse.json({ 
            success: true, 
            message: 'Contact form submitted successfully',
            data: newContact 
        })
    } catch (error) {
        console.error('Error saving contact form:', error)
        return NextResponse.json({ 
            error: error.message || 'Failed to submit contact form' 
        }, { status: 500 })
    }
}