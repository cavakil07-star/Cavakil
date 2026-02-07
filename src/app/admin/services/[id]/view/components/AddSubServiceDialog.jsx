'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import LoaderButton from '@/components/custom/LoaderButton';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

// Helper function to convert label to slug
const labelToSlug = (label) => {
    if (!label) return '';

    return label
        .toLowerCase()
        .replace(/\s+/g, '-')      // Replace spaces with -
        .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
        .replace(/\-\-+/g, '-')    // Replace multiple - with single -
        .replace(/^-+/, '')        // Trim - from start of text
        .replace(/-+$/, '');       // Trim - from end of text
};

// Zod schema matching SubService model
const documentSchema = z.object({
    label: z.string().min(1),
    name: z.string().min(1).optional()
});

const detailSchema = z.object({
    label: z.string().min(1),
    name: z.string().min(1).optional()
});

const subServiceSchema = z.object({
    serviceId: z.string(),
    name: z.string().min(1).max(100),
    requiredDocuments: z.array(documentSchema),
    requiredDetails: z.array(detailSchema),
    isDocumentsRequired: z.boolean(),
    isDetailsRequired: z.boolean(),
    benefits: z.array(z.object({ value: z.string() })),
    actualPrice: z.number().min(0),
    discountedPrice: z.number().min(0).optional(),
});

