// /app/components/ServiceForm.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Step1BasicDetails from './steps/Step1BasicDetails';
import Step2PageDetails from './steps/Step2PageDetails';
import Step3PageContent from './steps/Step3PageContent';
import { Button } from '@/components/ui/button';
import { Loader2, Check } from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import { ServiceFormSchema } from '@/lib/validations/service-schema';

const steps = [
    { title: 'Basic Details' },
    { title: 'Page Details' },
    { title: 'Content' },
];

export default function ServiceForm({ defaultValues, onSubmit, loading, error }) {

    const methods = useForm({
        resolver: zodResolver(ServiceFormSchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            slug: '',
            shortDescription: '',
            imageURL: '',
            categories: [],
            tags: [],
            status: true,
            displayOrder: 99,
            pageHeading: '',
            serviceTypeDetails: [''],
            serviceBigDescription: [
                { name: '', title: '', content: '' },
            ],
            ...defaultValues,
        },
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [progressWidth, setProgressWidth] = useState('0%');

    useEffect(() => {
        // Calculate progress width
        const width = `${(currentStep / (steps.length - 1)) * 100}%`;
        setProgressWidth(width);
    }, [currentStep]);

    const stepFieldsMap = [
        [
            'name',
            'slug',
            'shortDescription',
            'imageURL',
            'categories',
            'tags',
            'status',
            'displayOrder',
        ],
        ['pageHeading', 'serviceTypeDetails'],
        ['serviceBigDescription'],
    ];

    const onNext = async () => {
        const fieldsToValidate = stepFieldsMap[currentStep];
        const valid = await methods.trigger(fieldsToValidate);
        if (valid) {
            setCurrentStep((x) => Math.min(x + 1, steps.length - 1));
        }
    };

    const onPrevious = () => {
        setCurrentStep((x) => Math.max(x - 1, 0));
    };

    const goToStep = (stepIndex) => {
        if (stepIndex !== currentStep) {
            setCurrentStep(stepIndex);
        }
    };


    return (
        <FormProvider {...methods}>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent premature submit
                    if (currentStep === steps.length - 1) {
                        methods.handleSubmit(onSubmit)(e);
                    }
                }}
                noValidate
                className=""
            >
                {/* Elegant Step Indicator */}
                <div className="relative mt-4 mb-4">
                    {/* Progress Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -translate-y-1/2 z-0"></div>

                    {/* Progress Fill */}
                    <div
                        className="absolute top-1/2 left-0 h-[2px] bg-indigo-500 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
                        style={{ width: progressWidth }}
                    ></div>

                    {/* Step Buttons */}
                    <div className="relative z-10 flex justify-between">
                        {steps.map((step, index) => {
                            const isCompleted = index < currentStep;
                            const isCurrent = index === currentStep;

                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center"
                                >
                                    <button
                                        type="button"
                                        onClick={() => goToStep(index)}
                                        className={`
                      flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300
                      ${isCurrent
                                                ? 'bg-indigo-600 text-white shadow-lg'
                                                : isCompleted
                                                    ? 'bg-indigo-100 text-indigo-800'
                                                    : 'bg-white text-indigo-600 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isCurrent
                                            ? 'bg-white text-indigo-600'
                                            : isCompleted
                                                ? 'bg-indigo-500 text-white'
                                                : 'bg-gray-200 text-gray-700'
                                            }`}>
                                            {isCompleted ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                <span className="text-sm font-medium">
                                                    {index + 1}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`font-medium ${isCurrent ? 'font-semibold' : ''}`}>
                                            {step.title}
                                        </span>
                                    </button>

                                    {isCurrent && (
                                        <div className="h-[2px] w-8 bg-indigo-500 rounded-full mt-2"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Step Content */}
                <div className="transition-opacity duration-300">
                    {currentStep === 0 && <Step1BasicDetails />}
                    {currentStep === 1 && <Step2PageDetails />}
                    {currentStep === 2 && <Step3PageContent />}
                </div>

                {/* {error && <p className='text-red-700'>Error: {error}</p>} */}

                {/* Navigation Buttons */}
                <div className="flex justify-end pt-1">
                    {/* <Button
                        type="button"
                        variant="outline"
                        onClick={onPrevious}
                        disabled={currentStep === 0}
                        className="min-w-[120px] border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </Button> */}

                    {currentStep >= steps.length - 1 && (
                        //     <Button
                        //         type="button"
                        //         onClick={onNext}
                        //         disabled={loading || currentStep !== steps.length - 1}
                        //         className="min-w-[120px] bg-indigo-500 hover:bg-indigo-600 text-white"
                        //     >
                        //         Continue
                        //     </Button>
                        // ) : (
                        <div className='flex items-center w-full justify-end'>
                            <Button
                                type="submit"
                                className="min-w-[120px] bg-indigo-500 hover:bg-indigo-600 text-white mt-3"
                                disabled={loading}

                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                ) : null}
                                Submit
                            </Button>
                        </div>
                    )}
                </div>
            </form>
        </FormProvider>
    );
}