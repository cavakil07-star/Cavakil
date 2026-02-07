"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useContactUs = ({ status, important, page, pageSize }) => {
    const queryClient = useQueryClient()
    const { checkView, checkEdit, checkDelete, onlyAdmin } = usePermissions()

    // Permissions
    const canView = checkView(Resources.CONTACT_US)
    const canEdit = checkEdit(Resources.CONTACT_US)
    const canDelete = checkDelete(Resources.CONTACT_US)

    // Build query parameters correctly
    const buildQueryString = () => {
        const queryParams = [];

        if (status !== 'all') {
            queryParams.push(`status=${status}`);
        }

        if (important !== 'all') {
            queryParams.push(`important=${important === 'important' ? 'true' : 'false'}`);
        }

        queryParams.push(`page=${page}`);
        queryParams.push(`limit=${pageSize}`);

        return queryParams.length ? `?${queryParams.join('&')}` : '';
    };

    const contactUsQuery = useQuery({
        queryKey: ['contactUs', status, important, page, pageSize],
        queryFn: async () => {
            if (!canView) {
                throw new Error('You do not have permission to view contact submissions');
            }

            const queryString = buildQueryString();
            const response = await api.get(`/contact-us${queryString}`);
            return response;
        },
        enabled: canView,
        staleTime: 1000 * 10,
        retry: 2,
        onError: (err) => {
            console.error('Contact Us fetch error:', err);
            toast.error(err.message || 'Failed to fetch contact submissions');
        },
    });

    const updateContactUs = useMutation({
        mutationFn: ({ id, status: newStatus, important: newImportant }) => {
            return api.patch(`/contact-us/${id}`, {
                id,
                ...(newStatus !== undefined ? { status: newStatus } : {}),
                ...(newImportant !== undefined ? { important: newImportant } : {}),
            });
        },
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['contactUs']);
            toast.success('Contact submission updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update contact submission');
        },
    });

    const deleteContactUs = useMutation({
        mutationFn: (id) => {
            return api.delete(`/contact-us/${id}`);
        },
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['contactUs']);
            toast.success('Contact submission deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete contact submission');
        },
    });

    return {
        contactUsQuery,
        updateContactUs,
        deleteContactUs,
        permissions: { canView, canEdit, canDelete, onlyAdmin }
    };
};
