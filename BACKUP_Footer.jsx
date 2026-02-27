import React from 'react';
import { FiBriefcase } from "react-icons/fi";
import logoImg from '../assets/image copy.png';

export default function Footer() {
    return (
        <footer className="bg-[#18191E] text-white pt-16 pb-8 px-4 lg:px-[40px]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Logo & Info */}
                <div className="col-span-1">
                    <div className="flex items-center gap-2 text-2xl font-bold mb-6">
                        <img src={logoImg} alt="QuickHire Logo" className="h-8 w-8 object-contain" />
                        <span style={{ fontFamily: 'Red Hat Display, sans-serif' }}>QuickHire</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Great platform for the job seeker that searching for new career heights and passionate about startups.
                    </p>
                </div>

                {/* About Links */}
                <div className="col-span-1">
                    <h3 className="text-lg font-bold mb-6">About</h3>
                    <ul className="flex flex-col gap-4 text-sm text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-white transition">Companies</a></li>
                        <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition">Terms</a></li>
                        <li><a href="#" className="hover:text-white transition">Advice</a></li>
                        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Resources Links */}
                <div className="col-span-1">
                    <h3 className="text-lg font-bold mb-6">Resources</h3>
                    <ul className="flex flex-col gap-4 text-sm text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-white transition">Help Docs</a></li>
                        <li><a href="#" className="hover:text-white transition">Guide</a></li>
                        <li><a href="#" className="hover:text-white transition">Updates</a></li>
                        <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="col-span-1">
                    <h3 className="text-lg font-bold mb-6">Get job notifications</h3>
                    <p className="text-sm text-gray-400 mb-6 font-medium">
                        The latest job news, articles, sent to your inbox weekly.
                    </p>
                    <div className="flex flex-col gap-2">
                        <div className="flex w-full">
                            <input type="email" placeholder="Email Address" className="input bg-white rounded-none border-none outline-none w-full p-4 text-[#25324B] h-12" />
                            <button className="btn bg-[#4640DE] hover:bg-blue-700 text-white rounded-none border-none px-6 h-12 uppercase font-bold text-sm tracking-wide">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="container mx-auto pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-sm text-gray-500 font-medium order-2 md:order-1">2026 @ QuickHire. All rights reserved.</p>
                <div className="flex gap-4 order-1 md:order-2">
                    {[
                        { icon: 'f', label: 'FB' },
                        { icon: 'in', label: 'LI' },
                        { icon: 't', label: 'TW' },
                        { icon: 'ig', label: 'IG' },
                        { icon: 'yo', label: 'YT' }
                    ].map((sns, idx) => (
                        <a key={idx} href="#" className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-[#4640DE] transition-colors text-xs font-bold text-gray-300">
                            {sns.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
