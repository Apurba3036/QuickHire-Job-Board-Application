import React from 'react';
import { FaBuilding } from "react-icons/fa";

export default function HiringSites() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <div className="w-24 h-24 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 text-indigo-600">
                <FaBuilding className="text-4xl" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">Partner Hiring Sites</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                Explore dedicated portals for our top enterprise partners.
                Seamlessly integrate your hiring workflow across multiple platforms.
            </p>
            <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none px-8 rounded-full shadow-lg shadow-indigo-600/30">
                Browse Partners
            </button>
        </div>
    );
}
