import mongoose from 'mongoose';

const subServiceSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    requiredDocuments: [{
        label: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
    }],
    requiredDetails: [{
        label: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
    }],
    isDocumentsRequired: {
        type: Boolean,
        default: true
    },
    isDetailsRequired: {
        type: Boolean,
        default: true
    },
    benefits: [{
        type: String,
        trim: true
    }],
    actualPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discountedPrice: {
        type: Number,
        min: 0,
    },
});

const SubService = mongoose.models.SubService || mongoose.model('SubService', subServiceSchema);

export default SubService;
