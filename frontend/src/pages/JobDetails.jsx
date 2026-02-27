import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApplicationModal from '../components/ApplicationModal';
import { getJobById } from '../services/api';
import { FiMapPin, FiBriefcase, FiDollarSign, FiClock, FiShare2, FiBookmark } from 'react-icons/fi';

export default function JobDetails() {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await getJobById(id);
                setJob(data);
            } catch (err) {
                console.error("Error fetching job details", err);
            } finally {
                setLoading(false);
            }
        }
        fetchJob();
    }, [id]);

    if (loading) {
        return <div className="container mx-auto py-20 text-center"><span className="loading loading-spinner text-primary loading-lg"></span></div>;
    }

    if (!job) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Job Not Found</h2>
                <p className="text-gray-500 mb-8">The job you are looking for does not exist or has been removed.</p>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 lg:px-12">
                <Link to="/" className="text-gray-500 hover:text-blue-600 mb-6 inline-block font-medium">
                    ← Back to all jobs
                </Link>

                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-sm flex-shrink-0">
                                {job.companyLogo ? (
                                    <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain p-2" />
                                ) : (
                                    job.company?.[0] || 'C'
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                                    <span className="flex items-center gap-1 font-medium text-gray-700">
                                        <FiBriefcase className="text-gray-400" /> {job.company}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiMapPin className="text-gray-400" /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                                        <FiClock className="text-green-500" /> {job.type}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <button className="btn btn-circle btn-outline border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300">
                                <FiBookmark className="text-xl" />
                            </button>
                            <button className="btn btn-circle btn-outline border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300">
                                <FiShare2 className="text-xl" />
                            </button>
                            <button onClick={() => setShowModal(true)} className="btn btn-primary px-8 flex-grow md:flex-grow-0">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold mb-4">Job Description</h2>
                            <div className="prose max-w-none text-gray-600">
                                <p className="mb-4 whitespace-pre-line">{job.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold mb-6 border-b pb-4">Job Summary</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                                        <FiMapPin />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 block mb-0.5">Location</p>
                                        <p className="font-semibold text-gray-800">{job.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0">
                                        <FiBriefcase />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 block mb-0.5">Job Type</p>
                                        <p className="font-semibold text-gray-800">{job.type}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                                        <FiClock />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 block mb-0.5">Date Posted</p>
                                        <p className="font-semibold text-gray-800">Recently</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <ApplicationModal job={job} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}
