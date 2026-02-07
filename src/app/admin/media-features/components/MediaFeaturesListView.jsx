"use client"
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog ";
import Link from 'next/link';

export default function MediaFeaturesListView({ features, onEdit, isLoading, error, onDelete, isDeleting, canEdit, canDelete }) {
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
        return <div className="text-red-500 text-center py-8">Error loading media features: {error.message}</div>;
    }

    if (!features || features.length === 0) {
        return <div className="text-gray-500 text-center py-8">No media features found. Add your first press mention!</div>;
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="w-24">Link</TableHead>
                            <TableHead className="w-24">Visible</TableHead>
                            <TableHead className="w-24">Order</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {features.map((feature) => (
                            <TableRow key={feature._id}>
                                <TableCell className="font-medium max-w-[250px] truncate">{feature.title}</TableCell>
                                <TableCell className="text-sm text-gray-600">{feature.source}</TableCell>
                                <TableCell className="text-sm">{feature.date}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{feature.articleType}</Badge>
                                </TableCell>
                                <TableCell>
                                    {feature.articleUrl ? (
                                        <Link href={feature.articleUrl} target="_blank" rel="noopener noreferrer">
                                            <Button variant="ghost" size="sm">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <span className="text-gray-400 text-sm">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {feature.isVisible ? (
                                        <Eye className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </TableCell>
                                <TableCell>{feature.displayOrder}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {canEdit && (
                                            <Button variant="outline" size="sm" onClick={() => onEdit(feature)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {canDelete && (
                                            <Button variant="destructive" size="sm" onClick={() => setDeleteId(feature._id)}>
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
                title="Delete Media Feature"
                description="Are you sure you want to delete this media feature?"
            />
        </>
    );
}
