import Image from 'next/image'
import React, { Suspense } from 'react'
import { LoginForm } from './login-form'

export const metadata = {
  title: "CA Vakil",
};

function page() {
    return (
        <div className="grid min-h-svh md:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <Image
                            src={'/logo.png'}
                            height={500}
                            width={100}
                            alt="logo1"
                        />
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <Suspense fallback={<div className="flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>}>
                            <LoginForm />
                        </Suspense>
                    </div>
                </div>
            </div >
            <div className="bg-muted relative hidden md:block">
                <img
                    src="/bg1.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
            </div>
        </div >
    )
}

export default page