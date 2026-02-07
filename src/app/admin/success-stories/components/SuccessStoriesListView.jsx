"use client"
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, EyeOff, TrendingUp, Users, Award, Building2, Shield, Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog ";

const iconMap = {
    TrendingUp: TrendingUp,
    Users: Users,
    Award: Award,
    Building2: Building2,
    Shield: Shield,
    Briefcase: Briefcase,
};

export default function SuccessStoriesListView({ stories, onEdit, isLoading, error, onDelete, isDeleting, canEdit, canDelete }) {
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
        return <div className="text-red-500 text-center py-8">Error loading stories: {error.message}</div>;
    }

    if (!stories || stories.length === 0) {
        return <div className="text-gray-500 text-center py-8">No success stories found. Add your first story!</div>;
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Icon</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Savings</TableHead>
                            <TableHead className="w-24">Visible</TableHead>
                            <TableHead className="w-24">Order</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stories.map((story) => {
                            const IconComponent = iconMap[story.iconType] || TrendingUp;
                            return (
                                <TableRow key={story._id}>
                                    <TableCell>
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <IconComponent className="h-5 w-5 text-blue-600" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{story.title}</TableCell>
                                    <TableCell className="text-sm text-gray-600">{story.company}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                                            {story.savings}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {story.isVisible ? (
                                            <Eye className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        )}
                                    </TableCell>
                                    <TableCell>{story.displayOrder}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {canEdit && (
                                                <Button variant="outline" size="sm" onClick={() => onEdit(story)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {canDelete && (
                                                <Button variant="destructive" size="sm" onClick={() => setDeleteId(story._id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <DeleteConfirmationDialog
                isOpen={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Success Story"
                description="Are you sure you want to delete this success story?"
            />
        </>
    );
}
