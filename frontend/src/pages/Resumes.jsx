import React from 'react';
import { HiDocumentText } from "react-icons/hi";

export default function Resumes() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <div className="w-24 h-24 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 text-emerald-600">
                <HiDocumentText className="text-4xl" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">Resume Database</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                Search through thousands of verified resumes. Find candidates with the exact skills and experience you need.
            </p>
            <button className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-8 rounded-full shadow-lg shadow-emerald-600/30">
                Start Sourcing
            </button>
        </div>
    );
}
