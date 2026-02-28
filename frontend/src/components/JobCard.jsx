import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import CompanyLogo from './CompanyLogo';

export default function JobCard({ job, featured }) {
    return (
        <div className={`bg-white rounded-xl border border-gray-100 p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 ${featured ? 'h-full' : ''}`}>
            <div className="flex justify-between items-start mb-6">
                <CompanyLogo 
                    company={job.company} 
                    logo={job.companyLogo} 
                    className="w-14 h-14 text-3xl" 
                />
                <span className="text-xs font-bold text-blue-600 border border-blue-200 bg-white px-3 py-1 rounded-full whitespace-nowrap">
                    {job.type || 'Full Time'}
                </span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{job.title}</h3>
            <p className="text-gray-500 text-sm font-medium mb-4">
                {job.company} • {job.location}
            </p>

            <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3 flex-grow mb-6 leading-relaxed">
                {job.description}
            </p>

            <div className="mt-auto">
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                    {job.tags && job.tags.slice(0, 2).map((tag, idx) => {
                        const isMarketing = tag.toLowerCase().includes('marketing');
                        return (
                            <span key={idx} className={`text-xs font-bold px-4 py-1.5 rounded-full border ${isMarketing ? 'text-orange-500 bg-orange-50/50 border-orange-100' : 'text-blue-500 bg-blue-50/50 border-blue-100'}`}>
                                {tag}
                            </span>
                        );
                    })}
                </div>
                <Link to={`/jobs/${job._id || job.id}`} className="mt-4 block w-full text-center text-sm font-bold text-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-8 left-0">
                    Apply Now →
                </Link>
            </div>
        </div>
    );
}
