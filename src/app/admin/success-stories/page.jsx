"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Button } from '@/components/ui/button'
import { useSuccessStories } from '@/hooks/useSuccessStories'
import React, { useState } from 'react'
import SuccessStoryDialog from './components/SuccessStoryDialog'
import { CirclePlus } from 'lucide-react'
import SuccessStoriesListView from './components/SuccessStoriesListView'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"
import NotAuthorizedPage from '@/components/notAuthorized'

function SuccessStoriesPage() {
    const [isVisible, setIsVisible] = useState('all')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const {
        successStoriesQuery,
        createSuccessStory,
        updateSuccessStory,
        patchSuccessStory,
        deleteSuccessStory,
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
            onlyAdmin
        } } = useSuccessStories({ isVisible, page, pageSize })

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState();

    const handleAddClick = () => {
        createSuccessStory.reset();
        updateSuccessStory.reset();
        deleteSuccessStory.reset();
        setSelectedStory(undefined);
        setIsDialogOpen(true);
    };

    const handleEditClick = (story) => {
        createSuccessStory.reset();
        updateSuccessStory.reset();
        deleteSuccessStory.reset();
        setSelectedStory(story);
        setIsDialogOpen(true);
    };

    if (!successStoriesQuery.isLoading && !canView) {
        return <NotAuthorizedPage />
    }

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Success Stories</h1>
            </div>

            <div className="flex justify-between items-center mb-4 mt-4">
                <div className='space-x-3 flex'>
                    <Button variant="outline">
                        Stories: {successStoriesQuery.data?.data?.length || 0}
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

            <SuccessStoriesListView
                stories={successStoriesQuery?.data?.data}
                onEdit={handleEditClick}
                isLoading={successStoriesQuery.isLoading}
                error={successStoriesQuery.error}
                onDelete={deleteSuccessStory.mutateAsync}
                isDeleting={deleteSuccessStory.isPending}
                deleteError={deleteSuccessStory.error}
                canEdit={canEdit}
                canDelete={canDelete}
            />

            <SuccessStoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                selectedStory={selectedStory}
                onCreate={createSuccessStory.mutateAsync}
                onUpdate={updateSuccessStory.mutateAsync}
                isSubmitting={createSuccessStory.isPending || updateSuccessStory.isPending}
                error={createSuccessStory.error?.message || updateSuccessStory.error?.message}
            />
        </InnerDashboardLayout>
    )
}

export default SuccessStoriesPage
