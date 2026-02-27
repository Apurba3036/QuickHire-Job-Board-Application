import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function HelpCenter() {
    return (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-purple-50 text-purple-500 p-6 rounded-full mb-6">
                <HelpCircle className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Help Center</h1>
            <p className="text-gray-500 font-medium text-center max-w-md">
                Find answers to common questions, view tutorials, or contact our support team for assistance.
            </p>
        </div>
    );
}
