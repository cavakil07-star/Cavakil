"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Button } from '@/components/ui/button'
import { useMediaFeatures } from '@/hooks/useMediaFeatures'
import React, { useState } from 'react'
import MediaFeatureDialog from './components/MediaFeatureDialog'
import { CirclePlus } from 'lucide-react'
import MediaFeaturesListView from './components/MediaFeaturesListView'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"
import NotAuthorizedPage from '@/components/notAuthorized'

function MediaFeaturesPage() {
    const [isVisible, setIsVisible] = useState('all')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const {
        mediaFeaturesQuery,
        createMediaFeature,
        updateMediaFeature,
        patchMediaFeature,
        deleteMediaFeature,
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
            onlyAdmin
        } } = useMediaFeatures({ isVisible, page, pageSize })

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState();

    const handleAddClick = () => {
        createMediaFeature.reset();
        updateMediaFeature.reset();
        deleteMediaFeature.reset();
        setSelectedFeature(undefined);
        setIsDialogOpen(true);
    };

    const handleEditClick = (feature) => {
        createMediaFeature.reset();
        updateMediaFeature.reset();
        deleteMediaFeature.reset();
        setSelectedFeature(feature);
        setIsDialogOpen(true);
    };

    if (!mediaFeaturesQuery.isLoading && !canView) {
        return <NotAuthorizedPage />
    }

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Media Features</h1>
            </div>

            <div className="flex justify-between items-center mb-4 mt-4">
                <div className='space-x-3 flex'>
                    <Button variant="outline">
                        Features: {mediaFeaturesQuery.data?.data?.length || 0}
                    </Button>

                    <Select value={isVisible} onValueChange={(value) => { setIsVisible(value); setPage(1); }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="isVisible">Visible</SelectItem>
                            <SelectItem value="not-visible">Not Visible</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {canAdd &&
                    <Button onClick={handleAddClick}>
                        <CirclePlus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                }
            </div>

            <MediaFeaturesListView
                features={mediaFeaturesQuery?.data?.data}
                onEdit={handleEditClick}
                isLoading={mediaFeaturesQuery.isLoading}
                error={mediaFeaturesQuery.error}
                onDelete={deleteMediaFeature.mutateAsync}
                isDeleting={deleteMediaFeature.isPending}
                deleteError={deleteMediaFeature.error}
                canEdit={canEdit}
                canDelete={canDelete}
            />

            <MediaFeatureDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                selectedFeature={selectedFeature}
                onCreate={createMediaFeature.mutateAsync}
                onUpdate={updateMediaFeature.mutateAsync}
                isSubmitting={createMediaFeature.isPending || updateMediaFeature.isPending}
                error={createMediaFeature.error?.message || updateMediaFeature.error?.message}
            />
        </InnerDashboardLayout>
    )
}

export default MediaFeaturesPage
