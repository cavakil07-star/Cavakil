import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true,
    },
    imageURL: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/.test(v);
            },
            message: props => `${props.value} is not a valid image URL`
        }
    },
    pageHeading: {
        type: String,
        required: true,
        trim: true,
    },
    serviceTypeDetails: {
        type: [{
            type: String,
            required: true,
            trim: true,
        }],
        validate: [arrayLimit(10), 'Exceeds maximum of 10 service type details']
    },
    serviceBigDescription: [{
        name: { type: String, maxlength: 40, required: true, },
        title: { type: String, maxlength: 100, required: true, },
        content: { type: String, required: true, }
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    status: {
        type: Boolean,
        default: true
    },
    subServices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubService',
    }],
    displayOrder: {
        type: Number,
        default: 99
    }
}, {
    timestamps: true,
});

// Array limit validator
function arrayLimit(max) {
    return function (v) {
        return v.length <= max;
    };
}

serviceSchema.index({ status: 1 });
serviceSchema.index({ categories: 1, status: 1 });
serviceSchema.index({ slug: 1, status: 1 });
serviceSchema.index({ tags: 1, status: 1 });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;