"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import TTLPlans from './TTLPlans'

function TTLPlansMain({ plans }) {
    return (
        <TTLPlans plans={plans} />
    )
}

export default TTLPlansMain