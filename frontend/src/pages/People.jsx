import React, { useState, useEffect } from 'react';
import { getPeople } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

export default function People() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const data = await getPeople();
                setPeople(data);
            } catch (err) {
                console.error("Failed to fetch people:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPeople();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-[72px] flex flex-col">
            <Navbar />
            <div className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">People Directory</h1>
                    <p className="text-gray-500 mt-2">Find and connect with incredible talent across the globe.</p>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center py-20 min-h-[300px]">
                        <LoadingSpinner size="4rem" />
                    </div>
                ) : people.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No people found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {people.map(person => (
                            <div key={person._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
                                <div className="avatar mb-4">
                                    <div className="w-24 rounded-full ring ring-offset-2 ring-gray-100">
                                        <img src={person.profilePic} alt={person.name} />
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 text-center">{person.name}</h3>
                                <p className="text-sm border text-[#4640DE] border-[#4640DE] px-3 py-1 rounded-full mt-2 font-medium bg-[#4640DE]/5">{person.role}</p>
                                <p className="text-gray-500 text-sm mt-3 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {person.location}
                                </p>
                                <div className="flex flex-wrap gap-2 justify-center mt-4 w-full">
                                    {person.skills?.slice(0, 3).map((skill, index) => (
                                        <span key={index} className="badge badge-ghost badge-sm">{skill}</span>
                                    ))}
                                    {person.skills?.length > 3 && <span className="badge badge-ghost badge-sm">+{person.skills.length - 3}</span>}
                                </div>
                                <button className="mt-6 w-full btn border border-[#CCCCF5] bg-transparent text-[#4640DE] hover:bg-[#4640DE] hover:border-[#4640DE] hover:text-white transition-colors duration-300">Connect</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
