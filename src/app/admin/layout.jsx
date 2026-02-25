"use client"
// app/admin/layout.jsx

import React, { useState } from 'react'
import LayoutDashboard from '@/components/dashboard/LayoutDashboard'
import { ADMIN_SIDEBAR_LINKS } from '@/lib/constants/sidebarLinks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

function layout({ children }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute cache
                retry: false // Auto-retry disable
            }
        }
    }))

    return (
        <QueryClientProvider client={queryClient}>
            <LayoutDashboard sidebarLinks={ADMIN_SIDEBAR_LINKS}>
                {children}
            </LayoutDashboard>

            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
            <Toaster position="top-right" />
        </QueryClientProvider>
    )
}

export default layout
