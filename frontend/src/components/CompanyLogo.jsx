import React from 'react';

const logoColors = ['text-blue-600', 'text-indigo-600', 'text-stone-800', 'text-sky-500', 'text-red-500', 'text-teal-500'];
const logoBgColors = ['bg-blue-50/50', 'bg-indigo-50/50', 'bg-stone-50/50', 'bg-sky-50/50', 'bg-red-50/50', 'bg-teal-50/50'];

const CompanyLogo = ({ company, logo, className = "" }) => {
    const colorIndex = company ? company.length % logoColors.length : 0;

    const getLogoUrl = (type = 'logodev') => {
        // Clean company name for logo search (remove common suffixes)
        const cleanName = company
            ?.split(' Inc')[0]
            ?.split(' Ltd')[0]
            ?.split(' Co')[0]
            ?.toLowerCase()
            ?.replace(/\s+/g, '');
            
        if (!cleanName) return null;
        
        const domains = {
            'google': 'google.com',
            'apple': 'apple.com',
            'facebook': 'facebook.com',
            'amazon': 'amazon.com',
            'netflix': 'netflix.com',
            'microsoft': 'microsoft.com',
            'spotify': 'spotify.com',
            'intel': 'intel.com',
            'tesla': 'tesla.com',
            'vodafone': 'vodafone.com',
            'amd': 'amd.com',
            'twitch': 'twitch.tv',
            'canva': 'canva.com',
            'webflow': 'webflow.com',
            'netlify': 'netlify.com',
            'maze': 'maze.co',
            'terraform': 'terraform.io',
            'udacity': 'udacity.com',
            'packer': 'packer.io',
            'principle': 'principleformac.com',
            'nomad': 'nomad.com',
            'dropbox': 'dropbox.com'
        };

        const domain = domains[cleanName] || `${cleanName}.com`;

        if (type === 'logodev') {
            return `https://img.logo.dev/${domain}?token=pk_Hd_0VU-RQf6QlEIiUq2H_Q`;
        }
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    };

    return (
        <div className={`rounded-xl border border-gray-100 flex items-center justify-center font-extrabold overflow-hidden p-2 bg-white ${className}`}>
            <img 
                src={logo || getLogoUrl('logodev')} 
                alt={company} 
                className="w-full h-full object-contain" 
                onError={(e) => { 
                    const currentSrc = e.target.src;
                    if (currentSrc.includes('logo.dev')) {
                        // Fallback to Google S2
                        e.target.src = getLogoUrl('google');
                    } else {
                        // All internet sources failed, show letter fallback
                        e.target.style.display = 'none'; 
                        const parent = e.target.parentElement;
                        if (parent) {
                            parent.innerText = company?.[0] || 'C'; 
                            parent.classList.add(logoBgColors[colorIndex], logoColors[colorIndex]);
                            parent.classList.remove('bg-white');
                        }
                    }
                }}
            />
        </div>
    );
};

export default CompanyLogo;
