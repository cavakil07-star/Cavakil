'use client'

import React, { useState } from 'react'
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog '
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TableSkeleton from '@/components/custom/TableSkeleton'
import ContactUsDetailsDialog from './ContactUsDetailsDialog'

function ContactUsTable({
    contacts,
    isLoading,
    error,
    page,
    pageCount,
    onPageChange,
    onDelete,
    isDeleting,
    deleteError,
    canDelete,
    canEdit,
    onlyAdmin,
    onToggleImportant,
    onChangeStatus
}) {

    const [deletingContactId, setDeletingContactId] = useState(null)

    const handleDeleteClick = (id) => {
        setDeletingContactId(id)
    }
    const handleDeleteConfirm = async () => {
        await onDelete(deletingContactId)
        setDeletingContactId(null)
    }

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'resolved':
                return 'bg-green-200 text-green-600';
            case 'reviewed':
                return 'bg-yellow-200 text-yellow-600';
            default:
                return 'bg-red-200 text-red-600';
        }
    };

    if (isLoading) {
        return <TableSkeleton
            rows={5}
            columns={4}
            showHeader={false}
            showPagination={true}
        />
    }

    if (error) return <p className='text-red-600'>Error: {error}</p>

    return (
        <section className="space-y-4">
            {/* Data Table */}
            <div className="overflow-hidden rounded-md border border-gray-200 shadow-md">
                <Table className={'bg-white'}>
                    <TableHeader className={'bg-gray-200'}>
                        <TableRow className={''}>
                            <TableHead className={'font-semibold text-center'}>#</TableHead>
                            <TableHead className={'font-semibold'}>Name</TableHead>
                            <TableHead className={'font-semibold'}>Email</TableHead>
                            <TableHead className={'font-semibold'}>Phone</TableHead>
                            <TableHead className={'font-semibold'}>Created At</TableHead>
                            <TableHead className={'font-semibold'}>Important</TableHead>
                            <TableHead className={'font-semibold'}>Status</TableHead>
                            <TableHead className={'font-semibold text-center'}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((item, idx) => (
                            <TableRow key={item._id}>
                                <TableCell className={'text-center'}>{(page - 1) * contacts.length + idx + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>
                                    {new Date(item.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                >
                                    <Switch
                                        checked={item.important}
                                        onCheckedChange={(val) => onToggleImportant(item._id, val)}
                                        disabled={!canEdit}
                                    />
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`${getStatusBadgeClass(item.status)} rounded-full px-3 capitalize text-xs py-1`}
                                    >
                                        {item.status}
                                    </span>
                                </TableCell>
                                <TableCell className="flex gap-2 items-center justify-center">
                                    <ContactUsDetailsDialog contact={item} />
                                    {canEdit &&
                                        <Select
                                            value={item.status}
                                            onValueChange={(newValue) => onChangeStatus(item._id, newValue)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="reviewed">Reviewed</SelectItem>
                                                    <SelectItem value="resolved">Resolved</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    }
                                    {canDelete &&
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => handleDeleteClick(item._id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash />
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm text-muted-foreground">
                    Page {page} of {pageCount}
                </p>
                <div className="space-x-2">
                    <Button
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        disabled={page >= pageCount}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Delete Confirmation */}
            <DeleteConfirmationDialog
                isOpen={!!deletingContactId}
                onOpenChange={(open) => !open && setDeletingContactId(null)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Contact Submission"
                description="Are you sure you want to delete this contact submission?"
            />
        </section>
    )
}

export default ContactUsTable
