"use client"
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog ";
import Image from 'next/image';

export default function ClientReviewsListView({ reviews, onEdit, isLoading, error, onDelete, isDeleting, canEdit, canDelete }) {
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = async () => {
        if (deleteId) {
            await onDelete(deleteId);
            setDeleteId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">Error loading reviews: {error.message}</div>;
    }

    if (!reviews || reviews.length === 0) {
        return <div className="text-gray-500 text-center py-8">No client reviews found. Add your first review!</div>;
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Platform</TableHead>
                            <TableHead className="w-24">Visible</TableHead>
                            <TableHead className="w-24">Order</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.map((review) => (
                            <TableRow key={review._id}>
                                <TableCell>
                                    {review.avatar ? (
                                        <Image
                                            src={review.avatar}
                                            alt={review.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                            {review.name?.charAt(0)}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">{review.name}</TableCell>
                                <TableCell className="text-sm text-gray-600 max-w-[200px] truncate">{review.title}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{review.platform}</Badge>
                                </TableCell>
                                <TableCell>
                                    {review.isVisible ? (
                                        <Eye className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </TableCell>
                                <TableCell>{review.displayOrder}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {canEdit && (
                                            <Button variant="outline" size="sm" onClick={() => onEdit(review)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {canDelete && (
                                            <Button variant="destructive" size="sm" onClick={() => setDeleteId(review._id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DeleteConfirmationDialog
                isOpen={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Client Review"
                description="Are you sure you want to delete this client review?"
            />
        </>
    );
}
