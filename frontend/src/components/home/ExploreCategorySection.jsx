import React from 'react';
import { ArrowRight, PenTool, PieChart, Megaphone, Wallet, Monitor, Code, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ExploreCategorySection({ activeCategory, setActiveCategory }) {
    return (
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
    );
}
