"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useMediaFeatures = ({ isVisible = 'all', page = 1, pageSize = 10 } = {}) => {
    const queryClient = useQueryClient()
    const { checkView, checkAdd, checkEdit, checkDelete, onlyAdmin } = usePermissions()

    // Permissions
    const canView = checkView(Resources.MEDIA_FEATURES)
    const canAdd = checkAdd(Resources.MEDIA_FEATURES)
    const canEdit = checkEdit(Resources.MEDIA_FEATURES)
    const canDelete = checkDelete(Resources.MEDIA_FEATURES)

    const buildQueryString = () => {
        const queryParams = [];

        if (isVisible !== 'all') queryParams.push(`isVisible=${isVisible === 'isVisible'}`);

        queryParams.push(`page=${page}`);
        queryParams.push(`limit=${pageSize}`);

        return queryParams.length ? `?${queryParams.join('&')}` : '';
    };

    const mediaFeaturesQuery = useQuery({
        queryKey: ['mediaFeatures', isVisible, page, pageSize],
        queryFn: async () => {
            if (!canView) {
                throw new Error('You do not have permission to view media features');
            }

            const queryString = buildQueryString();
            const response = await api.get(`/media-features${queryString}`);
            return response;
        },
        enabled: canView,
        staleTime: 1000 * 60 * 5,
        retry: 2,
        onError: (err) => {
            console.error('Media features fetch error:', err);
            toast.error(err.message || 'Failed to fetch media features');
        },
    });

    const createMediaFeature = useMutation({
        mutationFn: ({ data }) => api.post('/media-features', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['mediaFeatures']);
            toast.success('Media feature created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create media feature');
        }
    });

    const updateMediaFeature = useMutation({
        mutationFn: ({ id, data }) => api.put(`/media-features/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['mediaFeatures']);
            toast.success('Media feature updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update media feature');
        }
    });

    const patchMediaFeature = useMutation({
        mutationFn: ({ id, ...updates }) => {
            return api.patch(`/media-features/${id}`, updates);
        },
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['mediaFeatures']);
            toast.success('Media feature updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update media feature');
        },
    });

    const deleteMediaFeature = useMutation({
        mutationFn: (id) => {
            return api.delete(`/media-features/${id}`);
        },
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['mediaFeatures']);
            toast.success('Media feature deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete media feature');
        },
    });

    return {
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
        }
    };
};
