import mongoose from 'mongoose';

const clientReviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            default: 5,
        },
        review: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        platform: {
            type: String,
            required: true,
            enum: ['Google Reviews', 'Trustpilot', 'Facebook', 'LinkedIn', 'Other'],
            default: 'Google Reviews',
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

clientReviewSchema.index({ isVisible: 1, displayOrder: 1 });

const ClientReview = mongoose.models.ClientReview || mongoose.model('ClientReview', clientReviewSchema);

export default ClientReview;
