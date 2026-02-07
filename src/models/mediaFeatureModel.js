import mongoose from 'mongoose';

const mediaFeatureSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        source: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: String,
            required: true,
            trim: true,
        },
        articleType: {
            type: String,
            required: true,
            enum: ['Feature Article', 'Press Release', 'Startup Feature', 'Interview', 'News', 'Other'],
            default: 'Feature Article',
        },
        articleUrl: {
            type: String,
            default: '',
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

mediaFeatureSchema.index({ isVisible: 1, displayOrder: 1 });

const MediaFeature = mongoose.models.MediaFeature || mongoose.model('MediaFeature', mediaFeatureSchema);

export default MediaFeature;
