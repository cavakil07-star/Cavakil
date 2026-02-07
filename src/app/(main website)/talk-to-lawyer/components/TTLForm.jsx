"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthDialog from '@/components/auth/LoginDialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import LoaderButton from '@/components/custom/LoaderButton';

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phone: z
        .string()
        .min(10, "Phone must be at least 10 digits")
        .regex(/^[0-9]+$/, "Phone must contain only digits"),
    message: z.string().optional(),
});

function TTLForm({ selectedPlan, setSelectedPlan }) {
    const router = useRouter()
    // console.log(selectedPlan)
    const plan = selectedPlan || []
    const [loading, setLoading] = useState(false)

    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const { data: session } = useSession()
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (session) {
            setUserId(session.user.id)
        }
    }, [session])

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: ""
        }
    })
    const { control, handleSubmit } = form
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
        const details = { ...data }
        console.log(details)
        formData.append('name', details.name)
        formData.append('email', details.email)
        formData.append('phone', details.phone)
        formData.append('message', details.message)

        if (selectedPlan.price === 0) {
            try {
                formData.append('amount', 0)
                const res = await fetch('/api/order', {
                    method: 'POST',
                    body: formData
                })
                const result = await res.json()
                console.log(result)
                toast.success("Call Booked Successfully")
                router.push('/user')

            } catch (err) {
                console.error("Call Booking failed:", err)
                toast.error("Error Booking Call")
            } finally {
                setLoading(false)
            }
            return
        }

        // 1. create Razorpay order
        const { data: orderData } = await axios.post(
            '/api/order/razorpay',
            { amount: selectedPlan.price },
            { headers: { 'Content-Type': 'application/json' } }
        )

        if (!orderData.id || !orderData.amount) {
            console.error('Bad order response:', orderData)
            return
        }

        // 2. open checkout
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: selectedPlan.price,
            currency: 'INR',
            name: 'CA Vakil',
            description: selectedPlan.name,
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

                    formData.append('callPlan', selectedPlan._id)
                    formData.append('userId', userId)

                    // now append payment info
                    formData.append('razorpay_payment_id', response.razorpay_payment_id)
                    formData.append('razorpay_order_id', response.razorpay_order_id)
                    formData.append('razorpay_signature', response.razorpay_signature)
                    formData.append('amount', selectedPlan.price)

                    const finalRes = await fetch('/api/callOrder', {
                        method: 'POST',
                        body: formData,
                    })
                    const result = await finalRes.json()
                    console.log('Order Created:', result)
                    toast.success('Call Booked Successfully', { id: toastId })
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
        <div className="max-w-7xl mx-auto px-4 mt-10 sm:px-6 lg:px-8 pb-24">
            <div className="bg-white shadow-2xl  rounded-md overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6">Schedule Your Consultation</h2>
                        <div
                            className={`rounded-xl border-2 p-6 cursor-pointer transition-all time-300 border-[#FFD700] bg-white shadow-2xl`}
                        >
                            <h3 className={`text-xl font-bold mb-2 text-[#003366]`}>{plan.name}</h3>
                            <div className="mb-4">
                                <span className={`text-3xl font-bold text-[#003366]`}>₹{plan.price}</span>
                                <span className={`text-gray-600 `}> / {plan.time}</span>
                            </div>
                            <ul className="space-y-2 mb-6">
                                {plan?.instructions?.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke={"#003366"}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={`text-gray-700`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => setSelectedPlan(null)}
                                className={`w-full py-2 px-4 rounded-lg font-medium bg-[#003366] text-white`}
                            >
                                Select Other Plan
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        <Form {...form}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-8"
                                noValidate
                            >
                                {/* Name */}
                                <FormField
                                    control={control}
                                    name={'name'}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={'Enter your name'}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* email */}
                                <FormField
                                    control={control}
                                    name={'email'}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={'abc@gmail.com'}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* phone */}
                                <FormField
                                    control={control}
                                    name={'phone'}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={'Enter your phone number'}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* phone */}
                                <FormField
                                    control={control}
                                    name={'message'}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Please tell about your query *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={'Enter you query here'}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <LoaderButton
                                    loading={loading}
                                    type="submit"
                                    disabled={!selectedPlan || loading}
                                    className={`w-full py-4 px-4 rounded-lg font-bold text-white transition-all ${selectedPlan ? 'bg-[#003366] hover:bg-[#002244]' : 'bg-gray-400 cursor-not-allowed'}`}
                                >
                                    {selectedPlan ? `Book Now - ₹${selectedPlan.price}` : 'Please select a plan'}
                                </LoaderButton>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <AuthDialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
            />
            <Toaster position="top-right" richColors />
        </div>
    )
}

export default TTLForm