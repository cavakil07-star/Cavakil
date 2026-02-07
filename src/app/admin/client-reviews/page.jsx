"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Button } from '@/components/ui/button'
import { useClientReviews } from '@/hooks/useClientReviews'
import React, { useState } from 'react'
import ClientReviewDialog from './components/ClientReviewDialog'
import { CirclePlus } from 'lucide-react'
import ClientReviewsListView from './components/ClientReviewsListView'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"
import NotAuthorizedPage from '@/components/notAuthorized'

function ClientReviewsPage() {
    const [isVisible, setIsVisible] = useState('all')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const {
        clientReviewsQuery,
        createClientReview,
        updateClientReview,
        patchClientReview,
        deleteClientReview,
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
            onlyAdmin
        } } = useClientReviews({ isVisible, page, pageSize })

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState();
    const [image, setImage] = useState(null)

    const handleAddClick = () => {
        createClientReview.reset();
        updateClientReview.reset();
        deleteClientReview.reset();
        setImage(null)
        setSelectedReview(undefined);
        setIsDialogOpen(true);
    };

    const handleEditClick = (review) => {
        createClientReview.reset();
        updateClientReview.reset();
        deleteClientReview.reset();
        setImage(review.avatar)
        setSelectedReview(review);
        setIsDialogOpen(true);
    };

    if (!clientReviewsQuery.isLoading && !canView) {
        return <NotAuthorizedPage />
    }

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Client Reviews</h1>
            </div>

            <div className="flex justify-between items-center mb-4 mt-4">
                <div className='space-x-3 flex'>
                    <Button variant="outline">
                        Reviews: {clientReviewsQuery.data?.data?.length || 0}
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

            <ClientReviewsListView
                reviews={clientReviewsQuery?.data?.data}
                onEdit={handleEditClick}
                isLoading={clientReviewsQuery.isLoading}
                error={clientReviewsQuery.error}
                onDelete={deleteClientReview.mutateAsync}
                isDeleting={deleteClientReview.isPending}
                deleteError={deleteClientReview.error}
                canEdit={canEdit}
                canDelete={canDelete}
            />

            <ClientReviewDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                selectedReview={selectedReview}
                onCreate={createClientReview.mutateAsync}
                onUpdate={updateClientReview.mutateAsync}
                isSubmitting={createClientReview.isPending || updateClientReview.isPending}
                error={createClientReview.error?.message || updateClientReview.error?.message}
                image={image}
                setImage={setImage}
            />
        </InnerDashboardLayout>
    )
}

export default ClientReviewsPage
