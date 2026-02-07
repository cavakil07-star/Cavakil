"use client"
import React from 'react'
import SubServiceForm from './SubServiceForm'
import { SessionProvider } from 'next-auth/react'

function SubServiceClient({ subService }) {
    return (
        <SessionProvider>
            <div>
                {/* Dynamic Form */}
                <SubServiceForm
                    subService={subService}
                    requiredDetails={subService.requiredDetails}
                    requiredDocuments={subService.requiredDocuments}
                    actualPrice={subService.actualPrice}
                    discountedPrice={subService.discountedPrice}
                    isDocumentsRequired={subService.isDocumentsRequired}
                    isDetailsRequired={subService.isDetailsRequired}
                    benefits={subService.benefits}
                />
            </div>
        </SessionProvider>
    )
}

export default SubServiceClient