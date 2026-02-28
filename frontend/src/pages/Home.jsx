import React, { useState, useEffect } from 'react';
import { getJobs } from '../services/api';
import HeroSection from '../components/home/HeroSection';
import CompaniesSection from '../components/home/CompaniesSection';
import ExploreCategorySection from '../components/home/ExploreCategorySection';
import CTASection from '../components/home/CTASection';
import FeaturedJobsSection from '../components/home/FeaturedJobsSection';
import LatestJobsSection from '../components/home/LatestJobsSection';

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
            <HeroSection />
            <CompaniesSection />
            <ExploreCategorySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <CTASection />
            <FeaturedJobsSection loading={loading} jobs={jobs} displayFeatured={displayFeatured} />
            <LatestJobsSection loading={loading} displayLatest={displayLatest} />
        </div>
    );
}
