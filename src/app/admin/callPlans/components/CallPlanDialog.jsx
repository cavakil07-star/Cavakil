import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

// Zod schema for CallPlan
const callPlanSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
    price: z
        .number({ invalid_type_error: "Price must be a number" })
        .min(0, "Price must be at least 0"),
    time: z.string().min(1, "Time is required"),
    instructions: z
        .array(z.string().min(1, "Instruction cannot be empty"))
        .min(1, "At least one instruction is required"),
});

export default function CallPlanDialog({
    open,
    onOpenChange,
    selectedPlan,
    onCreate,
    onUpdate,
    isSubmitting,
    error,
}) {
    // Initialize form
    const form = useForm({
        resolver: zodResolver(callPlanSchema),
        defaultValues: {
            name: "",
            price: "",
            time: "",
            instructions: [""],
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "instructions",
        control: form.control,
    });

    // Reset form when dialog opens or selectedPlan changes
    useEffect(() => {
        if (open) {
            if (selectedPlan) {
                form.reset({
                    name: selectedPlan.name,
                    price: selectedPlan.price,
                    time: selectedPlan.time,
                    instructions: selectedPlan.instructions || [""],
                });
            } else {
                form.reset({
                    name: "",
                    price: "",
                    time: "",
                    instructions: [""],
                });
            }
        }
    }, [open, selectedPlan, form]);

    const onSubmit = async (values) => {
        try {
            if (selectedPlan?._id) {
                await onUpdate({ id: selectedPlan._id, data: values });
            } else {
                await onCreate({ data: values });
            }
            onOpenChange(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {selectedPlan ? "Edit Call Plan" : "Add Call Plan"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Plan Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Time */}
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 2 hours" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Instructions Array */}
                        <div>
                            <Label className="block mb-2">Instructions</Label>
                            {fields.map((item, index) => (
                                <div className="flex items-center mb-2" key={item.id}>
                                    <FormControl>
                                        <Input
                                            placeholder={`Step ${index + 1}`}
                                            {...form.register(`instructions.${index}`)}
                                        />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="ml-2"
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append("")}
                            >
                                Add Instruction
                            </Button>
                            <FormMessage match="instructions" />
                        </div>

                        {error && (
                            <p className="text-red-600 text-sm">Error: {error}</p>
                        )}

                        <DialogFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="animate-spin mr-2" />}
                                {selectedPlan ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
