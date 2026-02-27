import React from 'react';
import { BsPeopleFill } from "react-icons/bs";

export default function People() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6 text-[#3b82f6]">
                <BsPeopleFill className="text-4xl" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">Discover Top Talent</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                Connect with industry professionals, view profiles, and find the perfect match for your next big project.
                Our people directory is coming soon.
            </p>
            <button className="btn bg-[#4834D4] hover:bg-[#392eb0] text-white border-none px-8 rounded-full shadow-lg shadow-[#4834D4]/30">
                Join Waitlist
            </button>
        </div>
    );
}
