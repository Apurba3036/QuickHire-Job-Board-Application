import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../services/api';
import { toast } from 'react-toastify';
import { Briefcase, MapPin, AlignLeft, Tag, Clock, ArrowLeft } from 'lucide-react';

export default function AdminPostJob() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        location: '',
        category: '',
        type: 'Full Time',
        description: '',
        salary: ''
    });

    const handleInputChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const finalData = {
                ...jobData,
                tags: [jobData.category, jobData.type]
            };
            await createJob(finalData);
            toast.success("Job posted successfully!");
            navigate('/admin');
        } catch (err) {
            console.error("Failed to post job", err);
            toast.error("Failed to create job listing. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-gray-500 hover:text-[#4834D4] font-bold mb-6 transition-colors"
            >
                <ArrowLeft size={18} /> Back
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 bg-[#4834D4] text-white">
                    <h1 className="text-2xl md:text-3xl font-extrabold">Post a New Job</h1>
                    <p className="text-indigo-100 mt-1 opacity-90">Fill in the details to reach thousands of potential candidates.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Job Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Briefcase size={16} className="text-gray-400" /> Job Title *
                            </label>
                            <input 
                                type="text" 
                                name="title" 
                                required 
                                value={jobData.title} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4834D4] focus:ring-2 focus:ring-[#4834D4]/20 outline-none transition-all"
                                placeholder="e.g. Senior Product Designer"
                            />
                        </div>

                        {/* Company Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Briefcase size={16} className="text-gray-400" /> Company Name *
                            </label>
                            <input 
                                type="text" 
                                name="company" 
                                required 
                                value={jobData.company} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4834D4] focus:ring-2 focus:ring-[#4834D4]/20 outline-none transition-all"
                                placeholder="e.g. Google, Apple, etc."
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <MapPin size={16} className="text-gray-400" /> Location *
                            </label>
                            <input 
                                type="text" 
                                name="location" 
                                required 
                                value={jobData.location} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4834D4] focus:ring-2 focus:ring-[#4834D4]/20 outline-none transition-all"
                                placeholder="e.g. New York, Remote, etc."
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Tag size={16} className="text-gray-400" /> Category *
                            </label>
                            <select 
                                name="category" 
                                required 
                                value={jobData.category} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4834D4] focus:ring-2 focus:ring-[#4834D4]/20 outline-none transition-all cursor-pointer"
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>

                        {/* Job Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Clock size={16} className="text-gray-400" /> Job Type *
                            </label>
                            <select 
                                name="type" 
                                required 
                                value={jobData.type} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4834D4] focus:ring-2 focus:ring-[#4834D4]/20 outline-none transition-all cursor-pointer"
                            >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        {/* Salary (Optional) */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Salary Range (Optional)</label>
                            <input 
                                type="text" 
                                name="salary" 
                                value={jobData.salary} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4834D4] focus:ring-2 focus:ring-[#4834D4]/20 outline-none transition-all"
                                placeholder="e.g. $80k - $120k"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <AlignLeft size={16} className="text-gray-400" /> Job Description *
                        </label>
                        <textarea 
                            name="description" 
                            required 
                            value={jobData.description} 
                            onChange={handleInputChange} 
                            rows="6"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4834D4] focus:ring-2 focus:ring-[#4834D4]/20 outline-none transition-all resize-none"
                            placeholder="Describe the role, responsibilities, and requirements..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex justify-end gap-4">
                        <button 
                            type="button" 
                            onClick={() => navigate('/admin')} 
                            className="px-8 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-[#4834D4] hover:bg-[#392eb0] text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-[#4834D4]/30 transition-all disabled:opacity-70 flex items-center gap-2"
                        >
                            {loading ? 'Posting...' : 'Publish Job Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
