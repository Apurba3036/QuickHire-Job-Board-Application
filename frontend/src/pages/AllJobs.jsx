import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { getJobs } from '../services/api';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

export default function AllJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getJobs();
                setJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs in overview", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="bg-[#f8f9fa] min-h-[80vh] py-20">
            <div className="container mx-auto px-4 lg:px-12 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 max-w-2xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">Browse All <span className="text-[#4834D4]">Jobs</span></h1>
                    <p className="text-gray-500 text-lg md:text-xl font-medium">Discover your next career move among our thousands of premium open roles.</p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20 min-h-[300px]">
                        <LoadingSpinner size="4rem" />
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {jobs.map(job => (
                            <motion.div key={job._id || job.id} variants={itemVariants}>
                                <JobCard job={job} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
