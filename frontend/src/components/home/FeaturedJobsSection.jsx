import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import JobCard from '../JobCard';
import LoadingSpinner from '../LoadingSpinner';

export default function FeaturedJobsSection({ loading, jobs, displayFeatured }) {
    return (
        <section className="py-16 md:py-24 px-4 lg:px-12 bg-white border-t border-gray-50 mt-10">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-10 md:mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">Featured <span className="text-[#4640DE]">jobs</span></h2>
                    <Link to="/jobs" className="font-bold flex items-center gap-2 text-[#4640DE] hover:underline transition">Show all jobs <ArrowRight className="w-5 h-5" /></Link>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center p-12"><LoadingSpinner size="4rem" /></div>
                ) : jobs.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No jobs available right now.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {displayFeatured.map(job => (
                            <JobCard key={job._id || job.id} job={job} featured={true} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
