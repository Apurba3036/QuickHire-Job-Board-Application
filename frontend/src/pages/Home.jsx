import React, { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight, PenTool, PieChart, Megaphone, Wallet, Monitor, Code, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/api';
import { Link } from 'react-router-dom';

// Import local assets
import heroMan from '../assets/professionalman.png';
import ctaImage from '../assets/image.png';

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("Marketing");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getJobs();
                setJobs(data);
            } catch (err) {
                console.error("Error fetching jobs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Filter featured vs latest for layout
    const featuredJobs = jobs.filter(j => j.tags?.includes('Design') || j.tags?.includes('Marketing')).slice(0, 8);
    // If not enough tagged, just fall back
    const displayFeatured = featuredJobs.length >= 4 ? featuredJobs.slice(0, 8) : jobs.slice(0, 8);
    const displayLatest = jobs.slice(0, 6);

    return (
        <div className="w-full font-sans">
            {/* Hero Section Background Container (for the angled cut) */}
            <div className="relative bg-gray-50 pb-20 pt-10">
                {/* Angled White Hero Area */}
                <div className="absolute top-0 left-0 w-full h-full bg-white z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 95%)' }}></div>

                {/* Hero Content */}
                <section className="relative z-10 py-8 md:py-20 px-4 lg:px-12 overflow-hidden">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        {/* Background Shapes */}
                        <div className="absolute right-0 top-0 w-full lg:w-[120%] h-full pointer-events-none -translate-y-10 translate-x-20 z-0">
                            <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-indigo-100 opacity-60">
                                <path d="M700 100 L200 350 L200 550 L700 300 Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M750 150 L250 400 L250 600 L750 350 Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M800 200 L300 450 L300 650 L800 400 Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="z-20 relative pt-10"
                        >
                            <h1 className="leading-tight mb-4 md:mb-6" style={{ fontFamily: 'Clash Display, Red Hat Display, sans-serif', fontWeight: 600, fontSize: 'clamp(40px, 8vw, 72px)', lineHeight: '110%', color: '#25324B' }}>
                                Discover <span className="hidden md:inline"><br /></span>
                                more than <span className="hidden md:inline"><br /></span>
                                <span className="relative inline-block mt-2 md:mt-0" style={{ color: '#26A4FF' }}>
                                    5000+ Jobs
                                    <svg className="absolute w-[110%] h-4 md:h-6 -bottom-2 md:-bottom-3 -left-2" style={{ color: '#26A4FF' }} viewBox="0 0 200 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5,15 Q50,5 100,10 T195,5" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ filter: 'drop-shadow(0px 2px 0px rgba(38,164,255,0.3))' }} />
                                    </svg>
                                </span>
                            </h1>
                            <p className="mb-8 md:mb-10 max-w-lg" style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 400, fontSize: 'clamp(16px, 4vw, 20px)', lineHeight: '160%', color: '#515B6F' }}>
                                Great platform for the job seeker that searching for new career heights and passionate about startups.
                            </p>

                            <div className="bg-white shadow-xl md:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] rounded-xl p-3 md:p-2 flex flex-col md:flex-row gap-3 md:gap-2 max-w-2xl border border-gray-100 relative z-30">
                                <div className="flex-1 flex items-center px-4 py-3 md:py-4 border md:border-none border-gray-100 rounded-lg md:border-r md:border-gray-100">
                                    <Search className="text-[#25324B] w-5 h-5 mr-3" />
                                    <input type="text" placeholder="Job title or keyword" className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 font-medium" />
                                </div>
                                <div className="flex-1 flex items-center px-4 py-3 md:py-4 border md:border-none border-gray-100 rounded-lg pr-8">
                                    <MapPin className="text-[#25324B] w-5 h-5 mr-3" />
                                    <select className="w-full bg-transparent focus:outline-none text-[#25324B] appearance-none font-bold cursor-pointer">
                                        <option>Florence, Italy</option>
                                        <option>San Francisco, US</option>
                                        <option>Remote</option>
                                    </select>
                                </div>
                                <button className="btn bg-[#4640DE] hover:bg-[#392eb0] text-white border-none w-full md:w-auto px-10 py-4 h-auto text-[16px] font-bold rounded-lg normal-case shadow-lg shadow-indigo-200">Search my job</button>
                            </div>

                            <p className="text-sm font-medium text-gray-400 mt-6 relative z-30">
                                Popular : <span className="font-bold text-gray-700">UI Designer, UX Researcher, Android, Admin</span>
                            </p>
                        </motion.div>

                        {/* Hero Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative hidden lg:flex items-end justify-center z-10 w-full h-full min-h-[500px]"
                        >
                            <img src={heroMan} alt="Professional Job Seeker" className="absolute bottom-0 z-10 w-[95%] max-w-[550px] object-contain drop-shadow-2xl translate-x-12" />
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* Companies Section */}
            <section className="pt-4 pb-12 bg-gray-50 overflow-hidden relative z-20 border-b border-gray-100 md:border-none">
                <div className="container mx-auto px-4 lg:px-12">
                    <p className="text-left font-medium mb-8" style={{ fontFamily: 'Epilogue, sans-serif', color: '#202430', opacity: 0.5, fontWeight: 500, fontSize: '14px' }}>Companies we helped grow</p>

                    <div className="relative flex overflow-hidden">
                        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 md:gap-40 py-4 opacity-40 grayscale">
                            <span className="text-3xl md:text-4xl font-bold flex items-center gap-2 text-gray-500 leading-none">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-[4px] md:border-[5px] border-gray-500"></div>vodafone
                            </span>
                            <span className="text-3xl md:text-4xl font-bold text-gray-500 font-serif leading-none">intel<span className="text-[#0B66FF]">.</span></span>
                            <span className="text-3xl md:text-4xl font-medium tracking-[0.3em] text-gray-500 uppercase leading-none">TESLA</span>
                            <span className="text-3xl md:text-4xl font-black text-gray-500 tracking-tighter leading-none">AMD<sup className="text-xs">►</sup></span>
                            <span className="text-3xl md:text-4xl font-bold italic text-gray-500 font-serif leading-none">Talkit</span>

                            {/* Dupe 1 for smooth scroll */}
                            <span className="text-3xl md:text-4xl font-bold flex items-center gap-2 text-gray-500 leading-none">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-[4px] md:border-[5px] border-gray-500"></div>vodafone
                            </span>
                            <span className="text-3xl md:text-4xl font-bold text-gray-500 font-serif leading-none">intel<span className="text-[#0B66FF]">.</span></span>
                            <span className="text-3xl md:text-4xl font-medium tracking-[0.3em] text-gray-500 uppercase leading-none">TESLA</span>
                            <span className="text-3xl md:text-4xl font-black text-gray-500 tracking-tighter leading-none">AMD<sup className="text-xs">►</sup></span>
                            <span className="text-3xl md:text-4xl font-bold italic text-gray-500 font-serif leading-none">Talkit</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore by Category */}
            <section className="py-16 md:py-24 px-4 lg:px-12 bg-white">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end mb-10 md:mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">Explore by <span className="text-[#4640DE]">category</span></h2>
                        <Link to="/jobs" className="font-bold flex items-center gap-2 text-[#4640DE] hover:underline transition hidden md:flex">Show all jobs <ArrowRight className="w-5 h-5" /></Link>
                    </motion.div>

                    {/* Category List for Mobile / Grid for Desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                        {[
                            { icon: PenTool, title: "Design", count: 235 },
                            { icon: PieChart, title: "Sales", count: 756 },
                            { icon: Megaphone, title: "Marketing", count: 140 },
                            { icon: Wallet, title: "Finance", count: 325 },
                            { icon: Monitor, title: "Technology", count: 436 },
                            { icon: Code, title: "Engineering", count: 542 },
                            { icon: Briefcase, title: "Business", count: 211 },
                            { icon: Users, title: "Human Resource", count: 346 },
                        ].map((cat, idx) => {
                            const isActive = activeCategory === cat.title;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => setActiveCategory(cat.title)}
                                    className={`p-5 md:p-8 rounded-xl border transition-all duration-300 cursor-pointer group flex md:flex-col items-center md:items-start gap-4 md:gap-0 ${isActive ? 'bg-[#4640DE] border-transparent text-white shadow-xl shadow-indigo-100' : 'bg-white border-gray-100 hover:border-indigo-100 text-[#25324B]'}`}
                                >
                                    <cat.icon className={`w-8 h-8 md:w-10 md:h-10 md:mb-6 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#4640DE]'}`} />
                                    <div className="flex-grow">
                                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{cat.title}</h3>
                                        <p className={`text-sm font-medium ${isActive ? 'text-indigo-100' : 'text-gray-400'}`}>
                                            {cat.count} jobs available
                                        </p>
                                    </div>
                                    <ArrowRight className={`w-5 h-5 md:mt-auto self-center md:self-end ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-[#4640DE]'}`} />
                                </motion.div>
                            );
                        })}
                    </div>
                    
                    <Link to="/jobs" className="font-bold flex items-center justify-center gap-2 text-[#4640DE] mt-8 md:hidden">Show all jobs <ArrowRight className="w-5 h-5" /></Link>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 px-4 lg:px-12 bg-white">
                <div className="container mx-auto">
                    <div
                        className="flex flex-col md:flex-row relative overflow-hidden min-h-[414px] md:h-[414px]"
                        style={{
                            background: '#4640DE',
                            clipPath: 'polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 48px 100%, 0 calc(100% - 48px))',
                        }}
                    >
                        <div className="w-full md:w-[45%] px-8 md:pl-16 md:pr-8 py-12 md:py-0 flex flex-col justify-center z-10 text-white text-center md:text-left items-center md:items-start">
                            <h2 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 40px)', lineHeight: '120%', color: '#fff', marginBottom: '16px' }}>Start posting<br />jobs today</h2>
                            <p style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 400, fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>Start posting jobs for only $10.</p>
                            <button
                                className="hover:bg-gray-100 transition-colors shadow-lg"
                                style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 700, fontSize: '16px', background: '#fff', color: '#4640DE', border: 'none', padding: '14px 32px', borderRadius: '6px', width: 'max-content' }}
                            >
                                Sign Up For Free
                            </button>
                        </div>
                        <div className="w-full md:w-[55%] flex items-end justify-center md:justify-end md:absolute md:right-0 md:bottom-0">
                            <img src={ctaImage} alt="Dashboard preview" className="w-[90%] md:w-auto md:h-full object-contain object-bottom" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Jobs */}
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
                        <div className="flex justify-center p-12"><span className="loading loading-spinner text-primary loading-lg"></span></div>
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

            {/* Latest Jobs Open */}
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
                        {loading ? null : displayLatest.map(job => (
                            <Link to={`/jobs/${job._id || job.id}`} key={`latest-${job._id || job.id}`} className="bg-white p-5 md:p-6 rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center gap-4 md:gap-6 group">
                                <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0 text-2xl md:text-3xl font-extrabold text-blue-600 shadow-sm transition-transform">
                                    {job.company?.[0] || 'C'}
                                </div>
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
        </div>
    );
}
