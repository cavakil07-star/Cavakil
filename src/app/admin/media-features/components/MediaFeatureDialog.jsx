import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Loader2 } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"

const articleTypes = ['Feature Article', 'Press Release', 'Startup Feature', 'Interview', 'News', 'Other'];

export default function MediaFeatureDialog({ open, onOpenChange, selectedFeature, onCreate, onUpdate, isSubmitting, error }) {
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm()

    useEffect(() => {
        if (open) {
            if (selectedFeature) {
                reset({
                    title: selectedFeature.title,
                    source: selectedFeature.source,
                    date: selectedFeature.date,
                    articleType: selectedFeature.articleType,
                    articleUrl: selectedFeature.articleUrl || '',
                    displayOrder: selectedFeature.displayOrder || 0,
                    isVisible: selectedFeature.isVisible,
                });
            } else {
                reset({
                    articleType: 'Feature Article',
                    displayOrder: 0,
                    isVisible: true,
                    articleUrl: '',
                });
            }
        }
    }, [open, selectedFeature, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                displayOrder: parseInt(data.displayOrder) || 0,
            };

            if (selectedFeature?._id) {
                await onUpdate({ id: selectedFeature._id, data: payload });
                onOpenChange(false);
            } else {
                await onCreate({ data: payload });
                onOpenChange(false);
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
                        {selectedFeature ? "Edit Media Feature" : "Add Media Feature"}
                    </DialogTitle>
                    <DialogDescription>
                        Add press mentions and media features to showcase your coverage.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">

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
                                    placeholder="Leading LegalTech Innovation in India"
                                />
                                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                            </div>
                        </div>

                        {/* Source */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="source" className="text-right mt-2">
                                Source<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="source"
                                    {...register("source", { required: "Source is required" })}
                                    className={clsx("w-full", { "border-red-500": errors.source })}
                                    placeholder="Economic Times"
                                />
                                {errors.source && <p className="text-sm text-red-500 mt-1">{errors.source.message}</p>}
                            </div>
                        </div>

                        {/* Date */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="date" className="text-right mt-2">
                                Date<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="date"
                                    {...register("date", { required: "Date is required" })}
                                    className={clsx("w-full", { "border-red-500": errors.date })}
                                    placeholder="Dec 2023"
                                />
                                {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
                            </div>
                        </div>

                        {/* Article Type */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="articleType" className="text-right mt-2">
                                Type<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={watch("articleType")}
                                    onValueChange={(value) => setValue("articleType", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {articleTypes.map((type) => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Article URL */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="articleUrl" className="text-right mt-2">
                                Article URL
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="articleUrl"
                                    {...register("articleUrl")}
                                    className="w-full"
                                    placeholder="https://example.com/article"
                                />
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
                            {selectedFeature ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
