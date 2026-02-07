"use client";
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog ';
import { Button } from '@/components/ui/button';
import { Trash, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

const TabbedDocuments = ({ ss, setIsDialogOpen, setEditing, onDelete, isDeleting, deleteError }) => {
    const tabs = ss?.subServices || [];
    const [activeTab, setActiveTab] = useState(0);
    const [deletingId, setDeletingId] = useState(null);

    const formatPrice = (price) =>
        typeof price === 'number'
            ? price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
            : price;

    const renderBadge = (actual, discounted) => {
        if (discounted != null && actual > discounted) {
            const percent = Math.round(((actual - discounted) / actual) * 100);
            return (
                <span className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    -{percent}%
                </span>
            );
        }
        if ((discounted == null || discounted === 0) && actual === 0) {
            return (
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    Free
                </span>
            );
        }
        return null;
    };

    const handleDeleteClick = (id) => {
        setDeletingId(id);
    };

    const handleDeleteConfirm = async () => {
        await onDelete(deletingId);
        setDeletingId(null);
    };

    return (
        <div className="flex border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <aside className="w-56 bg-gray-50 border-r border-gray-200">
                <ul className="space-y-1 p-4">
                    {tabs.map((tab, i) => (
                        <li key={i}>
                            <button
                                onClick={() => setActiveTab(i)}
                                className={`w-full text-left flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${activeTab === i
                                    ? 'bg-white text-blue-600 font-medium shadow-inner'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <span
                                    className={`inline-block w-2 h-2 mr-3 rounded-full ${activeTab === i ? 'bg-blue-600' : 'bg-gray-400'
                                        }`}
                                />
                                {tab.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Content */}
            <div className="flex-1 bg-white p-6">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">{tabs[activeTab]?.title}</h2>
                        <div className="text-sm text-gray-500 mt-1">
                            {tabs[activeTab]?.requiredDocuments?.length || 0} Documents &bull; {tabs[activeTab]?.requiredDetails?.length || 0} Details &bull; {tabs[activeTab]?.benefits?.length || 0} Benefits
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs">
                            <span className={`flex items-center gap-1 ${tabs[activeTab]?.isDocumentsRequired !== false ? 'text-green-600' : 'text-gray-400'}`}>
                                {tabs[activeTab]?.isDocumentsRequired !== false ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                Docs Required
                            </span>
                            <span className={`flex items-center gap-1 ${tabs[activeTab]?.isDetailsRequired !== false ? 'text-green-600' : 'text-gray-400'}`}>
                                {tabs[activeTab]?.isDetailsRequired !== false ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                Details Required
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className="flex items-center space-x-2">{renderBadge(tabs[activeTab]?.actualPrice, tabs[activeTab]?.discountedPrice)}</div>
                        <Button variant='outline' onClick={() => {
                            setEditing(tabs[activeTab])
                            setIsDialogOpen(true)
                        }}>Edit</Button>

                        <Button
                            variant="destructive"
                            onClick={() => handleDeleteClick(tabs[activeTab]._id)}
                        >
                            <Trash size={16} />
                        </Button>
                    </div>
                </header>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Documents Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Required Documents</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {tabs[activeTab]?.requiredDocuments.map((doc, idx) => (
                                <li key={idx}>{doc.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Details Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Required Details</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {tabs[activeTab]?.requiredDetails?.map((det, idx) => (
                                <li key={idx}>{det.name}</li>
                            ))}
                            {(!tabs[activeTab]?.requiredDetails || tabs[activeTab]?.requiredDetails.length === 0) && (
                                <li className="text-gray-400 italic list-none">No details required</li>
                            )}
                        </ul>
                    </div>

                    {/* Benefits Card */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm md:col-span-2">
                        <h3 className="text-lg font-medium text-green-700 mb-3">Service Benefits</h3>
                        <ul className="grid md:grid-cols-2 gap-2 text-gray-600">
                            {tabs[activeTab]?.benefits?.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                            {(!tabs[activeTab]?.benefits || tabs[activeTab]?.benefits.length === 0) && (
                                <li className="text-gray-400 italic">No benefits added</li>
                            )}
                        </ul>
                    </div>
                </div>

                <footer className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-6">
                    <div className="flex-1">
                        <h4 className="text-sm text-gray-500">Actual Price</h4>
                        <p className="text-xl font-semibold text-gray-800 mt-1">
                            {formatPrice(tabs[activeTab]?.actualPrice || 0)}
                        </p>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm text-gray-500">Discounted Price</h4>
                        <p className="text-xl font-semibold text-gray-800 mt-1">
                            {tabs[activeTab]?.discountedPrice != null
                                ? formatPrice(tabs[activeTab].discountedPrice)
                                : '—'}
                        </p>
                    </div>
                </footer>
            </div>
            <DeleteConfirmationDialog
                isOpen={!!deletingId}
                onOpenChange={(open) => {
                    if (!open) setDeletingId(null);
                }}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Sub Service"
                description="Are you sure you want to delete this sub service?"
            />
        </div>
    );
};

export default TabbedDocuments;





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
