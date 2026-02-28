import React, { useState, useEffect } from 'react';
import { getResumes } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { Download } from 'lucide-react';

export default function Resumes() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const data = await getResumes();
                setResumes(data);
            } catch (err) {
                console.error("Failed to fetch resumes:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResumes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-[72px] flex flex-col">
            <Navbar />
            <div className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Resume Database</h1>
                    <p className="text-gray-500 mt-2">Search through thousands of verified resumes to find your next hire.</p>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center py-20 min-h-[300px]">
                        <LoadingSpinner size="4rem" />
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No resumes found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map(resume => (
                            <div key={resume._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4 hover:shadow-md transition-shadow duration-300">
                                <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 text-lg">{resume.userName}</h3>
                                    <p className="text-[#4640DE] font-medium text-sm mb-2">{resume.jobTitle}</p>
                                    <p className="text-xs text-gray-400 mb-4">Uploaded: {new Date(resume.createdAt).toLocaleDateString()}</p>
                                    <a href={resume.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline btn-primary w-full flex gap-2">
                                        <Download className="w-4 h-4" /> Download PDF
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
