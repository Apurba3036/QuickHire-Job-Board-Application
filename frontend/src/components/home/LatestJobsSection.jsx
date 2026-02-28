import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CompanyLogo from '../CompanyLogo';
import LoadingSpinner from '../LoadingSpinner';

export default function LatestJobsSection({ loading, displayLatest }) {
    return (
        <section className="py-16 md:py-24 px-4 lg:px-12 bg-gray-50/50">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-10 md:mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">Latest <span className="text-[#4640DE]">jobs open</span></h2>
                    <Link to="/jobs" className="font-bold flex items-center gap-2 text-[#4640DE] hover:underline transition">Show all jobs <ArrowRight className="w-5 h-5" /></Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                    {loading ? (
                        <div className="col-span-1 md:col-span-2 flex justify-center py-8">
                            <LoadingSpinner size="3rem" />
                        </div>
                    ) : displayLatest.map(job => (
                        <Link to={`/jobs/${job._id || job.id}`} key={`latest-${job._id || job.id}`} className="bg-white p-5 md:p-6 rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center gap-4 md:gap-6 group">
                            <CompanyLogo 
                                company={job.company} 
                                logo={job.companyLogo} 
                                className="w-14 h-14 md:w-20 md:h-20 text-2xl md:text-3xl" 
                            />
                            <div className="flex-grow min-w-0">
                                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1 group-hover:text-[#4640DE] transition-colors truncate">{job.title}</h3>
                                <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-3 font-medium truncate">{job.company} • {job.location}</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] md:text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">Full Time</span>
                                    {job.tags && job.tags.slice(0, 1).map((tag, idx) => (
                                        <span key={idx} className={`text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border ${tag.toLowerCase() === 'marketing' ? 'text-orange-500 bg-orange-50 border-orange-100' : 'text-[#4640DE] bg-blue-50 border-blue-100'}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
