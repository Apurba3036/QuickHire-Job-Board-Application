import React from 'react';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-gray-100 text-gray-500 p-6 rounded-full mb-6 relative hover:rotate-90 transition-transform duration-500 cursor-pointer">
                <Settings className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Platform Settings</h1>
            <p className="text-gray-500 font-medium text-center max-w-md">
                Adjust your notification preferences, billing information, and account security settings here.
            </p>
        </div>
    );
}
