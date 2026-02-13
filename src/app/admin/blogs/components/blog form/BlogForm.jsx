'use client';

import dynamic from 'next/dynamic';
const RTEField = dynamic(
    () => import('./RTEField'),
    {
        ssr: false,
        loading: () => <p className="py-10 text-center text-gray-500">Loading editor...</p>
    }
);

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from '@/components/ui/command';
import { useCategories } from '@/hooks/useCategories';
import { useTags } from '@/hooks/useTags';
import { ImageIcon, X } from 'lucide-react';
import { useBlogs } from '@/hooks/useBlogs';
import LoaderButton from '@/components/custom/LoaderButton';
import { cn } from '@/lib/utils';
import ImageSelector from '@/components/ImageSelector';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Validation schema
const VALIDATION_RULES = {
    title: {
        required: "Title is required",
        minLength: { value: 5, message: "Title must be at least 5 characters" },
        maxLength: { value: 120, message: "Title must be at most 120 characters" }
    },
    slug: {
        required: "Slug is required",
        pattern: {
            value: /^[a-z0-9-]+$/,
            message: "Slug can only contain lowercase letters, numbers and hyphens"
        },
        maxLength: { value: 120, message: "Slug must be at most 120 characters" }
    },
    shortDescription: {
        required: "Short description is required",
        minLength: { value: 20, message: "Description must be at least 20 characters" },
        maxLength: { value: 220, message: "Description must be at most 220 characters" }
    },
    imageURL: {
        required: "Image URL is required",
        pattern: {
            value: /^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)$/i,
            message: "Must be a valid image URL (http/https and image extension)"
        }
    },
    categories: {
        validate: value =>
            value?.length > 0 || "At least one category is required"
    },
    tags: {
        validate: value =>
            value?.length > 0 || "At least one tag is required"
    }
};

