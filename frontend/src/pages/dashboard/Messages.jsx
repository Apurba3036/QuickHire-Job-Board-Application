import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function Messages() {
    return (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-blue-50 text-blue-500 p-6 rounded-full mb-6">
                <MessageSquare className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Messages</h1>
            <p className="text-gray-500 font-medium text-center max-w-md">
                Your inbox is currently empty. Start messaging recruiters or candidates to see your conversations here.
            </p>
        </div>
    );
}
