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
                <section className="relative z-10 py-12 md:py-20 px-4 lg:px-12 overflow-hidden">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        {/* Background Shapes mimicking Figma lines */}
                        <div className="absolute right-0 top-0 w-full lg:w-[120%] h-full pointer-events-none -translate-y-10 translate-x-20 z-0">
                            <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-indigo-100 opacity-60">
                                <path d="M700 100 L200 350 L200 550 L700 300 Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M750 150 L250 400 L250 600 L750 350 Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M800 200 L300 450 L300 650 L800 400 Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="z-20 relative"
                        >
                            <h1 className="leading-tight mb-6" style={{ fontFamily: 'Clash Display, Red Hat Display, sans-serif', fontWeight: 600, fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: '110%', color: '#25324B' }}>
                                Discover <br />
                                more than <br />
                                <span className="relative inline-block" style={{ color: '#26A4FF' }}>
                                    5000+ Jobs
                                    <svg className="absolute w-[110%] h-6 -bottom-3 -left-2" style={{ color: '#26A4FF' }} viewBox="0 0 200 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5,15 Q50,5 100,10 T195,5" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ filter: 'drop-shadow(0px 2px 0px rgba(38,164,255,0.3))' }} />
                                        <path d="M10,18 Q60,10 110,15 T180,12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>
                            <p className="mb-10 max-w-lg" style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 400, fontSize: '20px', lineHeight: '160%', color: '#515B6F' }}>
                                Great platform for the job seeker that searching for new career heights and passionate about startups.
                            </p>

                            <div className="bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] rounded-lg p-2 flex flex-col md:flex-row gap-2 max-w-2xl border border-gray-100 relative z-30 mt-12">
                                <div className="flex-1 flex items-center px-4 py-4 border-b md:border-b-0 md:border-r border-gray-100">
                                    <Search className="text-gray-400 w-6 h-6 mr-3" />
                                    <input type="text" placeholder="Job title or keyword" className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 font-medium" />
                                </div>
                                <div className="flex-1 flex items-center px-4 py-4">
                                    <MapPin className="text-gray-400 w-6 h-6 mr-3" />
                                    <select className="w-full bg-transparent focus:outline-none text-gray-700 appearance-none font-medium cursor-pointer">
                                        <option>Florence, Italy</option>
                                        <option>San Francisco, US</option>
                                        <option>Madrid, Spain</option>
                                        <option>Remote</option>
                                    </select>
                                </div>
                                <button className="btn bg-[#4834D4] hover:bg-[#392eb0] text-white border-none w-full md:w-auto mt-2 md:mt-0 px-10 py-4 h-auto text-[15px] font-bold rounded-lg normal-case">Search my job</button>
                            </div>

                            <p className="text-sm font-medium text-gray-500 mt-6 hidden md:block relative z-30">
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
                            {/* The Man */}
                            <img src={heroMan} alt="Professional Job Seeker" className="absolute bottom-0 z-10 w-[95%] max-w-[550px] object-contain drop-shadow-2xl translate-x-12" />
                        </motion.div>
                    </div>
                </section>
            </div> {/* End Hero Wrapper */}

            {/* Companies Section */}
            <section className="pt-8 pb-16 bg-gray-50 overflow-hidden relative z-20">
                <div className="container mx-auto px-4 lg:px-12">
                    <p className="text-left md:text-center font-medium mb-10" style={{ fontFamily: 'Epilogue, sans-serif', color: '#202430', opacity: 0.3, fontWeight: 500, fontSize: '16px' }}>Companies we helped grow</p>

                    <div className="relative flex overflow-hidden group">
                        <div className="animate-marquee whitespace-nowrap flex items-center gap-20 md:gap-40 py-4 opacity-50 transition-all duration-500">
                            {/* Original Set */}
                            <span className="text-4xl font-bold flex items-center gap-2 text-gray-400 leading-none">
                                <div className="w-8 h-8 rounded-full border-[5px] border-gray-400"></div>vodafone
                            </span>
                            <span className="text-4xl font-bold text-gray-400 font-serif leading-none">intel<span className="text-[#0B66FF]">.</span></span>
                            <span className="text-4xl font-medium tracking-[0.3em] text-gray-400 uppercase leading-none">TESLA</span>
                            <span className="text-4xl font-black text-gray-400 tracking-tighter leading-none">AMD<sup className="text-sm">►</sup></span>
                            <span className="text-4xl font-bold italic text-gray-400 font-serif leading-none">Talkit</span>

                            {/* Dupe 1 */}
                            <span className="text-4xl font-bold flex items-center gap-2 text-gray-400 leading-none">
                                <div className="w-8 h-8 rounded-full border-[5px] border-gray-400"></div>vodafone
                            </span>
                            <span className="text-4xl font-bold text-gray-400 font-serif leading-none">intel<span className="text-[#0B66FF]">.</span></span>
                            <span className="text-4xl font-medium tracking-[0.3em] text-gray-400 uppercase leading-none">TESLA</span>
                            <span className="text-4xl font-black text-gray-400 tracking-tighter leading-none">AMD<sup className="text-sm">►</sup></span>
                            <span className="text-4xl font-bold italic text-gray-400 font-serif leading-none">Talkit</span>

                            {/* Dupe 2 */}
                            <span className="text-4xl font-bold flex items-center gap-2 text-gray-400 leading-none">
                                <div className="w-8 h-8 rounded-full border-[5px] border-gray-400"></div>vodafone
                            </span>
                            <span className="text-4xl font-bold text-gray-400 font-serif leading-none">intel<span className="text-[#0B66FF]">.</span></span>
                            <span className="text-4xl font-medium tracking-[0.3em] text-gray-400 uppercase leading-none">TESLA</span>
                            <span className="text-4xl font-black text-gray-400 tracking-tighter leading-none">AMD<sup className="text-sm">►</sup></span>
                            <span className="text-4xl font-bold italic text-gray-400 font-serif leading-none">Talkit</span>

                            {/* Extra spacer at the end to match gap */}
                            <div className="w-20 md:w-40 inline-block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore by Category */}
            <section className="py-24 px-4 lg:px-12 bg-white">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">Explore by <span className="text-[#3b82f6]">category</span></h2>
                        <Link to="/jobs" className="font-bold flex items-center gap-2 text-[#3b82f6] hover:text-blue-700 transition">Show all jobs <ArrowRight className="w-5 h-5" /></Link>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => setActiveCategory(cat.title)}
                                    className={`p-8 rounded-xl border transition-all duration-300 cursor-pointer group flex flex-col ${isActive ? 'bg-[#4834D4] border-transparent shadow-xl shadow-[#4834D4]/30 text-white translate-y-[-5px]' : 'bg-white border-gray-100 hover:border-[#4834D4]/30 hover:shadow-lg text-slate-800 hover:translate-y-[-5px]'}`}
                                >
                                    <cat.icon className={`w-10 h-10 mb-6 ${isActive ? 'text-white' : 'text-[#4834D4] group-hover:scale-110 transition-transform'}`} />
                                    <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                                    <p className={`text-sm flex items-center justify-between font-medium ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                                        {cat.count} jobs available <ArrowRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-[#4834D4]'}`} />
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 lg:px-12 bg-white">
                <div className="container mx-auto">
                    <div
                        className="flex flex-col md:flex-row relative overflow-visible h-[414px]"
                        style={{
                            background: '#4640DE',
                            clipPath: 'polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 48px 100%, 0 calc(100% - 48px))',
                        }}
                    >
                        <div className="w-full md:w-[42%] pl-16 pr-8 flex flex-col justify-center z-10 text-white">
                            <h2 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 800, fontSize: '40px', lineHeight: '120%', color: '#fff', marginBottom: '16px' }}>Start posting<br />jobs today</h2>
                            <p style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 400, fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>Start posting jobs for only $10.</p>
                            <button
                                className="hover:bg-gray-100 transition-colors"
                                style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 700, fontSize: '16px', background: '#fff', color: '#4640DE', border: '2px solid #fff', padding: '14px 32px', borderRadius: '6px', width: 'max-content' }}
                            >
                                Sign Up For Free
                            </button>
                        </div>
                        <div className="absolute right-0 bottom-0 h-[92%] hidden md:flex items-end justify-end" style={{ width: '60%' }}>
                            <img src={ctaImage} alt="Dashboard preview" className="h-full object-contain object-right-bottom" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Jobs */}
            <section className="py-24 px-4 lg:px-12 bg-white border-t border-gray-50 mt-10">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">Featured <span className="text-[#3b82f6]">jobs</span></h2>
                        <Link to="/jobs" className="font-bold flex items-center gap-2 text-[#3b82f6] hover:text-blue-700 transition">Show all jobs <ArrowRight className="w-5 h-5" /></Link>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center p-12"><span className="loading loading-spinner text-primary loading-lg"></span></div>
                    ) : jobs.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No jobs available right now.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayFeatured.map(job => (
                                <JobCard key={job._id || job.id} job={job} featured={true} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Latest Jobs Open */}
            <section className="py-24 px-4 lg:px-12 bg-gray-50/50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">Latest <span className="text-[#3b82f6]">jobs open</span></h2>
                        <Link to="/jobs" className="font-bold flex items-center gap-2 text-[#3b82f6] hover:text-blue-700 transition">Show all jobs <ArrowRight className="w-5 h-5" /></Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {loading ? null : displayLatest.map(job => (
                            <Link to={`/jobs/${job._id || job.id}`} key={`latest-${job._id || job.id}`} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center gap-6 group">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0 text-3xl font-extrabold text-blue-600 shadow-sm transition-transform">
                                    {job.company?.[0] || 'C'}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-[#3b82f6] transition-colors">{job.title}</h3>
                                    <p className="text-gray-500 text-sm mb-3 font-medium">{job.company} • {job.location}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">Full Time</span>
                                        {job.tags && job.tags.slice(0, 2).map((tag, idx) => (
                                            <span key={idx} className={`text-xs font-bold px-4 py-1.5 rounded-full border ${tag.toLowerCase() === 'marketing' ? 'text-orange-500 bg-orange-50 border-orange-100' : 'text-blue-600 bg-blue-50 border-blue-100'}`}>
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
