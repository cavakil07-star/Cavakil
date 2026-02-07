"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useClientReviews = ({ isVisible = 'all', page = 1, pageSize = 10 } = {}) => {
    const queryClient = useQueryClient()
    const { checkView, checkAdd, checkEdit, checkDelete, onlyAdmin } = usePermissions()

    // Permissions
    const canView = checkView(Resources.CLIENT_REVIEWS)
    const canAdd = checkAdd(Resources.CLIENT_REVIEWS)
    const canEdit = checkEdit(Resources.CLIENT_REVIEWS)
    const canDelete = checkDelete(Resources.CLIENT_REVIEWS)

    const buildQueryString = () => {
        const queryParams = [];

        if (isVisible !== 'all') queryParams.push(`isVisible=${isVisible === 'isVisible'}`);

        queryParams.push(`page=${page}`);
        queryParams.push(`limit=${pageSize}`);

        return queryParams.length ? `?${queryParams.join('&')}` : '';
    };

    const clientReviewsQuery = useQuery({
        queryKey: ['clientReviews', isVisible, page, pageSize],
        queryFn: async () => {
            if (!canView) {
                throw new Error('You do not have permission to view client reviews');
            }

            const queryString = buildQueryString();
            const response = await api.get(`/client-reviews${queryString}`);
            return response;
        },
        enabled: canView,
        staleTime: 1000 * 60 * 5,
        retry: 2,
        onError: (err) => {
            console.error('Client reviews fetch error:', err);
            toast.error(err.message || 'Failed to fetch client reviews');
        },
    });

    const createClientReview = useMutation({
        mutationFn: ({ data }) => api.post('/client-reviews', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['clientReviews']);
            toast.success('Client review created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create client review');
        }
    });

    const updateClientReview = useMutation({
        mutationFn: ({ id, data }) => api.put(`/client-reviews/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['clientReviews']);
            toast.success('Client review updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update client review');
        }
    });

    const patchClientReview = useMutation({
        mutationFn: ({ id, ...updates }) => {
            return api.patch(`/client-reviews/${id}`, updates);
        },
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['clientReviews']);
            toast.success('Client review updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update client review');
        },
    });

    const deleteClientReview = useMutation({
        mutationFn: (id) => {
            return api.delete(`/client-reviews/${id}`);
        },
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['clientReviews']);
            toast.success('Client review deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete client review');
        },
    });

    return {
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
        }
    };
};
