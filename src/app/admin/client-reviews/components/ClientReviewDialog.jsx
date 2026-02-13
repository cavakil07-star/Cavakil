import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
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
} from "@/components/ui/select";

const platforms = ['Google Reviews', 'Trustpilot', 'Facebook', 'LinkedIn', 'Other'];

export default function ClientReviewDialog({
  open,
  onOpenChange,
  selectedReview,
  onCreate,
  onUpdate,
  isSubmitting,
  image,
  setImage
}) {
  const { register, handleSubmit, reset, control, formState: { errors }, watch, setValue } = useForm();
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (selectedReview) {
        reset(selectedReview);
      } else {
        reset({ rating: 5, platform: 'Google Reviews', displayOrder: 0, isVisible: true });
      }
    }
  }, [open, selectedReview, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      rating: parseInt(data.rating),
      displayOrder: parseInt(data.displayOrder) || 0,
      image
    };

    if (selectedReview) await onUpdate(payload);
    else await onCreate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{selectedReview ? 'Update Review' : 'Create Review'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">Name *</Label>
            <div className="col-span-3">
              <Input {...register("name", { required: "Name is required" })} className={clsx({ "border-red-500": errors.name })} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
          </div>

          {/* Title */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">Title *</Label>
            <div className="col-span-3">
              <Input {...register("title", { required: "Title is required" })} className={clsx({ "border-red-500": errors.title })} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>
          </div>

          {/* Platform */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">Platform *</Label>
            <div className="col-span-3">
              <Controller
                name="platform"
                control={control}
                rules={{ required: "Platform is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">Rating *</Label>
            <div className="col-span-3">
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Select value={String(field.value)} onValueChange={(v)=>field.onChange(Number(v))}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[5,4,3,2,1].map(r => <SelectItem key={r} value={String(r)}>{r} Star</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Review */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">Review *</Label>
            <div className="col-span-3">
              <Textarea {...register("review", { required: "Review is required" })} />
            </div>
          </div>

          {/* Image */}
          <div className="text-center space-y-2">
            {image && <Image src={image} alt="avatar" width={96} height={96} className="rounded-full mx-auto" />}
            <Button type="button" variant="outline" onClick={()=>setIsImageDialogOpen(true)}>Select Image</Button>
          </div>

          {/* Visibility */}
          <div className="flex items-center justify-between">
            <Label>Visible</Label>
            <Switch checked={watch('isVisible')} onCheckedChange={(v)=>setValue('isVisible',v)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={()=>onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {selectedReview ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>

        <ImageSelector open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen} onSelect={(url)=>{setImage(url);setIsImageDialogOpen(false);}} />
      </DialogContent>
    </Dialog>
  );
}
