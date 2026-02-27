import React from 'react';
import { FiBriefcase } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-dark text-white pt-16 pb-8 px-4 lg:px-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 text-xl font-bold mb-4">
                        <div className="p-1 bg-white text-dark rounded"><FiBriefcase /></div>
                        QuickHire
                    </div>
                    <p className="text-gray-400 text-sm">
                        Great platform for the job seeker that searching for new career heights and passionate about startups.
                    </p>
                </div>

                <div className="col-span-1">
                    <h3 className="text-lg font-bold mb-4">About</h3>
                    <ul className="flex flex-col gap-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Companies</a></li>
                        <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition">Terms</a></li>
                        <li><a href="#" className="hover:text-white transition">Advice</a></li>
                        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h3 className="text-lg font-bold mb-4">Resources</h3>
                    <ul className="flex flex-col gap-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Help Docs</a></li>
                        <li><a href="#" className="hover:text-white transition">Guide</a></li>
                        <li><a href="#" className="hover:text-white transition">Updates</a></li>
                        <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h3 className="text-lg font-bold mb-4">Get job notifications</h3>
                    <p className="text-sm text-gray-400 mb-4">
                        The latest job news, articles, sent to your inbox weekly.
                    </p>
                    <div className="flex w-full">
                        <input type="email" placeholder="Email Address" className="input rounded-r-none w-full p-2 text-black h-10 min-h-0" />
                        <button className="btn btn-primary p-2 ml-2 h-10 min-h-0 rounded-l-none border-none">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>2026 @ QuickHire. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white"><span className="sr-only">Facebook</span>FB</a>
                    <a href="#" className="hover:text-white"><span className="sr-only">Instagram</span>IG</a>
                    <a href="#" className="hover:text-white"><span className="sr-only">Twitter</span>TW</a>
                    <a href="#" className="hover:text-white"><span className="sr-only">LinkedIn</span>LI</a>
                </div>
            </div>
        </footer>
    );
}
