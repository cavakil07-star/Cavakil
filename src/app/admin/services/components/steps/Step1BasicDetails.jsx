'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandItem,
} from '@/components/ui/command';
import { ImageIcon, X } from 'lucide-react';
import ImageSelector from '@/components/ImageSelector';
import Image from 'next/image';
import { useCategories } from '@/hooks/useCategories';
import { useTags } from '@/hooks/useTags';
import { Label } from '@/components/ui/label';

export default function Step1BasicDetails() {
    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const { categoriesQuery } = useCategories();
    const { tagsQuery } = useTags();
    const allCategories = categoriesQuery.data || [];
    const allTags = tagsQuery.data || [];

    // Local state for previewing the chosen image URL
    const [imageURLPreview, setImageURLPreview] = useState(watch('imageURL') || null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const selectedCats = watch('categories') || []; 
    const selectedTags = watch('tags') || [];

    // Helper to toggle an ID in categories or tags
    const toggleSelect = (field, id) => {
        const curr = watch(field) || [];
        if (curr.includes(id)) {
            setValue(
                field,
                curr.filter((x) => x !== id),
                { shouldValidate: true }
            );
        } else {
            setValue(field, [...curr, id], { shouldValidate: true });
        }
    };

    const watchName = watch("name");

    useEffect(() => {
        const generatedSlug = watchName
            ?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        setValue('slug', generatedSlug);
    }, [watchName, setValue,]);

    return (
        <div className="grid gap-4 grid-cols-2 space-y-6 bg-white border rounded-xl p-7">
            {/* Name */}
            <FormField
                control={control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Service Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Slug */}
            <FormField
                control={control}
                name="slug"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                            <Input disabled placeholder="service-slug" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Display Order */}
            <FormField
                control={control}
                name="displayOrder"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                            <Input 
                                type="number" 
                                placeholder="e.g., 10, 20, 30" 
                                {...field} 
                                onChange={e => field.onChange(e.target.value ? parseInt(e.target.value, 10) : '')}
                            />
                        </FormControl>
                        <p className="text-sm text-gray-500 mt-1">
                            Lower numbers appear first. Use increments of 10 (e.g., 10, 20, 30) for easy reordering.
                        </p>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className='space-y-6'>
                {/* Short Description */}
                <div className='col-span-2'>
                    <FormField
                        control={control}
                        name="shortDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Brief service description…"
                                        rows={1}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Status Switch */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div>
                        <Label htmlFor="status" className="block font-medium text-gray-700">
                            Status
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">
                            {watch('status') ? 'Published (visible to public)' : 'Draft (only you can see)'}
                        </p>
                    </div>
                    <FormField
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(val) => field.onChange(val)}
                                        className="scale-125 data-[state=checked]:bg-green-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            {/* Featured Image (imageURL) */}
            <div className=" space-y-2">
                <FormLabel>Featured Image *</FormLabel>
                {!imageURLPreview ? (
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer h-48"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                        <span className="text-gray-500">Click to select image</span>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <div className="h-48 w-full border rounded-xl mb-2">
                            <Image
                                height={200}
                                width={400}
                                quality={100}
                                src={imageURLPreview}
                                alt="Featured image"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <button
                            type="button"
                            className="inline-block px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Change Image
                        </button>
                    </div>
                )}
                {errors.imageURL && (
                    <p className="text-red-500 text-sm mt-1">{errors.imageURL.message}</p>
                )}

                <ImageSelector
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    setImage={(url) => {
                        setValue('imageURL', url, { shouldValidate: true });
                        setImageURLPreview(url);
                    }}
                />
            </div>


            {/* Categories Multi-Select */}
            <div className="col-span-2">
                <FormLabel className={'mb-3'}>Categories</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <div
                            className={`min-h-[38px] w-full flex flex-wrap items-center gap-1 px-2 ${errors.categories ? 'border border-red-500' : 'border'
                                } rounded cursor-pointer`}
                            onClick={(e) =>
                                e.currentTarget.nextElementSibling?.dispatchEvent(
                                    new MouseEvent('click')
                                )
                            }
                        >
                            {selectedCats.length === 0 && (
                                <span className="text-gray-400">Select categories…</span>
                            )}
                            {selectedCats.map((id) => {
                                const cat = allCategories.find((c) => c._id === id);
                                return (
                                    <span
                                        key={id}
                                        className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-sm"
                                    >
                                        {cat?.name}
                                        <X
                                            className="ml-1 cursor-pointer"
                                            size={12}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSelect('categories', id);
                                            }}
                                        />
                                    </span>
                                );
                            })}
                        </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandList>
                                <CommandEmpty>No categories found.</CommandEmpty>
                                {allCategories.map((cat) => (
                                    <CommandItem
                                        key={cat._id}
                                        onSelect={() => toggleSelect('categories', cat._id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCats.includes(cat._id)}
                                            readOnly
                                            className="mr-2"
                                        />
                                        {cat.name}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {errors.categories && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.categories.message}
                    </p>
                )}
            </div>

            {/* Tags Multi-Select */}
            <div className="col-span-2">
                <FormLabel className={'mb-3'}>Tags</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <div
                            className={`min-h-[38px] w-full flex flex-wrap items-center gap-1 px-2 ${errors.tags ? 'border border-red-500' : 'border'
                                } rounded cursor-pointer`}
                            onClick={(e) =>
                                e.currentTarget.nextElementSibling?.dispatchEvent(
                                    new MouseEvent('click')
                                )
                            }
                        >
                            {selectedTags.length === 0 && (
                                <span className="text-gray-400">Select tags…</span>
                            )}
                            {selectedTags.map((id) => {
                                const tag = allTags.find((t) => t._id === id);
                                return (
                                    <span
                                        key={id}
                                        className="flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm"
                                    >
                                        {tag?.name}
                                        <X
                                            className="ml-1 cursor-pointer"
                                            size={12}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSelect('tags', id);
                                            }}
                                        />
                                    </span>
                                );
                            })}
                        </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search tags..." />
                            <CommandList>
                                <CommandEmpty>No tags found.</CommandEmpty>
                                {allTags.map((tag) => (
                                    <CommandItem
                                        key={tag._id}
                                        onSelect={() => toggleSelect('tags', tag._id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag._id)}
                                            readOnly
                                            className="mr-2"
                                        />
                                        {tag.name}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {errors.tags && (
                    <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
                )}
            </div>
        </div>
    );
}







{/* Featured Switch */ }
{/* <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div>
                    <Label htmlFor="featured" className="block font-medium text-gray-700">
                        Featured
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                        {watch('featured') ? 'Featured Post' : 'Regular post'}
                    </p>
                </div>
                <FormField
                    control={control}
                    name="featured"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                            <FormLabel>Featured</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={(val) => field.onChange(val)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div> */}
