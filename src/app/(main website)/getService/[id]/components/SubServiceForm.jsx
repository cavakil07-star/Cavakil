'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import AuthDialog from '@/components/auth/LoginDialog'
import { Loader2, User, FileText, Upload, Shield, CreditCard, CheckCircle2, Gift } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

export default function SubServiceForm({
    requiredDetails,
    requiredDocuments,
    actualPrice,
    discountedPrice,
    subService,
    isDocumentsRequired = true,
    isDetailsRequired = true,
    benefits = [],
}) {
    const router = useRouter()
    // turn on real-time validation
    const form = useForm({ mode: 'onChange' })
    const { control, handleSubmit, formState } = form
    const { isValid } = formState

    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const [userId, setUserId] = useState('')
    const { data: session } = useSession()

    const [service, setService] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (subService) {
            setService(subService.serviceId._id)
        }
    }, [subService])

    const subServiceId = subService._id

    useEffect(() => {
        if (session) {
            setUserId(session.user.id)
        }
    }, [session])

    // load Razorpay script
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)
        return () => document.body.removeChild(script)
    }, [])

    const onSubmit = async (data) => {
        const toastId = toast.loading('Processing Order... Please wait')
        setLoading(true)
        if (!session) {
            setLoading(false)
            setIsLoginDialogOpen(true);
            return
        };
        if (session && session.user.role !== 'user') {
            setLoading(false)
            alert("Admins and Sub Admins cannot create order!");
            return
        };
        // build FormData
        const formData = new FormData()
        requiredDetails.forEach((d) => formData.append(d.name, data[d.name]))
        requiredDocuments.forEach((doc) => {
            if (data[doc.name]?.[0]) formData.append(doc.name, data[doc.name][0])
        })
        formData.append('service', service)
        formData.append('subServiceId', subServiceId)
        formData.append('userId', userId)

        const price =
            discountedPrice && discountedPrice < actualPrice
                ? discountedPrice
                : actualPrice

        if (price === 0) {
            try {
                formData.append('amount', 0)
                const res = await fetch('/api/order', {
                    method: 'POST',
                    body: formData
                })
                const result = await res.json()
                console.log(result)
                toast.success("Order Created Successfully")
                router.push('/user')

            } catch (err) {
                console.error("Free order failed:", err)
                toast.error("Error creating order")
            } finally {
                setLoading(false)
            }
            return
        }

        // 1. create Razorpay order
        const { data: orderData } = await axios.post(
            '/api/order/razorpay',
            { amount: price },
            { headers: { 'Content-Type': 'application/json' } }
        )

        if (!orderData.id || !orderData.amount) {
            console.error('Bad order response:', orderData)
            return
        }

        // 2. open checkout
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: price,
            currency: 'INR',
            name: 'CA Vakil',
            description: subService.name,
            order_id: orderData.id,
            handler: async (response) => {
                try {
                    const verifyRes = await fetch('/api/order/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response),
                    })
                    const { valid } = await verifyRes.json()
                    if (!valid) throw new Error('Payment verification failed')

                    // rebuild FormData here
                    const finalData = new FormData()
                    requiredDetails.forEach((d) => finalData.append(d.name, data[d.name]))
                    requiredDocuments.forEach((doc) => {
                        if (data[doc.name]?.[0]) finalData.append(doc.name, data[doc.name][0])
                    })
                    finalData.append('service', service)
                    finalData.append('subServiceId', subServiceId)
                    finalData.append('userId', userId)

                    // now append payment info
                    finalData.append('razorpay_payment_id', response.razorpay_payment_id)
                    finalData.append('razorpay_order_id', response.razorpay_order_id)
                    finalData.append('razorpay_signature', response.razorpay_signature)
                    finalData.append('amount', price)

                    const finalRes = await fetch('/api/order', {
                        method: 'POST',
                        body: finalData,
                    })
                    const result = await finalRes.json()
                    console.log('Order Created:', result)
                    setLoading(false)
                    toast.success('Order Created Successfully', { id: toastId })
                    router.push('/user')
                } catch (err) {
                    console.error('Order creation error:', err)
                    toast.error('Error: ' + err, { id: toastId })
                    setLoading(false)
                }
            },
            prefill: { name: '', email: '' },
            theme: { color: '#184674' },
            modal: {
                ondismiss: () => {
                    console.log("Payment popup closed.");
                    toast.error("Payment cancelled by user!", { id: toastId })
                    setLoading(false)
                },
            },
        }

        new window.Razorpay(options).open()
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                    noValidate
                >
                    {/* Required Information Section */}
                    {isDetailsRequired && requiredDetails?.length > 0 && (
                    <Card className="border-none shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                        <div className="bg-gradient-to-r from-[#003366] to-[#0055aa] p-5 text-white flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                                <User className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">Personal Details</h2>
                                <p className="text-blue-100 text-xs text-opacity-80">Please provide accurate information for your application</p>
                            </div>
                        </div>
                        <CardContent className="p-8 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {requiredDetails.map((detail) => (
                                    <FormField
                                        key={detail._id}
                                        control={control}
                                        name={detail.name}
                                        rules={{ required: `${detail.label} is required` }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-semibold">{detail.label}</FormLabel>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <Input
                                                            {...field}
                                                            placeholder={`Enter ${detail.label}`}
                                                            className="pl-4 h-12 border-gray-200 focus:border-[#003366] focus:ring-[#003366]/20 transition-all duration-300 rounded-lg bg-gray-50/50 group-hover:bg-white"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    )}

                    {/* Required Documents Section */}
                    {isDocumentsRequired && requiredDocuments?.length > 0 && (
                    <Card className="border-none shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                        <div className="bg-gradient-to-r from-[#003366] to-[#0055aa] p-5 text-white flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">Required Documents</h2>
                                <p className="text-blue-100 text-xs text-opacity-80">Upload clear copies of the following documents</p>
                            </div>
                        </div>
                        <CardContent className="p-8 bg-white">
                            <div className="grid grid-cols-1 gap-6">
                                {requiredDocuments.map((doc, idx) => (
                                    <FormField
                                        key={doc._id}
                                        control={control}
                                        name={doc.name}
                                        rules={{ required: `${doc.label} is required` }}
                                        render={({ field }) => (
                                            <FormItem className="bg-gray-50 border border-gray-100 rounded-xl p-4 transition-all hover:shadow-md hover:border-blue-100">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-blue-50 text-[#003366] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                                            {idx + 1}
                                                        </div>
                                                        <div>
                                                            <FormLabel className="text-gray-900 font-semibold text-base mb-0 cursor-pointer">
                                                                {doc.label}
                                                            </FormLabel>
                                                            <p className="text-xs text-gray-500 mt-0.5">Supported formats: PDF, JPG, PNG</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                type="file"
                                                                className="hidden"
                                                                id={`file-${doc._id}`}
                                                                onChange={(e) => field.onChange(e.target.files)}
                                                            />
                                                            <label
                                                                htmlFor={`file-${doc._id}`}
                                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 border border-dashed ${
                                                                    field.value?.[0] 
                                                                    ? 'bg-green-50 border-green-200 text-green-700' 
                                                                    : 'bg-white border-blue-200 text-[#003366] hover:bg-blue-50'
                                                                }`}
                                                            >
                                                                {field.value?.[0] ? (
                                                                    <>
                                                                        <CheckCircle2 className="w-4 h-4" />
                                                                        <span className="text-sm font-medium truncate max-w-[200px]">
                                                                            {field.value[0].name}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Upload className="w-4 h-4" />
                                                                        <span className="text-sm font-medium">Choose File</span>
                                                                    </>
                                                                )}
                                                            </label>
                                                        </div>
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="mt-2" />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    )}

                    {/* Service Benefits Section */}
                    {benefits?.length > 0 && (
                    <Card className="border-none shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-5 text-white flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                                <Gift className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">Why Choose This Service</h2>
                                <p className="text-emerald-100 text-xs text-opacity-80">Benefits included with your purchase</p>
                            </div>
                        </div>
                        <CardContent className="p-8 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                                        <span className="text-gray-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    )}

                    {/* Payment Summary & Action */}
                    <Card className="border-none shadow-2xl bg-gradient-to-br from-gray-900 to-[#003366] text-white overflow-hidden relative">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        
                        <CardContent className="p-8 relative z-10">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="space-y-2">
                                    <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Payable Amount</p>
                                    <div className="flex items-baseline gap-3">
                                        {discountedPrice && discountedPrice < actualPrice ? (
                                            <>
                                                <span className="text-4xl font-bold text-white tracking-tight">
                                                    ₹{discountedPrice.toLocaleString()}
                                                </span>
                                                <span className="text-lg text-blue-300/60 line-through font-medium">
                                                    ₹{actualPrice.toLocaleString()}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-4xl font-bold text-white tracking-tight">
                                                ₹{actualPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-blue-200 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                                        <Shield className="h-3 w-3" />
                                        <span>256-bit SSL Secure Payment</span>
                                    </div>
                                </div>
                                
                                <motion.div 
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full md:w-auto"
                                >
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full md:w-auto bg-white text-[#003366] hover:bg-blue-50 h-16 px-10 text-lg font-bold shadow-xl shadow-black/20 rounded-xl transition-all duration-300"
                                        disabled={!isValid || loading}
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className='animate-spin h-5 w-5' />
                                                <span>Processing...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span>Proceed to Pay</span>
                                                <CreditCard className="h-5 w-5" />
                                            </div>
                                        )}
                                    </Button>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>

            <AuthDialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
            />
            <Toaster position="top-right" richColors />
        </motion.div>
    )
}
