import mongoose from 'mongoose';

const successStorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        company: {
            type: String,
            required: true,
            trim: true,
        },
        challenge: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300,
        },
        result: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300,
        },
        savings: {
            type: String,
            required: true,
            trim: true,
        },
        iconType: {
            type: String,
            required: true,
            enum: ['TrendingUp', 'Users', 'Award', 'Building2', 'Shield', 'Briefcase'],
            default: 'TrendingUp',
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
        displayOrder: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

successStorySchema.index({ isVisible: 1, displayOrder: 1 });

const SuccessStory = mongoose.models.SuccessStory || mongoose.model('SuccessStory', successStorySchema);

export default SuccessStory;
