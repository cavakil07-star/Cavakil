import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name must be less than 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [/^\d{7,15}$/, 'Please provide a valid phone number'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            minlength: [5, 'Description must be at least 5 characters long'],
            maxlength: [2000, 'Description must be under 2000 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'resolved'],
            default: 'pending'
        },
        important: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const ContactUs = mongoose.models.ContactUs || mongoose.model('ContactUs', contactUsSchema);

export default ContactUs;