export default function BlogForm({ defaultValues }) {
    const { createBlog, updateBlog } = useBlogs({ status: true, featured: false, page: 1, pageSize: 10 });
    const { mutateAsync: createBlogAsync, isPending: isCreating } = createBlog;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [image, setImage] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        setError,
        trigger
    } = useForm({
        defaultValues: defaultValues || {
            status: true,
            featured: false,
            categories: [],
            tags: []
        }
    });

    useEffect(() => {
        if (defaultValues?.imageURL) {
            setImage(defaultValues.imageURL)
        }
    }, [])

    const { categoriesQuery } = useCategories();
    const { tagsQuery } = useTags();
    const allCategories = categoriesQuery?.data || [];
    const allTags = tagsQuery?.data || [];

    const selectedCats = watch('categories') || [];
    const selectedTags = watch('tags') || [];

    const toggleSelect = (field, id) => {
        const curr = watch(field) || [];
        const newValue = curr.includes(id)
            ? curr.filter(x => x !== id)
            : [...curr, id];

        setValue(field, newValue, { shouldValidate: true });
    };

    const watchName = watch("title");

    useEffect(() => {
        const generatedSlug = watchName
            ?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        setValue('slug', generatedSlug);
    }, [watchName, setValue,]);


    async function onSubmit(data) {
        const finalData = { ...data, imageURL: image }
        // Validate RTE content separately
        if (!data.content || data.content === '<p></p>') {
            setError('content', { message: 'Blog content is required' });
            return;
        }

        try {
            if (defaultValues?._id) {
                await updateBlog.mutateAsync({ id: defaultValues._id, data: finalData });
            } else {
                await createBlogAsync(finalData);
            }
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Basic Information Section */}
                <div className="space-y-6  bg-white border rounded-xl p-7">

                    <div className="flex items-center gap-3 mb-6 bg-indigo-50 p-2 border rounded-lg">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-1 h-6 rounded-full"></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Basic Information
                            </h2>
                            {/* <p className="text-sm text-gray-500 mt-1">Essential details about your blog post</p> */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="title" className={' mb-2'}>Title *</Label>
                            <Input
                                id="title"
                                placeholder="Enter blog title"
                                className={cn(errors.title && "border-red-500")}
                                {...register('title', VALIDATION_RULES.title)}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="slug" className={' mb-2'}>Slug *</Label>
                            <Input
                                id="slug"
                                disabled
                                placeholder="e.g., my-awesome-blog"
                                className={cn(errors.slug && "border-red-500")}
                                {...register('slug', VALIDATION_RULES.slug)}
                            />
                            {errors.slug && (
                                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                            )}
                        </div>

                        {/* Short Description - Adjusted to match image height */}
                        <div className="h-full flex flex-col">
                            <Label htmlFor="shortDescription" className="mb-2">Short Description *</Label>
                            <Textarea
                                id="shortDescription"
                                placeholder="A brief summary of your blog..."
                                className={cn(
                                    "h-full min-h-[200px]", // Set minimum height and allow it to grow
                                    errors.shortDescription && "border-red-500"
                                )}
                                {...register('shortDescription', VALIDATION_RULES.shortDescription)}
                            />
                            {errors.shortDescription && (
                                <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Featured Image *</Label>

                            {!image ? (
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer h-48"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                                    <span className="text-gray-500">Click to select image</span>
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <div className="h-full w-full border rounded-xl mb-2">
                                        <Image
                                            height={200}
                                            width={400}
                                            quality={100}
                                            src={image}
                                            alt="Featured image"
                                            className="w-full h-44 object-contain"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(true)}
                                    >
                                        Change Image
                                    </Button>
                                </div>
                            )}

                            {!image && (
                                <p className="text-red-500 text-sm mt-1">Image is required.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Settings Section */}
                <div className="space-y-6  bg-white border rounded-xl p-7">
                    <div className="flex items-center gap-3 mb-6  bg-cyan-50 p-2 border rounded-lg">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-1 h-6 rounded-full"></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                                Settings
                            </h2>
                            {/* <p className="text-sm text-gray-500 mt-1">Configure visibility and features</p> */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                            <div>
                                <Label htmlFor="status" className="block font-medium text-gray-700">
                                    Status
                                </Label>
                                <p className="text-sm text-gray-500 mt-1">
                                    {watch('status') ? 'Published (visible to public)' : 'Draft (only you can see)'}
                                </p>
                            </div>
                            <Switch
                                id="status"
                                checked={watch('status')}
                                onCheckedChange={val => setValue('status', val)}
                                className="scale-125 data-[state=checked]:bg-green-500"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                            <div>
                                <Label htmlFor="featured" className="block font-medium text-gray-700">
                                    Featured
                                </Label>
                                <p className="text-sm text-gray-500 mt-1">
                                    {watch('featured') ? 'Featured on homepage' : 'Regular post'}
                                </p>
                            </div>
                            <Switch
                                id="featured"
                                checked={watch('featured')}
                                onCheckedChange={val => setValue('featured', val)}
                                className="scale-125 data-[state=checked]:bg-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Categories & Tags Section */}
                <div className="space-y-6  bg-white border rounded-xl p-7">

                    <div className="flex items-center gap-3 mb-6 bg-purple-50 p-2 border rounded-lg">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-500 w-1 h-6 rounded-full"></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                Categories & Tags
                            </h2>
                            {/* <p className="text-sm text-gray-500 mt-1">Organize your content with labels</p> */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                        {/* Categories */}

                        <div className="space-y-3">
                            <Label>Categories *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div
                                        className={cn(
                                            "min-h-[44px] w-full flex flex-wrap items-center gap-1 px-3 py-2 border rounded-md cursor-pointer",
                                            errors.categories ? "border-red-500" : "border-gray-300"
                                        )}
                                    >
                                        {selectedCats.length === 0 ? (
                                            <span className="text-gray-400">Select categories...</span>
                                        ) : (
                                            selectedCats.map(id => {
                                                const cat = allCategories.find(c => c._id === id);
                                                return (
                                                    <span
                                                        key={id}
                                                        className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm"
                                                    >
                                                        {cat?.name}
                                                        <X
                                                            className="ml-1 cursor-pointer hover:text-indigo-600"
                                                            size={14}
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                toggleSelect('categories', id);
                                                            }}
                                                        />
                                                    </span>
                                                );
                                            })
                                        )}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search categories..." />
                                        <CommandList>
                                            <CommandEmpty>No categories found.</CommandEmpty>
                                            {allCategories.map(cat => (
                                                <CommandItem
                                                    key={cat._id}
                                                    onSelect={() => toggleSelect('categories', cat._id)}
                                                    className="cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCats.includes(cat._id)}
                                                        readOnly
                                                        className="mr-2 h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                                                    />
                                                    {cat.name}
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {errors.categories && (
                                <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="space-y-3">
                            <Label>Tags *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div
                                        className={cn(
                                            "min-h-[44px] w-full flex flex-wrap items-center gap-1 px-3 py-2 border rounded-md cursor-pointer",
                                            errors.tags ? "border-red-500" : "border-gray-300"
                                        )}
                                    >
                                        {selectedTags.length === 0 ? (
                                            <span className="text-gray-400">Select tags...</span>
                                        ) : (
                                            selectedTags.map(id => {
                                                const tag = allTags.find(t => t._id === id);
                                                return (
                                                    <span
                                                        key={id}
                                                        className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                                                    >
                                                        {tag?.name}
                                                        <X
                                                            className="ml-1 cursor-pointer hover:text-green-600"
                                                            size={14}
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                toggleSelect('tags', id);
                                                            }}
                                                        />
                                                    </span>
                                                );
                                            })
                                        )}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search tags..." />
                                        <CommandList>
                                            <CommandEmpty>No tags found.</CommandEmpty>
                                            {allTags.map(tag => (
                                                <CommandItem
                                                    key={tag._id}
                                                    onSelect={() => toggleSelect('tags', tag._id)}
                                                    className="cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTags.includes(tag._id)}
                                                        readOnly
                                                        className="mr-2 h-4 w-4 text-green-600 rounded focus:ring-green-500"
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
                </div>

                {/* Content Editor */}
                <div className="space-y-3  bg-white border rounded-xl p-7">
                    <div className="flex items-center gap-3 mb-6  bg-emerald-50 p-2 border rounded-lg">
                        <div className="bg-gradient-to-r from-teal-600 to-emerald-500 w-1 h-6 rounded-full"></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Content Editor
                            </h2>
                            {/* <p className="text-sm text-gray-500 mt-1">Craft your blog content</p> */}
                        </div>
                    </div>
                    <RTEField
                        setValue={setValue}
                        content={defaultValues?.content}
                        onBlur={() => trigger('content')}
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4 w-full flex items-end justify-end">
                    <LoaderButton
                        type="submit"
                        loading={isCreating || updateBlog.isPending}
                        className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-indigo-700 text-white font-medium rounded-sm"
                    >
                        {defaultValues?._id ? "Update Blog" : "Publish Blog"}
                    </LoaderButton>
                </div>
            </form>

            <ImageSelector
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                setImage={setImage}
            />
        </>
    );
};