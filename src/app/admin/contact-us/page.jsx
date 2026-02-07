"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import { useContactUs } from '@/hooks/useContactUs'
import React, { useMemo, useState } from 'react'
import ContactUsTable from './components/ContactUsTable';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import NotAuthorizedPage from '@/components/notAuthorized';

function ContactUsPage() {

    // filters
    const [status, setStatus] = useState('all');
    const [important, setImportant] = useState('all');

    // pagination
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const {
        contactUsQuery,
        deleteContactUs,
        updateContactUs,
        permissions: { canView, canEdit, canDelete, onlyAdmin }
    } = useContactUs({ status, important, page, pageSize })

    // Memoize expensive computations
    const contactsData = useMemo(() => {
        return contactUsQuery?.data?.data || [];
    }, [contactUsQuery?.data?.data]);

    const totalCount = useMemo(() => {
        return contactUsQuery?.data?.totalCount || 0;
    }, [contactUsQuery.data]);

    const pageCount = Math.ceil(totalCount / pageSize)

    if (!canView) {
        return (
            <NotAuthorizedPage />
        );
    }

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Contact Us Submissions</h1>
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
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Important Select */}
                <div className="flex items-center space-x-2">
                    <Select value={important} onValueChange={(value) => { setImportant(value); setPage(1); }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Important" />
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

            <ContactUsTable
                contacts={contactsData}
                isLoading={contactUsQuery.isLoading}
                error={contactUsQuery.error?.message}
                page={page}
                pageCount={pageCount}
                onPageChange={setPage}
                onDelete={(id) => deleteContactUs.mutateAsync(id)}
                isDeleting={deleteContactUs.isPending}
                deleteError={deleteContactUs.error?.message}
                canDelete={canDelete}
                canEdit={canEdit}
                onlyAdmin={onlyAdmin}
                onToggleImportant={(id, val) => updateContactUs.mutate({ id, important: val })}
                onChangeStatus={(id, newStatus) => updateContactUs.mutate({ id, status: newStatus })}
            />
        </InnerDashboardLayout>
    )
}

export default ContactUsPage
