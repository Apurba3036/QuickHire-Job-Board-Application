import React from 'react';
import { Briefcase } from 'lucide-react';

export default function Profile() {
    return (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-indigo-50 text-indigo-500 p-6 rounded-full mb-6">
                <Briefcase className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Company Profile</h1>
            <p className="text-gray-500 font-medium text-center max-w-md">
                This is where you can view and edit your professional company branding and profile information.
            </p>
        </div>
    );
}
