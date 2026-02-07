"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, 
    FileText, 
    ArrowRight, 
    ShieldCheck, 
    Sparkles, 
    AlertCircle,
    ChevronRight,
    PlayCircle,
    Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const TabbedDocuments = ({ subServices }) => {
    const router = useRouter()
    const tabs = subServices || [];
    const [activeTab, setActiveTab] = useState(0);

    // If there are no sub-services, display a message instead of an empty component.
    if (!tabs || tabs.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-gray-50/50 backdrop-blur-sm rounded-2xl border border-gray-200 p-12 text-center"
            >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Service Options Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto">Detailed pricing and service packages are currently being updated for this category.</p>
            </motion.div>
        );
    }

    const currentTab = tabs[activeTab] || {};

    // Calculate pricing information
    const actualPrice = currentTab.actualPrice || 0;
    const discountedPrice = currentTab.discountedPrice ?? actualPrice;

    // Determine pricing type
    const isDiscounted = discountedPrice < actualPrice;
    const isFree = discountedPrice === 0 && actualPrice === 0;
    const discountPercentage = isDiscounted
        ? Math.round(100 - (discountedPrice / actualPrice) * 100)
        : 0;
    const savings = actualPrice - discountedPrice;

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Modern Sidebar Tabs */}
                <div className="lg:w-80 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-2">
                    <h3 className="text-slate-800 font-bold text-lg mb-4 px-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        Select a Package
                    </h3>
                    <div className="space-y-3">
                        {tabs.map((tab, index) => {
                            const isActive = activeTab === index;
                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                                        w-full text-left px-5 py-4 rounded-xl transition-all duration-300
                                        relative group overflow-hidden border
                                        ${isActive 
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' 
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:shadow-md'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className={`
                                            w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                                            ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'}
                                        `}>
                                            {index + 1}
                                        </div>
                                        <span className="font-semibold text-sm leading-snug">{tab.name}</span>
                                    </div>
                                    
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabGlow"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            style={{ zIndex: 0 }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 lg:p-10 bg-white relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full flex flex-col"
                        >
                            {/* Header Section */}
                            <div className="mb-8">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h2 className="text-2xl font-bold text-gray-900">{currentTab.name}</h2>
                                    {isFree && <Badge className="bg-green-500 hover:bg-green-600">FREE SERVICE</Badge>}
                                    {isDiscounted && <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">{discountPercentage}% OFF</Badge>}
                                </div>
                                <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                            </div>

                            {/* Requirements Grid */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {/* Documents Card */}
                                <Card className="border-0 shadow-lg shadow-gray-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-bold text-gray-800">Required Documents</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {currentTab.requiredDocuments?.map((doc, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                    <span>{doc.name}</span>
                                                </li>
                                            ))}
                                            {(!currentTab.requiredDocuments || currentTab.requiredDocuments.length === 0) && (
                                                <li className="text-sm text-gray-400 italic">No documents specificed</li>
                                            )}
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Details Card */}
                                <Card className="border-0 shadow-lg shadow-gray-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                                <ShieldCheck className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-bold text-gray-800">Required Details</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {currentTab.requiredDetails?.map((det, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                                                    <span>{det.name}</span>
                                                </li>
                                            ))}
                                            {(!currentTab.requiredDetails || currentTab.requiredDetails.length === 0) && (
                                                <li className="text-sm text-gray-400 italic">No additional details needed</li>
                                            )}
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Benefits Card */}
                                {currentTab.benefits?.length > 0 && (
                                <Card className="border-0 shadow-lg shadow-gray-100 bg-emerald-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 group md:col-span-2">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                                                <Gift className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-bold text-gray-800">Service Benefits</h3>
                                        </div>
                                        <ul className="grid md:grid-cols-2 gap-3">
                                            {currentTab.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                                )}
                            </div>

                            {/* Bottom CTA Section */}
                            <div className="mt-auto">
                                <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group">
                                    {/* Decorative circles */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/10 transition-colors duration-500"></div>
                                    
                                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div>
                                            <div className="flex items-center gap-2 text-blue-200 text-sm font-medium mb-1">
                                                <Sparkles className="w-4 h-4" />
                                                <span>All Inclusive Price</span>
                                            </div>
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-4xl lg:text-5xl font-bold tracking-tight">
                                                    {isFree ? 'FREE' : `₹${discountedPrice.toLocaleString()}`}
                                                </span>
                                                {isDiscounted && (
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-400 line-through text-sm">₹{actualPrice.toLocaleString()}</span>
                                                        <span className="text-emerald-400 text-xs font-bold">SAVE ₹{savings.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-400 text-xs mt-2">* Excluding government fees if applicable</p>
                                        </div>

                                        <Link href={`/getService/${currentTab._id}`}>
                                            <Button 
                                                size="lg" 
                                                className="bg-white text-blue-900 hover:bg-blue-50 hover:text-blue-700 h-14 px-8 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                                            >
                                                Get Started Now
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TabbedDocuments;

// export default TabbedDocuments;




// const tabs = [
//     {
//         title: "Private Limited Company",
//         documents: [
//             "Certificate of Incorporation",
//             "PAN card of Company",
//             "Articles of Association (AOA)",
//             "Memorandum of Association (MOA)",
//             "Resolution signed by board members",
//         ],
//     },
//     {
//         title: "Limited Liability Partnership (LLP)",
//         documents: [
//             "LLP Agreement",
//             "PAN Card of LLP",
//             "Certificate of Incorporation",
//             "Partners' address and ID proof",
//             "Digital Signature",
//         ],
//     },
//     {
//         title: "Sole Proprietorship",
//         documents: [
//             "PAN Card",
//             "Aadhar Card",
//             "Bank Account Proof",
//             "Utility Bill or Rent Agreement",
//         ],
//     },
//     {
//         title: "One Person Company (OPC)",
//         documents: [
//             "Certificate of Incorporation",
//             "PAN Card of Company",
//             "MOA and AOA",
//             "Nominee's consent form",
//             "Director's ID and address proof",
//             "Digital Signature",
//         ],
//     },
// ];
