"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useSuccessStories = ({ isVisible = 'all', page = 1, pageSize = 10 } = {}) => {
    const queryClient = useQueryClient()
    const { checkView, checkAdd, checkEdit, checkDelete, onlyAdmin } = usePermissions()

    // Permissions
    const canView = checkView(Resources.SUCCESS_STORIES)
    const canAdd = checkAdd(Resources.SUCCESS_STORIES)
    const canEdit = checkEdit(Resources.SUCCESS_STORIES)
    const canDelete = checkDelete(Resources.SUCCESS_STORIES)

    const buildQueryString = () => {
        const queryParams = [];

        if (isVisible !== 'all') queryParams.push(`isVisible=${isVisible === 'isVisible'}`);

        queryParams.push(`page=${page}`);
        queryParams.push(`limit=${pageSize}`);

        return queryParams.length ? `?${queryParams.join('&')}` : '';
    };

    const successStoriesQuery = useQuery({
        queryKey: ['successStories', isVisible, page, pageSize],
        queryFn: async () => {
            if (!canView) {
                throw new Error('You do not have permission to view success stories');
            }

            const queryString = buildQueryString();
            const response = await api.get(`/success-stories${queryString}`);
            return response;
        },
        enabled: canView,
        staleTime: 1000 * 60 * 5,
        retry: 2,
        onError: (err) => {
            console.error('Success stories fetch error:', err);
            toast.error(err.message || 'Failed to fetch success stories');
        },
    });

    const createSuccessStory = useMutation({
        mutationFn: ({ data }) => api.post('/success-stories', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['successStories']);
            toast.success('Success story created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create success story');
        }
    });

    const updateSuccessStory = useMutation({
        mutationFn: ({ id, data }) => api.put(`/success-stories/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['successStories']);
            toast.success('Success story updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update success story');
        }
    });

    const patchSuccessStory = useMutation({
        mutationFn: ({ id, ...updates }) => {
            return api.patch(`/success-stories/${id}`, updates);
        },
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['successStories']);
            toast.success('Success story updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update success story');
        },
    });

    const deleteSuccessStory = useMutation({
        mutationFn: (id) => {
            return api.delete(`/success-stories/${id}`);
        },
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['successStories']);
            toast.success('Success story deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete success story');
        },
    });

    return {
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
        }
    };
};
