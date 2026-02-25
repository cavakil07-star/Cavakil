"use client"
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

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
            <div>{children}</div>
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
            <Toaster position="top-right" />
        </QueryClientProvider>
    )
}

export default layout