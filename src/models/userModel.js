import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    view: { type: Boolean, default: false },
    add: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    imageURL: {
        type: String,
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
    },
    password: {
        type: String,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'sub-admin', 'user'],
        default: 'user'
    },
    provider: {
        type: String,
        enum: ['credentials'],
        default: 'credentials'
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    permissions: {
        type: Map,
        of: permissionSchema,
        default: () => new Map()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User