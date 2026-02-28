import React, { useState, useEffect } from 'react';
import { getHiringSites } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { ExternalLink } from 'lucide-react';
import CompanyLogo from '../components/CompanyLogo';

export default function HiringSites() {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const data = await getHiringSites();
                setSites(data);
            } catch (err) {
                console.error("Failed to fetch hiring sites:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSites();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-[72px] flex flex-col">
            <Navbar />
            <div className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Partner Hiring Sites</h1>
                    <p className="text-gray-500 mt-2">Explore dedicated portals from our top enterprise partners.</p>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center py-20 min-h-[300px]">
                        <LoadingSpinner size="4rem" />
                    </div>
                ) : sites.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No hiring sites found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {sites.map(site => (
                            <div key={site._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <CompanyLogo company={site.name} logo={site.logo} className="w-16 h-16 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center p-2 text-2xl" />
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{site.name}</h3>
                                        <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">Verified Partner</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm flex-1 mb-6">
                                    {site.description}
                                </p>
                                <a href={site.url} target="_blank" rel="noopener noreferrer" className="btn bg-[#4834D4] hover:bg-[#392eb0] text-white border-none w-full flex items-center gap-2">
                                    Visit Site <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
