import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Loader2 } from 'lucide-react';
import ImageSelector from "@/components/ImageSelector";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"

const platforms = ['Google Reviews', 'Trustpilot', 'Facebook', 'LinkedIn', 'Other'];

export default function ClientReviewDialog({ open, onOpenChange, selectedReview, onCreate, onUpdate, isSubmitting, error, image, setImage }) {
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm()
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

    useEffect(() => {
        if (open) {
            if (selectedReview) {
                reset({
                    name: selectedReview.name,
                    title: selectedReview.title,
                    rating: selectedReview.rating,
                    review: selectedReview.review,
                    platform: selectedReview.platform,
                    displayOrder: selectedReview.displayOrder || 0,
                    isVisible: selectedReview.isVisible,
                });
            } else {
                reset({
                    rating: 5,
                    platform: 'Google Reviews',
                    displayOrder: 0,
                    isVisible: true,
                });
            }
        }
    }, [open, selectedReview, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                rating: parseInt(data.rating),
                displayOrder: parseInt(data.displayOrder) || 0,
                avatar: image || ''
            };

            if (selectedReview?._id) {
                await onUpdate({ id: selectedReview._id, data: payload });
                onOpenChange(false);
                setImage(null);
            } else {
                await onCreate({ data: payload });
                onOpenChange(false);
                setImage(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {selectedReview ? "Edit Client Review" : "Add Client Review"}
                    </DialogTitle>
                    <DialogDescription>
                        Add verified client reviews to display on your website.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">

                        {/* Avatar */}
                        {!image && (
                            <div
                                className="flex-1 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer h-32 mb-4"
                                onClick={() => setIsImageDialogOpen(true)}
                            >
                                <span className="text-gray-500">Click to select client avatar</span>
                            </div>
                        )}
                        {image && (
                            <div className="h-full w-full border rounded-lg p-2">
                                <Image
                                    height={100}
                                    width={100}
                                    quality={100}
                                    src={image}
                                    alt="Client avatar"
                                    className="w-24 h-24 object-cover rounded-full mx-auto"
                                />
                            </div>
                        )}
                        {image && (
                            <Button type='button' variant="outline" onClick={() => setIsImageDialogOpen(true)}>
                                Change Image
                            </Button>
                        )}

                        {/* Name */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="name" className="text-right mt-2">
                                Name<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="name"
                                    {...register("name", { required: "Name is required" })}
                                    className={clsx("w-full", { "border-red-500": errors.name })}
                                    placeholder="Rajesh Kumar"
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="title" className="text-right mt-2">
                                Title<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="title"
                                    {...register("title", { required: "Title is required" })}
                                    className={clsx("w-full", { "border-red-500": errors.title })}
                                    placeholder="CEO, TechStartup Solutions"
                                />
                                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="rating" className="text-right mt-2">
                                Rating<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={watch("rating")?.toString()}
                                    onValueChange={(value) => setValue("rating", parseInt(value))}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[5, 4, 3, 2, 1].map((r) => (
                                            <SelectItem key={r} value={r.toString()}>
                                                {r} Star{r > 1 ? 's' : ''}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Platform */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="platform" className="text-right mt-2">
                                Platform<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={watch("platform")}
                                    onValueChange={(value) => setValue("platform", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select platform" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {platforms.map((p) => (
                                            <SelectItem key={p} value={p}>{p}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Review */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="review" className="text-right mt-2">
                                Review<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Textarea
                                    id="review"
                                    {...register("review", { required: "Review is required" })}
                                    className={clsx("w-full", { "border-red-500": errors.review })}
                                    placeholder="Write the client's review here..."
                                    rows={4}
                                />
                                {errors.review && <p className="text-sm text-red-500 mt-1">{errors.review.message}</p>}
                            </div>
                        </div>

                        {/* Display Order */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="displayOrder" className="text-right mt-2">
                                Display Order
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="displayOrder"
                                    type="number"
                                    {...register("displayOrder")}
                                    className="w-full"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Visibility */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="isVisible" className="text-right">
                                Visible
                            </Label>
                            <div className="col-span-3">
                                <Switch
                                    id="isVisible"
                                    checked={watch("isVisible")}
                                    onCheckedChange={(checked) => setValue("isVisible", checked)}
                                />
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {selectedReview ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>

                <ImageSelector
                    open={isImageDialogOpen}
                    onOpenChange={setIsImageDialogOpen}
                    onSelect={(url) => {
                        setImage(url);
                        setIsImageDialogOpen(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
