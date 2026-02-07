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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"

const iconTypes = ['TrendingUp', 'Users', 'Award', 'Building2', 'Shield', 'Briefcase'];

export default function SuccessStoryDialog({ open, onOpenChange, selectedStory, onCreate, onUpdate, isSubmitting, error }) {
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm()

    useEffect(() => {
        if (open) {
            if (selectedStory) {
                reset({
                    title: selectedStory.title,
                    company: selectedStory.company,
                    challenge: selectedStory.challenge,
                    result: selectedStory.result,
                    savings: selectedStory.savings,
                    iconType: selectedStory.iconType,
                    displayOrder: selectedStory.displayOrder || 0,
                    isVisible: selectedStory.isVisible,
                });
            } else {
                reset({
                    iconType: 'TrendingUp',
                    displayOrder: 0,
                    isVisible: true,
                });
            }
        }
    }, [open, selectedStory, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                displayOrder: parseInt(data.displayOrder) || 0,
            };

            if (selectedStory?._id) {
                await onUpdate({ id: selectedStory._id, data: payload });
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
                        {selectedStory ? "Edit Success Story" : "Add Success Story"}
                    </DialogTitle>
                    <DialogDescription>
                        Add client success stories to showcase your impact.
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
                                    placeholder="Startup Success Story"
                                />
                                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                            </div>
                        </div>

                        {/* Company */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="company" className="text-right mt-2">
                                Company<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="company"
                                    {...register("company", { required: "Company is required" })}
                                    className={clsx("w-full", { "border-red-500": errors.company })}
                                    placeholder="TechVenture Pvt Ltd"
                                />
                                {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>}
                            </div>
                        </div>

                        {/* Icon Type */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="iconType" className="text-right mt-2">
                                Icon<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={watch("iconType")}
                                    onValueChange={(value) => setValue("iconType", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select icon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {iconTypes.map((icon) => (
                                            <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Challenge */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="challenge" className="text-right mt-2">
                                Challenge<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Textarea
                                    id="challenge"
                                    {...register("challenge", { required: "Challenge is required" })}
                                    className={clsx("w-full", { "border-red-500": errors.challenge })}
                                    placeholder="What was the client's challenge?"
                                    rows={2}
                                />
                                {errors.challenge && <p className="text-sm text-red-500 mt-1">{errors.challenge.message}</p>}
                            </div>
                        </div>

                        {/* Result */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="result" className="text-right mt-2">
                                Result<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Textarea
                                    id="result"
                                    {...register("result", { required: "Result is required" })}
                                    className={clsx("w-full", { "border-red-500": errors.result })}
                                    placeholder="What was the outcome?"
                                    rows={2}
                                />
                                {errors.result && <p className="text-sm text-red-500 mt-1">{errors.result.message}</p>}
                            </div>
                        </div>

                        {/* Savings */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="savings" className="text-right mt-2">
                                Savings<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="savings"
                                    {...register("savings", { required: "Savings is required" })}
                                    className={clsx("w-full", { "border-red-500": errors.savings })}
                                    placeholder="₹50,000 saved"
                                />
                                {errors.savings && <p className="text-sm text-red-500 mt-1">{errors.savings.message}</p>}
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
                            {selectedStory ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
