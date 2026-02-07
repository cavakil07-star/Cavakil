import { IMAGES } from "@/lib/constants/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TalkToLawyerCard() {
    return (
        <div className="bg-white rounded-2xl p-6 text-center shadow-md w-full">
            <h2 className="text-2xl font-bold text-primary mb-4">Call an Expert?</h2>

            <div className="flex justify-center  mb-4">
                <Image src={IMAGES.LAWYWER_LOGO} className="mr-6" alt="Lawyer Icon" width={100} height={100} />
                 <Image src="/cab.png" alt="Lawyer Icon" width={100} height={100} />
            </div>

            <p className="text-gray-700 mb-6">
                Get any type of legal and tax advice from expert lawyers
            </p>

            <Link href={'/talk-to-lawyer'}>
                <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition">
                    Talk to CA/Advocate
                </button>
            </Link>
        </div>
    );
};
