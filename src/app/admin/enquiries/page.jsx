"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import { useEnquiries } from '@/hooks/useEnquiries'
import React, { useMemo, useState } from 'react'
import EnquiryTable from './components/EnquiryTable';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import NotAuthorizedPage from '@/components/notAuthorized';

function page() {

    // filters
    const [status, setStatus] = useState('all');
    const [important, setImportant] = useState('all');

    // pagination
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const {
        enquiriesQuery,
        deleteEnquiry,
        updateEnquiry,
        permissions: { canView, canEdit, canDelete, onlyAdmin }
    } = useEnquiries({ status, important, page, pageSize })

    // Memoize expensive computations
    const enquiriesData = useMemo(() => {
        return enquiriesQuery?.data?.data || [];
    }, [enquiriesQuery?.data?.data]);

    const totalCount = useMemo(() => {
        return enquiriesQuery?.data?.totalCount || 0;
    }, [enquiriesQuery.data]);

    const pageCount = Math.ceil(totalCount / pageSize)

    if (!canView) {
        return (
            <NotAuthorizedPage />
        );
    }

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Enquiries</h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Status Select */}
                <div className="flex items-center space-x-2">
                    <Select value={status} onValueChange={(value) => { setStatus(value); setPage(1); }}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Featured Select */}
                <div className="flex items-center space-x-2">
                    <Select value={important} onValueChange={(value) => { setImportant(value); setPage(1); }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Featured" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="important">Important</SelectItem>
                            <SelectItem value="not-important">Not Important</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Page size selector */}
                <Select
                    value={pageSize.toString()}
                    onValueChange={(v) => {
                        setPageSize(+v)
                        setPage(1)
                    }}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                        {[1, 2, 5, 10, 25, 50, 100].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                                {n} / page
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <EnquiryTable
                enquiries={enquiriesData}
                canDelete={canDelete}
                isDeleting={deleteEnquiry.isPending}
                deleteError={deleteEnquiry.error}
                canEdit={canEdit}
                error={enquiriesQuery.error}
                isLoading={enquiriesQuery.isPending}
                onDelete={deleteEnquiry.mutateAsync}
                onPageChange={setPage}
                onlyAdmin={onlyAdmin}
                page={page}
                pageCount={pageCount}
                onToggleImportant={(id, newVal) =>
                    updateEnquiry.mutateAsync({ id, important: newVal })
                }
                onChangeStatus={(id, newStatus) =>
                    updateEnquiry.mutate({ id, status: newStatus })
                }
            />

        </InnerDashboardLayout>
    )
}

export default page