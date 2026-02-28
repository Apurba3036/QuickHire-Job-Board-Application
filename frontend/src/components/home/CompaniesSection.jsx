import React from 'react';

export default function CompaniesSection() {
    return (
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
    );
}
