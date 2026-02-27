import React from 'react';
import { Calendar } from 'lucide-react';

export default function Schedule() {
    return (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-orange-50 text-orange-500 p-6 rounded-full mb-6">
                <Calendar className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">My Schedule</h1>
            <p className="text-gray-500 font-medium text-center max-w-md">
                Manage your upcoming interviews and scheduling conflicts directly from this calendar view.
            </p>
        </div>
    );
}
