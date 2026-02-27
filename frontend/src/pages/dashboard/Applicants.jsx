import React from 'react';
import { Users } from 'lucide-react';

export default function Applicants() {
    return (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-emerald-50 text-emerald-500 p-6 rounded-full mb-6">
                <Users className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">All Applicants</h1>
            <p className="text-gray-500 font-medium text-center max-w-md">
                A centralized view of all candidates who have applied to your active job listings.
            </p>
        </div>
    );
}