function AddSubServiceDialog({ open, onOpenChange, serviceId, onCreate, isLoading, editing, onUpdate, error }) {
    const form = useForm({
        resolver: zodResolver(subServiceSchema),
        defaultValues: {
            serviceId,
            name: '',
            requiredDocuments: [{ label: '', name: '' }],
            requiredDetails: [{ label: '', name: '' }],
            isDocumentsRequired: true,
            isDetailsRequired: true,
            benefits: [{ value: '' }],
            actualPrice: 0,
            discountedPrice: undefined,
        },
    });

    const { control, handleSubmit, reset, setValue, formState: { errors } } = form;

    useEffect(() => {
        if (open) {
            reset({
                serviceId,
                name: editing.name || '',
                requiredDocuments: editing.requiredDocuments?.length ? editing.requiredDocuments : [{ label: '', name: '' }],
                requiredDetails: editing.requiredDetails?.length ? editing.requiredDetails : [{ label: '', name: '' }],
                isDocumentsRequired: editing.isDocumentsRequired ?? true,
                isDetailsRequired: editing.isDetailsRequired ?? true,
                benefits: editing.benefits?.length ? editing.benefits.map(b => ({ value: typeof b === 'string' ? b : b.value })) : [{ value: '' }],
                actualPrice: editing.actualPrice || 0,
                discountedPrice: editing.discountedPrice,
            });
        }
    }, [open, editing, reset, serviceId]);

    const handleClose = () => {
        reset();
        onOpenChange(false);
    };

    const docsArray = useFieldArray({ control, name: 'requiredDocuments' });
    const detailsArray = useFieldArray({ control, name: 'requiredDetails' });
    const benefitsArray = useFieldArray({ control, name: 'benefits' });

    // Handle label change - generate slug automatically
    const handleLabelChange = (fieldType, index, value) => {
        const slug = labelToSlug(value);
        setValue(`${fieldType}.${index}.label`, value);
        setValue(`${fieldType}.${index}.name`, slug);
    };

    const onSubmit = async (data) => {
        // Ensure names are slugs of labels and filter empty values
        const processedData = {
            ...data,
            requiredDocuments: data.requiredDocuments
                .filter(doc => doc.label?.trim())
                .map(doc => ({
                    ...doc,
                    name: labelToSlug(doc.label) || doc.name
                })),
            requiredDetails: data.requiredDetails
                .filter(detail => detail.label?.trim())
                .map(detail => ({
                    ...detail,
                    name: labelToSlug(detail.label) || detail.name
                })),
            benefits: data.benefits.filter(b => b.value?.trim()).map(b => b.value)
        };

        try {
            if (editing._id) {
                await onUpdate({ id: editing._id, data: processedData });
            } else {
                await onCreate(processedData);
            }
            handleClose();
        } catch (err) {
            console.error("Full error object:", err);
            const apiError = err.response?.data;
            console.error("API error payload:", apiError);
            const msg = apiError?.message || apiError?.error || err.message || "Something went wrong.";
            console.log(msg);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl p-0 max-h-[90vh] overflow-y-auto">
                <div className="p-6 bg-gradient-to-br from-[#f0f7ff] to-[#e6f2ff]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold text-[#003366] mb-4">
                            {editing._id ? "Edit Sub Service" : "Add Sub Service"}
                        </DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <input type="hidden" {...form.register('serviceId')} />

                            <Card>
                                <CardContent>
                                    <FormField
                                        control={control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Sub Service Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className={'space-y-4'}>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="font-semibold">Required Documents</FormLabel>
                                            <FormField
                                                control={control}
                                                name="isDocumentsRequired"
                                                render={({ field }) => (
                                                    <FormItem className="flex items-center gap-2">
                                                        <FormLabel className="text-sm text-gray-500 mb-0">Required</FormLabel>
                                                        <FormControl>
                                                            <Switch
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        {docsArray.fields.map((item, idx) => (
                                            <div key={item.id} className="flex space-x-2 items-center mb-2">
                                                <FormField
                                                    control={control}
                                                    name={`requiredDocuments.${idx}.label`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Document Label"
                                                                    {...field}
                                                                    onChange={(e) => {
                                                                        handleLabelChange('requiredDocuments', idx, e.target.value);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => docsArray.remove(idx)}
                                                    className="flex-shrink-0"
                                                >
                                                    &times;
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => docsArray.append({ label: '', name: '' })}
                                        >
                                            + Add Document
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className={'space-y-4'}>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="font-semibold">Required Details</FormLabel>
                                            <FormField
                                                control={control}
                                                name="isDetailsRequired"
                                                render={({ field }) => (
                                                    <FormItem className="flex items-center gap-2">
                                                        <FormLabel className="text-sm text-gray-500 mb-0">Required</FormLabel>
                                                        <FormControl>
                                                            <Switch
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        {detailsArray.fields.map((item, idx) => (
                                            <div key={item.id} className="flex space-x-2 items-center mb-2">
                                                <FormField
                                                    control={control}
                                                    name={`requiredDetails.${idx}.label`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Detail Label"
                                                                    {...field}
                                                                    onChange={(e) => {
                                                                        handleLabelChange('requiredDetails', idx, e.target.value);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => detailsArray.remove(idx)}
                                                    className="flex-shrink-0"
                                                >
                                                    &times;
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => detailsArray.append({ label: '', name: '' })}
                                        >
                                            + Add Detail
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className={'space-y-4'}>
                                        <FormLabel className="font-semibold">Service Benefits</FormLabel>
                                        <FormDescription className="text-xs text-gray-500">Add benefits that will be displayed to users</FormDescription>
                                        {benefitsArray.fields.map((item, idx) => (
                                            <div key={item.id} className="flex space-x-2 items-center mb-2">
                                                <FormField
                                                    control={control}
                                                    name={`benefits.${idx}.value`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="e.g., Expert CA consultation"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => benefitsArray.remove(idx)}
                                                    className="flex-shrink-0"
                                                >
                                                    &times;
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => benefitsArray.append({ value: '' })}
                                        >
                                            + Add Benefit
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className={'space-y-4'}>
                                        <FormField
                                            control={control}
                                            name="actualPrice"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Actual Price</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name="discountedPrice"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Discounted Price (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Leave blank if no discount"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end pt-4">
                                <LoaderButton
                                    type="submit"
                                    loading={isLoading}
                                >
                                    {editing._id ? "Update Sub Service" : "Save Sub Service"}
                                </LoaderButton>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddSubServiceDialog;