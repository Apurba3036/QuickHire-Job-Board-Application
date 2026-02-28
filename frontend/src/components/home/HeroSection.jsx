import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import heroMan from '../../assets/professionalman.png';

export default function HeroSection() {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (keyword.trim()) params.append('search', keyword.trim());
        if (location && location !== 'Any Location') params.append('location', location);
        
        navigate(`/jobs?${params.toString()}`);
    };

    return (
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
                                <input 
                                    type="text" 
                                    placeholder="Job title or keyword" 
                                    className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 font-medium" 
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <div className="flex-1 flex items-center px-4 py-3 md:py-4 border md:border-none border-gray-100 rounded-lg pr-8">
                                <MapPin className="text-[#25324B] w-5 h-5 mr-3" />
                                <select 
                                    className="w-full bg-transparent focus:outline-none text-[#25324B] appearance-none font-bold cursor-pointer"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <option value="">Any Location</option>
                                    <option value="Florence, Italy">Florence, Italy</option>
                                    <option value="San Francisco, US">San Francisco, US</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>
                            <button 
                                onClick={handleSearch}
                                className="btn bg-[#4640DE] hover:bg-[#392eb0] text-white border-none w-full md:w-auto px-10 py-4 h-auto text-[16px] font-bold rounded-lg normal-case shadow-lg shadow-indigo-200"
                            >Search my job</button>
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
    );
}
