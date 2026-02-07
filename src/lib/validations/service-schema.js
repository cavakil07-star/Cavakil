// /schemas/service-form.schema.js
import { z } from 'zod';

// Step 3 schema for each “big description” section
const ServiceBigDescriptionSection = z.object({
    name: z.string().min(1, 'Section Name is required'),
    title: z.string().min(1, 'Section Title is required'),
    content: z.string().min(1, 'Section Content is required'),
});

// Combined schema for all steps
export const ServiceFormSchema = z.object({
    // Step 1 fields
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    shortDescription: z.string().min(1, 'Short description is required'),
    imageURL: z
        .string()
        .url('Must be a valid URL')
        .min(1, 'Image is required'),
    categories: z
        .array(z.string())
        .min(1, 'Select at least one category'),
    tags: z
        .array(z.string())
        .min(1, 'Select at least one tag'),
    status: z.boolean(),
    displayOrder: z.number().int().min(0, 'Display order must be a positive number').optional(),
    // featured: z.boolean(),

    // Step 2 fields
    pageHeading: z.string().min(1, 'Page Heading is required'),
    serviceTypeDetails: z
        .array(z.string().min(1, 'Detail cannot be empty'))
        .min(1, 'At least one detail')
        .max(10, 'Maximum of 10 details'),

    // Step 3 fields
    serviceBigDescription: z
        .array(ServiceBigDescriptionSection)
        .min(1, 'Add at least one content section'),
});
